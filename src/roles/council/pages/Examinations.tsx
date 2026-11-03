/**
 * Council Administrator — Examinations.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { examinationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ClipboardList, Activity } from 'lucide-react';

export default function Examinations() {
  const { toast } = useToast();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    examinationService.list({ pageSize: 100 }).then((res: any) => {
      setExams(res.data);
      setLoading(false);
    }).catch((err: any) => toast({ title: 'Failed to load examinations', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Examinations"
        description="Examinations assigned to schools in Kasulu TC."
        action={<Button variant="ghost" size="sm"><Activity className="mr-1 h-4 w-4" /> View submissions</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Examinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : exams.length === 0 ? (
            <EmptyState title="No examinations" icon="ClipboardList" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Code</Th>
                    <Th>Name</Th>
                    <Th className="w-32">Type</Th>
                    <Th className="w-40">Year / Level</Th>
                    <Th className="w-32">Status</Th>
                    <Th className="w-48">Actions</Th>
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
