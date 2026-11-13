/**
 * Marks Entry Officer — Marks Management.
 * All marks sessions in the officer's scope: continue drafts, review entered
 * marks, open submitted records and monitor completion.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, EmptyState, Input, Option, Select, useToast } from '../../shared/components/ui';
import { examinationService, marksService, orgService } from '../../shared/services/api';
import type { Examination, MarksEntrySession, School } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { ArrowRight, ClipboardList, Eye, Pencil, Search } from 'lucide-react';

export default function MarksManagement() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<MarksEntrySession[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    Promise.all([
      marksService.listSessions({ pageSize: 300 }),
      examinationService.list({ pageSize: 100 }),
      orgService.listSchools({ pageSize: 100 }),
    ]).then(([sessionRes, examRes, schoolRes]) => {
      const allSchools = schoolRes.data as School[];
      const schoolIds = resolveOfficerSchoolIds(user, allSchools);
      setSchools(allSchools.filter((school) => schoolIds.includes(school.id)));
      setExams(examRes.data as Examination[]);
      setSessions((sessionRes.data as MarksEntrySession[]).filter((session) => schoolIds.includes(session.schoolId)));
    }).catch((err) => toast({ title: 'Unable to load marks sessions', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schoolName = (id: string) => schools.find((school) => school.id === id)?.name || id;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sessions
      .filter((session) => {
        const haystack = `${session.examinationName} ${session.subjectName} ${session.className} ${session.streamName} ${schoolName(session.schoolId)}`.toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        const matchesExam = !examFilter || session.examinationId === examFilter;
        const matchesStatus = !statusFilter || session.status === statusFilter;
        return matchesSearch && matchesExam && matchesStatus;
      })
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [sessions, search, examFilter, statusFilter, schools]);

  const totals = useMemo(() => ({
    total: sessions.length,
    pending: sessions.filter((session) => session.status === 'draft' || session.status === 'entered' || session.status === 'returned').length,
    submitted: sessions.filter((session) => session.status === 'submitted' || session.status === 'verified').length,
    completion: sessions.length
      ? Math.round((sessions.reduce((sum, session) => sum + session.enteredCount, 0) / Math.max(1, sessions.reduce((sum, session) => sum + session.totalStudents, 0))) * 100)
      : 0,
  }), [sessions]);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks Management"
        description={`Review drafts and submitted marks for ${officerScopeLabel(user)}.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/marks-officer/enter-marks')}>New marks entry</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Summary label="Marks sessions" value={totals.total} />
        <Summary label="Pending" value={totals.pending} tone="warning" />
        <Summary label="Submitted" value={totals.submitted} tone="green" />
        <Summary label="Overall completion" value={`${totals.completion}%`} tone="blue" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <CardTitle>Marks sessions</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1 sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input placeholder="Search examination, subject, centre…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search marks sessions" />
              </div>
              <Select value={examFilter} onChange={(e) => setExamFilter(e.target.value)} className="sm:w-48" aria-label="Filter by examination">
                <Option value="">All examinations</Option>
                {exams.map((exam) => <Option key={exam.id} value={exam.id}>{exam.name}</Option>)}
              </Select>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-36" aria-label="Filter by status">
                <Option value="">All statuses</Option>
                <Option value="draft">Draft</Option>
                <Option value="entered">Entered</Option>
                <Option value="returned">Returned</Option>
                <Option value="submitted">Submitted</Option>
                <Option value="verified">Verified</Option>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-2">{[1, 2, 3, 4].map((item) => <div key={item} className="h-12 rounded-md bg-neutral-100 animate-pulse" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title={sessions.length === 0 ? 'No marks sessions yet' : 'No sessions match your filters'}
              description={sessions.length === 0 ? 'Start a new marks entry session for an examination and centre.' : 'Try another examination, status or search term.'}
              icon="ClipboardList"
              action={sessions.length === 0 ? <Button variant="primary" size="sm" onClick={() => navigate('/marks-officer/enter-marks')}>Enter marks</Button> : undefined}
            />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="th">Examination</th>
                    <th className="th">Centre</th>
                    <th className="th">Class · subject</th>
                    <th className="th">Progress</th>
                    <th className="th">Status</th>
                    <th className="th">Updated</th>
                    <th className="th w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((session) => {
                    const pct = session.totalStudents ? Math.round((session.enteredCount / session.totalStudents) * 100) : 0;
                    const editable = session.status === 'draft' || session.status === 'entered' || session.status === 'returned';
                    return (
                      <tr key={session.id} className="hover:bg-neutral-50/60">
                        <td className="td">
                          <p className="font-medium text-neutral-900">{session.examinationName}</p>
                          <p className="text-[11px] text-neutral-500">{session.academicYearId}</p>
                        </td>
                        <td className="td text-sm text-neutral-600">{schoolName(session.schoolId)}</td>
                        <td className="td">
                          <p className="text-sm text-neutral-800">{session.className}{session.streamName ? ` · ${session.streamName}` : ''}</p>
                          <p className="text-[11px] text-neutral-500">{session.subjectName}{session.subjectCode ? ` (${session.subjectCode})` : ''}</p>
                        </td>
                        <td className="td">
                          <div className="w-28">
                            <div className="mb-1 flex justify-between text-[10px] text-neutral-500"><span>{session.enteredCount}/{session.totalStudents}</span><span>{pct}%</span></div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100"><div className={`h-1.5 rounded-full ${session.status === 'returned' ? 'bg-amber-500' : 'bg-green-700'}`} style={{ width: `${Math.max(3, pct)}%` }} /></div>
                          </div>
                        </td>
                        <td className="td"><StatusBadge status={session.status} /></td>
                        <td className="td text-xs text-neutral-500">{new Date(session.updatedAt).toLocaleDateString()}</td>
                        <td className="td">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/marks-officer/enter-marks/${session.id}`)} aria-label={editable ? 'Continue marks entry' : 'Review marks'}>
                              {editable ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            {editable && (
                              <Button variant="ghost" size="sm" onClick={() => navigate(`/marks-officer/enter-marks/${session.id}`)} aria-label="Open marks session">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-2"><ClipboardList className="h-4 w-4" /> Submitted sessions are locked from editing. Returned sessions can be corrected and resubmitted.</span>
            <Button variant="ghost" size="sm" onClick={() => navigate('/marks-officer/submission-history')}>View submission history</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Summary({ label, value, tone = 'neutral' }: { label: string; value: string | number; tone?: 'neutral' | 'green' | 'warning' | 'blue' }) {
  const tones: Record<string, string> = {
    neutral: 'bg-white text-neutral-900 border-neutral-200',
    green: 'bg-green-50 text-green-800 border-green-100',
    warning: 'bg-amber-50 text-amber-800 border-amber-100',
    blue: 'bg-blue-50 text-blue-800 border-blue-100',
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
