/**
 * Result Approval — approve verified results for publication.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { verificationService, resultsService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Shield, Activity, Clock, FileText, AlertTriangle } from 'lucide-react';
import type { VerificationItem, ApprovalHistory } from '../types';

export default function Approval() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<VerificationItem[]>([]);
  const [history, setHistory] = useState<ApprovalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificationService.list({ pageSize: 200 }).then((res) => {
      setItems(res.data as VerificationItem[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load items', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    resultsService.approvalHistory().then((data) => setHistory(data));
  }, [toast]);

  const pendingApproval = items.filter((i) => i.status === 'verified');
  const approved = items.filter((i) => i.status === 'approved');

  const statusVariant = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'approved': return 'success';
      case 'returned_for_correction': return 'danger';
      case 'under_review': return 'warning';
      default: return 'neutral';
    }
  };

  async function approve(id: string) {
    try {
      await verificationService.setStatus(id, 'approved');
      toast({ title: 'Results approved', variant: 'success' });
      verificationService.list({ pageSize: 200 }).then((res) => setItems(res.data as VerificationItem[]));
      resultsService.approvalHistory().then((data) => setHistory(data));
    } catch (err) {
      toast({ title: 'Approval failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    }
  }

  async function returnForCorrection(id: string) {
    try {
      await verificationService.setStatus(id, 'returned_for_correction');
      toast({ title: 'Returned for correction', variant: 'default' });
      verificationService.list({ pageSize: 200 }).then((res) => setItems(res.data as VerificationItem[]));
    } catch (err) {
      toast({ title: 'Update failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Result Approval"
        description="Approve verified results. Only approved results may proceed to publication."
        action={<Button variant="ghost" size="sm"><Activity className="mr-1 h-4 w-4" /> Approval history</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={pendingApproval.length} label="Awaiting approval" tone="warning" />
        <Kpi value={approved.length} label="Approved" tone="green" />
        <Kpi value={history.filter((h) => h.action === 'approved').length} label="Approval actions" />
        <Kpi value={history.filter((h) => h.action === 'returned').length} label="Returned" tone="danger" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval queue</CardTitle>
          <p className="text-[10px] text-neutral-500">Verified results awaiting Super Administrator authorisation.</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>School</Th><th>Examination</th><Th className="w-40">Candidates</Th><Th className="w-40">Status</Th><Th className="w-32">Exceptions</Th><Th className="w-60">Actions</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={6} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : pendingApproval.length === 0 ? (
                  <Tr><Td colSpan={6}><EmptyState title="Nothing awaiting approval" description="All verified results have been approved or none are ready." icon="Shield" /></Td></Tr>
                ) : (
                  pendingApproval.map((v) => (
                    <Tr key={v.id} className="hover:bg-neutral-50/50">
                      <Td>{v.schoolName}</Td>
                      <td className="text-sm text-neutral-600">{v.examinationName}</td>
                      <Td className="text-sm text-neutral-600">{v.candidateCount}</Td>
                      <Td><Badge variant="success" size="sm">Verified</Badge></Td>
                      <Td className="text-sm text-neutral-600">{v.validationExceptions}</Td>
                      <Td>
                        <div className="flex gap-1">
                          <Button variant="primary" size="sm" onClick={() => approve(v.id)}>Approve</Button>
                          <Button variant="ghost" size="sm" onClick={() => returnForCorrection(v.id)}>Return</Button>
                        </div>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Approval history</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Action</Th><th>Examination</th><Th className="w-40">Performed by</Th><Th className="w-40">When</Th><Th className="w-48">Note</Th></Tr></Thead>
              <Tbody>
                {history.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No approval history" /></Td></Tr>
                ) : (
                  history.map((h) => (
                    <Tr key={h.id} className="hover:bg-neutral-50/50">
                      <Td><Badge variant="neutral" size="sm">{h.action.replace('_', ' ')}</Badge></Td>
                      <td className="text-sm text-neutral-600">{h.examinationId}</td>
                      <Td className="text-sm text-neutral-600">{h.performedBy}</Td>
                      <Td className="text-sm text-neutral-600">{new Date(h.performedAt).toLocaleString()}</Td>
                      <Td className="text-sm text-neutral-600">{h.note || '—'}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
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
