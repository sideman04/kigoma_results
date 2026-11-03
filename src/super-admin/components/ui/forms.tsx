import * as React from 'react';
import { cn } from '../utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-semibold text-neutral-700',
        required && 'after:content-["*"] after:ml-0.5 after:text-red-600',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const checkboxId = id || React.useId();
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'checkbox h-4 w-4 rounded border border-neutral-300 text-green-700 bg-neutral-50 focus:ring-0 focus-visible:ring-2 focus-visible:ring-green-700 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="text-sm text-neutral-600 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch({ className, label, id, ...props }: SwitchProps) {
  const switchId = id || React.useId();
  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-block w-9 select-none focus:outline-none">
        <input
          id={switchId}
          type="checkbox"
          className={cn(
            'switch-checkbox sr-only peer',
            className
          )}
          {...props}
        />
        <div
          className="toggle-track inline-block h-5 rounded-full bg-neutral-300 peer peer-focus:ring-2 peer-focus:ring-green-700 peer-focus:outline-none transition-colors duration-200"
          aria-hidden="true"
        />
        <div
          className="toggle-thumb absolute left-0 top-[2px] h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200 peer-checked:translate-x-5 peer-checked:bg-green-700"
          aria-hidden="true"
        />
      </div>
      {label && <label htmlFor={switchId} className="text-sm text-neutral-600 cursor-pointer select-none">{label}</label>}
    </div>
  );
}
