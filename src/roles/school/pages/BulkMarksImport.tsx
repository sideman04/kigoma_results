import { useEffect, useMemo, useState } from 'react';
import { FileUp, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Select, Option, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { useToast } from '../../shared/components/ui';
import { useAuth } from '../../../context/AuthContext';
import { examinationService, marksService, studentService, subjectService } from '../../shared/services/api';

type ImportRow = Record<string, string>;
type ImportReport = { subject: string; imported: number; errors: string[] }[];

const classes = [
  { id: 'class-f4', name: 'Form 4' },
  { id: 'class-f6', name: 'Form 6' },
];
const streams = [
  { id: '', name: 'All streams / no stream' },
  { id: 'stream-a', name: 'Stream A' },
  { id: 'stream-b', name: 'Stream B' },
];

function schoolIdFor(user: any) {
  return typeof user?.schoolId === 'number'
    ? `school-s${String(user.schoolId).padStart(4, '0')}`
    : user?.schoolId || 'school-s0101';
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let value = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') { value += '"'; i += 1; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      cells.push(value.trim()); value = '';
    } else value += char;
  }
  cells.push(value.trim());
  return cells;
}

function parseCsv(text: string): ImportRow[] {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error('The CSV must contain a header and at least one student row.');
  const headers = parseCsvLine(lines[0]!).map((header) => header.toLowerCase().replace(/[ _-]/g, ''));
  const regIndex = headers.findIndex((header) => ['regno', 'registrationnumber', 'registration'].includes(header));
  if (regIndex < 0) throw new Error('The CSV must contain a regNo column.');
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    return headers.reduce<ImportRow>((row, header, index) => {
      row[header] = cells[index] || '';
      return row;
    }, {});
  });
}

