/**
 * Shared status badge.
 */

import { Badge } from './ui';

export interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'default';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const map: Record<string, string> = {
    draft: 'neutral',
    submitted: 'blue',
    in_progress: 'blue',
    under_review: 'warning',
    returned_for_correction: 'danger',
    returned: 'danger',
    verified: 'green',
    approved: 'green',
    published: 'green',
    active: 'green',
    inactive: 'neutral',
    suspended: 'danger',
    not_started: 'neutral',
    partial: 'warning',
    success: 'green',
    failure: 'danger',
    completed: 'green',
    running: 'blue',
    failed: 'danger',
  };
  const variant = map[status.toLowerCase().replace(/ /g, '_')] ?? 'neutral';
  return <Badge variant={variant as any} size={size}>{status.replace(/_/g, ' ')}</Badge>;
}
