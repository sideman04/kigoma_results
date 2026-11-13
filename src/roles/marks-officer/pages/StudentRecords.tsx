/**
 * Marks Entry Officer — Student Examination Records.
 * Read-only view of students in the officer's assigned centres, with subject
 * marks captured across examination sessions.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, EmptyState, Input, Option, Select, useToast } from '../../shared/components/ui';
import { examinationService, marksService, orgService, studentService } from '../../shared/services/api';
import type { Examination, MarkInput, MarksEntrySession, School, Student } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { Eye, GraduationCap, Search, Users } from 'lucide-react';

export default function StudentExaminationRecords() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [students, setStudents] = useState<Student[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [sessions, setSessions] = useState<MarksEntrySession[]>([]);
  const [marksBySession, setMarksBySession] = useState<Record<string, MarkInput[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState(searchParams.get('exam') || '');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);

  useEffect(() => {
    Promise.all([
      studentService.list({ pageSize: 1000 }),
      orgService.listSchools({ pageSize: 100 }),
      examinationService.list({ pageSize: 100 }),
      marksService.listSessions({ pageSize: 300 }),
    ]).then(async ([studentRes, schoolRes, examRes, sessionRes]) => {
      const allSchools = schoolRes.data as School[];
      const schoolIds = resolveOfficerSchoolIds(user, allSchools);
      const scopedSessions = (sessionRes.data as MarksEntrySession[]).filter((session) => schoolIds.includes(session.schoolId));

      setSchools(allSchools.filter((school) => schoolIds.includes(school.id)));
      setStudents(studentRes.data.filter((student) => schoolIds.includes(student.schoolId)));
      setExams(examRes.data as Examination[]);
      setSessions(scopedSessions);

      const markEntries = await Promise.all(scopedSessions.map(async (session) => [session.id, await marksService.getMarks(session.id)] as const));
      setMarksBySession(Object.fromEntries(markEntries));
    }).catch((err) => toast({ title: 'Unable to load student records', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schoolName = (id: string) => schools.find((school) => school.id === id)?.name || id;

  const classes = useMemo(() => {
    const map = new Map<string, string>();
    students.forEach((student) => { if (student.classId) map.set(student.classId, student.className || student.classId); });
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [students]);

  const visibleStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch = !query || student.name.toLowerCase().includes(query) || (student.regNo ?? '').toLowerCase().includes(query);
      const matchesSchool = !schoolFilter || student.schoolId === schoolFilter;
      const matchesClass = !classFilter || student.classId === classFilter;
      return matchesSearch && matchesSchool && matchesClass;
    });
  }, [students, search, schoolFilter, classFilter]);

  const recordFor = (student: Student) => {
    const relevantSessions = sessions.filter((session) => {
      const sameExam = !examFilter || session.examinationId === examFilter;
      const sameSchool = session.schoolId === student.schoolId;
      const sameClass = !session.classId || session.classId === student.classId;
      const sameStream = !session.streamId || session.streamId === student.streamId;
      return sameExam && sameSchool && sameClass && sameStream;
    });

    const subjectRows = relevantSessions.map((session) => {
      const mark = (marksBySession[session.id] || []).find((item) => item.studentId === student.id);
      return { session, mark };
    }).filter((row) => !!row.mark);

    const entered = subjectRows.filter((row) => typeof row.mark?.mark === 'number').length;
    const lastUpdated = relevantSessions.reduce<string | undefined>((latest, session) => {
      if (!latest) return session.updatedAt;
      return new Date(session.updatedAt) > new Date(latest) ? session.updatedAt : latest;
    }, undefined);

    return { subjectRows, entered, lastUpdated };
  };

  const selectedRecord = selected ? recordFor(selected) : null;

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Student Examination Records"
        description={`Read-only examination marks records for students in ${officerScopeLabel(user)}.`}
        action={<Button variant="primary" size="sm" onClick={() => navigate('/marks-officer/enter-marks')}>Enter marks</Button>}
      />

      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input placeholder="Search student by name or registration number…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search students" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 xl:w-[36rem]">
              <Select value={examFilter} onChange={(e) => setExamFilter(e.target.value)} aria-label="Filter by examination">
                <Option value="">All examinations</Option>
                {exams.map((exam) => <Option key={exam.id} value={exam.id}>{exam.name}</Option>)}
              </Select>
              <Select value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)} aria-label="Filter by school">
                <Option value="">All centres</Option>
                {schools.map((school) => <Option key={school.id} value={school.id}>{school.name}</Option>)}
              </Select>
              <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} aria-label="Filter by class">
                <Option value="">All classes</Option>
                {classes.map(([id, name]) => <Option key={id} value={id}>{name}</Option>)}
              </Select>
            </div>
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-500"><Users className="h-3.5 w-3.5" /> Showing {visibleStudents.length} of {students.length} students</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Student examination records</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-2">{[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-12 rounded-md bg-neutral-100 animate-pulse" />)}</div>
          ) : visibleStudents.length === 0 ? (
            <EmptyState title="No students found" description="No student matches the selected centre, class or search term." icon="Users" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="th">Student</th>
                    <th className="th">Registration no.</th>
                    <th className="th">School / centre</th>
                    <th className="th">Class</th>
                    <th className="th">Subjects recorded</th>
                    <th className="th">Last update</th>
                    <th className="th w-24">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleStudents.map((student) => {
                    const record = recordFor(student);
                    return (
                      <tr key={student.id} className="hover:bg-neutral-50/60">
                        <td className="td font-medium text-neutral-900">{student.name}</td>
                        <td className="td font-mono text-xs">{student.regNo || '—'}</td>
                        <td className="td text-sm text-neutral-600">{schoolName(student.schoolId)}</td>
                        <td className="td text-sm text-neutral-600">{student.className || '—'}{student.streamName ? ` · ${student.streamName}` : ''}</td>
                        <td className="td">
                          <Badge variant={record.entered > 0 ? 'success' : 'neutral'} size="sm">{record.entered} subject{record.entered === 1 ? '' : 's'}</Badge>
                        </td>
                        <td className="td text-xs text-neutral-500">{record.lastUpdated ? new Date(record.lastUpdated).toLocaleDateString() : 'No marks yet'}</td>
                        <td className="td">
                          <Button variant="ghost" size="sm" onClick={() => setSelected(student)} aria-label={`View ${student.name} examination record`}><Eye className="h-4 w-4" /></Button>
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

      <Dialog
        open={!!selected}
        onOpenChange={(open) => { if (!open) setSelected(null); }}
        title={selected ? `${selected.name} — examination record` : 'Student examination record'}
        description={selected ? `${selected.regNo || 'No registration number'} · ${selected.className || 'Unassigned'}${selected.streamName ? ` · ${selected.streamName}` : ''} · ${schoolName(selected.schoolId)}` : undefined}
        size="lg"
      >
        {selected && selectedRecord && (
          selectedRecord.subjectRows.length === 0 ? (
            <EmptyState title="No marks recorded" description="No examination marks have been entered for this student in the selected examination scope." icon="GraduationCap" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200">
              <table className="table w-full text-sm">
                <thead className="bg-neutral-50">
                  <tr><th className="th">Examination</th><th className="th">Subject</th><th className="th text-right">Mark</th><th className="th">Status</th></tr>
                </thead>
                <tbody>
                  {selectedRecord.subjectRows.map(({ session, mark }) => (
                    <tr key={session.id}>
                      <td className="td">{session.examinationName}</td>
                      <td className="td">{session.subjectName}</td>
                      <td className="td text-right font-mono">{mark?.mark ?? '—'}</td>
                      <td className="td"><StatusBadge status={mark?.status || session.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </Dialog>

      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 h-5 w-5 text-green-700" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Scope-wide student access</p>
            <p className="mt-1 text-xs text-neutral-500">This register includes every student in the schools or examination centres assigned to you. It is not limited to students you personally registered.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
