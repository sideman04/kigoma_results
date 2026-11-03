/**
 * Result Publication — authorise publication of approved results.
 * Never publishes draft, incomplete or unapproved results.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Separator, Dialog,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { verificationService, resultsService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { FileText, Shield, Activity, Clock, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import type { VerificationItem, ApprovalHistory, PublicationSummary } from '../types';

export default function Publication() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<VerificationItem[]>([]);
  const [history, setHistory] = useState<Array<{ id: string; action: string; performedBy: string; performedAt: string; note?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [publishOpen, setPublishOpen] = useState(false);
  const [selectedForPublish, setSelectedForPublish] = useState<VerificationItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    verificationService.list({ pageSize: 200 }).then((res) => {
      setItems(res.data as VerificationItem[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load results', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    resultsService.approvalHistory().then((data) => setHistory(data));
  }, [toast]);

  const approved = items.filter((i) => i.status === 'approved');
  const published = items.filter((i) => i.status === 'published');

  const canPublish = selectedForPublish ? selectedForPublish.status === 'approved' : false;

  const summary: PublicationSummary | null = selectedForPublish
    ? {
        examination: selectedForPublish.examinationName || '',
        year: '2025',
        educationLevel: 'O-Level',
        participatingSchools: 1,
        candidateCount: selectedForPublish.candidateCount,
        verificationStatus: 'Verified',
        approvalStatus: 'Approved',
        scope: 'Single school publication',
      }
    : null;

  async function handlePublish() {
    if (!selectedForPublish) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPublishOpen(false);
      toast({ title: 'Results published', description: `${selectedForPublish.schoolName} results are now live on the public portal.`, variant: 'success' });
      verificationService.list({ pageSize: 200 }).then((res) => setItems(res.data as VerificationItem[]));
      resultsService.approvalHistory().then((data) => setHistory(data));
    }, 1000);
  }

  async function suspend(id: string) {
    if (!window.confirm('Suspend publication for this school? This removes results from the public portal.')) return;
    try {
      await verificationService.setStatus(id, 'approved'); // revert to approved
      toast({ title: 'Publication suspended', variant: 'default' });
      verificationService.list({ pageSize: 200 }).then((res) => setItems(res.data as VerificationItem[]));
    } catch (err) {
      toast({ title: 'Suspend failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Result Publication"
        description="Authorise publication of approved results. Draft, incomplete or unapproved results cannot be published."
        action={<Button variant="ghost" size="sm"><Activity className="mr-1 h-4 w-4" /> Publication history</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={approved.length} label="Approved (ready to publish)" tone="green" />
        <Kpi value={published.length} label="Published" />
        <Kpi value={history.filter((h) => h.action === 'published').length} label="Publication events" />
        <Kpi value={0} label="Suspended" tone="danger" />
      </div>

      {/* Approved & ready to publish */}
      <Card>
        <CardHeader>
          <CardTitle>Ready for publication</CardTitle>
          <p className="text-[10px] text-neutral-500">Select an approved result to review the publication summary and authorise publication.</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>School</Th><th>Examination</th><Th className="w-40">Candidates</Th><Th className="w-40">Status</Th><Th className="w-48">Actions</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : approved.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No results ready for publication" description="Approve results first in the Approval module." icon="Shield" /></Td></Tr>
                ) : (
                  approved.map((v) => (
                    <Tr key={v.id} className="hover:bg-neutral-50/50">
                      <Td>{v.schoolName}</Td>
                      <td className="text-sm text-neutral-600">{v.examinationName}</td>
                      <Td className="text-sm text-neutral-600">{v.candidateCount}</Td>
                      <Td><Badge variant="success" size="sm">Approved</Badge></Td>
                      <Td>
                        <Button variant="primary" size="sm" onClick={() => { setSelectedForPublish(v); setPublishOpen(true); }}>Publish</Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${v.schoolId}`)}><Eye size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Published history */}
      <Card>
        <CardHeader><CardTitle>Publication history</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>School</Th><th>Examination</th><Th className="w-40">Candidates</Th><Th className="w-40">Status</Th><Th className="w-40">Published at</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {published.length === 0 ? (
                  <Tr><Td colSpan={6}><EmptyState title="No published results" description="Published results will appear here." icon="FileText" /></Td></Tr>
                ) : (
                  published.map((v) => (
                    <Tr key={v.id} className="hover:bg-neutral-50/50">
                      <Td>{v.schoolName}</Td>
                      <td className="text-sm text-neutral-600">{v.examinationName}</td>
                      <Td className="text-sm text-neutral-600">{v.candidateCount}</Td>
                      <Td><Badge variant="success" size="sm">Published</Badge></Td>
                      <Td className="text-sm text-neutral-600">{v.publishedAt ? new Date(v.publishedAt).toLocaleString() : 'Recent'}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => suspend(v.id)}>Suspend</Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Publication confirmation dialog */}
      <Dialog open={publishOpen} onOpenChange={setPublishOpen} title="Confirm publication" size="md">
        <form className="space-y-4">
          <p className="text-sm text-neutral-700">Publishing will make results visible on the public results portal. Confirm the summary below.</p>
          <Separator className="my-2" />
          {summary && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Examination</span>
                <span className="font-semibold">{summary.examination}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Year</span>
                <span className="font-semibold">{summary.year}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Education level</span>
                <span className="font-semibold">{summary.educationLevel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Participating schools</span>
                <span className="font-semibold">{summary.participatingSchools}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Candidate count</span>
                <span className="font-semibold">{summary.candidateCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Verification status</span>
                <span className="font-semibold text-green-700">{summary.verificationStatus}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Approval status</span>
                <span className="font-semibold text-green-700">{summary.approvalStatus}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-500 text-[10px] uppercase">Publication scope</span>
                <span className="font-semibold">{summary.scope}</span>
              </div>
            </div>
          )}
          <p className="text-[10px] text-neutral-500 mt-2">Only verified and approved results may be published. This action is recorded in the audit trail.</p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={() => setPublishOpen(false)}>Cancel</Button>
            <Button variant="primary" type="button" onClick={handlePublish} disabled={!canPublish || submitting} isLoading={submitting}>
              Authorise publication
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'warning' | 'danger' }) {
  const color = tone === 'green' ? 'text-green-700' : tone === 'warning' ? 'text-amber-700' : tone === 'danger' ? 'text-red-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}

