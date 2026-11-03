/**
 * Regional Administrator — Marks submission tracking within region.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Option } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { submissionService, examinationService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { ArrowUp, Filter, School, AlertCircle, CheckCircle } from 'lucide-react';

export default function Submissions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [examFilter, setExamFilter] = useState('');
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
  const filtered = submissions.filter((s) => {
    if (examFilter && s.examinationId !== examFilter) return false;
    if (statusFilter && s.status !== statusFilter) return false;
    return true;
  });

  const summary = {
    total: filtered.length,
    submitted: filtered.filter((s) => s.status === 'submitted').length,
    pending: filtered.filter((s) => s.status === 'not_started').length,
    incomplete: filtered.filter((s) => s.status === 'partial').length,
    returned: filtered.filter((s) => s.status === 'returned').length,
  };

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Submission tracking"
        description="Monitor marks submission progress across all schools in the region."
        action={<Button variant="outline" size="sm"><Filter className="mr-1 h-4 w-4" /> Filter</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
        <StatCard title="Records" value={summary.total} />
        <StatCard title="Submitted" value={summary.submitted} tone="green" icon={<CheckCircle className="h-5 w-5" />} />
        <StatCard title="Not started" value={summary.pending} tone="warning" />
        <StatCard title="Incomplete" value={summary.incomplete} tone="warning" />
        <StatCard title="Returned" value={summary.returned} tone="danger" icon={<AlertCircle className="h-5 w-5" />} />
      </div>

      <div className="flex gap-3 mb-4">
        <Select value={examFilter} onChange={(e) => setExamFilter(e.target.value)} className="w-72">
          <Option value="">All examinations</Option>
          {exams.map((e) => <Option key={e.id} value={e.id}>{e.code}</Option>)}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-64">
          <Option value="">All statuses</Option>
          {statuses.map((s) => <Option key={s} value={s}>{s.replace('_', ' ')}</Option>)}
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle>Submissions</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No submissions match your filters.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Examination</th>
                    <th className="th">School</th>
                    <th className="th">Class</th>
                    <th className="th">Subject</th>
                    <th className="th">Status</th>
                    <th className="th">Missing</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-neutral-50/50">
                      <td className="td font-mono text-xs">{s.examinationName}</td>
                      <td className="td">{s.schoolName}</td>
                      <td className="td text-sm text-neutral-600">{s.className}</td>
                      <td className="td font-mono text-xs">{s.subjectCode}</td>
                      <td className="td"><StatusBadge status={s.status} /></td>
                      <td className="td text-sm text-neutral-600">{s.missingRecords}</td>
                      <td className="td">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/regional/examinations/${s.examinationId}`)}><EyeIcon /> View</Button>
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

function EyeIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
