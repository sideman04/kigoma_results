import * as React from 'react';
import { cn } from '../utils';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: string;
}

export function EmptyState({ title, description, action, icon = 'folder' }: EmptyStateProps) {
  return (
    <div className="empty flex flex-col items-center justify-center py-20 text-center">
      <span className="empty-icon text-neutral-300">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-neutral-500 max-w-xs">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
