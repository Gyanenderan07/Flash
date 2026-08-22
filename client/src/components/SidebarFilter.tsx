import React from 'react';

export const matchesPrice = (productPrice: number, range: [number, number]) => {
  const price = Number(productPrice) || 0;
  const [min, max] = range;
  return price >= (min ?? 0) && price <= (max ?? Infinity);
};

export interface FilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedDiscount: number;
  setSelectedDiscount: (discount: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  expressOnly: boolean;
  setExpressOnly: (val: boolean) => void;
  onApply?: () => void;
  onClear?: () => void;
  onFilterChange?: (filters: {
    priceRange: [number, number];
    minDiscount: number;
    inStockOnly: boolean;
    expressOnly: boolean;
    selectedBrands: string[];
  }) => void;
  selectedBrands?: string[];
  setSelectedBrands?: (brands: string[]) => void;
  onToggleBrand?: (brand: string) => void;
  availableBrands?: string[];
  allBrands?: string[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  onReset?: () => void;
}

export default function SidebarFilter({
  priceRange = [0, 100000],
  setPriceRange,
  selectedDiscount = 0,
  setSelectedDiscount,
  inStockOnly = false,
  setInStockOnly,
  expressOnly = false,
  setExpressOnly,
  onApply,
  onClear,
  onFilterChange,
  selectedBrands = [],
  setSelectedBrands,
  onToggleBrand,
  availableBrands = [],
  allBrands = [],
  onReset,
}: FilterProps) {
  const brandsList = availableBrands.length ? availableBrands : allBrands;

  const handleApplyClick = () => {
    if (onApply) onApply();
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        minDiscount: selectedDiscount,
        inStockOnly,
        expressOnly,
        selectedBrands,
      });
    }
  };

  const handleClearClick = () => {
    if (onClear) onClear();
    if (onReset) onReset();
    if (setPriceRange) setPriceRange([0, 100000]);
    if (setSelectedDiscount) setSelectedDiscount(0);
    if (setInStockOnly) setInStockOnly(false);
    if (setExpressOnly) setExpressOnly(false);
    if (setSelectedBrands) setSelectedBrands([]);
    if (onFilterChange) {
      onFilterChange({
        priceRange: [0, 100000],
        minDiscount: 0,
        inStockOnly: false,
        expressOnly: false,
        selectedBrands: [],
      });
    }
  };

  const handleToggleBrand = (brand: string) => {
    if (onToggleBrand) {
      onToggleBrand(brand);
    } else if (setSelectedBrands) {
      const next = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand];
      setSelectedBrands(next);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#12151B] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-5 space-y-6 shadow-sm">
      {/* 1. PRICE RANGE */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
          Price Range
        </h4>
        <div className="flex items-center justify-between text-sm font-bold text-neutral-700 dark:text-neutral-300">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span className="text-neutral-400 font-normal">to</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange && setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
        />
      </div>

      <div className="h-px bg-neutral-100 dark:bg-neutral-800/80" />

      {/* 2. MINIMUM DISCOUNT */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
          Minimum Discount
        </h4>
        <select
          value={selectedDiscount}
          onChange={(e) => setSelectedDiscount && setSelectedDiscount(Number(e.target.value))}
          className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-[#181C24] border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#CCFF00] transition-colors cursor-pointer"
        >
          <option value={0}>All Discounts</option>
          <option value={10}>10% or more</option>
          <option value={20}>20% or more</option>
          <option value={30}>30% or more</option>
          <option value={50}>50% or more</option>
        </select>
      </div>

      <div className="h-px bg-neutral-100 dark:bg-neutral-800/80" />

      {/* 3. AVAILABILITY & DELIVERY */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
          Availability & Delivery
        </h4>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly && setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-[#CCFF00] accent-[#CCFF00] focus:ring-0 cursor-pointer"
            />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
              In-Stock Only
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={expressOnly}
              onChange={(e) => setExpressOnly && setExpressOnly(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-[#CCFF00] accent-[#CCFF00] focus:ring-0 cursor-pointer"
            />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
              Flash Express Shipping
            </span>
          </label>
        </div>
      </div>

      {/* 4. BRANDS (if available) */}
      {brandsList.length > 0 && (
        <>
          <div className="h-px bg-neutral-100 dark:bg-neutral-800/80" />
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
              Brands
            </h4>
            <div className="max-h-36 overflow-y-auto flex flex-col gap-2 pr-1">
              {brandsList.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleToggleBrand(brand)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-[#CCFF00] accent-[#CCFF00] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 5. ACTIONS */}
      <div className="pt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleApplyClick}
          className="w-full py-2.5 rounded-xl bg-[#CCFF00] text-black font-bold text-sm hover:bg-[#b8e600] active:scale-[0.98] transition-all shadow-sm cursor-pointer border-none"
        >
          Apply Filters
        </button>
        {(onClear || onReset) && (
          <button
            type="button"
            onClick={handleClearClick}
            className="w-full py-2 rounded-xl text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 text-xs font-semibold transition-colors cursor-pointer border-none bg-transparent"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
