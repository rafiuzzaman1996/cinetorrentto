"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  // Generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < totalPages)
      ) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <div className="flex items-center gap-1">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
          <ChevronLeft size={16} />
        </Button>

        {/* Page numbers */}
        {getPages().map((page, idx) =>
          typeof page === "number" ? (
            <div
              key={idx}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                page === currentPage
                  ? "bg-orange-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </div>
          ) : (
            <span key={idx} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {/* Page X of Y */}
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
