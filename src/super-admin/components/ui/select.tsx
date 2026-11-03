import * as React from 'react';
import { cn } from '../utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  placeholder?: string;
}

export function Select({
  className,
  label,
  error,
  helper,
  placeholder,
  id,
  children,
  ...props
}: SelectProps) {
  const selectId = id || React.useId();
  return (
    <div className="field w-full">
      {label && (
        <label htmlFor={selectId} className="field-label text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'select-block w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed appearance-none',
          error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {error && <p className="field-error text-sm text-red-600">{error}</p>}
      {helper && !error && <p className="helper text-sm text-neutral-500">{helper}</p>}
    </div>
  );
}

export function Option({
  value,
  children,
  disabled,
}: {
  value: string | number;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return <option value={String(value)} disabled={disabled}>{children}</option>;
}
