import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface PaginationProps {
  total: number;
  limit: number;
  start: number;
  onPageChange: (page: number) => void; // 1-based page index
}

export default function Pagination({ total, limit, start, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(totalPages, Math.floor(start / limit) + 1);

  const goPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const goNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page"
        onClick={goPrev}
        disabled={currentPage === 1}
        className="p-2 rounded-full border border-text/10 text-text/80 hover:bg-text/10 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <ul className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const page = idx + 1;
          const isActive = page === currentPage;
          return (
            <li key={page}>
              <button
                aria-label={`Go to page ${page}`}
                onClick={() => onPageChange(page)}
                className={`h-2.5 w-2.5 rounded-full ${
                  isActive ? "bg-primary" : "bg-text/20 hover:bg-text/40"
                }`}
              />
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        aria-label="Next page"
        onClick={goNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full border border-text/10 text-text/80 hover:bg-text/10 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
} 