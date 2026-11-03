/**
 * Shared statistic card for role dashboards.
 */

import { cn } from '../utils';
import { Badge } from './ui';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  note?: string;
  tone?: 'green' | 'neutral' | 'warning' | 'danger' | 'blue';
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export function StatCard({ title, value, note, tone = 'neutral', icon, badge }: StatCardProps) {
  const toneClasses: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border border-green-100',
    neutral: 'bg-neutral-50 text-neutral-900 border border-neutral-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-red-50 text-red-700 border border-red-100',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
  };
  return (
    <div className="rounded-lg border p-4 bg-white">
      <div className="flex items-center gap-3 mb-3">
        {icon && <span className="rounded p-1.5">{icon}</span>}
        {badge && <span className={cn('inline-block', toneClasses[tone])}>{badge}</span>}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-0.5">{title}</p>
      <p className="text-lg font-semibold text-neutral-900 leading-none">{value}</p>
      {note && <p className="text-[10px] text-neutral-500 mt-0.5">{note}</p>}
    </div>
  );
}
