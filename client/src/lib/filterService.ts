export interface FilterCriteria {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  expressDeliveryOnly: boolean;
}

export interface DefaultBounds {
  minPrice: number;
  maxPrice: number;
}

export interface ActiveChip {
  id: string;
  type: keyof FilterCriteria;
  value?: string | number;
  label: string;
}

export const defaultCriteria: FilterCriteria = {
  categories: [],
  priceRange: [0, 100000],
  brands: [],
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
  expressDeliveryOnly: false,
};

const normalize = (val?: string) => (val || '').toLowerCase().trim().replace(/[\s&]+/g, '-');

export const parseDiscountNum = (p: any): number => {
  if (typeof p.discount === 'number') return p.discount;
  if (typeof p.discount === 'string') {
    const match = p.discount.match(/\d+/);
    if (match) return parseInt(match[0], 10);
  }
  if (p.mrp && p.price && Number(p.mrp) > Number(p.price)) {
    return Math.round(((Number(p.mrp) - Number(p.price)) / Number(p.mrp)) * 100);
  }
  return 0;
};

export const calculatePriceBounds = (products: any[]): DefaultBounds => {
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
};

export const extractUniqueBrands = (products: any[]): string[] => {
  const brandSet = new Set<string>();
  for (const p of products) {
    if (p.brand && typeof p.brand === 'string' && p.brand.trim()) {
      brandSet.add(p.brand.trim());
    }
  }
  return Array.from(brandSet).sort();
};

export const filterCatalog = (
  products: any[],
  filters: FilterCriteria,
  searchQuery: string = '',
  sortBy: string = 'featured'
): any[] => {
  return products
    .filter((p) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = p.name?.toLowerCase().includes(query);
        const brandMatch = p.brand?.toLowerCase().includes(query);
        const catMatch = p.category?.toLowerCase().includes(query);
        const subMatch = p.subcategory?.toLowerCase().includes(query);
        if (!nameMatch && !brandMatch && !catMatch && !subMatch) return false;
      }

      // 2. Category Filter (Multiple selection support)
      if (filters.categories.length > 0) {
        const productCat = normalize(p.category);
        const hasMatch = filters.categories.some((c) => normalize(c) === productCat);
        if (!hasMatch) return false;
      }

      // 3. Price Range (₹0 to max)
      const price = Number(p.price) || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

      // 4. Brand Filter
      if (filters.brands.length > 0) {
        const productBrand = normalize(p.brand);
        const brandMatch = filters.brands.some((b) => normalize(b) === productBrand);
        if (!brandMatch) return false;
      }

      // 5. Customer Rating (e.g. 4★ & above like Amazon/Flipkart)
      if (filters.minRating > 0) {
        const rating = Number(p.rating) || 4.5;
        if (rating < filters.minRating) return false;
      }

      // 6. Minimum Discount (% Off)
      if (filters.minDiscount > 0) {
        const discount = parseDiscountNum(p);
        if (discount < filters.minDiscount) return false;
      }

      // 7. Availability (In-Stock Only)
      if (filters.inStockOnly && (Number(p.stock) || 0) <= 0) return false;

      // 8. Flash Express Delivery
      if (filters.expressDeliveryOnly && !(p.express || p.isExpress)) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low' || sortBy === 'low') return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (sortBy === 'price-high' || sortBy === 'high') return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (sortBy === 'discount-high' || sortBy === 'discount') return parseDiscountNum(b) - parseDiscountNum(a);
      if (sortBy === 'rating-high') return (Number(b.rating) || 4.5) - (Number(a.rating) || 4.5);
      return 0; // 'featured' retains Supabase live order
    });
};

export const countActiveFilters = (filters: FilterCriteria, bounds: DefaultBounds): number => {
  let count = 0;
  if (filters.categories && filters.categories.length > 0) {
    count += filters.categories.length;
  }
  if (filters.priceRange[0] > bounds.minPrice || filters.priceRange[1] < bounds.maxPrice) {
    count += 1;
  }
  if (filters.brands && filters.brands.length > 0) {
    count += filters.brands.length;
  }
  if (filters.minRating > 0) {
    count += 1;
  }
  if (filters.minDiscount > 0) {
    count += 1;
  }
  if (filters.inStockOnly) {
    count += 1;
  }
  if (filters.expressDeliveryOnly) {
    count += 1;
  }
  return count;
};

export const getActiveChips = (filters: FilterCriteria, bounds: DefaultBounds): ActiveChip[] => {
  const chips: ActiveChip[] = [];

  // Category chips
  if (filters.categories && filters.categories.length > 0) {
    for (const cat of filters.categories) {
      chips.push({
        id: `cat-${cat}`,
        type: 'categories',
        value: cat,
        label: `Category: ${cat}`,
      });
    }
  }

  // Price range chip
  if (filters.priceRange[0] > bounds.minPrice || filters.priceRange[1] < bounds.maxPrice) {
    chips.push({
      id: 'price-range',
      type: 'priceRange',
      label: `Price: ₹${filters.priceRange[0].toLocaleString('en-IN')} – ₹${filters.priceRange[1].toLocaleString('en-IN')}`,
    });
  }

  // Brand chips
  if (filters.brands && filters.brands.length > 0) {
    for (const brand of filters.brands) {
      chips.push({
        id: `brand-${brand}`,
        type: 'brands',
        value: brand,
        label: `Brand: ${brand}`,
      });
    }
  }

  // Rating chip
  if (filters.minRating > 0) {
    chips.push({
      id: 'rating',
      type: 'minRating',
      value: filters.minRating,
      label: `${filters.minRating}★ & Above`,
    });
  }

  // Discount chip
  if (filters.minDiscount > 0) {
    chips.push({
      id: 'discount',
      type: 'minDiscount',
      value: filters.minDiscount,
      label: `${filters.minDiscount}%+ Off`,
    });
  }

  // Stock chip
  if (filters.inStockOnly) {
    chips.push({
      id: 'in-stock',
      type: 'inStockOnly',
      label: 'In Stock Only',
    });
  }

  // Express delivery chip
  if (filters.expressDeliveryOnly) {
    chips.push({
      id: 'express',
      type: 'expressDeliveryOnly',
      label: 'Flash Express Delivery',
    });
  }

  return chips;
};
