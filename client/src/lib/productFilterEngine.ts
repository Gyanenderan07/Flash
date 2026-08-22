import { type Product, type ProductCategory, getDiscount } from "@/data/mockProducts";

export interface FilterState {
  categories: ProductCategory[];
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  inStockOnly: boolean;
  expressOnly: boolean;
}

export interface DefaultBounds {
  minPrice: number;
  maxPrice: number;
}

export interface ActiveChip {
  id: string;
  type: keyof FilterState;
  value?: string | number;
  label: string;
}

/**
 * Calculates actual minimum and maximum price bounds from the product dataset.
 */
export function calculatePriceBounds(products: Product[]): DefaultBounds {
  if (!products || products.length === 0) {
    return { minPrice: 0, maxPrice: 100000 };
  }
  let min = Infinity;
  let max = -Infinity;

  for (const product of products) {
    const price = Number(product.price) || 0;
    if (price < min) min = price;
    if (price > max) max = price;
  }

  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 100000;

  return {
    minPrice: Math.floor(min),
    maxPrice: Math.ceil(max),
  };
}

/**
 * Creates default FilterState initialized from dataset bounds.
 */
export function createDefaultFilters(bounds: DefaultBounds): FilterState {
  return {
    categories: [],
    minPrice: bounds.minPrice,
    maxPrice: bounds.maxPrice,
    minDiscount: 0,
    inStockOnly: false,
    expressOnly: false,
  };
}

/**
 * Filters a list of products using AND logic across filter categories,
 * OR logic within category multi-selection, and search query matching.
 */
export function filterProducts(
  products: Product[],
  filters: FilterState,
  searchQuery: string = ""
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    // 1. Search Query Filter
    if (query) {
      const targetStr = `${product.name} ${product.brand} ${product.category} ${product.subcategory}`.toLowerCase();
      if (!targetStr.includes(query)) return false;
    }

    // 2. Category Filter (OR logic within categories)
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) return false;
    }

    // 3. Price Range Filter
    const price = Number(product.price) || 0;
    if (price < filters.minPrice || price > filters.maxPrice) return false;

    // 4. Minimum Discount Filter
    const discount = getDiscount(product);
    if (discount < filters.minDiscount) return false;

    // 5. In-Stock Filter
    if (filters.inStockOnly && (Number(product.stock) || 0) <= 0) return false;

    // 6. Flash Express Delivery Filter
    if (filters.expressOnly && !product.express) return false;

    return true;
  });
}

/**
 * Computes active filter count (number of filter conditions applied).
 */
export function countActiveFilters(filters: FilterState, bounds: DefaultBounds): number {
  let count = 0;
  if (filters.categories && filters.categories.length > 0) {
    count += filters.categories.length;
  }
  if (filters.minPrice > bounds.minPrice || filters.maxPrice < bounds.maxPrice) {
    count += 1;
  }
  if (filters.minDiscount > 0) {
    count += 1;
  }
  if (filters.inStockOnly) {
    count += 1;
  }
  if (filters.expressOnly) {
    count += 1;
  }
  return count;
}

/**
 * Generates removable active filter chips with human-readable labels.
 */
export function getActiveChips(filters: FilterState, bounds: DefaultBounds): ActiveChip[] {
  const chips: ActiveChip[] = [];

  // Category chips
  if (filters.categories && filters.categories.length > 0) {
    for (const cat of filters.categories) {
      chips.push({
        id: `cat-${cat}`,
        type: "categories",
        value: cat,
        label: `Category: ${cat}`,
      });
    }
  }

  // Price range chip
  if (filters.minPrice > bounds.minPrice || filters.maxPrice < bounds.maxPrice) {
    chips.push({
      id: "price-range",
      type: "minPrice",
      label: `Price: ₹${filters.minPrice.toLocaleString("en-IN")} – ₹${filters.maxPrice.toLocaleString("en-IN")}`,
    });
  }

  // Discount chip
  if (filters.minDiscount > 0) {
    chips.push({
      id: "discount",
      type: "minDiscount",
      value: filters.minDiscount,
      label: `Discount: ${filters.minDiscount}%+ Off`,
    });
  }

  // Stock chip
  if (filters.inStockOnly) {
    chips.push({
      id: "in-stock",
      type: "inStockOnly",
      label: "In Stock Only",
    });
  }

  // Express shipping chip
  if (filters.expressOnly) {
    chips.push({
      id: "express",
      type: "expressOnly",
      label: "Flash Express Delivery",
    });
  }

  return chips;
}
