/**
 * Reusable list view: search + filter toolbar, data table with sorting &
 * pagination, loading/empty states. Each list page configures its own columns,
 * row actions and data service.
 */

import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Pagination, Table, Thead, Tbody, Tr, Th, Td, EmptyState } from './ui/index';
import { Badge } from './ui/badge';
import type { PaginationParams, PaginatedResponse } from '../types';

type Row = Record<string, unknown>;

type Column<D extends Row> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: D) => ReactNode;
};

type ListViewProps<D extends Row> = {
  title: string;
  description?: string;
  columns: Column<D>[];
  fetch: (params: PaginationParams) => Promise<PaginatedResponse<D>>;
  rowKey: (row: D) => string | number;
  actions?: (row: D) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  toolbarLeft?: ReactNode;
  defaultPageSize?: number;
};

export function ListView<D extends Row>({
  title,
  description,
  columns,
  fetch,
  rowKey,
  actions,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no records matching your criteria.',
  emptyAction,
  toolbarLeft,
  defaultPageSize = 25,
}: ListViewProps<D>) {
  const [data, setData] = useState<D[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(defaultPageSize);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch({
        page,
        pageSize,
        search,
        sortBy,
        sortDirection: sortDir,
      });
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load records.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, sortBy, sortDir, fetch]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSort = useCallback((key: string) => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
    setPage(1);
  }, [sortBy]);

  return (
    <div className="list-page">
      {loading && (
        <div className="flex items-center justify-center py-20">
          <SkeletonText lines={3} />
        </div>
      )}
      {!loading && error && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
          <button
            onClick={load}
            className="mt-2 text-xs font-semibold text-green-700 hover:underline"
          >
            Try again
          </button>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="toolbar flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="toolbar-left flex items-center gap-3">
              {toolbarLeft}
              <div className="relative">
                <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search records…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="search w-64 rounded-md border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                />
              </div>
            </div>
          </div>

          {data.length === 0 ? (
            <EmptyState
              title={emptyTitle}
              description={emptyDescription}
              action={emptyAction}
              icon="folder"
            />
          ) : (
            <>
              <div className="table-wrap overflow-auto rounded-lg border border-neutral-200 bg-white">
                <Table>
                  <Thead>
                    <Tr>
                      {columns.map((col) => (
                        <Th key={col.key} sortable={col.sortable} onSortChange={() => col.sortable && handleSort(col.key)}>
                          {col.label}
                          {col.sortable && <SortIndicator active={sortBy === col.key} dir={sortDir} />}
                        </Th>
                      ))}
                      {actions && <Th className="w-[140px]" />}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((row) => (
                      <Tr key={rowKey(row)} className="hover:bg-neutral-50/50 transition-colors">
                        {columns.map((col) => (
                          <Td key={col.key}>
                            {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                          </Td>
                        ))}
                        {actions && (
                          <Td className="actions">
                            {actions(row)}
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

function SortIndicator({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active) return null;
  return (
    <span className="ml-1 text-xs text-neutral-400">
      {dir === 'asc' ? '▲' : '▼'}
    </span>
  );
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 rounded-md bg-neutral-200 animate-pulse" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  );
}
