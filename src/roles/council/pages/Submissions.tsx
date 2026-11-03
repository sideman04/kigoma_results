/**
 * Council Administrator — Marks submissions.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, Select, Option } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { submissionService, examinationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ArrowUp, Filter } from 'lucide-react';

export default function Submissions() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    Promise.all([
      submissionService.list({ pageSize: 200 }),
      examinationService.list({ pageSize: 100 }),
    ]).then(([sRes, eRes]) => {
      setSubmissions(sRes.data);
      setExams(eRes.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load submissions', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const statuses = ['not_started', 'partial', 'submitted', 'verified', 'returned'];
  const filtered = submissions.filter((s) => !statusFilter || s.status === statusFilter);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks submissions"
        description="Track marks submission progress for schools in the council."
        action={<Button variant="ghost" size="sm"><Filter className="mr-1 h-4 w-4" /> Filter</Button>}
      />

      <Select value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)} className="w-64 mb-4">
        <Option value="">All statuses</Option>
        {statuses.map((s) => <Option key={s} value={s}>{s.replace('_', ' ')}</Option>)}
      </Select>

      <Card>
        <CardHeader><CardTitle>Submissions</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyStateC title="No submissions" icon="ArrowUp" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>School</Th>
                    <Th>Class</Th>
                    <Th className="w-32">Subject</Th>
                    <Th className="w-32">Status</Th>
                    <Th className="w-32">Missing</Th>
                    <Th className="w-48">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filtered.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td>{s.schoolName}</Td>
                      <td className="text-sm text-neutral-600">{s.className}</td>
                      <Td className="font-mono text-xs">{s.subjectCode}</Td>
                      <Td><Badge variant={s.status === 'submitted' ? 'success' : s.status === 'returned' ? 'danger' : 'warning'} size="sm">{s.status.replace('_', ' ')}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{s.missingRecords}</Td>
                      <Td>
                        <Button variant="ghost" size="sm">Inspect</Button>
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
}

function EmptyStateC({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="p-12 text-center text-neutral-500">
      <span className="text-neutral-300">{icon === 'ArrowUp' ? '↑' : '📄'}</span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
    </div>
  );
}
