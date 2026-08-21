/**
 * Flash Cart Page — Editorial checkout runway featuring modular CartItem components,
 * quantity stepper auto-remove logic, Framer Motion exit transitions, and glassmorphic OrderSummary.
 */
import { AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCommerce } from "@/contexts/CommerceContext";
import { formatINR, getProduct } from "@/data/mockProducts";
import CartItem, { type CartLineItem } from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

export default function Cart() {
  const {
    cart,
    subtotal,
    savings,
    couponDiscount,
    deliveryFee,
    total,
    couponCode,
    applyCoupon,
    clearCoupon,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
  } = useCommerce();

  const activeLines: CartLineItem[] = cart
    .filter((line) => !line.saved)
    .map((line) => ({ ...line, product: getProduct(line.productId) }))
    .filter(
      (line): line is CartLineItem => Boolean(line.product)
    );

  const deliveryGap = Math.max(0, 499 - subtotal);

  return (
    <section className="cart-page shell py-6 md:py-10 space-y-8">
      {/* Page Title */}
      <div className="page-title space-y-1">
        <p className="eyebrow text-xs font-bold uppercase tracking-widest text-[#a5c900]">
          Your fast lane
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-[#0F1115] tracking-tight">
          Cart, in motion.
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Keep the good finds close. We’ll hold the pace from here.
        </p>
      </div>

      {activeLines.length ? (
        <div className="cart-layout grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cart Items Column */}
          <div className="cart-main lg:col-span-7 space-y-6">
            {/* Free Shipping Progress Band */}
            <div className="shipping-progress bg-[#F4F4F1] border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#0F1115] text-[#CCFF00] flex items-center justify-center flex-shrink-0">
                  <Truck size={18} />
                </span>
                <span className="text-xs md:text-sm">
                  <b className="block font-extrabold text-[#0F1115]">
                    {deliveryGap
                      ? `Add ${formatINR(deliveryGap)} more for FREE Lightning Delivery.`
                      : "Lightning Delivery unlocked!"}
                  </b>
                  <small className="text-gray-500 font-medium">
                    {deliveryGap
                      ? "You’re almost at the free-delivery line."
                      : "Your order has caught the fast lane."}
                  </small>
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CCFF00] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Lines List with AnimatePresence */}
            <div className="cart-lines space-y-4">
              <AnimatePresence mode="popLayout">
                {activeLines.map((line) => (
                  <CartItem
                    key={`${line.productId}-${line.variantSku ?? line.color}-${line.size}`}
                    line={line}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onMoveToWishlist={moveToWishlist}
                  />
                ))}
              </AnimatePresence>
            </div>

            <Link
              className="cart-continue inline-flex items-center gap-2 text-sm font-bold text-[#0F1115] hover:text-[#CCFF00] transition-colors pt-2"
              to="/shop"
            >
              <ArrowRight size={17} /> Keep finding
            </Link>
          </div>

          {/* Redesigned Order Summary Sidebar Column */}
          <div className="lg:col-span-5 sticky top-24">
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              couponDiscount={couponDiscount}
              deliveryFee={deliveryFee}
              total={total}
              couponCode={couponCode}
              onApplyCoupon={applyCoupon}
              onClearCoupon={clearCoupon}
            />
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="cart-empty-runway py-16 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#0F1115] text-[#CCFF00] flex items-center justify-center shadow-xl">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <p className="eyebrow text-xs font-bold uppercase tracking-widest text-[#a5c900]">
              Cart, in motion
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F1115]">
              Your cart is waiting for a spark.
            </h2>
            <p className="text-sm text-gray-600">
              The next great find is one quick move away. Save a standout, then bring it back here when you're ready to move.
            </p>
          </div>
          <Link
            className="lime-button inline-flex items-center gap-2 bg-[#CCFF00] text-[#0F1115] font-extrabold px-6 py-3.5 rounded-full hover:bg-[#D4F800] transition-all shadow-md"
            to="/shop"
          >
            Explore the edit <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}
