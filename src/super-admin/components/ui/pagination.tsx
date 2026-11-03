import * as React from 'react';
import { cn } from '../utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const go = (delta: number) => {
    const next = Math.max(1, Math.min(totalPages, page + delta));
    if (next !== page) onPageChange(next);
  };

  return (
    <nav className={cn('flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 text-sm', className)}>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(-1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => go(1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-neutral-500">
          {from} – {to} of {total}
        </span>
        <span className="text-neutral-500">·</span>
        <span className="text-neutral-500">
          Page {page} of {totalPages}
        </span>
      </div>
    </nav>
  );
}
