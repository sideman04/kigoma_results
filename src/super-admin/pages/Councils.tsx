/**
 * Councils / Districts management — assign councils to regions.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { councilService, regionService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, Building } from 'lucide-react';
import type { Council, Region } from '../types';
import { z } from 'zod';

const councilSchema = z.object({
  regionId: z.string().min(1, 'Select a region.'),
  name: z.string().min(2, 'Council name is required.'),
  code: z.string().min(2, 'Council code is required.').max(10),
  status: z.enum(['active', 'inactive']),
});

export default function Councils() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [councils, setCouncils] = useState<Council[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState<Region[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Council | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<{ regionId: string; name: string; code: string; status: 'active' | 'inactive' }>({ regionId: '', name: '', code: '', status: 'active' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
    regionService.list({ pageSize: 100 }).then((r) => setRegions(r.data as Region[]));
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await councilService.list({ page, pageSize: 25, search });
      setCouncils(res.data as Council[]);
      setTotal(res.total);
    } catch (err) {
      toast({ title: 'Failed to load councils', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = councilSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', '));
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await councilService.update(editing.id, { name: form.name, code: form.code, status: form.status, regionId: form.regionId });
        toast({ title: 'Council updated', variant: 'success' });
      } else {
        await councilService.create({ regionId: form.regionId, name: form.name, code: form.code, status: form.status });
        toast({ title: 'Council registered', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ regionId: '', name: '', code: '', status: 'active' });
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(c: Council) {
    setEditing(c);
    setForm({ regionId: c.regionId, name: c.name, code: c.code, status: c.status });
    setEditOpen(true);
  }

  async function handleDelete() {
    if (!deleting) return;
    setSubmitting(true);
    try {
      await councilService.remove(deleting);
      toast({ title: 'Council deactivated', variant: 'success' });
      setDeleteOpen(false); setDeleting(null); load();
    } catch (err) {
      toast({ title: 'Delete failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  const statusBadge = (status: string) => (
    <Badge variant={status === 'active' ? 'success' : 'neutral'}>{status.replace('_', ' ')}</Badge>
  );

  const regionName = (id: string) => regions.find((r) => r.id === id)?.name || '—';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Councils / Districts"
        description="Assign councils to regions and oversee district-level education administration."
        action={<Button variant="primary" onClick={() => { setForm({ regionId: '', name: '', code: '', status: 'active' }); setAddOpen(true); }}><Plus size={18} /> Register council</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>All councils</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th className="w-40">Region</Th>
                  <Th className="w-32">Code</Th>
                  <Th className="w-32">Status</Th>
                  <Th className="w-32">Schools</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={6} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : councils.length === 0 ? (
                  <Tr><Td colSpan={6}><EmptyState title="No councils" description="Register your first council." action={<Button variant="ghost" size="sm">Register council</Button>} icon="Building" /></Td></Tr>
                ) : (
                  councils.map((c) => (
                    <Tr key={c.id} className="hover:bg-neutral-50/50">
                      <Td>{c.name}</Td>
                      <Td className="text-sm text-neutral-600">{regionName(c.regionId)}</Td>
                      <Td className="font-mono text-xs">{c.code}</Td>
                      <Td>{statusBadge(c.status)}</Td>
                      <Td className="text-sm text-neutral-600">—</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/councils/${c.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { setDeleting(c.id); setDeleteOpen(true); }}><Delete size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Register a new council" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })} required>
            <Option value="">Select a region</Option>
            {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
          </Select>
          <Input label="Council name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Council code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. KT" />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setForm({ regionId: '', name: '', code: '', status: 'active' }); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !editing}>{editing ? 'Save changes' : 'Register council'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit council" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })} required>
            <Option value="">Select a region</Option>
            {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
          </Select>
          <Input label="Council name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Council code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setEditing(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>Save changes</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Deactivate council" size="sm">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>Cancel</Button>
          <Button variant="danger" type="button" onClick={handleDelete} isLoading={submitting && !!deleting}>Deactivate</Button>
        </div>
      </Dialog>
    </div>
  );
}
