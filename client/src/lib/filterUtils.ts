export interface FilterState {
  category: string;
  priceRange: [number, number];
  minDiscount: number;
  inStockOnly: boolean;
  expressOnly: boolean;
  selectedBrand: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating-desc';
}

export const initialFilters: FilterState = {
  category: 'all',
  priceRange: [0, 100000],
  minDiscount: 0,
  inStockOnly: false,
  expressOnly: false,
  selectedBrand: 'all',
  sortBy: 'featured',
};

export const normalizeStr = (str?: string) => 
  (str || '').toLowerCase().trim().replace(/[\s&]+/g, '-');

export const parseDiscountValue = (discountStr?: string | number): number => {
  if (typeof discountStr === 'number') return discountStr;
  if (!discountStr) return 0;
  const match = String(discountStr).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const applyAllFilters = (products: any[], filters: FilterState) => {
  return products
    .filter((p) => {
      // 1. Category Filter
      const catMatch = 
        filters.category === 'all' || 
        normalizeStr(p.category) === normalizeStr(filters.category);
      if (!catMatch) return false;

      // 2. Price Range Filter
      const price = Number(p.price) || 0;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;

      // 3. Discount Filter
      const discount = parseDiscountValue(p.discount);
      if (discount < filters.minDiscount) return false;

      // 4. In-Stock Filter
      if (filters.inStockOnly && (Number(p.stock) || 0) <= 0) return false;

      // 5. Express Delivery Filter
      if (filters.expressOnly && !(p.isExpress ?? p.express)) return false;

      // 6. Brand Filter
      if (filters.selectedBrand !== 'all' && normalizeStr(p.brand) !== normalizeStr(filters.selectedBrand)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (filters.sortBy === 'price-desc') return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (filters.sortBy === 'discount-desc') return parseDiscountValue(b.discount) - parseDiscountValue(a.discount);
      if (filters.sortBy === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'featured' keeps Supabase live order
    });
};
