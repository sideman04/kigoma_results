/**
 * Results processing — run and monitor results processing for examinations.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Separator, Select, Option, Dialog,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { resultsService, examinationService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { BarChart3, Shield, Clock, Activity, FileText } from 'lucide-react';
import type { ProcessingRun, Examination } from '../types';

export default function ResultsProcessing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [runs, setRuns] = useState<ProcessingRun[]>([]);
  const [exams, setExams] = useState<Examination[]>([]);
  const [loading, setLoading] = useState(true);
  const [runOpen, setRunOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string>('');

  useEffect(() => {
    resultsService.processingRuns().then((data) => { setRuns(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load processing runs', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    examinationService.list({ pageSize: 100 }).then((res) => setExams(res.data as Examination[]));
  }, [toast]);

  const statusBadge = (status: string) => (
    <Badge variant={status === 'completed' ? 'success' : status === 'running' ? 'warning' : 'neutral'} size="sm">{status.replace('_', ' ')}</Badge>
  );

  async function runProcessing() {
    if (!selectedExam) return;
    setSubmitting(true);
    // Simulate backend call
    setTimeout(() => {
      setSubmitting(false);
      setRunOpen(false);
      toast({ title: 'Processing started', description: `Results processing queued for examination ${selectedExam}.`, variant: 'success' });
      resultsService.processingRuns().then((data) => setRuns(data));
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Processing"
        description="Select an examination and run results processing. Calculations are based on configurable grading rules."
        action={<Button variant="primary" onClick={() => setRunOpen(true)}>Run processing</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={runs.length} label="Processing runs" />
        <Kpi value={runs.filter((r) => r.status === 'completed').length} label="Completed" tone="green" />
        <Kpi value={runs.filter((r) => r.status === 'failed').length} label="Failed" tone="danger" />
        <Kpi value={runs.reduce((acc, r) => acc + r.candidates, 0)} label="Candidates" />
      </div>

      <Card>
        <CardHeader><CardTitle>Processing history</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>Examination</Th><Th className="w-32">Status</Th><Th className="w-32">Progress</Th><Th className="w-32">Candidates</Th><Th className="w-32">Processed</Th><Th className="w-32">Errors</Th><Th className="w-32">Missing</Th><Th className="w-40">Completed</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={8} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : runs.length === 0 ? (
                  <Tr><Td colSpan={8}><EmptyState title="No processing runs" description="Run results processing for an examination." icon="BarChart3" /></Td></Tr>
                ) : (
                  runs.map((r) => (
                    <Tr key={r.id} className="hover:bg-neutral-50/50">
                      <Td>{r.examinationName}</Td>
                      <Td>{statusBadge(r.status)}</Td>
                      <Td>
                        <div className="w-full bg-neutral-100 rounded-full h-2">
                          <div className="bg-green-700 h-2 rounded-full" style={{ width: `${r.progress}%` }} />
                        </div>
                        <span className="text-xs text-neutral-600 block mt-1">{r.progress}%</span>
                      </Td>
                      <Td className="text-sm text-neutral-600">{r.candidates}</Td>
                      <Td className="text-sm text-neutral-600">{r.processed}</Td>
                      <Td className="text-sm text-neutral-600">{r.errors}</Td>
                      <Td className="text-sm text-neutral-600">{r.missingData}</Td>
                      <Td className="text-xs text-neutral-600">{r.completedAt ? new Date(r.completedAt).toLocaleString() : '—'}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={runOpen} onOpenChange={setRunOpen} title="Run results processing" description="Select the examination to process. This will apply grading rules to all submitted marks." size="sm">
        <form className="space-y-4">
          <Select label="Examination" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} required>
            <Option value="">Select an examination</Option>
            {exams.map((e) => <Option key={e.id} value={e.id}>{e.code} · {e.name}</Option>)}
          </Select>
          <p className="text-[10px] text-neutral-500">This is a simulated processing run. In production, the PHP backend performs the actual calculation and writes results to MariaDB.</p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={() => setRunOpen(false)}>Cancel</Button>
            <Button variant="primary" type="button" onClick={runProcessing} disabled={!selectedExam || submitting} isLoading={submitting}>Run processing</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'danger' }) {
  const color = tone === 'green' ? 'text-green-700' : tone === 'danger' ? 'text-red-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}
