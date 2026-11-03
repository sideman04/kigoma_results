/**
 * School Administrator — Marks monitoring workspace.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, Select, Option, StatCard } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { marksService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ArrowUp, Filter, Eye } from 'lucide-react';

export default function MarksMonitoring() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    marksService.listSessions({ pageSize: 100 }).then((res: any) => {
      setSessions(res.data);
      setLoading(false);
    }).catch((err: any) => toast({ title: 'Failed to load sessions', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const statuses = ['draft', 'entered', 'submitted', 'returned', 'verified'];
  const filtered = sessions.filter((s) => !statusFilter || s.status === statusFilter);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks monitoring"
        description="Monitor marks entry progress across classes, streams and subjects at your school."
        action={<Button variant="ghost" size="sm"><Filter className="mr-1 h-4 w-4" /> Filter</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
        <StatCard title="Sessions" value={filtered.length} />
        <StatCard title="Submitted" value={filtered.filter((s) => s.status === 'submitted').length} tone="green" />
        <StatCard title="Drafts" value={filtered.filter((s) => s.status === 'draft').length} tone="warning" />
        <StatCard title="Returned" value={filtered.filter((s) => s.status === 'returned').length} tone="danger" />
        <StatCard title="Students" value={filtered.reduce((a, s) => a + s.totalStudents, 0)} />
        <StatCard title="Entered" value={filtered.reduce((a, s) => a + s.enteredCount, 0)} tone="blue" />
      </div>

      <Select value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)} className="w-64 mb-4">
        <Option value="">All statuses</Option>
        {statuses.map((s) => <Option key={s} value={s}>{s.replace('_', ' ')}</Option>)}
      </Select>

      <Card>
        <CardHeader><CardTitle>Marks entry sessions</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No marks entry sessions.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Examination</Th>
                    <Th>Class</Th>
                    <Th className="w-32">Subject</Th>
                    <Th className="w-32">Teacher</Th>
                    <Th className="w-32">Status</Th>
                    <Th className="w-40">Progress</Th>
                    <Th className="w-48">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filtered.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{s.examinationName}</Td>
                      <td className="text-sm text-neutral-600">{s.className} · {s.streamName || '—'}</td>
                      <Td className="font-mono text-xs">{s.subjectCode}</Td>
                      <Td className="text-sm text-neutral-600">{s.teacherName || '—'}</Td>
                      <Td><Badge variant={s.status === 'submitted' ? 'success' : s.status === 'returned' ? 'danger' : 'warning'} size="sm">{s.status.replace('_', ' ')}</Badge></Td>
                      <Td>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5">
                          <div className="bg-green-700 h-1.5 rounded-full" style={{ width: `${Math.round((s.enteredCount / Math.max(s.totalStudents, 1)) * 100)}%` }} />
                        </div>
                        <span className="text-[10px] text-neutral-600 block mt-1">{s.enteredCount} / {s.totalStudents}</span>
                      </Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigateTo(`/teacher/marks-entry/${s.id}`)}><Eye size={16} /> Open</Button>
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

  function navigateTo(p: string) { window.location.href = p; }
}
