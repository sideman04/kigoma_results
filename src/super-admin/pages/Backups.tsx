/**
 * Backup & Recovery — simulated backup operations.
 * Clearly identified as frontend simulation only.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Separator,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { backupService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Activity, Clock, Download, RefreshCw, Database } from 'lucide-react';
import type { Backup } from '../types';

export default function Backups() {
  const { toast } = useToast();
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    backupService.list().then((data) => { setBackups(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load backups', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  const statusVariant = (s: string) => s === 'success' ? 'success' : s === 'failed' ? 'danger' : 'warning';

  async function createBackup() {
    setCreating(true);
    try {
      const b = await backupService.create();
      setBackups([b, ...backups]);
      toast({ title: 'Backup created (simulated)', description: `${b.fileName} · ${b.size}. No actual database operation performed without backend integration.`, variant: 'success' });
    } catch (err) {
      toast({ title: 'Backup failed', description: err instanceof Error ? err.message : '', variant: 'default' });
    } finally { setCreating(false); }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Backup & Recovery"
        description="Backup history and restore points. All operations here are simulated until a PHP backend is integrated."
        action={<Button variant="primary" onClick={createBackup} disabled={creating} isLoading={creating}><RefreshCw className="mr-1 h-4 w-4" /> Create backup</Button>}
      />

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Activity className="h-5 w-5 text-amber-700 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">Simulation mode</p>
            <p className="text-sm text-neutral-600">Create backup and restore actions are frontend simulations. They do not perform real database backups or recovery. Backend integration required for production.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={backups.length} label="Backups" />
        <Kpi value={backups.filter((b) => b.status === 'success').length} label="Successful" tone="green" />
        <Kpi value={backups.filter((b) => b.status === 'failed').length} label="Failed" tone="danger" />
        <Kpi value={backups.filter((b) => b.restorePoint).length} label="Restore points" />
      </div>

      <Card>
        <CardHeader><CardTitle>Backup history</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : backups.length === 0 ? (
            <EmptyState title="No backups" description="Create a backup to get started." icon="Database" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr><Th>Date</Th><th>File</th><Th className="w-32">Status</Th><Th className="w-32">Type</Th><Th className="w-32">Size</Th><Th className="w-32">Restore point</Th><Th className="w-48">Actions</Th></Tr>
                </Thead>
                <Tbody>
                  {backups.map((b) => (
                    <Tr key={b.id} className="hover:bg-neutral-50/50">
                      <Td className="text-sm text-neutral-600">{new Date(b.date).toLocaleString()}</Td>
                      <td className="font-mono text-xs text-neutral-600">{b.fileName}</td>
                      <Td><Badge variant={statusVariant(b.status)} size="sm">{b.status}</Badge></Td>
                      <Td className="text-sm text-neutral-600 capitalize">{b.type}</Td>
                      <Td className="text-sm text-neutral-600">{b.size}</Td>
                      <Td><Badge variant={b.restorePoint ? 'success' : 'neutral'} size="sm">{b.restorePoint ? 'Yes' : 'No'}</Badge></Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Restore simulated', variant: 'default' })}>Restore</Button>
                        <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Download simulated', variant: 'success' })}><Download size={16} /></Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator className="mt-6" />
      <p className="text-[10px] text-neutral-500">Actual backup/restore requires PHP backend integration with MariaDB. Never claim a real recovery occurred without backend verification.</p>
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
