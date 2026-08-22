import React, { useEffect, useState } from "react";
import { SlidersHorizontal, RotateCcw, X, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryOrder, type Product, type ProductCategory } from "@/data/mockProducts";
import {
  type FilterState,
  type DefaultBounds,
  countActiveFilters,
} from "@/lib/productFilterEngine";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  bounds: DefaultBounds;
  allProducts: Product[];
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
}

const DISCOUNT_OPTIONS = [
  { value: 0, label: "All Discounts" },
  { value: 10, label: "10% or more" },
  { value: 20, label: "20% or more" },
  { value: 30, label: "30% or more" },
  { value: 40, label: "40% or more" },
  { value: 50, label: "50% or more" },
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
  const [draft, setDraft] = useState<FilterState>(filters);

  // Sync draft state with props when drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  const activeCount = countActiveFilters(draft, bounds);

  // Category toggle
  const handleToggleCategory = (category: ProductCategory) => {
    setDraft((prev) => {
      const exists = prev.categories.includes(category);
      const nextCategories = exists
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: nextCategories };
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
        minPrice: Math.max(bounds.minPrice, values[0]),
        maxPrice: Math.min(bounds.maxPrice, values[1]),
      }));
    }
  };

  // Min price numeric input change
  const handleMinPriceInputChange = (val: number) => {
    const validMin = Math.max(bounds.minPrice, Math.min(val, draft.maxPrice));
    setDraft((prev) => ({ ...prev, minPrice: validMin }));
  };

  // Max price numeric input change
  const handleMaxPriceInputChange = (val: number) => {
    const validMax = Math.min(bounds.maxPrice, Math.max(val, draft.minPrice));
    setDraft((prev) => ({ ...prev, maxPrice: validMax }));
  };

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  const handleClearAll = () => {
    setDraft({
      categories: [],
      minPrice: bounds.minPrice,
      maxPrice: bounds.maxPrice,
      minDiscount: 0,
      inStockOnly: false,
      expressOnly: false,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-md bg-white dark:bg-[#12151B] text-black dark:text-white p-0 flex flex-col h-full border-r border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 font-['Space_Grotesk',sans-serif]"
      >
        {/* DRAWER HEADER */}
        <SheetHeader className="p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-5 text-[#0F1115] dark:text-[#CCFF00]" />
              <SheetTitle className="text-lg font-black tracking-tight text-neutral-900 dark:text-white uppercase">
                FILTERS
              </SheetTitle>
            </div>
            {activeCount > 0 ? (
              <span className="text-xs font-semibold text-neutral-500">
                {activeCount} {activeCount === 1 ? "filter" : "filters"} applied
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
              className="text-xs font-bold text-[#0F1115] dark:text-white hover:text-[#788e00] dark:hover:text-[#CCFF00] flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        </SheetHeader>

        {/* DRAWER BODY (SCROLLABLE SECTIONS) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {/* 1. CATEGORY FILTER */}
          <div className="space-y-3 pt-0">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
              CATEGORY
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {/* All Option */}
              <label
                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                onClick={handleSelectAllCategories}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                      draft.categories.length === 0
                        ? "bg-[#CCFF00] border-[#CCFF00] text-[#0F1115]"
                        : "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-transparent"
                    }`}
                  >
                    {draft.categories.length === 0 && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    All Categories
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                  {allProducts.length}
                </span>
              </label>

              {/* Dynamic Categories */}
              {categoryOrder.map((category) => {
                const count = allProducts.filter((p) => p.category === category).length;
                const isChecked = draft.categories.includes(category);
                return (
                  <label
                    key={category}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggleCategory(category)}
                        className="data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#0F1115] data-[state=checked]:border-[#CCFF00] border-neutral-300 dark:border-neutral-700 hover:border-[#CCFF00]"
                      />
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white">
                        {category}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
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
              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                PRICE RANGE
              </h4>
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                ₹{draft.minPrice.toLocaleString("en-IN")} – ₹{draft.maxPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* DUAL RANGE SLIDER */}
            <div className="px-1 py-2">
              <Slider
                value={[draft.minPrice, draft.maxPrice]}
                min={bounds.minPrice}
                max={bounds.maxPrice}
                step={250}
                onValueChange={handlePriceSliderChange}
                className="accent-[#CCFF00]"
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
                  max={draft.maxPrice}
                  value={draft.minPrice}
                  onChange={(e) => handleMinPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-[#181C24] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-900 dark:text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">
                  Maximum (₹)
                </label>
                <input
                  type="number"
                  min={draft.minPrice}
                  max={bounds.maxPrice}
                  value={draft.maxPrice}
                  onChange={(e) => handleMaxPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-[#181C24] border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-900 dark:text-white outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>
          </div>

          {/* 3. MINIMUM DISCOUNT FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
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
                        ? "bg-[#0F1115] text-[#CCFF00] border-[#CCFF00] shadow-sm"
                        : "bg-neutral-50 dark:bg-[#181C24] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-[#CCFF00]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} className="text-[#CCFF00]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. AVAILABILITY FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
              AVAILABILITY
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={draft.inStockOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, inStockOnly: Boolean(checked) }))
                  }
                  className="data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#0F1115] data-[state=checked]:border-[#CCFF00] border-neutral-300 dark:border-neutral-700 hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  In Stock Only
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: Boolean(checked) }))
                  }
                  className="data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#0F1115] data-[state=checked]:border-[#CCFF00] border-neutral-300 dark:border-neutral-700 hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Fast Express Delivery
                </span>
              </label>
            </div>
          </div>

          {/* 5. DELIVERY FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-900 dark:text-white">
              DELIVERY
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: Boolean(checked) }))
                  }
                  className="data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#0F1115] data-[state=checked]:border-[#CCFF00] border-neutral-300 dark:border-neutral-700 hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Fast Express Shipping
                </span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors">
                <Checkbox
                  checked={!draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: !checked }))
                  }
                  className="data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#0F1115] data-[state=checked]:border-[#CCFF00] border-neutral-300 dark:border-neutral-700 hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Standard Delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="p-5 border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#12151B] flex items-center gap-3">
          <button
            type="button"
            onClick={handleApply}
            className="w-full py-3.5 px-4 bg-[#CCFF00] hover:bg-[#b8e600] active:scale-[0.98] text-[#0F1115] font-black text-sm uppercase tracking-wider rounded-2xl shadow-sm transition-all cursor-pointer border-none text-center"
          >
            APPLY FILTERS
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
