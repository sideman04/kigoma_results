/**
 * Results verification — pending verification queue and school submission details.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Select, Option,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { verificationService, examinationService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Shield, Activity, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import type { VerificationItem } from '../types';

type RecordStatus = 'draft' | 'submitted' | 'under_review' | 'returned_for_correction' | 'verified' | 'approved' | 'published';

export default function Verification() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [items, setItems] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RecordStatus | 'all'>('all');

  useEffect(() => {
    verificationService.list({ pageSize: 200 }).then((res) => {
      setItems(res.data as VerificationItem[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load verification queue', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.status === filter);

  const counts = {
    under_review: items.filter((i) => i.status === 'under_review').length,
    returned: items.filter((i) => i.status === 'returned_for_correction').length,
    verified: items.filter((i) => i.status === 'verified').length,
  };

  const statusVariant = (status: RecordStatus) => {
    switch (status) {
      case 'verified': return 'success';
      case 'approved': return 'success';
      case 'returned_for_correction': return 'danger';
      case 'under_review': return 'warning';
      default: return 'neutral';
    }
  };

  async function setStatus(id: string, status: RecordStatus) {
    try {
      await verificationService.setStatus(id, status);
      toast({ title: 'Verification updated', variant: 'success' });
      verificationService.list({ pageSize: 200 }).then((res) => setItems(res.data as VerificationItem[]));
    } catch (err) {
      toast({ title: 'Update failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Results Verification"
        description="Monitor verification and inspect school submissions before approval."
        action={<Button variant="ghost" size="sm"><Activity className="mr-1 h-4 w-4" /> View all submissions</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={counts.under_review} label="Under review" tone="warning" />
        <Kpi value={counts.returned} label="Returned for correction" tone="danger" />
        <Kpi value={counts.verified} label="Verified" tone="green" />
        <Kpi value={filtered.length} label="In view" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification queue</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-3 mb-3">
            <Select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="w-64">
              <Option value="all">All statuses</Option>
              <Option value="under_review">Under review</Option>
              <Option value="returned_for_correction">Returned for correction</Option>
              <Option value="verified">Verified</Option>
              <Option value="approved">Approved</Option>
            </Select>
          </div>
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>School</Th><th>Examination</th><Th className="w-40">Candidates</Th><Th className="w-40">Status</Th><Th className="w-32">Exceptions</Th><Th className="w-32">Reviewer</Th><Th className="w-48">Actions</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={7} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : filtered.length === 0 ? (
                  <Tr><Td colSpan={7}><EmptyState title="No verification records" description="No submissions match your filter." icon="Shield" /></Td></Tr>
                ) : (
                  filtered.map((v) => (
                    <Tr key={v.id} className="hover:bg-neutral-50/50">
                      <Td>{v.schoolName}</Td>
                      <td className="text-sm text-neutral-600">{v.examinationName}</td>
                      <Td className="text-sm text-neutral-600">{v.candidateCount}</Td>
                      <Td><Badge variant={statusVariant(v.status)} size="sm">{v.status.replace(/_/g, ' ')}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{v.validationExceptions}</Td>
                      <Td className="text-sm text-neutral-600">{v.reviewerName || '—'}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${v.schoolId}`)}><Eye size={16} /></Button>
                        {v.status === 'under_review' && (
                          <Button variant="primary" size="sm" onClick={() => setStatus(v.id, 'verified')}>Verify</Button>
                        )}
                        {v.status === 'submitted' && (
                          <Button variant="ghost" size="sm" onClick={() => setStatus(v.id, 'under_review')}>Start review</Button>
                        )}
                        {v.status === 'returned_for_correction' && (
                          <Button variant="ghost" size="sm" onClick={() => setStatus(v.id, 'under_review')}>Re-review</Button>
                        )}
                      </Td>
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
