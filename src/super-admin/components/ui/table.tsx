import * as React from 'react';
import { cn } from '../utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table className={cn('table w-full text-sm', className)} {...props} />
  );
}

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export function Thead({ className, ...props }: TheadProps) {
  return <thead className={cn('', className)} {...props} />;
}

export interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export function Tbody({ className, ...props }: TbodyProps) {
  return <tbody className={cn('', className)} {...props} />;
}

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export function Tr({ className, ...props }: TrProps) {
  return <tr className={cn('', className)} {...props} />;
}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  onSortChange?: () => void;
}
export function Th({ className, sortable, onSortChange, children, ...props }: ThProps) {
  return (
    <th
      className={cn(
        'th px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-50 border-b border-neutral-200',
        sortable && 'cursor-pointer select-none hover:bg-neutral-100',
        className
      )}
      onClick={onSortChange}
      {...props}
    >
      {children}
    </th>
  );
}

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export function Td({ className, ...props }: TdProps) {
  return (
    <td className={cn('td px-4 py-4 border-b border-neutral-100 text-neutral-900 align-middle', className)} {...props} />
  );
}
