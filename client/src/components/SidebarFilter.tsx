import React, { useState } from 'react';

export const matchesPrice = (productPrice: number, range: [number, number]) => {
  const price = Number(productPrice) || 0;
  const [min, max] = range;
  return price >= (min ?? 0) && price <= (max ?? Infinity);
};

export interface FilterProps {
  priceRange: [number, number];
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
  availableBrands?: string[];
  allBrands?: string[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  onReset?: () => void;
}

export default function SidebarFilter({
  priceRange,
  setPriceRange,
  onPriceChange,
  selectedDiscount = 0,
  setSelectedDiscount,
  inStockOnly = false,
  setInStockOnly,
  expressOnly = false,
  setExpressOnly,
  selectedBrands = [],
  setSelectedBrands,
  onToggleBrand,
  availableBrands,
  allBrands,
  selectedCategory,
  onSelectCategory,
  onReset,
}: FilterProps) {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isDiscountOpen, setIsDiscountOpen] = useState(true);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(true);
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);

  const brandsList = availableBrands || allBrands || [
    'Flash',
    'Boult',
    'Philips',
    'Zebronics',
    'Nexora',
    'Zapster',
    'Lumicore',
  ];

  const handlePriceChange = (newMax: number) => {
    const range: [number, number] = [priceRange[0], newMax];
    if (setPriceRange) setPriceRange(range);
    if (onPriceChange) onPriceChange(range);
  };

  const toggleBrand = (brand: string) => {
    if (onToggleBrand) {
      onToggleBrand(brand);
    } else if (setSelectedBrands) {
      if (selectedBrands.includes(brand)) {
        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
      } else {
        setSelectedBrands([...selectedBrands, brand]);
      }
    }
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-white dark:bg-[#12151B] border border-neutral-200/80 dark:border-neutral-800 rounded-3xl p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
          Filters
        </h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-neutral-500 hover:text-[#CCFF00] dark:hover:text-[#CCFF00] transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 1. Price Range Section */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 cursor-pointer"
        >
          <span>Price Range</span>
          <span className="text-base leading-none">{isPriceOpen ? '−' : '+'}</span>
        </button>

        {isPriceOpen && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-white">
              <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
              <span>
                ₹{priceRange[1] >= 100000 ? '1,00,000+' : priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100000}
              step={500}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-[#CCFF00] cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg"
            />
          </div>
        )}
      </div>

      {/* 2. Minimum Discount Section */}
      {setSelectedDiscount && (
        <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <button
            type="button"
            onClick={() => setIsDiscountOpen(!isDiscountOpen)}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 cursor-pointer"
          >
            <span>Discount</span>
            <span className="text-base leading-none">{isDiscountOpen ? '−' : '+'}</span>
          </button>

          {isDiscountOpen && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[0, 10, 30, 50].map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscount(disc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDiscount === disc
                      ? 'bg-[#CCFF00] text-black shadow-[0_0_10px_rgba(204,255,0,0.2)]'
                      : 'bg-neutral-100 dark:bg-[#1A1D24] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-[#222731]'
                  }`}
                >
                  {disc === 0 ? 'All' : `${disc}% or more`}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Availability & Speed */}
      {(setInStockOnly || setExpressOnly) && (
        <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <button
            type="button"
            onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 cursor-pointer"
          >
            <span>Availability & Speed</span>
            <span className="text-base leading-none">{isDeliveryOpen ? '−' : '+'}</span>
          </button>

          {isDeliveryOpen && (
            <div className="space-y-2.5 pt-1">
              {setInStockOnly && (
                <label className="flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#CCFF00] cursor-pointer"
                  />
                  <span>In-Stock Only</span>
                </label>
              )}
              {setExpressOnly && (
                <label className="flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={expressOnly}
                    onChange={(e) => setExpressOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#CCFF00] cursor-pointer"
                  />
                  <span className="flex items-center gap-1.5">
                    Flash Express Delivery
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#CCFF00]/20 text-[#CCFF00] uppercase">
                      Fast
                    </span>
                  </span>
                </label>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Brands Section */}
      {brandsList.length > 0 && (
        <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <button
            type="button"
            onClick={() => setIsBrandsOpen(!isBrandsOpen)}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 cursor-pointer"
          >
            <span>Brands</span>
            <span className="text-base leading-none">{isBrandsOpen ? '−' : '+'}</span>
          </button>

          {isBrandsOpen && (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 pt-1">
              {brandsList.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#CCFF00] cursor-pointer"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
