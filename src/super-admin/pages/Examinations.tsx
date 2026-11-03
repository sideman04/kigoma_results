/**
 * Examination management — create, configure and monitor examinations.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { examinationService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, ClipboardList, Activity } from 'lucide-react';
import type { Examination } from '../types';
import { z } from 'zod';

const examSchema = z.object({
  code: z.string().min(2, 'Exam code is required.').max(20),
  name: z.string().min(2, 'Exam name is required.'),
  type: z.enum(['csee', 'acsee', 'mock', 'terminal']),
  academicYearId: z.string().min(1, 'Select an academic year.'),
  educationLevelId: z.string().min(1, 'Select an education level.'),
  status: z.enum(['draft', 'open', 'closed', 'archived']),
});

export default function Examinations() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Examination[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Examination | null>(null);
  const [form, setForm] = useState<{ code: string; name: string; type: string; academicYearId: string; educationLevelId: string; status: string; marksSubmissionOpen: boolean }>({
    code: '', name: '', type: 'csee', academicYearId: '', educationLevelId: '', status: 'draft', marksSubmissionOpen: false,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    examinationService.list({ pageSize: 100 }).then((res) => {
      setExams(res.data as Examination[]);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load examinations', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = examSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await examinationService.update(editing.id, {
          code: form.code, name: form.name, type: form.type as any,
          academicYearId: form.academicYearId, educationLevelId: form.educationLevelId,
          status: form.status as any, marksSubmissionOpen: form.marksSubmissionOpen,
        });
        toast({ title: 'Examination updated', variant: 'success' });
      } else {
        await examinationService.create({
          code: form.code, name: form.name, type: form.type as any,
          academicYearId: form.academicYearId, educationLevelId: form.educationLevelId,
          status: form.status as any, marksSubmissionOpen: form.marksSubmissionOpen,
        });
        toast({ title: 'Examination created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ code: '', name: '', type: 'csee', academicYearId: '', educationLevelId: '', status: 'draft', marksSubmissionOpen: false });
      examinationService.list({ pageSize: 100 }).then((res) => setExams(res.data as Examination[]));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(e: Examination) {
    setEditing(e);
    setForm({ code: e.code, name: e.name, type: e.type, academicYearId: e.academicYearId, educationLevelId: e.educationLevelId, status: e.status, marksSubmissionOpen: e.marksSubmissionOpen });
    setEditOpen(true);
  }

  const statusBadge = (status: string) => (
    <Badge variant={status === 'open' ? 'success' : status === 'draft' ? 'neutral' : status === 'closed' ? 'warning' : 'neutral'}>{status.replace('_', ' ')}</Badge>
  );
  const typeLabel = (t: string) => t.toUpperCase();

  return (
    <div className="space-y-6">
      <PageHeader title="Examination Management" description="Create and configure examinations. O-Level and A-Level configurations are kept separate." action={<Button variant="primary" onClick={() => { setForm({ code: '', name: '', type: 'csee', academicYearId: '', educationLevelId: '', status: 'draft', marksSubmissionOpen: false }); setAddOpen(true); }}><Plus size={18} /> Create examination</Button>} />

      <Card>
        <CardHeader><CardTitle>Examinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code</Th><Th>Name</Th><Th className="w-32">Type</Th><Th className="w-32">Year / Level</Th>
                  <Th className="w-32">Status</Th><Th className="w-32">Submissions</Th><Th className="w-32">Submission open</Th><Th className="w-52">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={8} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : exams.length === 0 ? (
                  <Tr><Td colSpan={8}><EmptyState title="No examinations" description="Create your first examination." action={<Button variant="ghost" size="sm">Create examination</Button>} icon="ClipboardList" /></Td></Tr>
                ) : (
                  exams.map((e) => (
                    <Tr key={e.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{e.code}</Td>
                      <Td>{e.name}</Td>
                      <Td><Badge variant="neutral" size="sm">{typeLabel(e.type)}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{e.academicYearName} · {e.educationLevelName}</Td>
                      <Td>{statusBadge(e.status)}</Td>
                      <Td className="text-sm text-neutral-600">{e.submissionCount} / {e.participatingSchoolCount}</Td>
                      <Td>
                        <input type="checkbox" checked={e.marksSubmissionOpen} disabled className="h-4 w-4 rounded border border-neutral-300 text-green-700" />
                      </Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/examinations/${e.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(e)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/examinations/${e.id}/submissions`)}><Activity size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Create examination" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Exam code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. CSEE-2025" />
            <Input label="Exam name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required helper="e.g. Certificate of Secondary Education Examination 2025" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
              <Option value="csee">CSEE (O-Level)</Option>
              <Option value="acsee">ACSEE (A-Level)</Option>
              <Option value="mock">Mock</Option>
              <Option value="terminal">Terminal</Option>
            </Select>
            <Select label="Academic year" value={form.academicYearId} onChange={(e) => setForm({ ...form, academicYearId: e.target.value })} required>
              <Option value="">Select a year</Option>
              <Option value="year-2025">Academic Year 2025</Option>
              <Option value="year-2024">Academic Year 2024</Option>
              <Option value="year-2026">Academic Year 2026</Option>
            </Select>
            <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })} required>
              <Option value="level-o">Ordinary Level (O-Level)</Option>
              <Option value="level-a">Advanced Level (A-Level)</Option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
              <Option value="draft">Draft</Option>
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
              <Option value="archived">Archived</Option>
            </Select>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.marksSubmissionOpen} onChange={(e) => setForm({ ...form, marksSubmissionOpen: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700" />
              <label className="text-sm text-neutral-600 cursor-pointer select-none">Marks submission open</label>
            </div>
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !editing}>{editing ? 'Save changes' : 'Create examination'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit examination" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Exam code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <Input label="Exam name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required>
              <Option value="csee">CSEE</Option>
              <Option value="acsee">ACSEE</Option>
              <Option value="mock">Mock</Option>
              <Option value="terminal">Terminal</Option>
            </Select>
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
              <Option value="draft">Draft</Option>
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
              <Option value="archived">Archived</Option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.marksSubmissionOpen} onChange={(e) => setForm({ ...form, marksSubmissionOpen: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700" />
            <label className="text-sm text-neutral-600 cursor-pointer select-none">Marks submission open</label>
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setEditing(null); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>Save changes</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
