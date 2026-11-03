/**
 * School Administrator — Students management.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { studentService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { Users, Search, Filter, Plus } from 'lucide-react';

export default function Students() {
  const { toast } = useToast();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');

  useEffect(() => {
    studentService.list({ pageSize: 100 }).then((res) => {
      setStudents(res.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load students', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || (s.regNo ?? '').toLowerCase().includes(q)) && (!classFilter || s.classId === classFilter);
  });

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Students"
        description="Student enrolment for Lakeview Secondary School."
        action={<Button variant="primary" onClick={() => {}}><Plus size={18} /> Register student</Button>}
      />

      <div className="flex gap-3 mb-4">
        <Input placeholder="Search by name or registration number…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-96" />
        <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="w-64">
          <Option value="">All classes</Option>
          <Option value="class-f4">Form 4</Option>
          <Option value="class-f6">Form 6</Option>
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle>Student directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No students" icon="Users" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Reg. number</Th>
                    <Th>Student</Th>
                    <th>Gender</th>
                    <Th className="w-32">Class</Th>
                    <Th className="w-32">Stream</Th>
                    <Th className="w-32">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filtered.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{s.regNo || '—'}</Td>
                      <Td>{s.name}</Td>
                      <td className="text-sm text-neutral-600">{s.gender}</td>
                      <Td className="text-sm text-neutral-600">{s.className || '—'}</Td>
                      <Td className="text-sm text-neutral-600">{s.streamName || '—'}</Td>
                      <Td><Badge variant={s.status === 'active' ? 'success' : 'neutral'} size="sm">{s.status}</Badge></Td>
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
