/**
 * Teacher — Student Details.
 * A searchable student selector plus a detailed profile view. Teachers can
 * maintain personal information, registration numbers and academic placement.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StudentForm, type StudentFormValues } from '../components/StudentForm';
import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, EmptyState, Input, Separator, useToast,
} from '../../shared/components/ui';
import { studentService } from '../../shared/services/api';
import type { Student } from '../../shared/types';
import { resolveTeacherSchoolId, resolveTeacherSchoolName } from '../utils/scope';
import { CalendarDays, GraduationCap, Hash, Pencil, Search, User, Users } from 'lucide-react';

export default function StudentDetails() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const schoolId = resolveTeacherSchoolId(user);
  const schoolName = resolveTeacherSchoolName(user);
  const selectedId = searchParams.get('id') || '';

  useEffect(() => {
    studentService.list({ pageSize: 500, scope: { role: 'teacher', schoolId } })
      .then((res) => {
        const filtered = res.data.filter((student) => student.schoolId === schoolId);
        setStudents(filtered);
        if (!selectedId && filtered[0]) setSearchParams({ id: filtered[0].id }, { replace: true });
      })
      .catch((err) => toast({ title: 'Unable to load student', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolId]);

  const selected = students.find((student) => student.id === selectedId);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      student.name.toLowerCase().includes(query)
      || (student.regNo ?? '').toLowerCase().includes(query)
      || (student.admissionNo ?? '').toLowerCase().includes(query)
    );
  }, [students, search]);

  const handleUpdate = async (values: StudentFormValues & { className?: string; streamName?: string }) => {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await studentService.update(selected.id, {
        name: values.name,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        admissionNo: values.admissionNo,
        regNo: values.regNo,
        classId: values.classId,
        className: values.className,
        streamId: values.streamId || undefined,
        streamName: values.streamName,
        educationLevel: values.educationLevel,
        combination: values.combination || undefined,
        status: values.status,
      });
      if (updated) {
        setStudents((current) => current.map((student) => student.id === updated.id ? updated : student));
        toast({ title: 'Student details updated', description: 'The student record has been saved.', variant: 'success' });
      }
      setEditing(false);
    } catch (err) {
      toast({ title: 'Unable to update student', description: err instanceof Error ? err.message : 'Try again.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Student Details"
        description={`Search and review individual student records for ${schoolName}.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}>Register student</Button>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[19rem_minmax(0,1fr)] gap-5">
        <Card className="h-fit">
          <CardHeader><CardTitle>Find a student</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input placeholder="Name, reg. or admission no." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search student records" />
            </div>
            <div className="mt-3 max-h-[28rem] space-y-1 overflow-y-auto pr-1">
              {loading ? (
                [1, 2, 3, 4, 5].map((item) => <div key={item} className="h-11 rounded-md bg-neutral-100 animate-pulse" />)
              ) : filtered.length === 0 ? (
                <p className="py-6 text-center text-xs text-neutral-500">No matching students.</p>
              ) : (
                filtered.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => setSearchParams({ id: student.id })}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${student.id === selectedId ? 'bg-green-50 text-green-900' : 'hover:bg-neutral-50'}`}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-500"><User className="h-3.5 w-3.5" /></span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{student.name}</span>
                      <span className="block truncate text-[10px] text-neutral-500">{student.regNo || 'No reg. no.'} · {student.className || 'Unassigned'}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
            <Separator className="my-3" />
            <button type="button" onClick={() => navigate('/teacher/students')} className="text-xs font-medium text-green-700 hover:underline">Open full student directory →</button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="h-96 rounded-lg border border-neutral-200 bg-white animate-pulse" />
        ) : !selected ? (
          <Card>
            <CardContent className="pt-6">
              <EmptyState title="Select a student" description="Choose a student from the list to view their personal and academic record." icon="Users" />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            <Card>
              <CardContent className="pt-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-green-700 text-white"><User className="h-7 w-7" /></div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">{selected.name}</h3>
                      <p className="text-xs text-neutral-500">Admission {selected.admissionNo || '—'} · Reg. {selected.regNo || 'Not assigned'}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant={selected.status === 'active' ? 'success' : selected.status === 'transferred' ? 'warning' : 'neutral'} size="sm">{selected.status}</Badge>
                        <Badge variant="neutral" size="sm">{selected.gender === 'F' ? 'Female' : 'Male'}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => setEditing(true)}><Pencil className="h-4 w-4" /> Edit details</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card>
                <CardHeader><CardTitle>Personal information</CardTitle></CardHeader>
                <CardContent className="pt-0">
                  <dl className="space-y-3">
                    <DetailRow icon={<User className="h-4 w-4" />} label="Full name" value={selected.name} />
                    <DetailRow icon={<Users className="h-4 w-4" />} label="Gender" value={selected.gender === 'F' ? 'Female' : 'Male'} />
                    <DetailRow icon={<CalendarDays className="h-4 w-4" />} label="Date of birth" value={selected.dateOfBirth ? new Date(selected.dateOfBirth).toLocaleDateString() : 'Not recorded'} />
                    <DetailRow icon={<Hash className="h-4 w-4" />} label="Admission number" value={selected.admissionNo || 'Not assigned'} />
                    <DetailRow icon={<Hash className="h-4 w-4" />} label="Registration number" value={selected.regNo || 'Not assigned'} />
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Academic information</CardTitle></CardHeader>
                <CardContent className="pt-0">
                  <dl className="space-y-3">
                    <DetailRow icon={<GraduationCap className="h-4 w-4" />} label="Class" value={selected.className || 'Unassigned'} />
                    <DetailRow icon={<Users className="h-4 w-4" />} label="Stream" value={selected.streamName || 'No stream'} />
                    <DetailRow icon={<GraduationCap className="h-4 w-4" />} label="Education level" value={selected.educationLevel === 'a_level' ? 'A-Level' : 'O-Level'} />
                    <DetailRow icon={<Hash className="h-4 w-4" />} label="Combination" value={selected.combination || 'Not applicable'} />
                    <DetailRow icon={<CalendarDays className="h-4 w-4" />} label="Registered on" value={new Date(selected.createdAt).toLocaleDateString()} />
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle>School record</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{selected.schoolName || schoolName}</p>
                    <p className="text-xs text-neutral-500">Last updated {new Date(selected.updatedAt).toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/teacher/students')}>Back to directory</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={editing} onOpenChange={(open) => { if (!open && !saving) setEditing(false); }} title="Edit student details" description="Maintain personal information and academic placement." size="lg">
        {selected && (
          <StudentForm initial={selected} submitLabel="Save changes" busy={saving} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
        )}
      </Dialog>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-neutral-400">{icon}</span>
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{label}</dt>
        <dd className="text-sm text-neutral-800">{value}</dd>
      </div>
    </div>
  );
}
