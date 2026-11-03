/**
 * Regions management — complete CRUD for regions.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { regionService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, Check, X } from 'lucide-react';
import type { Region } from '../types';
import { z } from 'zod';

const regionSchema = z.object({
  name: z.string().min(2, 'Region name is required.'),
  code: z.string().min(2, 'Region code is required.').max(10),
  status: z.enum(['active', 'inactive']),
});

export default function Regions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [regions, setRegions] = useState<Region[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialogs
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Region | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<{ name: string; code: string; status: 'active' | 'inactive' }>({ name: '', code: '', status: 'active' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await regionService.list({ page, pageSize: 25, search });
      setRegions(res.data as Region[]);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load regions.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = regionSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', '));
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await regionService.update(editing.id, { name: form.name, code: form.code, status: form.status });
        toast({ title: 'Region updated', description: 'Changes saved successfully.', variant: 'success' });
      } else {
        await regionService.create({ name: form.name, code: form.code, status: form.status });
        toast({ title: 'Region registered', description: 'The new region has been created.', variant: 'success' });
      }
      setAddOpen(false);
      setEditOpen(false);
      setForm({ name: '', code: '', status: 'active' });
      setEditing(null);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(region: Region) {
    setEditing(region);
    setForm({ name: region.name, code: region.code, status: region.status });
    setEditOpen(true);
  }

  async function handleDelete() {
    if (!deleting) return;
    setSubmitting(true);
    try {
      await regionService.remove(deleting);
      toast({ title: 'Region deactivated', description: 'The region has been removed.', variant: 'success' });
      setDeleteOpen(false);
      setDeleting(null);
      load();
    } catch (err) {
      toast({ title: 'Delete failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  const statusBadge = (status: string) => (
    <Badge variant={status === 'active' ? 'success' : 'neutral'}>{status.replace('_', ' ')}</Badge>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Regions"
        description="Manage regions across the Kigoma education ecosystem."
        action={<Button variant="primary" onClick={() => { setForm({ name: '', code: '', status: 'active' }); setAddOpen(true); }}><Plus size={18} /> Register region</Button>}
      />

      {error && (
        <Card className="border-red-100 bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
          <button onClick={load} className="mt-2 text-xs font-semibold text-green-700 hover:underline">Try again</button>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All regions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th className="w-32">Code</Th>
                  <Th className="w-32">Status</Th>
                  <Th className="w-32">Councils</Th>
                  <Th className="w-32">Schools</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={6} className="h-24 flex items-center justify-center">
                      <div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" />
                    </Td>
                  </Tr>
                ) : regions.length === 0 ? (
                  <Tr>
                    <Td colSpan={6}>
                      <EmptyState title="No regions" description="Register your first region to begin." action={<Button variant="ghost" size="sm">Register region</Button>} icon="Building2" />
                    </Td>
                  </Tr>
                ) : (
                  regions.map((r) => (
                    <Tr key={r.id} className="hover:bg-neutral-50/50">
                      <Td>{r.name}</Td>
                      <Td className="font-mono text-xs">{r.code}</Td>
                      <Td>{statusBadge(r.status)}</Td>
                      <Td className="text-sm text-neutral-600">—</Td>
                      <Td className="text-sm text-neutral-600">—</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/regions/${r.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(r)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { setDeleting(r.id); setDeleteOpen(true); }}><Delete size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-neutral-500">Showing {regions.length} of {total} regions</div>
          </div>
        </CardContent>
      </Card>

      {/* Add region dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Register a new region" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Region name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Region code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} helper="e.g. KG" />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); setForm({ name: '', code: '', status: 'active' }); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !editing}>{editing ? 'Save changes' : 'Register region'}</Button>
          </div>
        </form>
      </Dialog>

      {/* Edit region dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit region" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Region name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Region code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setFormError(null); setEditing(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>Save changes</Button>
          </div>
        </form>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Deactivate region" description="This will remove the region and its associated councils and schools from the active listing." size="sm">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>Cancel</Button>
          <Button variant="danger" type="button" onClick={handleDelete} isLoading={submitting && !!deleting}>Deactivate</Button>
        </div>
      </Dialog>
    </div>
  );
}
