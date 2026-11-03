/**
 * Marks submission monitoring — system-wide visibility into submissions.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Input, Select, Option,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { submissionService, examinationService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Upload, Filter, School, Building2, University } from 'lucide-react';
import type { MarksSubmission, Examination } from '../types';

export default function MarksSubmission() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<MarksSubmission[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    examination: '', status: '', school: '', subject: '',
  });

  const statuses = ['not_started', 'partial', 'submitted', 'verified', 'returned'] as const;

  useEffect(() => {
    submissionService.list({ pageSize: 200 }).then((res) => {
      setSubmissions(res.data as MarksSubmission[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load submissions', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    examinationService.list({ pageSize: 100 }).then((res) => setExams(res.data as Examination[]));
  }, [toast]);

  const filtered = submissions.filter((s) => {
    if (filters.examination && s.examinationId !== filters.examination) return false;
    if (filters.status && s.status !== filters.status) return false;
    if (filters.school && !s.schoolName?.toLowerCase().includes(filters.school.toLowerCase())) return false;
    if (filters.subject && !s.subjectName?.toLowerCase().includes(filters.subject.toLowerCase())) return false;
    return true;
  });

  const summary = {
    total: filtered.length,
    submitted: filtered.filter((s) => s.status === 'submitted').length,
    pending: filtered.filter((s) => s.status === 'not_started').length,
    incomplete: filtered.filter((s) => s.status === 'partial').length,
    returned: filtered.filter((s) => s.status === 'returned').length,
    missing: filtered.reduce((acc, s) => acc + s.missingRecords, 0),
    issues: filtered.reduce((acc, s) => acc + s.validationIssues, 0),
  };

  const statusBadge = (status: string) => (
    <Badge variant={status === 'submitted' ? 'success' : status === 'returned' ? 'danger' : status === 'partial' ? 'warning' : 'neutral'} size="sm">{status.replace('_', ' ')}</Badge>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marks Submission Monitoring"
        description="System-wide visibility into marks submissions. Identify schools that have not completed submission."
        action={<Button variant="ghost" size="sm"><Filter className="mr-1 h-4 w-4" /> Filters</Button>}
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
        <Kpi value={summary.total} label="Records" />
        <Kpi value={summary.submitted} label="Submitted" tone="green" />
        <Kpi value={summary.pending} label="Not started" tone="warning" />
        <Kpi value={summary.incomplete} label="Incomplete" tone="warning" />
        <Kpi value={summary.returned} label="Returned" tone="danger" />
        <Kpi value={summary.missing} label="Missing marks" tone="danger" />
      </div>

      {/* Filters */}
      <Card className="rounded-lg border border-neutral-200 bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SelectField label="Examination" value={filters.examination} onChange={(e) => setFilters({ ...filters, examination: e.target.value })}>
            <Option value="">All examinations</Option>
            {exams.map((e) => <Option key={e.id} value={e.id}>{e.code}</Option>)}
          </SelectField>
          <SelectField label="Status" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <Option value="">All statuses</Option>
            {statuses.map((s) => <Option key={s} value={s}>{s.replace('_', ' ')}</Option>)}
          </SelectField>
          <InputField label="School" value={filters.school} onChange={(e) => setFilters({ ...filters, school: e.target.value })} />
          <InputField label="Subject" value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No submissions" description="No marks submissions match your filters." icon="Activity" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Examination</Th><Th className="w-40">School</Th><Th className="w-32">Class</Th><Th className="w-32">Subject</Th><Th className="w-32">Teacher</Th>
                    <Th className="w-32">Status</Th><Th className="w-32">Submitted</Th><Th className="w-32">Missing</Th><Th className="w-32">Issues</Th><Th className="w-48">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filtered.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{s.examinationName}</Td>
                      <Td>{s.schoolName}</Td>
                      <Td className="text-sm text-neutral-600">{s.className}</Td>
                      <Td className="font-mono text-xs">{s.subjectCode}</Td>
                      <Td className="text-sm text-neutral-600">{s.teacherName || '—'}</Td>
                      <Td>{statusBadge(s.status)}</Td>
                      <Td className="text-sm text-neutral-600">{s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : '—'}</Td>
                      <Td className="text-sm text-neutral-600">{s.missingRecords}</Td>
                      <Td className="text-sm text-neutral-600">{s.validationIssues}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/examinations/${s.examinationId}/submissions`)}>Inspect</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-neutral-500">{summary.incomplete > 0 ? `${summary.incomplete} school(s) have incomplete submissions.` : 'All filtered submissions are complete.'}</p>
        {summary.incomplete > 0 && (
          <Button variant="ghost" size="sm" onClick={() => navigate('/super-admin/examinations')}>Review examinations</Button>
        )}
      </div>
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

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</label>
      <select value={value} onChange={onChange} className="rounded-md border border-neutral-200 bg-white pl-3 pr-3 py-2 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700">
        {children}
      </select>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</label>
      <input value={value} onChange={onChange} className="rounded-md border border-neutral-200 bg-white pl-3 pr-3 py-2 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700" />
    </div>
  );
}
