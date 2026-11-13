/**
 * Marks Entry Officer — Submission History.
 * Timeline and table of submitted, verified and returned marks sessions.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button, Card, CardContent, CardHeader, CardTitle, EmptyState, Input, Option, Select, useToast } from '../../shared/components/ui';
import { examinationService, marksService, orgService } from '../../shared/services/api';
import type { Examination, MarksEntrySession, School } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { Activity, ArrowRight, CheckCircle, Clock, RotateCcw, Search } from 'lucide-react';

const HISTORY_STATUSES = ['submitted', 'verified', 'returned'];

export default function SubmissionHistory() {
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
    Promise.all([marksService.listSessions({ pageSize: 300 }), examinationService.list({ pageSize: 100 }), orgService.listSchools({ pageSize: 100 })])
      .then(([sessionRes, examRes, schoolRes]) => {
        const allSchools = schoolRes.data as School[];
        const schoolIds = resolveOfficerSchoolIds(user, allSchools);
        setSchools(allSchools.filter((school) => schoolIds.includes(school.id)));
        setExams(examRes.data as Examination[]);
        setSessions((sessionRes.data as MarksEntrySession[]).filter((session) => schoolIds.includes(session.schoolId)));
      })
      .catch((err) => toast({ title: 'Unable to load submission history', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schoolName = (id: string) => schools.find((school) => school.id === id)?.name || id;

  const history = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sessions
      .filter((session) => HISTORY_STATUSES.includes(session.status))
      .filter((session) => {
        const haystack = `${session.examinationName} ${session.subjectName} ${session.className} ${schoolName(session.schoolId)}`.toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        const matchesExam = !examFilter || session.examinationId === examFilter;
        const matchesStatus = !statusFilter || session.status === statusFilter;
        return matchesSearch && matchesExam && matchesStatus;
      })
      .sort((a, b) => new Date(b.submittedAt || b.updatedAt).getTime() - new Date(a.submittedAt || a.updatedAt).getTime());
  }, [sessions, search, examFilter, statusFilter, schools]);

  const stats = useMemo(() => ({
    submitted: sessions.filter((session) => session.status === 'submitted').length,
    verified: sessions.filter((session) => session.status === 'verified').length,
    returned: sessions.filter((session) => session.status === 'returned').length,
  }), [sessions]);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Submission History"
        description={`Submitted, verified and returned marks sessions for ${officerScopeLabel(user)}.`}
      />

      <div className="grid grid-cols-3 gap-3">
        <Summary label="Submitted" value={stats.submitted} icon={<CheckCircle className="h-4 w-4" />} tone="green" />
        <Summary label="Verified" value={stats.verified} icon={<Activity className="h-4 w-4" />} tone="blue" />
        <Summary label="Returned" value={stats.returned} icon={<RotateCcw className="h-4 w-4" />} tone="warning" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <CardTitle>Submission history</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1 sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input placeholder="Search submissions…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search submission history" />
              </div>
              <Select value={examFilter} onChange={(e) => setExamFilter(e.target.value)} className="sm:w-44" aria-label="Filter by examination">
                <Option value="">All examinations</Option>
                {exams.map((exam) => <Option key={exam.id} value={exam.id}>{exam.name}</Option>)}
              </Select>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-36" aria-label="Filter by status">
                <Option value="">All statuses</Option>
                <Option value="submitted">Submitted</Option>
                <Option value="verified">Verified</Option>
                <Option value="returned">Returned</Option>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-2">{[1, 2, 3].map((item) => <div key={item} className="h-12 rounded-md bg-neutral-100 animate-pulse" />)}</div>
          ) : history.length === 0 ? (
            <EmptyState title="No submission history" description="Submitted marks sessions will appear here once you submit a marks grid." icon="Activity" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr><th className="th">Examination</th><th className="th">Centre</th><th className="th">Class · subject</th><th className="th">Students</th><th className="th">Submitted</th><th className="th">Status</th><th className="th w-24">Review</th></tr>
                </thead>
                <tbody>
                  {history.map((session) => (
                    <tr key={session.id} className="hover:bg-neutral-50/60">
                      <td className="td">
                        <p className="font-medium text-neutral-900">{session.examinationName}</p>
                        <p className="text-[11px] text-neutral-500">{session.academicYearId}</p>
                      </td>
                      <td className="td text-sm text-neutral-600">{schoolName(session.schoolId)}</td>
                      <td className="td">
                        <p className="text-sm text-neutral-800">{session.className}{session.streamName ? ` · ${session.streamName}` : ''}</p>
                        <p className="text-[11px] text-neutral-500">{session.subjectName}</p>
                      </td>
                      <td className="td text-sm text-neutral-600">{session.totalStudents}</td>
                      <td className="td text-xs text-neutral-500">{session.submittedAt ? new Date(session.submittedAt).toLocaleString() : '—'}</td>
                      <td className="td"><StatusBadge status={session.status} /></td>
                      <td className="td">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/marks-officer/enter-marks/${session.id}`)} aria-label="Review submitted marks">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent submission timeline</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {history.slice(0, 4).length === 0 ? (
            <p className="text-sm text-neutral-500">No submission events yet.</p>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 4).map((session) => (
                <div key={`timeline-${session.id}`} className="flex items-start gap-3 rounded-lg border border-neutral-100 p-3">
                  <span className={`mt-0.5 rounded-full p-1.5 ${session.status === 'returned' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                    {session.status === 'returned' ? <RotateCcw className="h-3.5 w-3.5" /> : <CheckCircle className="h-3.5 w-3.5" />}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">{session.examinationName} · {session.subjectName} — {session.status}</p>
                    <p className="text-xs text-neutral-500">{schoolName(session.schoolId)} · {session.className} · {session.enteredCount} / {session.totalStudents} marks recorded</p>
                  </div>
                  <p className="text-[11px] text-neutral-400">{session.submittedAt ? new Date(session.submittedAt).toLocaleDateString() : new Date(session.updatedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Summary({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: 'green' | 'blue' | 'warning' }) {
  const tones: Record<string, string> = {
    green: 'border-green-100 bg-green-50 text-green-800',
    blue: 'border-blue-100 bg-blue-50 text-blue-800',
    warning: 'border-amber-100 bg-amber-50 text-amber-800',
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider opacity-75">{icon}{label}</div>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
