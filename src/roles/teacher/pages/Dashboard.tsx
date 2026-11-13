/**
 * Teacher Dashboard — student administration workspace.
 *
 * Teacher scope is intentional and narrow: student registration, enrolment and
 * student records. No marks-entry, marks-management or results widgets exist in
 * this dashboard.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { Button, Card, CardContent, CardHeader, CardTitle, EmptyState } from '../../shared/components/ui';
import { studentService } from '../../shared/services/api';
import type { Student } from '../../shared/types';
import { resolveTeacherSchoolId, resolveTeacherSchoolName } from '../utils/scope';
import { Users, UserPlus, UserCheck, CalendarDays, ArrowRight, ListChecks, Search } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TeacherDashboard() {
  const { user } = useAuth() as any;
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const schoolId = resolveTeacherSchoolId(user);
  const schoolName = resolveTeacherSchoolName(user);

  useEffect(() => {
    studentService.list({ pageSize: 500, scope: { role: 'teacher', schoolId } })
      .then((res) => {
        setStudents(res.data.filter((student) => student.schoolId === schoolId));
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load students.');
        setLoading(false);
      });
  }, [schoolId]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((student) => student.status === 'active').length;
    const female = students.filter((student) => student.gender === 'F').length;
    const male = students.filter((student) => student.gender === 'M').length;
    const now = new Date();
    const newThisMonth = students.filter((student) => {
      const created = new Date(student.createdAt);
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length;

    const byClass = new Map<string, { name: string; count: number }>();
    students.forEach((student) => {
      const key = student.classId || 'unassigned';
      const current = byClass.get(key) || { name: student.className || 'Unassigned', count: 0 };
      current.count += 1;
      byClass.set(key, current);
    });

    const recent = [...students]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    const registrationByMonth = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const count = students.filter((student) => {
        const created = new Date(student.createdAt);
        return created.getFullYear() === date.getFullYear() && created.getMonth() === date.getMonth();
      }).length;
      return { label: MONTHS[date.getMonth()]!, count };
    });
    const maxMonthly = Math.max(1, ...registrationByMonth.map((item) => item.count));

    return { total, active, female, male, newThisMonth, byClass: [...byClass.values()].sort((a, b) => a.name.localeCompare(b.name)), recent, registrationByMonth, maxMonthly };
  }, [students]);

  if (loading) {
    return (
      <div className="space-y-6">
        <RolePageHeader title="Teacher Dashboard" description={`Student administration for ${schoolName}.`} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => <div key={item} className="h-28 rounded-lg border border-neutral-200 bg-white animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Teacher Dashboard"
        description={`Student administration for ${schoolName}. Register learners, maintain their records and keep class placement up to date.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}><UserPlus className="h-4 w-4" /> Register student</Button>}
      />

      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Registered students" value={stats.total} note="All student records" tone="green" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Active students" value={stats.active} note="Currently enrolled" icon={<UserCheck className="h-5 w-5" />} />
        <StatCard title="Registered this month" value={stats.newThisMonth} note="New registrations" tone="blue" icon={<UserPlus className="h-5 w-5" />} />
        <StatCard title="Female / Male" value={`${stats.female} / ${stats.male}`} note="Gender distribution" icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Students by class</CardTitle>
            <p className="text-xs text-neutral-500">Current enrolment distribution across assigned classes.</p>
          </CardHeader>
          <CardContent className="pt-0">
            {stats.byClass.length === 0 ? (
              <EmptyState title="No students registered" description="Register the first student to begin building the school register." icon="Users" action={<Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}>Register student</Button>} />
            ) : (
              <div className="space-y-4">
                {stats.byClass.map((item) => {
                  const pct = stats.total ? Math.round((item.count / stats.total) * 100) : 0;
                  return (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-neutral-800">{item.name}</span>
                        <span className="text-neutral-500">{item.count} student{item.count === 1 ? '' : 's'} · {pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div className="h-2 rounded-full bg-green-700" style={{ width: `${Math.max(4, pct)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
              <Link to="/teacher/student-lists" className="text-xs font-medium text-green-700 hover:underline">Open student lists →</Link>
              <Link to="/teacher/students" className="text-xs font-medium text-green-700 hover:underline">Browse all students →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Registration statistics</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {stats.registrationByMonth.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-8 text-[11px] font-medium text-neutral-500">{item.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-2.5 rounded-full bg-blue-500" style={{ width: `${Math.max(3, (item.count / stats.maxMonthly) * 100)}%` }} />
                  </div>
                  <span className="w-6 text-right text-xs font-semibold text-neutral-700">{item.count}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">Registrations over the last six months.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently registered students</CardTitle>
          <p className="text-xs text-neutral-500">The latest additions to the school register.</p>
        </CardHeader>
        <CardContent className="pt-0">
          {stats.recent.length === 0 ? (
            <EmptyState title="No recent registrations" icon="Users" />
          ) : (
            <div className="divide-y divide-neutral-100">
              {stats.recent.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => navigate(`/teacher/student-details?id=${student.id}`)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left hover:bg-neutral-50/60"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="rounded-md bg-green-50 p-2 text-green-700"><Users className="h-4 w-4" /></div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-neutral-900">{student.name}</p>
                      <p className="text-xs text-neutral-500">{student.regNo || 'No registration number'} · {student.className || 'Unassigned'}{student.streamName ? ` · ${student.streamName}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden text-[11px] text-neutral-400 sm:block">{new Date(student.createdAt).toLocaleDateString()}</span>
                    <ArrowRight className="h-4 w-4 text-neutral-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickAction title="Register a student" description="Add a new learner to the school register." icon={<UserPlus className="h-5 w-5" />} onClick={() => navigate('/teacher/register')} />
        <QuickAction title="Student lists" description="View enrolment grouped by class and stream." icon={<ListChecks className="h-5 w-5" />} onClick={() => navigate('/teacher/student-lists')} />
        <QuickAction title="Find a student" description="Search records and open a student profile." icon={<Search className="h-5 w-5" />} onClick={() => navigate('/teacher/students')} />
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
