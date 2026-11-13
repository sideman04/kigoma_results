/**
 * Marks Entry Officer Dashboard — examination administration and marks
 * processing workspace. Shows the officer's assigned scope, entry progress and
 * recent processing activity.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Button, Card, CardContent, CardHeader, CardTitle, EmptyState } from '../../shared/components/ui';
import { marksService, examinationService, studentService, orgService } from '../../shared/services/api';
import type { Examination, MarksEntrySession, School, Student } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { Activity, ArrowRight, ArrowUp, CheckCircle, ClipboardList, Clock, GraduationCap, Users } from 'lucide-react';

export default function MarksOfficerDashboard() {
  const { user } = useAuth() as any;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [sessions, setSessions] = useState<MarksEntrySession[]>([]);

  const scopeLabel = officerScopeLabel(user);

  useEffect(() => {
    Promise.all([
      orgService.listSchools({ pageSize: 100 }),
      studentService.list({ pageSize: 1000 }),
      examinationService.list({ pageSize: 100 }),
      marksService.listSessions({ pageSize: 200 }),
    ]).then(([schoolRes, studentRes, examRes, sessionRes]) => {
      const allSchools = schoolRes.data as School[];
      const schoolIds = resolveOfficerSchoolIds(user, allSchools);
      setSchools(allSchools.filter((school) => schoolIds.includes(school.id)));
      setStudents(studentRes.data.filter((student) => schoolIds.includes(student.schoolId)));
      setExams(examRes.data as Examination[]);
      setSessions((sessionRes.data as MarksEntrySession[]).filter((session) => schoolIds.includes(session.schoolId)));
    }).catch((err) => setError(err instanceof Error ? err.message : 'Unable to load dashboard data.'))
      .finally(() => setLoading(false));
  }, [user]);

  const stats = useMemo(() => {
    const activeExams = exams.filter((exam) => exam.status === 'open').length;
    const totalEntered = sessions.reduce((sum, session) => sum + session.enteredCount, 0);
    const totalExpected = sessions.reduce((sum, session) => sum + session.totalStudents, 0);
    const completed = sessions.filter((session) => session.status === 'submitted' || session.status === 'verified').length;
    const pending = sessions.filter((session) => session.status === 'draft' || session.status === 'entered' || session.status === 'returned').length;
    const progress = totalExpected ? Math.round((totalEntered / totalExpected) * 100) : 0;

    const byExam = new Map<string, { name: string; total: number; entered: number; sessions: number }>();
    sessions.forEach((session) => {
      const current = byExam.get(session.examinationId) || { name: session.examinationName || 'Examination', total: 0, entered: 0, sessions: 0 };
      current.total += session.totalStudents;
      current.entered += session.enteredCount;
      current.sessions += 1;
      byExam.set(session.examinationId, current);
    });

    const recent = [...sessions]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 6);

    return {
      activeExams,
      totalExams: exams.length,
      totalEntered,
      totalExpected,
      completed,
      pending,
      progress,
      byExam: [...byExam.values()],
      recent,
    };
  }, [exams, sessions]);

  if (loading) {
    return (
      <div className="space-y-6">
        <RolePageHeader title="Marks Entry Dashboard" description={`Examination marks processing for ${scopeLabel}.`} />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-28 rounded-lg border border-neutral-200 bg-white animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks Entry Dashboard"
        description={`Examination marks processing for ${scopeLabel}. Enter, review and submit marks for all students in your assigned scope.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/marks-officer/enter-marks')}><ArrowUp className="h-4 w-4" /> Enter marks</Button>}
      />

      {error && <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard title="Students for entry" value={students.length} note={`${schools.length} school${schools.length === 1 ? '' : 's'} in scope`} tone="blue" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Examinations" value={stats.totalExams} note={`${stats.activeExams} accepting marks`} icon={<ClipboardList className="h-5 w-5" />} />
        <StatCard title="Entry progress" value={`${stats.progress}%`} note={`${stats.totalEntered} of ${stats.totalExpected} marks`} tone="green" icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard title="Completed entries" value={stats.completed} note="Submitted or verified" tone="green" icon={<CheckCircle className="h-5 w-5" />} />
        <StatCard title="Pending entries" value={stats.pending} note="Drafts / returned" tone="warning" icon={<Clock className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Marks entry progress by examination</CardTitle>
            <p className="text-xs text-neutral-500">Progress across the marks sessions in your administrative scope.</p>
          </CardHeader>
          <CardContent className="pt-0">
            {stats.byExam.length === 0 ? (
              <EmptyState title="No marks entry sessions yet" description="Select an examination and start entering marks for your assigned schools." icon="ClipboardList" action={<Button variant="primary" size="sm" onClick={() => navigate('/marks-officer/enter-marks')}>Start marks entry</Button>} />
            ) : (
              <div className="space-y-5">
                {stats.byExam.map((exam) => {
                  const pct = exam.total ? Math.round((exam.entered / exam.total) * 100) : 0;
                  return (
                    <div key={exam.name}>
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                        <div>
                          <p className="font-medium text-neutral-900">{exam.name}</p>
                          <p className="text-[11px] text-neutral-500">{exam.sessions} session{exam.sessions === 1 ? '' : 's'}</p>
                        </div>
                        <span className="text-xs text-neutral-500">{exam.entered} / {exam.total} marks · {pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-2 rounded-full bg-green-700" style={{ width: `${Math.max(3, pct)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-4 text-xs">
              <button type="button" onClick={() => navigate('/marks-officer/marks-management')} className="font-medium text-green-700 hover:underline">Open marks management →</button>
              <button type="button" onClick={() => navigate('/marks-officer/examinations')} className="font-medium text-green-700 hover:underline">View examinations →</button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Assigned scope</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Administrative area</p>
              <p className="mt-1 text-sm font-medium text-neutral-900">{scopeLabel}</p>
              <p className="mt-1 text-xs text-neutral-500">{schools.length} school / centre{schools.length === 1 ? '' : 's'} · {students.length} registered students</p>
            </div>
            <div className="mt-3 space-y-1.5">
              {schools.slice(0, 6).map((school) => (
                <div key={school.id} className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-xs">
                  <span className="text-neutral-700">{school.name}</span>
                  <span className="font-mono text-[10px] text-neutral-400">{school.code}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-neutral-500">You can enter marks for every student in the schools or centres listed above, not only students you personally registered.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent marks entry activity</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {stats.recent.length === 0 ? (
            <EmptyState title="No recent activity" icon="Activity" />
          ) : (
            <div className="divide-y divide-neutral-100">
              {stats.recent.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => navigate(session.status === 'draft' || session.status === 'entered' || session.status === 'returned' ? `/marks-officer/enter-marks/${session.id}` : '/marks-officer/marks-management')}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left hover:bg-neutral-50/60"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="rounded-md bg-green-50 p-2 text-green-700"><Activity className="h-4 w-4" /></span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">{session.examinationName} · {session.subjectName}</p>
                      <p className="text-xs text-neutral-500">{session.className}{session.streamName ? ` · ${session.streamName}` : ''} · {session.enteredCount}/{session.totalStudents} entered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={session.status} />
                    <ArrowRight className="h-4 w-4 text-neutral-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickAction title="Enter marks" description="Select an examination, school or centre and start a marks grid." icon={<ArrowUp className="h-5 w-5" />} onClick={() => navigate('/marks-officer/enter-marks')} />
        <QuickAction title="Marks management" description="Continue drafts, review entered marks and submit." icon={<ClipboardList className="h-5 w-5" />} onClick={() => navigate('/marks-officer/marks-management')} />
        <QuickAction title="Submission history" description="Review submitted and returned marks sessions." icon={<Activity className="h-5 w-5" />} onClick={() => navigate('/marks-officer/submission-history')} />
      </div>
    </div>
  );
}

function QuickAction({ title, description, icon, onClick }: { title: string; description: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-left transition-colors hover:border-green-200 hover:bg-green-50/40">
      <span className="rounded-md bg-green-50 p-2 text-green-700">{icon}</span>
      <span>
        <span className="block text-sm font-medium text-neutral-900">{title}</span>
        <span className="mt-0.5 block text-xs text-neutral-500">{description}</span>
      </span>
    </button>
  );
}
