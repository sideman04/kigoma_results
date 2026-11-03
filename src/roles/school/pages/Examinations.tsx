/**
 * School Administrator — Examinations (school view).
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { examinationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ClipboardList, Activity, Eye } from 'lucide-react';

export default function Examinations() {
  const { toast } = useToast();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    examinationService.list({ pageSize: 100 }).then((res) => {
      setExams(res.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load examinations', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Examinations"
        description="Examinations assigned to Lakeview Secondary School."
        action={<Button variant="outline" size="sm"><Activity className="mr-1 h-4 w-4" /> View submissions</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Examinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : exams.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No examinations assigned.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Code</th>
                    <th>Name</th>
                    <Th className="w-32">Type</th>
                    <Th className="w-40">Year / Level</th>
                    <Th className="w-32">Status</th>
                    <Th className="w-48">Actions</th>
                  </Tr>
                </Thead>
                <Tbody>
                  {exams.map((e) => (
                    <Tr key={e.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{e.code}</Td>
                      <td>{e.name}</td>
                      <Td className="text-sm text-neutral-600">{e.type.toUpperCase()}</Td>
                      <Td className="text-sm text-neutral-600">{e.academicYearName} · {e.educationLevelName}</Td>
                      <Td><Badge variant={e.status === 'open' ? 'success' : 'neutral'} size="sm">{e.status}</Badge></Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigateTo(`/school/examinations/${e.id}`)}><Eye size={16} /></Button>
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
