import React, { useEffect, useState } from 'react';
import { SlidersHorizontal, RotateCcw, X, Check, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { categoryOrder } from '@/data/mockProducts';
import {
  type FilterCriteria,
  type DefaultBounds,
  countActiveFilters,
  extractUniqueBrands,
} from '@/lib/filterService';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterCriteria;
  bounds: DefaultBounds;
  allProducts: any[];
  onApplyFilters: (newFilters: FilterCriteria) => void;
  onResetFilters: () => void;
}

const DISCOUNT_OPTIONS = [
  { value: 0, label: 'All Discounts' },
  { value: 10, label: '10% or more' },
  { value: 20, label: '20% or more' },
  { value: 30, label: '30% or more' },
  { value: 40, label: '40% or more' },
  { value: 50, label: '50% or more' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'All Ratings' },
  { value: 4, label: '4★ & Above' },
  { value: 3, label: '3★ & Above' },
];

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  bounds,
  allProducts,
  onApplyFilters,
  onResetFilters,
}: FilterDrawerProps) {
  const [draft, setDraft] = useState<FilterCriteria>(filters);

  // Sync draft state with props when drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  const activeCount = countActiveFilters(draft, bounds);
  const availableBrands = extractUniqueBrands(allProducts);

  // Category toggle
  const handleToggleCategory = (category: string) => {
    setDraft((prev) => {
      const exists = prev.categories.some(
        (c) => c.toLowerCase() === category.toLowerCase()
      );
      const nextCategories = exists
        ? prev.categories.filter((c) => c.toLowerCase() !== category.toLowerCase())
        : [...prev.categories, category];
      return { ...prev, categories: nextCategories };
    });
  };

  // Brand toggle
  const handleToggleBrand = (brand: string) => {
    setDraft((prev) => {
      const exists = prev.brands.some((b) => b.toLowerCase() === brand.toLowerCase());
      const nextBrands = exists
        ? prev.brands.filter((b) => b.toLowerCase() !== brand.toLowerCase())
        : [...prev.brands, brand];
      return { ...prev, brands: nextBrands };
    });
  };

  const handleSelectAllCategories = () => {
    setDraft((prev) => ({ ...prev, categories: [] }));
  };

  // Price range slider change
  const handlePriceSliderChange = (values: number[]) => {
    if (values.length >= 2) {
      setDraft((prev) => ({
        ...prev,
        priceRange: [
          Math.max(bounds.minPrice, values[0]),
          Math.min(bounds.maxPrice, values[1]),
        ],
      }));
    }
  };

  // Min price numeric input change
  const handleMinPriceInputChange = (val: number) => {
    const validMin = Math.max(bounds.minPrice, Math.min(val, draft.priceRange[1]));
    setDraft((prev) => ({ ...prev, priceRange: [validMin, prev.priceRange[1]] }));
  };

  // Max price numeric input change
  const handleMaxPriceInputChange = (val: number) => {
    const validMax = Math.min(bounds.maxPrice, Math.max(val, draft.priceRange[0]));
    setDraft((prev) => ({ ...prev, priceRange: [prev.priceRange[0], validMax] }));
  };

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  const handleClearAll = () => {
    setDraft({
      categories: [],
      priceRange: [bounds.minPrice, bounds.maxPrice],
      brands: [],
      minRating: 0,
      minDiscount: 0,
      inStockOnly: false,
      expressDeliveryOnly: false,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="left"
        className="w-[min(90vw,440px)] sm:max-w-md bg-[#14171F] text-white p-0 flex flex-col h-full border-r border-[#222736] shadow-2xl z-50 font-['Space_Grotesk',sans-serif]"
      >
        {/* DRAWER HEADER */}
        <SheetHeader className="p-5 border-b border-[#222736] flex flex-row items-center justify-between space-y-0 bg-[#0F1115]">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-5 text-[#CCFF00]" />
              <SheetTitle className="text-lg font-black tracking-wider text-white uppercase">
                FILTERS
              </SheetTitle>
            </div>
            {activeCount > 0 ? (
              <span className="text-xs font-semibold text-[#CCFF00]">
                {activeCount} {activeCount === 1 ? 'filter' : 'filters'} applied
              </span>
            ) : (
              <span className="text-xs font-semibold text-neutral-400">
                No filters applied
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-black text-[#CCFF00] hover:text-white flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
            >
              <RotateCcw size={12} /> CLEAR ALL
            </button>
          </div>
        </SheetHeader>

        {/* DRAWER BODY (SCROLLABLE FILTER CONTENT) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 divide-y divide-[#222736] custom-filter-scrollbar bg-[#14171F]">
          {/* 1. CATEGORY FILTER */}
          <div className="space-y-3 pt-0">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              CATEGORY
            </h4>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {/* All Option */}
              <label
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#181C24] hover:bg-[#1E232F] cursor-pointer transition-colors border border-[#222736] group"
                onClick={handleSelectAllCategories}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-all ${
                      draft.categories.length === 0
                        ? 'bg-[#CCFF00] border-[#CCFF00] text-[#000000] shadow-xs'
                        : 'border-neutral-700 bg-[#0F1115] group-hover:border-[#CCFF00]'
                    }`}
                  >
                    {draft.categories.length === 0 && <Check size={14} strokeWidth={3.5} />}
                  </div>
                  <span className="text-xs font-bold text-white">
                    All Categories
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-neutral-400 bg-[#0F1115] px-2 py-0.5 rounded-md">
                  {allProducts.length}
                </span>
              </label>

              {/* Dynamic Categories */}
              {categoryOrder.map((category) => {
                const count = allProducts.filter(
                  (p) => (p.category || '').toLowerCase() === category.toLowerCase()
                ).length;
                const isChecked = draft.categories.some(
                  (c) => c.toLowerCase() === category.toLowerCase()
                );
                return (
                  <label
                    key={category}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#181C24] hover:bg-[#1E232F] cursor-pointer transition-colors border border-[#222736] group"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggleCategory(category)}
                        className="size-5 rounded-[5px] border-neutral-700 data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                      />
                      <span className="text-xs font-bold text-white">
                        {category}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-400 bg-[#0F1115] px-2 py-0.5 rounded-md">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. PRICE RANGE FILTER */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                PRICE RANGE
              </h4>
              <span className="text-xs font-bold text-[#CCFF00]">
                ₹{draft.priceRange[0].toLocaleString('en-IN')} – ₹{draft.priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>

            {/* DUAL RANGE SLIDER */}
            <div className="px-1 py-2">
              <Slider
                value={[draft.priceRange[0], draft.priceRange[1]]}
                min={bounds.minPrice}
                max={bounds.maxPrice}
                step={250}
                onValueChange={handlePriceSliderChange}
              />
            </div>

            {/* NUMERIC PRICE INPUTS */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Minimum (₹)
                </label>
                <input
                  type="number"
                  min={bounds.minPrice}
                  max={draft.priceRange[1]}
                  value={draft.priceRange[0]}
                  onChange={(e) => handleMinPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#181C24] border border-[#222736] rounded-xl text-xs font-bold text-white outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/30 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Maximum (₹)
                </label>
                <input
                  type="number"
                  min={draft.priceRange[0]}
                  max={bounds.maxPrice}
                  value={draft.priceRange[1]}
                  onChange={(e) => handleMaxPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#181C24] border border-[#222736] rounded-xl text-xs font-bold text-white outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. BRAND FILTER */}
          {availableBrands.length > 0 && (
            <div className="space-y-3 pt-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                BRAND
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {availableBrands.map((brand) => {
                  const isChecked = draft.brands.some(
                    (b) => b.toLowerCase() === brand.toLowerCase()
                  );
                  return (
                    <label
                      key={brand}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#181C24] hover:bg-[#1E232F] cursor-pointer transition-colors border border-[#222736] group"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleToggleBrand(brand)}
                          className="size-5 rounded-[5px] border-neutral-700 data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                        />
                        <span className="text-xs font-bold text-white">
                          {brand}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. CUSTOMER RATING FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              CUSTOMER RATING
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {RATING_OPTIONS.map((opt) => {
                const isSelected = draft.minRating === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDraft((prev) => ({ ...prev, minRating: opt.value }))}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#CCFF00] text-[#000000] border-[#CCFF00] font-black'
                        : 'bg-[#181C24] text-neutral-200 border-[#222736] hover:border-[#CCFF00] hover:bg-[#1E232F]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.value > 0 && <Star size={12} fill="currentColor" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. MINIMUM DISCOUNT FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              MINIMUM DISCOUNT
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {DISCOUNT_OPTIONS.map((opt) => {
                const isSelected = draft.minDiscount === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDraft((prev) => ({ ...prev, minDiscount: opt.value }))}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-[#CCFF00] text-[#000000] border-[#CCFF00] shadow-sm font-black'
                        : 'bg-[#181C24] text-neutral-200 border-[#222736] hover:border-[#CCFF00] hover:bg-[#1E232F]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} strokeWidth={3} className="text-[#000000]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. AVAILABILITY & DELIVERY FILTERS */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              AVAILABILITY & DELIVERY
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#181C24] hover:bg-[#1E232F] border border-[#222736] cursor-pointer transition-colors group">
                <Checkbox
                  checked={draft.inStockOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, inStockOnly: Boolean(checked) }))
                  }
                  className="size-5 rounded-[5px] border-neutral-700 data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-white">
                  In Stock Only
                </span>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#181C24] hover:bg-[#1E232F] border border-[#222736] cursor-pointer transition-colors group">
                <Checkbox
                  checked={draft.expressDeliveryOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressDeliveryOnly: Boolean(checked) }))
                  }
                  className="size-5 rounded-[5px] border-neutral-700 data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-white">
                  Flash Express Delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="p-5 border-t border-[#222736] bg-[#0F1115] sticky bottom-0 z-10">
          <button
            type="button"
            onClick={handleApply}
            className="w-full h-12 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-[0.98] text-[#000000] font-black text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 border-none"
          >
            <span>APPLY FILTERS</span>
            {activeCount > 0 && (
              <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#000000] text-[#CCFF00] text-[11px] font-black">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
