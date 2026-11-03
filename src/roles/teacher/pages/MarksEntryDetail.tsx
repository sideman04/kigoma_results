/**
 * Teacher — Marks entry detail (marks grid).
 * Highest-priority teacher screen: efficient, keyboard-friendly marks entry
 * with validation, draft save and submit.
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Separator, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { useToast } from '../../shared/components/ui';
import { marksService, studentService } from '../../shared/services/api';
import { ArrowUp, Clock, Check, AlertCircle, Save, Upload, ArrowRight } from 'lucide-react';

const MAX_MARK = 100;

type MarkRow = {
  studentId: string;
  studentName: string;
  regNo?: string;
  mark: number | null;
  status: 'draft' | 'entered' | 'submitted' | 'returned' | 'verified';
  error?: string;
  touched: boolean;
};

export default function MarksEntryDetail({ basePath = '/teacher' }: { basePath?: string }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [rows, setRows] = useState<MarkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([marksService.getSession(id), marksService.getMarks(id)]).then(([s, m]) => {
      setSession(s);
      setRows((m || []).map((mk) => ({
        studentId: mk.studentId,
        studentName: mk.studentName,
        regNo: mk.regNo,
        mark: mk.mark ?? null,
        status: mk.status,
        error: mk.error,
        touched: false,
      })));
      setLoading(false);
    }).catch((err) => {
      toast({ title: 'Unable to load session', description: err instanceof Error ? err.message : '', variant: 'default' });
      setLoading(false);
    });
  }, [id, toast]);

  const summary = {
    total: rows.length,
    entered: rows.filter((r) => typeof r.mark === 'number').length,
    missing: rows.filter((r) => typeof r.mark !== 'number').length,
    invalid: rows.filter((r) => !!r.error).length,
  };
  const pct = summary.total ? Math.round((summary.entered / summary.total) * 100) : 0;
  const isLocked = session?.status === 'submitted' || session?.status === 'verified';
  const canSubmit = summary.total > 0 && summary.missing === 0 && summary.invalid === 0 && !isLocked;

  const onMarkChange = useCallback((studentId: string, value: string) => {
    const num = value === '' ? null : Number(value);
    setRows((prev) => prev.map((r) => {
      if (r.studentId !== studentId) return r;
      let error: string | undefined;
      if (num === null) { error = undefined; }
      else if (!Number.isFinite(num) || num < 0) error = 'Enter a valid mark';
      else if (num > MAX_MARK) error = `Maximum is ${MAX_MARK}`;
      return { ...r, mark: num, error, status: num === null ? 'draft' : 'entered', touched: true };
    }));
    setLastSaved(null);
  }, []);

  const saveDraft = async () => {
    if (!session) return;
    setSaving(true);
    try {
      await marksService.saveMarks(session.id, rows.map((r) => ({
        studentId: r.studentId,
        studentName: r.studentName,
        regNo: r.regNo,
        mark: r.mark,
        status: r.status,
        error: r.error,
      })));
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast({ title: 'Draft saved', variant: 'success' });
    } catch (err) {
      toast({ title: 'Save failed', description: err instanceof Error ? err.message : '', variant: 'default' });
    } finally {
      setSaving(false);
    }
  };

  const submitMarks = async () => {
    if (!session || !canSubmit) return;
    if (!window.confirm('Submit these marks for school review? You will not be able to edit after submission.')) return;
    setSubmitting(true);
    try {
      await marksService.saveMarks(session.id, rows.map((r) => ({
        studentId: r.studentId,
        studentName: r.studentName,
        regNo: r.regNo,
        mark: r.mark,
        status: 'submitted',
        error: r.error,
      })));
      await marksService.submitSession(session.id);
      toast({ title: 'Marks submitted', variant: 'success' });
      navigate('/teacher/dashboard');
    } catch (err) {
      toast({ title: 'Submit failed', description: err instanceof Error ? err.message : '', variant: 'default' });
    } finally {
      setSubmitting(false);
    }
  };

  const importSheet = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (lines.length < 2) throw new Error('The CSV file has no marks rows.');
      const headers = lines[0]!.split(',').map((header) => header.trim().toLowerCase());
      const regIndex = headers.findIndex((header) => ['regno', 'reg_no', 'registration', 'registration number'].includes(header));
      const markIndex = headers.indexOf('mark');
      if (regIndex < 0 || markIndex < 0) throw new Error('CSV must contain regNo and mark columns.');

      const imported = new Map<string, number | null>();
      lines.slice(1).forEach((line) => {
        const cells = line.split(',').map((cell) => cell.trim());
        const regNo = cells[regIndex];
        const rawMark = cells[markIndex];
        if (!regNo) return;
        imported.set(regNo.toLowerCase(), rawMark === '' ? null : Number(rawMark));
      });

      let matched = 0;
      setRows((current) => current.map((row) => {
        const value = imported.get((row.regNo || '').toLowerCase());
        if (value === undefined) return row;
        matched += 1;
        const error = value !== null && (!Number.isFinite(value) || value < 0 || value > MAX_MARK)
          ? `Enter a mark from 0 to ${MAX_MARK}`
          : undefined;
        return { ...row, mark: value, error, status: value === null ? 'draft' : 'entered', touched: true };
      }));
      setLastSaved(null);
      toast({ title: 'Sheet imported', description: `${matched} matching student row(s) loaded. Review and save the draft.`, variant: 'success' });
    } catch (error) {
      toast({ title: 'Import failed', description: error instanceof Error ? error.message : 'Use a valid CSV file.', variant: 'default' });
    } finally {
      setImporting(false);
    }
  };

  if (loading) return <div className="h-80 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>;
  if (!session) return <div className="p-12 text-center text-neutral-500">Session not found.</div>;

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Marks entry"
        description={`${session.examinationName} · ${session.subjectName} · ${session.className} ${session.streamName ? '· ' + session.streamName : ''}`}
        action={
          <div className="flex items-center gap-2">
            <Link to={`${basePath}/marks-entry`} className="text-xs font-medium text-neutral-600 hover:underline">← Change selection</Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Students" value={summary.total} note="Eligible candidates" icon={<SchoolIcon />} />
        <StatCard title="Entered" value={summary.entered} note="Marks captured" tone="green" icon={<Check className="h-5 w-5" />} />
        <StatCard title="Missing" value={summary.missing} note="No mark yet" tone="warning" icon={<Clock className="h-5 w-5" />} />
        <StatCard title="Completion" value={pct + '%'} note="Entry progress" icon={<ProgressIcon pct={pct} />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter marks</CardTitle>
          <p className="text-[10px] text-neutral-500">Type a mark and press Enter or Tab to move to the next row, or import a CSV sheet. Invalid entries are highlighted in red.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <label className={`inline-flex cursor-pointer items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 ${isLocked || importing ? 'pointer-events-none opacity-50' : ''}`}>
              <Upload className="h-4 w-4" /> {importing ? 'Importing…' : 'Import CSV sheet'}
              <input type="file" accept=".csv,text/csv" className="sr-only" onChange={importSheet} disabled={isLocked || importing} />
            </label>
            <span className="text-[11px] text-neutral-500">Required columns: <code>regNo,mark</code></span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white max-h-[60vh]">
            <table className="table w-full text-sm">
              <thead className="sticky top-0 bg-neutral-50 z-10">
                <tr>
                  <th className="th w-16">#</th>
                  <th className="th w-32">Reg. number</th>
                  <th className="th">Student</th>
                  <th className="th w-24">Mark</th>
                  <th className="th w-24">Max</th>
                  <th className="th w-32">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const invalid = !!row.error;
                  return (
                    <tr key={row.studentId} className={`transition-colors ${invalid ? 'bg-red-50' : 'hover:bg-neutral-50/50'}`}>
                      <Td className="font-mono text-xs text-neutral-500">{i + 1}</Td>
                      <Td className="font-mono text-xs">{row.regNo || '—'}</Td>
                      <Td className={invalid ? 'text-red-800 font-medium' : 'text-neutral-900'}>{row.studentName}</Td>
                      <Td>
                        <Input
                          value={row.mark === null ? '' : String(row.mark)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onMarkChange(row.studentId, e.target.value)}
                          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => setRows((prev) => prev.map((r) => r.studentId === row.studentId ? { ...r, touched: true } : r))}
                          type="number"
                          min="0"
                          max={String(MAX_MARK)}
                          className={`w-20 text-right text-sm border-neutral-200 focus:border-green-700 focus:ring-1 focus:ring-green-700 ${invalid ? 'border-red-600 focus:border-red-600 focus:ring-red-600' : ''}`}
                          placeholder="–"
                          disabled={isLocked}
                        />
                      </Td>
                      <Td className="font-mono text-xs text-neutral-500">{MAX_MARK}</Td>
                      <Td>
                        {invalid ? (
                          <Badge variant="danger" size="sm">{row.error}</Badge>
                        ) : row.mark === null ? (
                          <Badge variant="neutral" size="sm">Not entered</Badge>
                        ) : (
                          <Badge variant="success" size="sm">Entered</Badge>
                        )}
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Session status:</span>
            <StatusBadge status={session.status} size="sm" />
          </div>
          {lastSaved && (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4 text-green-700" />
              <span className="text-xs text-neutral-600">Saved {lastSaved}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={saveDraft} disabled={saving || isLocked} isLoading={saving}>
            <Save className="mr-2 h-4 w-4" /> Save draft
          </Button>
          <Button variant="primary" size="sm" onClick={submitMarks} disabled={submitting || !canSubmit} isLoading={submitting}>
            <Upload className="mr-2 h-4 w-4" /> Submit for review
          </Button>
          {!canSubmit && summary.invalid > 0 && (
            <Button variant="ghost" size="sm" className="text-red-600">Fix {summary.invalid} error(s)</Button>
          )}
        </div>
      </div>

      {summary.invalid > 0 && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <p className="text-sm text-red-800">Please correct invalid entries before submitting.</p>
        </div>
      )}
      {isLocked && (
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          This session has already been submitted and is locked for editing.
        </div>
      )}
    </div>
  );
}

function SchoolIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-6 9 6v10H3zM9 20v-6h6v6" /></svg>; }
function ProgressIcon({ pct }: { pct: number }) { return <div className="w-5 h-5 rounded-full border-2 border-green-200 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-700" style={{ transform: `translate(${pct > 50 ? 4 : -4}px, ${pct > 50 ? 4 : -4}px)` }} /></div>; }
