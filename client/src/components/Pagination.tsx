/**
 * Flash Pagination Component — Obsidian glass & Flash Volt active indicator pills,
 * previous/next controls, page number buttons, and smooth page change handlers.
 */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Product Catalog Pagination"
      className="flex items-center justify-center gap-2 pt-8 pb-4 select-none"
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border border-neutral-200 bg-white text-[#0F1115] hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, idx) => {
          if (typeof page === "string") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-9 h-9 flex items-center justify-center text-xs font-bold text-neutral-400 select-none"
              >
                •••
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              style={
                isActive
                  ? { backgroundColor: "#0F1115", color: "#CCFF00" }
                  : undefined
              }
              className={`w-9 h-9 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer flex items-center justify-center ${
                isActive
                  ? "bg-[#0F1115] text-[#CCFF00] border border-[#0F1115] shadow-md scale-105"
                  : "bg-white text-[#0F1115] border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border border-neutral-200 bg-white text-[#0F1115] hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        aria-label="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
