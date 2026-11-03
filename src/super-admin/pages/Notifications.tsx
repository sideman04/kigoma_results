/**
 * Notifications — read/unread status, categories, filters, related links.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Select, Option,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { notificationService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Bell, Clock, Shield, FileText, ArrowRight } from 'lucide-react';
import type { Notification } from '../types';

export default function Notifications() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [category, setCategory] = useState('all');

  const categories = [...new Set(notifications.map((n) => n.category))];

  useEffect(() => {
    notificationService.list().then((data) => {
      setNotifications(data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load notifications', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  const filtered = notifications.filter((n) => {
    if (filter === 'unread' && n.read) return false;
    if (filter === 'read' && !n.read) return false;
    if (category !== 'all' && n.category !== category) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function markRead(id: string) {
    try {
      await notificationService.markRead(id);
      setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
      toast({ title: 'Marked as read', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    }
  }

  const categoryLabel: Record<string, string> = {
    submission: 'Submission', verification: 'Verification', approval: 'Approval',
    publication: 'Publication', security: 'Security', system: 'System', announcement: 'Announcement',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="System announcements and alerts for the Super Administrator."
        action={<Button variant="ghost" size="sm">Mark all as read</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={notifications.length} label="Total" />
        <Kpi value={unreadCount} label="Unread" tone="warning" />
        <Kpi value={notifications.filter((n) => n.read).length} label="Read" tone="green" />
        <Kpi value={categories.length} label="Categories" />
      </div>

      <div className="flex gap-3 mb-4">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="w-64">
          <Option value="all">All</Option>
          <Option value="unread">Unread</Option>
          <Option value="read">Read</Option>
        </Select>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="w-72">
          <Option value="all">All categories</Option>
          {categories.map((c) => <Option key={c} value={c}>{categoryLabel[c]}</Option>)}
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No notifications" description="You're all caught up." icon="Bell" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead><Tr><Th>Title</Th><th>Category</th><Th className="w-32">Status</Th><Th className="w-40">When</Th><Th className="w-48">Actions</Th></Tr></Thead>
                <Tbody>
                  {filtered.map((n) => (
                    <Tr key={n.id} className={cn('hover:bg-neutral-50/50', !n.read ? 'bg-green-25' : '')} onClick={() => n.link && markRead(n.id)} style={{ cursor: n.link ? 'pointer' : 'default' }}>
                      <Td className={!n.read ? 'font-semibold text-neutral-900' : 'text-neutral-600'}>{n.title}</Td>
                      <td className="text-sm text-neutral-600 capitalize">{categoryLabel[n.category]}</td>
                      <Td><Badge variant={!n.read ? 'warning' : 'neutral'} size="sm">{!n.read ? 'Unread' : 'Read'}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{new Date(n.createdAt).toLocaleString()}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); markRead(n.id); }}>
                          {n.read ? 'Unread' : 'Read'}
                        </Button>
                        {n.link && (
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigate(n.link || '/super-admin/notifications'); }}>Go</Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 rounded-lg border border-neutral-100 bg-neutral-50 p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-green-700" />
          <p className="text-sm text-neutral-600">Notifications are a frontend demonstration. The PHP backend drives real alerting and persistence.</p>
        </div>
      </div>
    </div>
  );
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'warning' }) {
  const color = tone === 'green' ? 'text-green-700' : tone === 'warning' ? 'text-amber-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
