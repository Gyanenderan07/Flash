/**
 * Global Product Service (`client/src/services/productService.ts`)
 * Unifies live Supabase data fetching & sanitizes product rows so all items render dynamically.
 */
import { supabase } from "../lib/supabase";
import { products as defaultProducts, type Product, type ProductCategory, categoryOrder } from "../data/mockProducts";

export interface StoreProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  stock: number;
  description: string;
  primaryImage: string;
  hoverImage: string;
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  isNew: boolean;
  isExpress: boolean;
}

export const autoSeedCatalogIfEmpty = async () => {
  try {
    const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
    if (count === 0 || (count !== null && count < 5)) {
      const payload = defaultProducts.map((p: any) => ({
        name: p.name,
        brand: p.brand || 'Flash',
        category: (p.category || 'electronics').toLowerCase().trim().replace(/[\s&]+/g, '-'),
        price: Number(p.price),
        original_price: Number(p.originalPrice || p.mrp || p.price),
        discount: p.discount || '-0%',
        stock: p.stock || 15,
        description: p.description || 'Verified authentic Flash product.',
        primary_image: p.primaryImage || p.image,
        hover_images: [p.hoverImage || (p.gallery && p.gallery[1]) || p.primaryImage || p.image],
        colors: p.colors || [{ name: 'Default', hex: '#0F1115' }]
      }));
      await supabase.from('products').insert(payload);
    }
  } catch (err) {
    console.warn('Auto-seed catalog notice:', err);
  }
};

export const fetchAllLiveProducts = async (): Promise<StoreProduct[]> => {
  try {
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching Supabase products:", error);
      return [];
    }

    if (!data || data.length === 0) {
      await autoSeedCatalogIfEmpty();
      const { data: reseeded } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!reseeded || reseeded.length === 0) return [];
      data = reseeded;
    }

    return data.map((p) => {
      const rawCategory = (p.category || "electronics").toLowerCase().trim();
      const cleanCategory = rawCategory.replace(/[\s&]+/g, "-");
      const numPrice = Number(p.price) || 0;
      const numOriginal = Number(p.original_price || p.price) || numPrice;
      const calculatedDiscount = p.discount || (numOriginal > numPrice 
        ? `-${Math.round(((numOriginal - numPrice) / numOriginal) * 100)}%` 
        : "-0%");

      return {
        id: String(p.id),
        name: p.name || p.title || "Flash Product",
        brand: p.brand || "Flash",
        category: cleanCategory,
        price: numPrice,
        originalPrice: numOriginal,
        discount: calculatedDiscount,
        stock: p.stock ?? 10,
        description: p.description || "",
        primaryImage: p.primary_image || p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        hoverImage: (Array.isArray(p.hover_images) && p.hover_images[0]) || p.primary_image || p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        colors: Array.isArray(p.colors) && p.colors.length > 0 ? p.colors : [{ name: "Obsidian", hex: "#0F1115" }],
        rating: 4.9,
        reviewsCount: 24,
        isNew: true,
        isExpress: true,
      };
    });
  } catch (err) {
    console.error("Unexpected error loading live products:", err);
    return [];
  }
};

export const getLiveStoreProducts = async (): Promise<Product[]> => {
  try {
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch error, returning default catalog:", error.message);
      return defaultProducts;
    }

    if (dbProducts && dbProducts.length > 0) {
      const formattedDbProducts: Product[] = dbProducts.map((p, idx) => {
        const rawCategory = (p.category || "home-living").toLowerCase().trim();
        const normalizedCategoryKey = rawCategory.replace(/[\s&]+/g, "-");

        // Map normalized category key to ProductCategory title
        const matchedCategory = categoryOrder.find(
          (cat) => cat.toLowerCase().replace(/[\s&]+/g, "-") === normalizedCategoryKey
        ) ?? "Home & Living";

        const primaryImage =
          p.primary_image ||
          p.image ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";

        const hoverImage =
          (Array.isArray(p.hover_images) && p.hover_images[0]) ||
          primaryImage;

        const price = Number(p.price) || 0;
        const mrp = Number(p.original_price || p.mrp || (price ? Math.round(price * 1.4) : 0));

        return {
          id: p.id ? String(p.id) : `db-prod-${idx}-${Date.now()}`,
          name: p.name || p.title || "Untitled Product",
          category: matchedCategory as ProductCategory,
          subcategory: p.subcategory || "General",
          brand: p.brand || "Flash",
          price,
          mrp,
          stock: p.stock ?? 10,
          express: true,
          isNew: true,
          image: primaryImage,
          gallery: Array.isArray(p.hover_images) && p.hover_images.length ? p.hover_images : [primaryImage, hoverImage],
          description: p.description || "Verified authentic Flash product.",
          highlights: ["Authentic quality guarantee", "Fast dispatch eligible"],
          colors: Array.isArray(p.colors) ? p.colors.map((c: any) => typeof c === 'string' ? c : (c.hex || '#0F1115')) : ["#0F1115", "#CCFF00"],
          sku: p.sku || `FL-DB-${Math.floor(100 + Math.random() * 900)}`,
        };
      });

      // Filter out any default static mocks that have the same name/id, then put live DB products first
      const dbNames = new Set(formattedDbProducts.map((db) => db.name.toLowerCase().trim()));
      const dbIds = new Set(formattedDbProducts.map((db) => db.id));

      const uniqueMockProducts = defaultProducts.filter(
        (mock) => !dbNames.has(mock.name.toLowerCase().trim()) && !dbIds.has(mock.id)
      );

      return [...formattedDbProducts, ...uniqueMockProducts];
    }

    return defaultProducts;
  } catch (err) {
    console.warn("Failed to fetch live products from Supabase:", err);
    return defaultProducts;
  }
};
