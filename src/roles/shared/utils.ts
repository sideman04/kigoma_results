import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | undefined): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateTime(value: string | undefined): string {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function capitalize(text: string): string {
  return text
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function scopeLabel(role: string, regionName?: string, councilName?: string, schoolName?: string): string {
  if (schoolName) return schoolName;
  if (councilName) return councilName;
  if (regionName) return regionName;
  return 'System-wide';
}
