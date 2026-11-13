/**
 * Marks Entry Officer — Enter Marks.
 *
 * Context selector for academic year, examination, school/examination centre,
 * class, stream and subject, followed by the eligible student register for the
 * selected centre. Opening marks entry creates a draft session (or resumes an
 * existing one) and navigates to the structured marks grid.
 *
 * There are no teacher-subject restrictions for this role: officers can enter
 * marks for all students in their assigned scope.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, EmptyState, Option, Select, useToast } from '../../shared/components/ui';
import {
  academicYearService, classService, examinationService, marksService, orgService, streamService, studentService, subjectService,
} from '../../shared/services/api';
import type { AcademicYear, Examination, MarksEntrySession, School, Subject } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { ArrowRight, CheckCircle, ClipboardList, GraduationCap, Info, Users } from 'lucide-react';

export default function EnterMarks() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [classes, setClasses] = useState<Array<{ id: string; name: string }>>([]);
  const [streams, setStreams] = useState<Array<{ id: string; name: string; classId: string }>>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<MarksEntrySession[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    academicYearId: '',
    examinationId: '',
    schoolId: '',
    classId: '',
    streamId: '',
    subjectId: '',
  });

  useEffect(() => {
    Promise.all([
      academicYearService.list(),
      examinationService.list({ pageSize: 100 }),
      orgService.listSchools({ pageSize: 100 }),
      classService.list({ pageSize: 50 }),
      streamService.list({ pageSize: 50 }),
      subjectService.list(),
      marksService.listSessions({ pageSize: 200 }),
    ]).then(([yearData, examRes, schoolRes, classRes, streamRes, subjectData, sessionRes]) => {
      const allSchools = schoolRes.data as School[];
      const scopedSchoolIds = resolveOfficerSchoolIds(user, allSchools);
      const scopedSchools = allSchools.filter((school) => scopedSchoolIds.includes(school.id));
      const examList = examRes.data as Examination[];

      setYears(yearData);
      setExams(examList);
      setSchools(scopedSchools);
      setClasses(classRes.data);
      setStreams(streamRes.data);
      setSubjects(subjectData);
      setSessions((sessionRes.data as MarksEntrySession[]).filter((session) => scopedSchoolIds.includes(session.schoolId)));

      const requestedExam = searchParams.get('exam');
      const selectedExam = examList.find((exam) => exam.id === requestedExam);
      setForm((current) => ({
        ...current,
        examinationId: selectedExam?.id || '',
        academicYearId: selectedExam?.academicYearId || '',
        schoolId: scopedSchools.length === 1 ? scopedSchools[0]!.id : '',
      }));
    }).catch((err) => toast({ title: 'Unable to prepare marks entry', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!form.schoolId || !form.classId) {
      setStudents([]);
      return;
    }
    setLoadingStudents(true);
    studentService.list({ pageSize: 1000 })
      .then((res) => {
        setStudents(res.data.filter((student) =>
          student.schoolId === form.schoolId
          && student.classId === form.classId
          && (!form.streamId || student.streamId === form.streamId)
          && student.status === 'active'
        ));
      })
      .catch(() => setStudents([]))
      .finally(() => setLoadingStudents(false));
  }, [form.schoolId, form.classId, form.streamId]);

  const classStreams = useMemo(() => streams.filter((stream) => !form.classId || stream.classId === form.classId), [streams, form.classId]);

  const existingSession = useMemo(() => sessions.find((session) =>
    session.examinationId === form.examinationId
    && session.schoolId === form.schoolId
    && session.classId === form.classId
    && session.subjectId === form.subjectId
    && (!form.streamId || session.streamId === form.streamId)
  ), [sessions, form]);

  const selectedSchool = schools.find((school) => school.id === form.schoolId);
  const selectedExam = exams.find((exam) => exam.id === form.examinationId);
  const selectedClass = classes.find((item) => item.id === form.classId);
  const selectedStream = streams.find((item) => item.id === form.streamId);
  const selectedSubject = subjects.find((item) => item.id === form.subjectId);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.academicYearId) next.academicYearId = 'Select an academic year.';
    if (!form.examinationId) next.examinationId = 'Select an examination.';
    if (!form.schoolId) next.schoolId = 'Select a school or examination centre.';
    if (!form.classId) next.classId = 'Select a class.';
    if (!form.subjectId) next.subjectId = 'Select a subject.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const startEntry = async () => {
    if (!validate()) return;
    if (existingSession) {
      navigate(`/marks-officer/enter-marks/${existingSession.id}`);
      return;
    }
    if (!students.length) {
      toast({ title: 'No eligible students', description: 'No active students are registered for the selected class and stream.', variant: 'destructive' });
      return;
    }

    setStarting(true);
    try {
      const session = await marksService.createSession({
        examinationId: form.examinationId,
        examinationName: selectedExam?.name || 'Examination',
        schoolId: form.schoolId,
        classId: form.classId,
        className: selectedClass?.name,
        streamId: form.streamId || undefined,
        streamName: selectedStream?.name,
        subjectId: form.subjectId,
        subjectName: selectedSubject?.name,
        subjectCode: selectedSubject?.code,
        teacherId: user?.username || 'marks-officer',
        academicYearId: form.academicYearId,
        status: 'draft',
        totalStudents: students.length,
        enteredCount: 0,
        submittedCount: 0,
        missingCount: students.length,
        invalidCount: 0,
      });
      await marksService.saveMarks(session.id, students.map((student: any) => ({
        studentId: student.id,
        studentName: student.name,
        regNo: student.regNo,
        mark: null,
        status: 'draft' as const,
      })));
      toast({ title: 'Marks session opened', description: `${students.length} student record${students.length === 1 ? '' : 's'} loaded for entry.`, variant: 'success' });
      navigate(`/marks-officer/enter-marks/${session.id}`);
    } catch (err) {
      toast({ title: 'Unable to open marks entry', description: err instanceof Error ? err.message : 'Try again.', variant: 'destructive' });
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <RolePageHeader title="Enter Marks" description="Select the examination context and enter marks." />
        <div className="h-72 rounded-lg border border-neutral-200 bg-white animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Enter Marks"
        description={`Select an examination, centre and subject. Scope: ${officerScopeLabel(user)}.`}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Marks entry context</CardTitle>
            <p className="text-xs text-neutral-500">All selections are required before the student marks grid can be opened.</p>
          </CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Academic year" value={form.academicYearId} onChange={(e) => setForm({ ...form, academicYearId: e.target.value })} error={errors.academicYearId} required>
                <Option value="">Select academic year</Option>
                {years.map((year) => <Option key={year.id} value={year.id}>{year.label}</Option>)}
              </Select>
              <Select
                label="Examination"
                value={form.examinationId}
                onChange={(e) => {
                  const exam = exams.find((item) => item.id === e.target.value);
                  setForm({ ...form, examinationId: e.target.value, academicYearId: exam?.academicYearId || form.academicYearId });
                  setErrors((current) => ({ ...current, examinationId: '' }));
                }}
                error={errors.examinationId}
                required
              >
                <Option value="">Select examination</Option>
                {exams.map((exam) => <Option key={exam.id} value={exam.id}>{exam.name} ({exam.status})</Option>)}
              </Select>
            </div>

            <Select label="School / Examination Centre" value={form.schoolId} onChange={(e) => { setForm({ ...form, schoolId: e.target.value, classId: '', streamId: '', subjectId: '' }); setErrors((current) => ({ ...current, schoolId: '' })); }} error={errors.schoolId} required>
              <Option value="">Select school or examination centre</Option>
              {schools.map((school) => <Option key={school.id} value={school.id}>{school.name} ({school.code})</Option>)}
            </Select>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select label="Class" value={form.classId} onChange={(e) => { setForm({ ...form, classId: e.target.value, streamId: '', subjectId: '' }); setErrors((current) => ({ ...current, classId: '' })); }} error={errors.classId} required>
                <Option value="">Select class</Option>
                {classes.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
              <Select label="Stream" value={form.streamId} onChange={(e) => setForm({ ...form, streamId: e.target.value })} disabled={!form.classId}>
                <Option value="">All streams / none</Option>
                {classStreams.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
              </Select>
              <Select label="Subject" value={form.subjectId} onChange={(e) => { setForm({ ...form, subjectId: e.target.value }); setErrors((current) => ({ ...current, subjectId: '' })); }} error={errors.subjectId} required>
                <Option value="">Select subject</Option>
                {subjects.map((subject) => <Option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</Option>)}
              </Select>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                <p className="text-xs text-blue-800">
                  Officers can enter marks for every active student in the selected school or examination centre. Subject choices are not restricted to teacher assignments.
                </p>
              </div>
            </div>

            {existingSession && (
              <div className="rounded-lg border border-amber-100 bg-amber-50 p-3 text-xs text-amber-800">
                An existing <strong>{existingSession.status}</strong> session already exists for this examination, centre, class and subject. Opening entry will resume that session.
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <p className="text-xs text-neutral-500">{selectedExam ? `Selected: ${selectedExam.name}` : 'No examination selected'}</p>
              <Button variant="primary" size="sm" onClick={startEntry} isLoading={starting} disabled={!students.length || loadingStudents}>
                {existingSession ? 'Resume marks entry' : 'Open marks grid'} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Eligible students</CardTitle>
            <p className="text-xs text-neutral-500">{selectedSchool ? selectedSchool.name : 'Select a school or centre to preview the student register.'}</p>
          </CardHeader>
          <CardContent className="pt-0">
            {!form.schoolId || !form.classId ? (
              <EmptyState title="Select a centre and class" description="Eligible students will appear here before you open the marks grid." icon="Users" />
            ) : loadingStudents ? (
              <div className="space-y-2">{[1, 2, 3, 4].map((item) => <div key={item} className="h-10 rounded-md bg-neutral-100 animate-pulse" />)}</div>
            ) : students.length === 0 ? (
              <EmptyState title="No eligible students" description="No active students are registered for this class and stream at the selected centre." icon="Users" />
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {students.length} student{students.length === 1 ? '' : 's'}</span>
                  <Badge variant="success" size="sm">Ready</Badge>
                </div>
                <div className="max-h-72 overflow-y-auto rounded-lg border border-neutral-200">
                  <table className="table w-full text-sm">
                    <thead className="sticky top-0 bg-neutral-50">
                      <tr><th className="th">Student</th><th className="th">Reg. no.</th></tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="td text-sm">{student.name}</td>
                          <td className="td font-mono text-[11px] text-neutral-500">{student.regNo || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              Marks are saved as a draft before submission.
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <SummaryItem icon={<GraduationCap className="h-4 w-4" />} label="Examination" value={selectedExam?.name || 'Not selected'} />
            <SummaryItem icon={<ClipboardList className="h-4 w-4" />} label="Subject" value={selectedSubject ? `${selectedSubject.code} · ${selectedSubject.name}` : 'Not selected'} />
            <SummaryItem icon={<Users className="h-4 w-4" />} label="Class / centre" value={`${selectedClass?.name || '—'}${selectedStream ? ` · ${selectedStream.name}` : ''}${selectedSchool ? ` · ${selectedSchool.code}` : ''}`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-neutral-400">{icon}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
        <p className="text-sm text-neutral-800">{value}</p>
      </div>
    </div>
  );
}
