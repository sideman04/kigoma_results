/**
 * Security monitoring — recent logins, failed attempts, suspended accounts.
 * Demo events clearly labelled.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { securityService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Activity, Clock, AlertCircle, User, Shield } from 'lucide-react';
import type { SecurityEvent } from '../types';

export default function Security() {
  const { toast } = useToast();
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    securityService.list().then((data) => { setEvents(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load security events', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  const severityVariant = (s: string) => s === 'high' ? 'danger' : s === 'medium' ? 'warning' : 'neutral';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Monitoring"
        description="Recent logins, failed attempts and account status. Demo events are clearly labelled."
        action={<Button variant="ghost" size="sm"><Shield className="mr-1 h-4 w-4" /> View all</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={events.length} label="Security events" />
        <Kpi value={events.filter((e) => e.type === 'failed_login').length} label="Failed logins" tone="danger" />
        <Kpi value={events.filter((e) => e.severity === 'high').length} label="High severity" tone="danger" />
        <Kpi value={events.filter((e) => e.type === 'suspension').length} label="Suspensions" tone="warning" />
      </div>

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">Demo environment</p>
            <p className="text-sm text-neutral-600">Security events shown here are simulated for demonstration. Real security monitoring is enforced by the PHP backend and never fabricated in production.</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Security events</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : events.length === 0 ? (
            <EmptyState title="No security events" icon="Shield" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr><Th>Type</Th><th>User</th><Th className="w-40">Description</Th><Th className="w-40">IP address</Th><Th className="w-40">When</Th><Th className="w-32">Severity</Th></Tr>
                </Thead>
                <Tbody>
                  {events.map((e) => (
                    <Tr key={e.id} className="hover:bg-neutral-50/50">
                      <Td className="text-sm text-neutral-600 capitalize">{e.type.replace('_', ' ')}</Td>
                      <td className="text-sm text-neutral-600">{e.userName || '—'}</td>
                      <Td className="text-sm text-neutral-600">{e.description}</Td>
                      <Td className="font-mono text-xs text-neutral-600">{e.ipAddress || '—'}</Td>
                      <Td className="text-sm text-neutral-600">{new Date(e.timestamp).toLocaleString()}</Td>
                      <Td><Badge variant={severityVariant(e.severity)} size="sm">{e.severity}</Badge></Td>
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
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'warning' | 'danger' }) {
  const color = tone === 'green' ? 'text-green-700' : tone === 'warning' ? 'text-amber-700' : tone === 'danger' ? 'text-red-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}
