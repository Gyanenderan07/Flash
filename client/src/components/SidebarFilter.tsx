import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { categoryOrder, ProductCategory } from '@/data/mockProducts';

export const matchesPrice = (productPrice: number, range: [number, number]) => {
  const price = Number(productPrice) || 0;
  const [min, max] = range;
  return price >= (min ?? 0) && price <= (max ?? Infinity);
};

interface SidebarFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedBrands?: string[];
  onToggleBrand?: (brand: string) => void;
  allBrands?: string[];
  onReset?: () => void;
}

export default function SidebarFilter({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedBrands = [],
  onToggleBrand,
  allBrands = [],
  onReset,
}: SidebarFilterProps) {
  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-[#0F1115] border border-neutral-200 dark:border-white/10 rounded-3xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-[#0F1115] dark:text-white">
          <Filter size={16} className="text-[#CCFF00]" />
          <span>Filter Catalog</span>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-neutral-400 hover:text-[#0F1115] dark:hover:text-white flex items-center gap-1 font-semibold"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Categories</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('All')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#0F1115] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#0F1115]'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
            }`}
          >
            All Categories
          </button>
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F1115] text-[#CCFF00] dark:bg-[#CCFF00] dark:text-[#0F1115]'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter - Starts from ₹0 */}
      <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Price Range</h4>
          <span className="text-xs font-black text-[#0F1115] dark:text-white">
            ₹{priceRange[0]} - ₹{priceRange[1] >= 100000 ? '1,00,000+' : priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-[#CCFF00] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-bold text-neutral-400">
          <span>₹0</span>
          <span>₹50,000</span>
          <span>₹1,00,000+</span>
        </div>
      </div>

      {/* Brands Filter */}
      {allBrands.length > 0 && onToggleBrand && (
        <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-white/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Brands</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {allBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                  className="rounded border-neutral-300 text-[#0F1115] focus:ring-[#CCFF00]"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
