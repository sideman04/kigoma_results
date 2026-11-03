/**
 * School Administrator — Teachers & staff management.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { teacherService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { UserCircle, Search, Plus } from 'lucide-react';

export default function Teachers() {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    teacherService.list({ pageSize: 100 }).then((res) => {
      setTeachers(res.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load teachers', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const filtered = teachers.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Teachers & staff"
        description="Teachers assigned to Lakeview Secondary School."
        action={<Button variant="primary" onClick={() => {}}><Plus size={18} /> Register teacher</Button>}
      />

      <Input placeholder="Search teachers…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-80 mb-4" />

      <Card>
        <CardHeader><CardTitle>Teacher directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No teachers" icon="UserCircle" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Teacher</Th>
                    <th>Employee no.</th>
                    <Th className="w-40">Subjects</Th>
                    <Th className="w-40">Classes</Th>
                    <Th className="w-32">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filtered.map((t) => (
                    <Tr key={t.id} className="hover:bg-neutral-50/50">
                      <Td>{t.name}</Td>
                      <td className="text-sm text-neutral-600 font-mono">{t.employeeNo || '—'}</td>
                      <Td className="text-sm text-neutral-600">{t.subjects?.length || 0}</Td>
                      <Td className="text-sm text-neutral-600">{t.classes?.length || 0}</Td>
                      <Td><Badge variant={t.status === 'active' ? 'success' : 'neutral'} size="sm">{t.status}</Badge></Td>
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
