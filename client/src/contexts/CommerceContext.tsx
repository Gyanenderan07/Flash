/**
 * Flash commerce state — keep persistent shopping actions immediate, compact, and aligned
 * with the Supercharged Editorial Commerce storefront across every client-side route.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, getProductVariant } from "@/data/mockProducts";

import { supabase } from "@/lib/supabase";

export type CartLine = {
  productId: string;
  name?: string;
  price?: number;
  mrp?: number;
  quantity: number;
  category?: string;
  color?: string;
  colorName?: string;
  variantSku?: string;
  image?: string;
  size?: string;
  saved?: boolean;
};

type CartLineRef = Pick<CartLine, "productId" | "color" | "size" | "variantSku">;
export type Address = { id: string; label: string; name: string; line1: string; city: string; state: string; pincode: string; phone: string; isDefault?: boolean };
export type Order = { id: string; createdAt: string; status: "Processing" | "In Transit" | "Delivered"; lines: CartLine[]; total: number; addressId: string };

type CommerceValue = {
  cart: CartLine[];
  wishlistIds: string[];
  searchQuery: string;
  couponCode: string | null;
  addresses: Address[];
  orders: Order[];
  cartCount: number;
  subtotal: number;
  savings: number;
  couponDiscount: number;
  deliveryFee: number;
  total: number;
  addToCart: (product: any, options?: { color?: string; colorName?: string; variantSku?: string; image?: string; size?: string; quantity?: number }) => void;
  updateQuantity: (line: CartLineRef | string, quantity: number) => void;
  removeFromCart: (line: CartLineRef | string) => void;
  moveToWishlist: (line: CartLineRef | string) => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  addAddress: (address: Omit<Address, "id">) => Address;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  createOrder: (addressId: string) => Order | null;
};

const CommerceContext = createContext<CommerceValue | null>(null);

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const stored = localStorage.getItem("flash_cart");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("flash_wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { localStorage.setItem("flash_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("flash_wishlist", JSON.stringify(wishlistIds)); }, [wishlistIds]);

  const matchLine = (line: CartLine, reference: CartLineRef | string) => typeof reference === "string" ? line.productId === reference : line.productId === reference.productId && line.color === reference.color && line.size === reference.size && line.variantSku === reference.variantSku;
  
  const addToCart = useCallback((product: any, options: { color?: string; colorName?: string; variantSku?: string; image?: string; size?: string; quantity?: number } = {}) => {
    const quantity = options.quantity ?? 1;
    const variant = getProductVariant(product, options.color);
    const color = options.color ?? variant?.color ?? (Array.isArray(product.colors) ? (typeof product.colors[0] === 'string' ? product.colors[0] : product.colors[0]?.hex) : '#0F1115');
    const variantSku = options.variantSku ?? variant?.sku;
    const colorName = options.colorName ?? variant?.name ?? 'Standard';
    const image = options.image ?? variant?.image ?? product.primaryImage ?? product.primary_image ?? product.image;
    const name = product.name || product.title || 'Flash Product';
    const price = Number(product.price) || 0;
    const mrp = Number(product.mrp || product.originalPrice || product.original_price || price);

    setCart((current) => {
      const existing = current.find((line) => line.productId === String(product.id) && line.variantSku === variantSku && line.size === options.size);
      return existing
        ? current.map((line) => line === existing ? { ...line, quantity: line.quantity + quantity, saved: false } : line)
        : [
            ...current,
            {
              productId: String(product.id),
              name,
              price,
              mrp,
              quantity,
              category: product.category,
              color,
              colorName,
              variantSku,
              image,
              size: options.size,
            },
          ];
    });
    toast.success(`${name} added to cart`);
  }, []);

  const updateQuantity = useCallback((lineRef: CartLineRef | string, quantity: number) => setCart((current) => current.map((line) => matchLine(line, lineRef) ? { ...line, quantity: Math.max(1, quantity) } : line)), []);
  const removeFromCart = useCallback((lineRef: CartLineRef | string) => { setCart((current) => current.filter((line) => !matchLine(line, lineRef))); toast("Item removed from cart"); }, []);
  const toggleWishlist = useCallback((productId: string) => setWishlistIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]), []);
  const moveToWishlist = useCallback((lineRef: CartLineRef | string) => { const productId = typeof lineRef === "string" ? lineRef : lineRef.productId; setCart((current) => current.filter((line) => !matchLine(line, lineRef))); setWishlistIds((current) => current.includes(productId) ? current : [...current, productId]); toast.success("Saved for later"); }, []);
  const applyCoupon = useCallback((code: string) => {
    if (code.trim().toUpperCase() !== "FLASH10") { toast.error("That code needs another look."); return false; }
    setCouponCode("FLASH10"); toast.success("FLASH10 applied — 10% moves off your total."); return true;
  }, []);
  const clearCoupon = useCallback(() => setCouponCode(null), []);
  const addAddress = useCallback((address: Omit<Address, "id">) => {
    const nextAddress = { ...address, id: `address-${Date.now()}` };
    setAddresses((current) => [...current, { ...nextAddress, isDefault: current.length === 0 ? true : nextAddress.isDefault }]);
    toast.success("New delivery address saved");
    return nextAddress;
  }, []);
  const deleteAddress = useCallback((addressId: string) => {
    setAddresses((current) => {
      if (current.length === 1) return current;
      const next = current.filter((address) => address.id !== addressId);
      return next.some((address) => address.isDefault) ? next : next.map((address, index) => ({ ...address, isDefault: index === 0 }));
    });
    toast("Address removed");
  }, []);
  const setDefaultAddress = useCallback((addressId: string) => {
    setAddresses((current) => current.map((address) => ({ ...address, isDefault: address.id === addressId })));
    toast.success("Default delivery address updated");
  }, []);

  const summaries = useMemo(() => {
    const active = cart.filter((line) => !line.saved);
    const subtotal = active.reduce((sum, line) => {
      const p = getProduct(line.productId);
      const linePrice = line.price ?? p?.price ?? 0;
      return sum + linePrice * line.quantity;
    }, 0);
    const savings = active.reduce((sum, line) => {
      const p = getProduct(line.productId);
      const linePrice = line.price ?? p?.price ?? 0;
      const lineMrp = line.mrp ?? p?.mrp ?? linePrice;
      return sum + Math.max(0, lineMrp - linePrice) * line.quantity;
    }, 0);
    const couponDiscount = couponCode === "FLASH10" ? Math.round(subtotal * 0.1) : 0;
    const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 99;
    return { subtotal, savings, couponDiscount, deliveryFee, total: Math.max(0, subtotal - couponDiscount + deliveryFee), cartCount: active.reduce((sum, line) => sum + line.quantity, 0) };
  }, [cart, couponCode]);

  const createOrder = useCallback(
    (addressId: string) => {
      if (!cart.length || !addresses.some((address) => address.id === addressId)) return null;
      const lines = cart.filter((line) => !line.saved);
      if (!lines.length) return null;
      const order: Order = {
        id: `FL-${Math.floor(10000 + Math.random() * 89999)}`,
        createdAt: new Date().toISOString().slice(0, 10),
        status: "Processing",
        lines,
        total: summaries.total,
        addressId,
      };

      // Persist order to Supabase orders table
      try {
        supabase
          .from("orders")
          .insert([
            {
              id: order.id,
              created_at: order.createdAt,
              status: order.status,
              total: order.total,
              address_id: order.addressId,
              lines: order.lines,
            },
          ])
          .then(({ error }) => {
            if (error) {
              console.info("Supabase order notice:", error.message);
            }
          });
      } catch (err) {
        console.info("Supabase order notice:", err);
      }

      setOrders((current) => [order, ...current]);
      setCart([]);
      setCouponCode(null);
      return order;
    },
    [cart, addresses, summaries.total]
  );

  const value = useMemo<CommerceValue>(() => ({ cart, wishlistIds, searchQuery, couponCode, addresses, orders, ...summaries, addToCart, updateQuantity, removeFromCart, moveToWishlist, toggleWishlist, setSearchQuery, applyCoupon, clearCoupon, addAddress, deleteAddress, setDefaultAddress, createOrder }), [cart, wishlistIds, searchQuery, couponCode, addresses, orders, summaries, addToCart, updateQuantity, removeFromCart, toggleWishlist, moveToWishlist, applyCoupon, clearCoupon, addAddress, deleteAddress, setDefaultAddress, createOrder]);
  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error("useCommerce must be used inside CommerceProvider");
  return context;
}
