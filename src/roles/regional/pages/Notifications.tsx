/**
 * Regional Administrator — Notifications.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState, Select, Option, StatCard } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { notificationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { Bell, Clock, Shield, FileText, ArrowRight } from 'lucide-react';

export default function Notifications() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    notificationService.list().then((data: any) => {
      setNotifications(data);
      setLoading(false);
    }).catch((err: any) => toast({ title: 'Failed to load notifications', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter((n) => !n.read) : notifications.filter((n) => n.read);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Notifications"
        description="Regional alerts — council submissions, examination deadlines and verification updates."
        action={<Button variant="ghost" size="sm">Mark all as read</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Total" value={notifications.length} />
        <StatCard title="Unread" value={unreadCount} tone="warning" />
        <StatCard title="Read" value={notifications.filter((n) => n.read).length} tone="green" />
      </div>

      <Select value={filter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as any)} className="w-64 mb-4">
        <Option value="all">All</Option>
        <Option value="unread">Unread</Option>
        <Option value="read">Read</Option>
      </Select>

      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No notifications" icon="Bell" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead><Tr><Th>Title</Th><Th>Category</Th><Th className="w-32">Status</Th><Th className="w-40">When</Th><Th className="w-48">Actions</Th></Tr></Thead>
                <Tbody>
                  {filtered.map((n) => (
                    <Tr key={n.id} className={!n.read ? 'bg-green-25 hover:bg-neutral-50/50' : 'hover:bg-neutral-50/50'}>
                      <Td className={!n.read ? 'font-semibold text-neutral-900' : 'text-neutral-600'}>{n.title}</Td>
                      <td className="text-sm text-neutral-600 capitalize">{n.category}</td>
                      <Td><Badge variant={!n.read ? 'warning' : 'neutral'} size="sm">{!n.read ? 'Unread' : 'Read'}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{new Date(n.createdAt).toLocaleString()}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => {}}>{n.read ? 'Unread' : 'Read'}</Button>
                        {n.link && <Button variant="ghost" size="sm" onClick={() => navigateTo(n.link)}><ArrowRightIcon size={14} /> Go</Button>}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  function navigateTo(path: string) { window.location.href = path; }
}

function capitalize(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }
function ArrowRightIcon({ size }: { size?: number }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`h-${size ?? 14} w-${size ?? 14}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>; }
