"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="p-4 border-t border-white/5 flex items-center justify-between">

      <span className="text-xs text-gray-400">
        Page {page} of {totalPages}
      </span>

      <div className="flex items-center gap-2">

        <button
          onClick={onPrevious}
          disabled={page <= 1}
          className="p-1.5 rounded-lg border border-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="p-1.5 rounded-lg border border-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}