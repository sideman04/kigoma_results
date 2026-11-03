import * as React from 'react';
import { cn } from '../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({ className, label, error, helper, id, ...props }: InputProps) {
  const inputId = id || React.useId();
  return (
    <div className="field w-full">
      {label && (
        <label htmlFor={inputId} className="field-label text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'input-block w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
          error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
          className
        )}
        {...props}
      />
      {error && <p className="field-error text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="helper text-sm text-neutral-500">{helper}</p>}
    </div>
  );
}
