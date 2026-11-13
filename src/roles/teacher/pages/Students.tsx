/**
 * Teacher — Student directory.
 * Search and filter registered students, view individual profiles and edit
 * personal or academic information. No marks-related data is available here.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StudentForm, type StudentFormValues } from '../components/StudentForm';
import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, EmptyState, Input, Option, Select, useToast,
} from '../../shared/components/ui';
import { studentService } from '../../shared/services/api';
import type { Student } from '../../shared/types';
import { resolveTeacherSchoolId, resolveTeacherSchoolName } from '../utils/scope';
import { Eye, Filter, Pencil, Plus, Search, Users } from 'lucide-react';

export default function TeacherStudents() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [classFilter, setClassFilter] = useState(searchParams.get('class') || '');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editing, setEditing] = useState<Student | null>(null);
  const [saving, setSaving] = useState(false);

  const schoolId = resolveTeacherSchoolId(user);
  const schoolName = resolveTeacherSchoolName(user);

  const load = () => {
    setLoading(true);
    studentService.list({ pageSize: 500, scope: { role: 'teacher', schoolId } })
      .then((res) => {
        setStudents(res.data.filter((student) => student.schoolId === schoolId));
        setError('');
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load students.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [schoolId]);

  const classes = useMemo(() => {
    const map = new Map<string, string>();
    students.forEach((student) => {
      if (student.classId) map.set(student.classId, student.className || student.classId);
    });
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [students]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !query
        || student.name.toLowerCase().includes(query)
        || (student.regNo ?? '').toLowerCase().includes(query)
        || (student.admissionNo ?? '').toLowerCase().includes(query);
      const matchesClass = !classFilter || student.classId === classFilter;
      const matchesGender = !genderFilter || student.gender === genderFilter;
      const matchesStatus = !statusFilter || student.status === statusFilter;
      return matchesSearch && matchesClass && matchesGender && matchesStatus;
    });
  }, [students, search, classFilter, genderFilter, statusFilter]);

  const clearFilters = () => {
    setSearch('');
    setClassFilter('');
    setGenderFilter('');
    setStatusFilter('');
    setSearchParams({});
  };

  const handleUpdate = async (values: StudentFormValues & { className?: string; streamName?: string }) => {
    if (!editing) return;
    setSaving(true);
    try {
      const updated = await studentService.update(editing.id, {
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
        toast({ title: 'Student record updated', description: `${updated.name}’s details were saved.`, variant: 'success' });
      }
      setEditing(null);
    } catch (err) {
      toast({ title: 'Unable to update student', description: err instanceof Error ? err.message : 'Try again.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Students"
        description={`Registered students at ${schoolName}. Search, filter and maintain student records.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}><Plus className="h-4 w-4" /> Register student</Button>}
      />

      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
            <div className="relative flex-1 min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                aria-label="Search students"
                placeholder="Search by name, registration number or admission number…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:w-[38rem]">
              <Select aria-label="Filter by class" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                <Option value="">All classes</Option>
                {classes.map(([id, name]) => <Option key={id} value={id}>{name}</Option>)}
              </Select>
              <Select aria-label="Filter by gender" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                <Option value="">All genders</Option>
                <Option value="F">Female</Option>
                <Option value="M">Male</Option>
              </Select>
              <Select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <Option value="">All statuses</Option>
                <Option value="active">Active</Option>
                <Option value="withdrawn">Withdrawn</Option>
                <Option value="transferred">Transferred</Option>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> Showing {filtered.length} of {students.length} student{students.length === 1 ? '' : 's'}</span>
            {(search || classFilter || genderFilter || statusFilter) && (
              <button type="button" onClick={clearFilters} className="font-medium text-green-700 hover:underline">Clear filters</button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Student directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {error && <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-12 rounded-md bg-neutral-100 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              title={students.length === 0 ? 'No students registered yet' : 'No students match your filters'}
              description={students.length === 0 ? 'Register the first student to start the school register.' : 'Try a different search term or clear the filters.'}
              icon="Users"
              action={students.length === 0
                ? <Button variant="primary" size="sm" onClick={() => navigate('/teacher/register')}>Register student</Button>
                : <Button variant="ghost" size="sm" onClick={clearFilters}>Clear filters</Button>}
            />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="th">Student</th>
                    <th className="th">Registration no.</th>
                    <th className="th">Class / stream</th>
                    <th className="th">Gender</th>
                    <th className="th">Status</th>
                    <th className="th">Registered</th>
                    <th className="th w-32">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => (
                    <tr key={student.id} className="hover:bg-neutral-50/60">
                      <td className="td">
                        <div className="flex items-center gap-3">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-green-50 text-green-700"><Users className="h-4 w-4" /></span>
                          <div>
                            <p className="font-medium text-neutral-900">{student.name}</p>
                            <p className="text-[11px] text-neutral-500">{student.admissionNo || 'No admission no.'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="td font-mono text-xs">{student.regNo || '—'}</td>
                      <td className="td text-sm text-neutral-600">{student.className || 'Unassigned'}{student.streamName ? ` · ${student.streamName}` : ''}</td>
                      <td className="td text-sm text-neutral-600">{student.gender === 'F' ? 'Female' : 'Male'}</td>
                      <td className="td"><Badge variant={student.status === 'active' ? 'success' : student.status === 'transferred' ? 'warning' : 'neutral'} size="sm">{student.status}</Badge></td>
                      <td className="td text-xs text-neutral-500">{new Date(student.createdAt).toLocaleDateString()}</td>
                      <td className="td">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" aria-label={`View ${student.name}`} onClick={() => navigate(`/teacher/student-details?id=${student.id}`)}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" aria-label={`Edit ${student.name}`} onClick={() => setEditing(student)}><Pencil className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!editing}
        onOpenChange={(open) => { if (!open && !saving) setEditing(null); }}
        title="Edit student record"
        description="Update personal information, registration numbers and class placement."
        size="lg"
      >
        {editing && (
          <StudentForm
            initial={editing}
            submitLabel="Save changes"
            busy={saving}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
