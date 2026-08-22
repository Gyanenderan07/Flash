import React from "react";
import { X, RotateCcw } from "lucide-react";
import type { ActiveChip } from "@/lib/productFilterEngine";

interface ActiveFilterChipsProps {
  chips: ActiveChip[];
  onRemoveChip: (chip: ActiveChip) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({
  chips,
  onRemoveChip,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-1">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0F1115] text-white border border-[#CCFF00]/40 shadow-xs transition-all hover:border-[#CCFF00]"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemoveChip(chip)}
            aria-label={`Remove filter ${chip.label}`}
            className="p-0.5 rounded-full hover:bg-white/20 text-[#CCFF00] transition-colors cursor-pointer"
          >
            <X size={13} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white underline underline-offset-2 ml-2 transition-colors cursor-pointer"
      >
        <RotateCcw size={12} />
        Clear All
      </button>
    </div>
  );
}
