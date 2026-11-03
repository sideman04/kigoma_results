import * as React from 'react';
import { cn } from '../utils';

type Variant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: 'sm' | 'default';
}

const VARIANTS: Record<string, string> = {
  default: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
  success: 'bg-green-50 text-green-800 border border-green-100',
  warning: 'bg-amber-50 text-amber-800 border border-amber-100',
  danger: 'bg-red-50 text-red-800 border border-red-100',
  info: 'bg-blue-50 text-blue-800 border border-blue-100',
  neutral: 'bg-neutral-50 text-neutral-600 border border-neutral-200',
};

export function Badge({ className, variant = 'default', size = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold uppercase tracking-tighter',
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
