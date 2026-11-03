import * as React from 'react';
import { cn } from '../utils';
import { X } from 'lucide-react';
import { Button } from './button';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  children?: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  size = 'md',
  children,
}: DrawerProps) {
  if (!open) return null;

  const sizes: Record<string, string> = {
    sm: 'w-[400px]',
    md: 'w-[520px]',
    lg: 'w-[720px]',
    full: 'w-full',
  };

  return (
    <div
      className="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <div
        className="overlay fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="drawer fixed top-0 right-0 z-50 h-full flex flex-col bg-white shadow-2xl">
        <div className="drawer-header flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          {title && (
            <h2 id="drawer-title" className="text-lg font-semibold text-neutral-900">
              {title}
            </h2>
          )}
          <button
            onClick={() => onOpenChange(false)}
            className="icon-button rounded hover:bg-neutral-100 text-neutral-500"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="drawer-content flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