export default function BulkMarksImport() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const [exams, setExams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [examinationId, setExaminationId] = useState('');
  const [classId, setClassId] = useState('class-f4');
  const [streamId, setStreamId] = useState('');
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState('');
  const [report, setReport] = useState<ImportReport[]>([]);

  useEffect(() => {
    examinationService.list({ pageSize: 100 }).then((response: any) => setExams(response.data));
    subjectService.list().then(setSubjects);
  }, []);

  const selectedExam = exams.find((exam) => exam.id === examinationId);
  const selectedClass = classes.find((item) => item.id === classId);
  const subjectCodes = useMemo(() => new Set(subjects.flatMap((subject) => [subject.code?.toLowerCase(), subject.id?.toLowerCase()]).filter(Boolean)), [subjects]);

  const importFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!examinationId) {
      toast({ title: 'Choose an examination first', description: 'Select the academic context before importing marks.', variant: 'default' });
      return;
    }
    setBusy(true); setFileName(file.name); setReport([]);
    try {
      const rows = parseCsv(await file.text());
      const schoolId = schoolIdFor(user);
      const students = (await studentService.list({ pageSize: 1000, scope: { schoolId } })).data
        .filter((student) => student.classId === classId && (!streamId || student.streamId === streamId));
      const byRegNo = new Map(students.map((student) => [student.regNo?.toLowerCase(), student]));
      const headers = Object.keys(rows[0] || {});
      const subjectHeaders = headers.filter((header) => header !== 'regno' && header !== 'registrationnumber' && header !== 'registration' && subjectCodes.has(header));
      if (!subjectHeaders.length) throw new Error('No recognised subject columns found. Use subject codes such as MAT, ENG, BIO or CHE.');

      const sessions = await marksService.listSessions({ pageSize: 1000, scope: { schoolId } });
      const nextReport: ImportReport[] = [];
      for (const header of subjectHeaders) {
        const subject = subjects.find((item) => item.code?.toLowerCase() === header || item.id?.toLowerCase() === header);
        if (!subject) continue;
        const errors: string[] = [];
        const marks = rows.flatMap((row) => {
          const regNo = row.regno || row.registrationnumber || row.registration;
          const student = byRegNo.get((regNo || '').toLowerCase());
          if (!student) { errors.push(`${regNo || 'Blank registration'} is not in the selected class/stream`); return []; }
          const raw = row[header];
          const mark = raw === '' ? null : Number(raw);
          const error = mark !== null && (!Number.isFinite(mark) || mark < 0 || mark > 100) ? 'Mark must be between 0 and 100' : undefined;
          if (error) errors.push(`${regNo}: ${error}`);
          return [{ studentId: student.id, studentName: student.name, regNo: student.regNo, mark, status: 'draft' as const, error }];
        });
        if (!marks.length) continue;
        const existing = sessions.data.find((session) => session.examinationId === examinationId && session.classId === classId && session.streamId === (streamId || undefined) && session.subjectId === subject.id && !['submitted', 'verified'].includes(session.status));
        const session = existing || await marksService.createSession({
          examinationId,
          examinationName: selectedExam?.name || 'Examination',
          schoolId,
          classId,
          className: selectedClass?.name,
          streamId: streamId || undefined,
          streamName: streams.find((item) => item.id === streamId)?.name,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectCode: subject.code,
          teacherId: user?.username || 'school-admin',
          academicYearId: 'year-2025',
          status: 'draft',
        });
        await marksService.saveMarks(session.id, marks);
        nextReport.push({ subject: subject.code, imported: marks.filter((mark) => !mark.error).length, errors });
      }
      setReport(nextReport);
      toast({ title: 'Bulk import complete', description: `${nextReport.length} subject session(s) were saved as drafts.`, variant: 'success' });
    } catch (error) {
      toast({ title: 'Import failed', description: error instanceof Error ? error.message : 'Check the CSV format and try again.', variant: 'default' });
    } finally { setBusy(false); }
  };

  return (
    <div className="space-y-6">
      <RolePageHeader title="Bulk import marks" description="Import marks for many subjects at once, one row per student." />
      <Card>
        <CardHeader><CardTitle>1. Choose the examination context</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Select value={examinationId} onChange={(event) => setExaminationId(event.target.value)}>
            <Option value="">Select examination</Option>
            {exams.map((exam) => <Option key={exam.id} value={exam.id}>{exam.name}</Option>)}
          </Select>
          <Select value={classId} onChange={(event) => setClassId(event.target.value)}>
            {classes.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
          <Select value={streamId} onChange={(event) => setStreamId(event.target.value)}>
            {streams.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>2. Upload one CSV for all subjects</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-green-300 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Required format</p>
            <code className="mt-2 block overflow-x-auto text-xs text-green-800">regNo,name,MAT,ENG,KIS,BIO,PHY,CHE,GEO,HIS</code>
            <p className="mt-2 text-xs text-green-800">Use subject codes as column names. Leave a cell blank when a student has no mark. Extra columns are ignored.</p>
          </div>
          <label className={`mt-5 inline-flex cursor-pointer items-center gap-2 rounded-md bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 ${busy || !examinationId ? 'pointer-events-none opacity-50' : ''}`}>
            <FileUp className="h-4 w-4" /> {busy ? 'Importing…' : 'Choose CSV file'}
            <input type="file" accept=".csv,text/csv" className="sr-only" onChange={importFile} disabled={busy || !examinationId} />
          </label>
          {fileName && <span className="ml-3 text-sm text-neutral-600">{fileName}</span>}
          <a className="ml-4 inline-flex items-center gap-1 text-sm text-green-700 hover:underline" href={`data:text/csv;charset=utf-8,regNo%2Cname%2CMAT%2CENG%2CKIS%2CBIO%2CPHY%2CCHE%2CGEO%2CHIS%0AS0101%2F0001%2CStudent%20Name%2C78%2C64%2C%2C81%2C%2C%2C%2C`} download="marks-template.csv"><Download className="h-4 w-4" /> Download template</a>
        </CardContent>
      </Card>
      {!!report.length && <Card><CardHeader><CardTitle>Import results</CardTitle></CardHeader><CardContent className="space-y-3">{report.map((item) => <div key={item.subject} className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-neutral-100 p-3"><div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-700" /><span className="font-semibold">{item.subject}</span><Badge variant={item.errors.length ? 'warning' : 'success'} size="sm">{item.imported} saved</Badge></div>{item.errors.length > 0 && <div className="w-full text-xs text-amber-700"><AlertCircle className="mr-1 inline h-3 w-3" />{item.errors.slice(0, 3).join(' · ')}{item.errors.length > 3 ? ` · +${item.errors.length - 3} more` : ''}</div>}</div>)}</CardContent></Card>}
    </div>
  );
}
