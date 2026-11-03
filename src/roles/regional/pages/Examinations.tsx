/**
 * Regional Administrator — Examinations monitoring within region.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { examinationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ClipboardList, Activity, ArrowRight, Eye } from 'lucide-react';

export default function Examinations() {
  const { toast } = useToast();
  const navigate = useNavigate();
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
        description="Monitor examination configuration and submission progress across the region."
        action={<Button variant="primary" onClick={() => navigate('/super-admin/examinations')}>Manage examinations (Super Admin)</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Regional examinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : exams.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No examinations configured.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Code</th>
                    <th className="th">Name</th>
                    <th className="th">Type</th>
                    <th className="th">Year / Level</th>
                    <th className="th">Status</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((e) => (
                    <tr key={e.id} className="hover:bg-neutral-50/50">
                      <td className="td font-mono text-xs">{e.code}</td>
                      <td className="td">{e.name}</td>
                      <td className="td text-sm text-neutral-600">{e.type.toUpperCase()}</td>
                      <td className="td text-sm text-neutral-600">{e.academicYearName} · {e.educationLevelName}</td>
                      <td className="td"><Badge variant={e.status === 'open' ? 'success' : 'neutral'} size="sm">{e.status}</Badge></td>
                      <td className="td">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/regional/examinations/${e.id}`)}><Eye size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
