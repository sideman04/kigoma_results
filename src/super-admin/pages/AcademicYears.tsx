/**
 * Academic years management.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { academicYearService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, GraduationCap } from 'lucide-react';
import type { AcademicYear } from '../types';
import { z } from 'zod';

const yearSchema = z.object({
  name: z.string().min(2, 'Year is required.').max(9),
  status: z.enum(['active', 'historical', 'upcoming']),
  startDate: z.string().min(1, 'Start date required.'),
  endDate: z.string().min(1, 'End date required.'),
});

export default function AcademicYears() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<AcademicYear | null>(null);
  const [form, setForm] = useState<{ name: string; status: string; startDate: string; endDate: string }>({ name: '', status: 'upcoming', startDate: '', endDate: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    academicYearService.list().then((data) => {
      setYears(data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load years', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = yearSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', '));
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await academicYearService.update(editing.id, { name: form.name, status: form.status as any, startDate: form.startDate, endDate: form.endDate, label: form.name });
        toast({ title: 'Academic year updated', variant: 'success' });
      } else {
        await academicYearService.create({ name: form.name, status: form.status as any, startDate: form.startDate, endDate: form.endDate, label: form.name });
        toast({ title: 'Academic year created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ name: '', status: 'upcoming', startDate: '', endDate: '' });
      academicYearService.list().then((data) => setYears(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(y: AcademicYear) {
    setEditing(y);
    setForm({ name: y.name, status: y.status, startDate: y.startDate, endDate: y.endDate });
    setEditOpen(true);
  }

  const statusBadge = (status: string) => (
    <Badge variant={status === 'active' ? 'success' : status === 'upcoming' ? 'info' : 'neutral'}>{status.replace('_', ' ')}</Badge>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Years"
        description="Create and manage academic years. Only one year can be active at a time."
        action={<Button variant="primary" onClick={() => { setForm({ name: '', status: 'upcoming', startDate: '', endDate: '' }); setAddOpen(true); }}><Plus size={18} /> Add year</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>Academic years</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>Year</Th><Th className="w-32">Status</Th><Th className="w-40">Start date</Th><Th className="w-40">End date</Th><Th className="w-48">Actions</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : years.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No academic years" description="Add your first academic year." action={<Button variant="ghost" size="sm">Add year</Button>} icon="GraduationCap" /></Td></Tr>
                ) : (
                  years.map((y) => (
                    <Tr key={y.id} className="hover:bg-neutral-50/50">
                      <Td>{y.label}</Td>
                      <Td>{statusBadge(y.status)}</Td>
                      <Td className="text-sm text-neutral-600">{new Date(y.startDate).toLocaleDateString()}</Td>
                      <Td className="text-sm text-neutral-600">{new Date(y.endDate).toLocaleDateString()}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(y)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(y)}><Edit size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add academic year" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Year (e.g. 2026)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={9} />
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
              <Option value="upcoming">Upcoming</Option>
              <Option value="active">Active</Option>
              <Option value="historical">Historical</Option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            <Input label="End date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add year'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit academic year" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Year" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
            <Option value="upcoming">Upcoming</Option>
            <Option value="active">Active</Option>
            <Option value="historical">Historical</Option>
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
            <Input label="End date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setEditing(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>Save changes</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
