import React, { useEffect, useState } from "react";
import { SlidersHorizontal, RotateCcw, X, Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
        className="w-[min(90vw,440px)] sm:max-w-md bg-[#FFFFFF] text-[#000000] p-0 flex flex-col h-full border-r border-[#E5E5E5] shadow-2xl z-50 font-['Space_Grotesk',sans-serif]"
      >
        {/* DRAWER HEADER */}
        <SheetHeader className="p-5 border-b border-[#E5E5E5] flex flex-row items-center justify-between space-y-0 bg-[#FFFFFF]">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-5 text-[#000000]" />
              <SheetTitle className="text-lg font-black tracking-tight text-[#000000] uppercase">
                FILTERS
              </SheetTitle>
            </div>
            {activeCount > 0 ? (
              <span className="text-xs font-semibold text-[#6B6B6B]">
                {activeCount} {activeCount === 1 ? "filter" : "filters"} applied
              </span>
            ) : (
              <span className="text-xs font-semibold text-[#6B6B6B]">
                No filters applied
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-bold text-[#000000] hover:text-[#788e00] flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
            >
              <RotateCcw size={12} /> CLEAR ALL
            </button>
          </div>
        </SheetHeader>

        {/* DRAWER BODY (INDEPENDENTLY SCROLLABLE FILTER CONTENT) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 divide-y divide-[#E5E5E5] custom-filter-scrollbar">
          {/* 1. CATEGORY FILTER */}
          <div className="space-y-3 pt-0">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">
              CATEGORY
            </h4>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {/* All Option */}
              <label
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group"
                onClick={handleSelectAllCategories}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-all ${
                      draft.categories.length === 0
                        ? "bg-[#CCFF00] border-[#CCFF00] text-[#000000] shadow-2xs"
                        : "border-[#E5E5E5] bg-[#FFFFFF] group-hover:border-[#CCFF00]"
                    }`}
                  >
                    {draft.categories.length === 0 && <Check size={14} strokeWidth={3.5} />}
                  </div>
                  <span className="text-xs font-bold text-[#000000]">
                    All Categories
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#6B6B6B]">
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
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggleCategory(category)}
                        className="size-5 rounded-[5px] border-[#E5E5E5] data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                      />
                      <span className="text-xs font-bold text-[#000000]">
                        {category}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#6B6B6B]">
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
              <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">
                PRICE RANGE
              </h4>
              <span className="text-xs font-bold text-[#000000]">
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
              />
            </div>

            {/* NUMERIC PRICE INPUTS */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#6B6B6B] block mb-1">
                  Minimum (₹)
                </label>
                <input
                  type="number"
                  min={bounds.minPrice}
                  max={draft.maxPrice}
                  value={draft.minPrice}
                  onChange={(e) => handleMinPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl text-xs font-bold text-[#000000] outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/30 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-[#6B6B6B] block mb-1">
                  Maximum (₹)
                </label>
                <input
                  type="number"
                  min={draft.minPrice}
                  max={bounds.maxPrice}
                  value={draft.maxPrice}
                  onChange={(e) => handleMaxPriceInputChange(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl text-xs font-bold text-[#000000] outline-none focus:border-[#CCFF00] focus:ring-2 focus:ring-[#CCFF00]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 3. MINIMUM DISCOUNT FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">
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
                        ? "bg-[#CCFF00] text-[#000000] border-[#CCFF00] shadow-2xs"
                        : "bg-[#FFFFFF] text-[#000000] border-[#E5E5E5] hover:border-[#CCFF00] hover:bg-[#F7F7F7]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} strokeWidth={3} className="text-[#000000]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. AVAILABILITY FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">
              AVAILABILITY
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group">
                <Checkbox
                  checked={draft.inStockOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, inStockOnly: Boolean(checked) }))
                  }
                  className="size-5 rounded-[5px] border-[#E5E5E5] data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-[#000000]">
                  In Stock Only
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group">
                <Checkbox
                  checked={draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: Boolean(checked) }))
                  }
                  className="size-5 rounded-[5px] border-[#E5E5E5] data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-[#000000]">
                  Fast Express Delivery
                </span>
              </label>
            </div>
          </div>

          {/* 5. DELIVERY FILTER */}
          <div className="space-y-3 pt-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#000000]">
              DELIVERY
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group">
                <Checkbox
                  checked={draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: Boolean(checked) }))
                  }
                  className="size-5 rounded-[5px] border-[#E5E5E5] data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-[#000000]">
                  Fast Express Shipping
                </span>
              </label>
              <label className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F7F7] cursor-pointer transition-colors group">
                <Checkbox
                  checked={!draft.expressOnly}
                  onCheckedChange={(checked) =>
                    setDraft((prev) => ({ ...prev, expressOnly: !checked }))
                  }
                  className="size-5 rounded-[5px] border-[#E5E5E5] data-[state=checked]:bg-[#CCFF00] data-[state=checked]:text-[#000000] data-[state=checked]:border-[#CCFF00] group-hover:border-[#CCFF00]"
                />
                <span className="text-xs font-bold text-[#000000]">
                  Standard Delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* DRAWER FIXED / STICKY FOOTER WITH BLACK + NEON GREEN APPLY BUTTON */}
        <div className="p-5 border-t border-[#E5E5E5] bg-[#FFFFFF] sticky bottom-0 z-10">
          <button
            type="button"
            onClick={handleApply}
            className="w-full h-12 bg-[#000000] hover:bg-[#111111] border border-transparent hover:border-[#CCFF00] active:scale-[0.98] text-[#CCFF00] font-black text-sm uppercase tracking-wider rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>APPLY FILTERS</span>
            {activeCount > 0 && (
              <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-[#CCFF00] text-[#000000] text-[11px] font-black">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
