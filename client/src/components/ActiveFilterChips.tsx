import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { ActiveChip } from '@/lib/filterService';

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
    <div className="flex flex-wrap items-center gap-2 mb-5 pb-3 border-b border-[#E5E5E5] dark:border-neutral-800">
      <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mr-1">
        Active Filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#CCFF00] text-[#000000] border border-[#000000]/10 shadow-2xs transition-all hover:scale-105"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemoveChip(chip)}
            aria-label={`Remove filter ${chip.label}`}
            className="p-0.5 rounded-full hover:bg-black/10 text-[#000000] transition-colors cursor-pointer border-none bg-transparent"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs font-bold text-[#000000] dark:text-white hover:text-[#788e00] dark:hover:text-[#CCFF00] underline underline-offset-2 ml-2 transition-colors cursor-pointer border-none bg-transparent"
      >
        <RotateCcw size={12} />
        Clear All
      </button>
    </div>
  );
}
