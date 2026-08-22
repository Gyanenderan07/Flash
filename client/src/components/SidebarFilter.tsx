import React, { useState, useEffect } from 'react';

export const matchesPrice = (productPrice: number, range: [number, number]) => {
  const price = Number(productPrice) || 0;
  const [min, max] = range;
  return price >= (min ?? 0) && price <= (max ?? Infinity);
};

export interface FilterProps {
  onFilterChange?: (filters: {
    priceRange: [number, number];
    minDiscount: number;
    inStockOnly: boolean;
    expressOnly: boolean;
    selectedBrands: string[];
  }) => void;
  availableBrands?: string[];
  allBrands?: string[];
  priceRange?: [number, number];
  setPriceRange?: (range: [number, number]) => void;
  onPriceChange?: (range: [number, number]) => void;
  selectedDiscount?: number;
  setSelectedDiscount?: (discount: number) => void;
  inStockOnly?: boolean;
  setInStockOnly?: (val: boolean) => void;
  expressOnly?: boolean;
  setExpressOnly?: (val: boolean) => void;
  selectedBrands?: string[];
  setSelectedBrands?: (brands: string[]) => void;
  onToggleBrand?: (brand: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  onReset?: () => void;
}

export default function SidebarFilter({
  onFilterChange,
  availableBrands,
  allBrands,
  priceRange: propPriceRange,
  setPriceRange,
  onPriceChange,
  selectedDiscount: propDiscount = 0,
  setSelectedDiscount,
  inStockOnly: propInStock = false,
  setInStockOnly: propSetInStock,
  expressOnly: propExpress = false,
  setExpressOnly: propSetExpress,
  selectedBrands: propBrands = [],
  setSelectedBrands,
  onToggleBrand,
  selectedCategory,
  onSelectCategory,
  onReset,
}: FilterProps) {
  const brandsList = availableBrands || allBrands || [
    'Flash',
    'Boult',
    'Philips',
    'Zebronics',
    'Nexora',
    'Zapster',
    'Lumicore',
  ];

  const [maxPrice, setMaxPrice] = useState<number>(propPriceRange ? propPriceRange[1] : 100000);
  const [minDiscount, setMinDiscount] = useState<number>(propDiscount);
  const [inStockOnly, setInStockOnly] = useState<boolean>(propInStock);
  const [expressOnly, setExpressOnly] = useState<boolean>(propExpress);
  const [selectedBrands, setSelectedBrandsState] = useState<string[]>(propBrands);

  useEffect(() => {
    if (propPriceRange) setMaxPrice(propPriceRange[1]);
    setMinDiscount(propDiscount);
    setInStockOnly(propInStock);
    setExpressOnly(propExpress);
    setSelectedBrandsState(propBrands);
  }, [propPriceRange, propDiscount, propInStock, propExpress, propBrands]);

  const handleApply = () => {
    const range: [number, number] = [0, maxPrice];
    if (onFilterChange) {
      onFilterChange({
        priceRange: range,
        minDiscount,
        inStockOnly,
        expressOnly,
        selectedBrands,
      });
    }
    if (setPriceRange) setPriceRange(range);
    if (onPriceChange) onPriceChange(range);
    if (setSelectedDiscount) setSelectedDiscount(minDiscount);
    if (propSetInStock) propSetInStock(inStockOnly);
    if (propSetExpress) propSetExpress(expressOnly);
    if (setSelectedBrands) setSelectedBrands(selectedBrands);
  };

  const handleReset = () => {
    setMaxPrice(100000);
    setMinDiscount(0);
    setInStockOnly(false);
    setExpressOnly(false);
    setSelectedBrandsState([]);

    const defaultRange: [number, number] = [0, 100000];
    if (onFilterChange) {
      onFilterChange({
        priceRange: defaultRange,
        minDiscount: 0,
        inStockOnly: false,
        expressOnly: false,
        selectedBrands: [],
      });
    }
    if (setPriceRange) setPriceRange(defaultRange);
    if (onPriceChange) onPriceChange(defaultRange);
    if (setSelectedDiscount) setSelectedDiscount(0);
    if (propSetInStock) propSetInStock(false);
    if (propSetExpress) propSetExpress(false);
    if (setSelectedBrands) setSelectedBrands([]);
    if (onReset) onReset();
  };

  const toggleBrand = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrandsState(updated);
    if (onToggleBrand) onToggleBrand(brand);
    if (setSelectedBrands) setSelectedBrands(updated);
  };

  return (
    <aside className="w-full bg-white dark:bg-[#12151B] p-5 rounded-3xl border border-neutral-200/70 dark:border-neutral-800 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="text-base font-black tracking-tight text-neutral-900 dark:text-white uppercase">
          Filters
        </h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* 1. Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-neutral-500 uppercase tracking-wider">Max Price</span>
          <span className="text-[#0B0D10] dark:text-[#CCFF00] font-black text-sm">
            ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
        />
        <div className="flex justify-between text-[11px] font-semibold text-neutral-400">
          <span>₹0</span>
          <span>₹1,00,000+</span>
        </div>
      </div>

      {/* 2. Minimum Discount */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
          Minimum Discount
        </label>
        <select
          value={minDiscount}
          onChange={(e) => setMinDiscount(Number(e.target.value))}
          className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:border-[#CCFF00] cursor-pointer"
        >
          <option value={0}>All Discounts</option>
          <option value={10}>10% or more</option>
          <option value={20}>20% or more</option>
          <option value={30}>30% or more</option>
          <option value={50}>50% or more</option>
        </select>
      </div>

      {/* 3. Availability & Delivery */}
      <div className="space-y-3 pt-2">
        <span className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
          Availability & Delivery
        </span>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-black dark:text-[#CCFF00] focus:ring-0 cursor-pointer accent-[#CCFF00]"
            />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
              In Stock Only
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={expressOnly}
              onChange={(e) => setExpressOnly(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-black dark:text-[#CCFF00] focus:ring-0 cursor-pointer accent-[#CCFF00]"
            />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors flex items-center gap-1.5">
              Flash Express Delivery
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#CCFF00] text-black">⚡</span>
            </span>
          </label>
        </div>
      </div>

      {/* 4. Brand Filter */}
      {brandsList.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <span className="block text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Brands
          </span>
          <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
            {brandsList.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#CCFF00] cursor-pointer"
                />
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* 5. Apply Button */}
      <button
        type="button"
        onClick={handleApply}
        className="w-full py-3 px-4 rounded-xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider transition-transform active:scale-[0.98] shadow-[0_4px_14px_rgba(204,255,0,0.25)] cursor-pointer"
      >
        Apply Filters
      </button>
    </aside>
  );
}
