/**
 * Teacher — Student Lists.
 * Enrolment grouped by class and stream with gender and status counts.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Button, Card, CardContent, CardHeader, CardTitle, EmptyState, useToast } from '../../shared/components/ui';
import { studentService } from '../../shared/services/api';
import type { Student } from '../../shared/types';
import { resolveTeacherSchoolId, resolveTeacherSchoolName } from '../utils/scope';
import { ArrowRight, Download, ListChecks, Users } from 'lucide-react';

interface ClassGroup {
  id: string;
  name: string;
  total: number;
  female: number;
  male: number;
  active: number;
  streams: Array<{ id: string; name: string; total: number; female: number; male: number }>;
}

export default function StudentLists() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const schoolId = resolveTeacherSchoolId(user);
  const schoolName = resolveTeacherSchoolName(user);

  useEffect(() => {
    studentService.list({ pageSize: 500, scope: { role: 'teacher', schoolId } })
      .then((res) => setStudents(res.data.filter((student) => student.schoolId === schoolId)))
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load student lists.'))
      .finally(() => setLoading(false));
  }, [schoolId]);

  const groups = useMemo<ClassGroup[]>(() => {
    const classMap = new Map<string, { name: string; students: Student[] }>();
    students.forEach((student) => {
      const key = student.classId || 'unassigned';
      if (!classMap.has(key)) classMap.set(key, { name: student.className || 'Unassigned', students: [] });
      classMap.get(key)!.students.push(student);
    });

    return [...classMap.entries()].map(([id, group]) => {
      const streamMap = new Map<string, { name: string; students: Student[] }>();
      group.students.forEach((student) => {
        const key = student.streamId || 'no-stream';
        if (!streamMap.has(key)) streamMap.set(key, { name: student.streamName || 'No stream', students: [] });
        streamMap.get(key)!.students.push(student);
      });

      return {
        id,
        name: group.name,
        total: group.students.length,
        female: group.students.filter((student) => student.gender === 'F').length,
        male: group.students.filter((student) => student.gender === 'M').length,
        active: group.students.filter((student) => student.status === 'active').length,
        streams: [...streamMap.entries()]
          .map(([streamId, stream]) => ({
            id: streamId,
            name: stream.name,
            total: stream.students.length,
            female: stream.students.filter((student) => student.gender === 'F').length,
            male: stream.students.filter((student) => student.gender === 'M').length,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [students]);

  const totals = useMemo(() => ({
    total: students.length,
    female: students.filter((student) => student.gender === 'F').length,
    male: students.filter((student) => student.gender === 'M').length,
    active: students.filter((student) => student.status === 'active').length,
  }), [students]);

  const exportList = () => {
    const rows = [
      ['Class', 'Stream', 'Students', 'Female', 'Male'],
      ...groups.flatMap((group) => group.streams.map((stream) => [group.name, stream.name, String(stream.total), String(stream.female), String(stream.male)])),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${schoolName.replace(/\s+/g, '-').toLowerCase()}-student-lists.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Student lists exported', description: 'The class and stream summary was downloaded as a CSV file.', variant: 'success' });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <RolePageHeader title="Student Lists" description={`Enrolment summary for ${schoolName}.`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-44 rounded-lg border border-neutral-200 bg-white animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Student Lists"
        description={`Enrolment by class and stream at ${schoolName}.`}
        action={<Button variant="ghost" size="sm" onClick={exportList} disabled={!students.length}><Download className="h-4 w-4" /> Export list</Button>}
      />

      {error && <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Summary label="Total students" value={totals.total} icon={<Users className="h-4 w-4" />} />
        <Summary label="Active students" value={totals.active} icon={<ListChecks className="h-4 w-4" />} />
        <Summary label="Female" value={totals.female} />
        <Summary label="Male" value={totals.male} />
      </div>

      {groups.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState title="No student lists yet" description="Register students and assign them to classes to build enrolment lists." icon="Users" action={<Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}>Register student</Button>} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{group.name}</CardTitle>
                    <p className="mt-1 text-xs text-neutral-500">{group.total} student{group.total === 1 ? '' : 's'} · {group.active} active</p>
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <span className="rounded-full bg-green-50 px-2 py-1 font-medium text-green-700">F {group.female}</span>
                    <span className="rounded-full bg-blue-50 px-2 py-1 font-medium text-blue-700">M {group.male}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-hidden rounded-lg border border-neutral-200">
                  <table className="table w-full text-sm">
                    <thead className="bg-neutral-50">
                      <tr><th className="th">Stream</th><th className="th text-right">Female</th><th className="th text-right">Male</th><th className="th text-right">Total</th></tr>
                    </thead>
                    <tbody>
                      {group.streams.map((stream) => (
                        <tr key={stream.id}>
                          <td className="td">{stream.name}</td>
                          <td className="td text-right text-neutral-600">{stream.female}</td>
                          <td className="td text-right text-neutral-600">{stream.male}</td>
                          <td className="td text-right font-medium text-neutral-900">{stream.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button type="button" onClick={() => navigate(`/teacher/students?class=${encodeURIComponent(group.id)}`)} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-green-700 hover:underline">
                  Open class student list <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Summary({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-2 text-neutral-400">{icon}<span className="text-[10px] font-bold uppercase tracking-wider">{label}</span></div>
      <p className="mt-2 text-xl font-semibold text-neutral-900">{value}</p>
    </div>
  );
}
