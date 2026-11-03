/**
 * Audit logs — read-only system activity trail.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Input, Select, Option,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { auditService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { FileText, Clock, User, Filter } from 'lucide-react';
import type { AuditLog } from '../types';

export default function AuditLogs() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    auditService.list({ pageSize: 100 }).then((res) => {
      setLogs(res.data as AuditLog[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load audit logs', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  const filtered = logs.filter((l) => !search || l.userName.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.module.toLowerCase().includes(search.toLowerCase()));

  const resultVariant = (result: string) => result === 'success' ? 'success' : 'danger';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Read-only audit trail of system activity, actions and organisational scope."
        action={<Button variant="ghost" size="sm"><Filter className="mr-1 h-4 w-4" /> Filter</Button>}
      />

      <Input placeholder="Search user, action or module…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md mb-4" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={logs.length} label="Total events" />
        <Kpi value={logs.filter((l) => l.result === 'success').length} label="Successful" tone="green" />
        <Kpi value={logs.filter((l) => l.result === 'failure').length} label="Failed" tone="danger" />
        <Kpi value={new Set(logs.map((l) => l.userName)).size} label="Users" />
      </div>

      <Card>
        <CardHeader><CardTitle>Audit trail</CardTitle>
          <p className="text-[10px] text-neutral-500">Audit records are read-only in the standard interface.</p>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No audit records" icon="FileText" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr><Th>User</Th><th>Role</th><Th className="w-40">Action</Th><Th className="w-40">Module</Th><Th className="w-40">Record</Th><Th className="w-40">When</Th><Th className="w-32">Scope</Th><Th className="w-32">Result</Th><Th className="w-32">IP address</Th></Tr>
                </Thead>
                <Tbody>
                  {filtered.map((l) => (
                    <Tr key={l.id} className="hover:bg-neutral-50/50">
                      <Td>{l.userName}</Td>
                      <td className="text-sm text-neutral-600 capitalize">{l.role}</td>
                      <Td className="text-sm text-neutral-600">{l.action}</Td>
                      <Td className="text-sm text-neutral-600">{l.module}</Td>
                      <Td className="font-mono text-xs text-neutral-600">{l.recordReference || '—'}</Td>
                      <Td className="text-sm text-neutral-600">{new Date(l.timestamp).toLocaleString()}</Td>
                      <Td className="text-sm text-neutral-600">System-wide</Td>
                      <Td><Badge variant={resultVariant(l.result)} size="sm">{l.result}</Badge></Td>
                      <Td className="font-mono text-xs text-neutral-600">{l.ipAddress || '—'}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-[10px] text-neutral-500">Audit logging is enforced by the PHP backend. Frontend display is read-only.</p>
    </div>
  );
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'danger' }) {
  const color = tone === 'green' ? 'text-green-700' : tone === 'danger' ? 'text-red-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}
