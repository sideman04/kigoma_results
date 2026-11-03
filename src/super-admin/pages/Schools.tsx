/**
 * Schools management — register, assign to region/council, and view profiles.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { schoolService, regionService, councilService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, Building2, Users } from 'lucide-react';
import type { School, Region, Council } from '../types';
import { z } from 'zod';

const schoolSchema = z.object({
  code: z.string().min(2, 'School code is required.').max(15),
  name: z.string().min(2, 'School name is required.'),
  regionId: z.string().min(1, 'Select a region.'),
  councilId: z.string().min(1, 'Select a council.'),
  ownership: z.enum(['government', 'private', 'faith_based', 'community']),
  educationLevel: z.enum(['o_level', 'a_level', 'both']),
  status: z.enum(['active', 'inactive']),
});

export default function Schools() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState<Region[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<School | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<{ code: string; name: string; regionId: string; councilId: string; ownership: string; educationLevel: string; status: 'active' | 'inactive' }>({
    code: '', name: '', regionId: '', councilId: '', ownership: 'government', educationLevel: 'o_level', status: 'active',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
    regionService.list({ pageSize: 100 }).then((r) => setRegions(r.data as Region[]));
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await schoolService.list({ page, pageSize: 25, search });
      setSchools(res.data as School[]);
      setTotal(res.total);
    } catch (err) {
      toast({ title: 'Failed to load schools', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = schoolSchema.safeParse(form);
    if (!parsed.success) {
      setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', '));
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await schoolService.update(editing.id, {
          code: form.code, name: form.name, regionId: form.regionId, councilId: form.councilId,
          ownership: form.ownership as any, educationLevel: form.educationLevel as any, status: form.status,
        });
        toast({ title: 'School updated', variant: 'success' });
      } else {
        await schoolService.create({
          code: form.code, name: form.name, regionId: form.regionId, councilId: form.councilId,
          ownership: form.ownership as any, educationLevel: form.educationLevel as any, status: form.status,
        });
        toast({ title: 'School registered', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ code: '', name: '', regionId: '', councilId: '', ownership: 'government', educationLevel: 'o_level', status: 'active' });
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(s: School) {
    setEditing(s);
    setForm({ code: s.code, name: s.name, regionId: s.regionId, councilId: s.councilId, ownership: s.ownership, educationLevel: s.educationLevel, status: s.status });
    setEditOpen(true);
  }

  async function handleDelete() {
    if (!deleting) return;
    setSubmitting(true);
    try {
      await schoolService.remove(deleting);
      toast({ title: 'School deactivated', variant: 'success' });
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
  const ownershipLabel = (o: string) => o.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const regionName = (id: string) => regions.find((r) => r.id === id)?.name || '—';
  const councilName = (id: string) => councils.find((c) => c.id === id)?.name || '—';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Register and oversee every school in the Kigoma education ecosystem."
        action={<Button variant="primary" onClick={() => { setForm({ code: '', name: '', regionId: '', councilId: '', ownership: 'government', educationLevel: 'o_level', status: 'active' }); setAddOpen(true); }}><Plus size={18} /> Register school</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>All schools</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th className="w-40">Region</Th>
                  <Th className="w-40">Council</Th>
                  <Th className="w-32">Ownership</Th>
                  <Th className="w-32">Level</Th>
                  <Th className="w-32">Status</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={8} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : schools.length === 0 ? (
                  <Tr><Td colSpan={8}><EmptyState title="No schools" description="Register your first school." action={<Button variant="ghost" size="sm">Register school</Button>} icon="School" /></Td></Tr>
                ) : (
                  schools.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{s.code}</Td>
                      <Td>{s.name}</Td>
                      <Td className="text-sm text-neutral-600">{regionName(s.regionId)}</Td>
                      <Td className="text-sm text-neutral-600">{councilName(s.councilId)}</Td>
                      <Td><Badge variant="neutral" size="sm">{ownershipLabel(s.ownership)}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{s.educationLevel.replace('_', ' ').toUpperCase()}</Td>
                      <Td>{statusBadge(s.status)}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${s.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { setDeleting(s.id); setDeleteOpen(true); }}><Delete size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Register a new school" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="School code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. S0101" />
            <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })} required>
              <Option value="">Select a region</Option>
              {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
            </Select>
          </div>
          <Input label="School name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Council" value={form.councilId} onChange={(e) => setForm({ ...form, councilId: e.target.value })} required>
              <Option value="">Select a council</Option>
              {councils.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
            </Select>
            <Select label="Ownership" value={form.ownership} onChange={(e) => setForm({ ...form, ownership: e.target.value })} required>
              <Option value="government">Government</Option>
              <Option value="private">Private</Option>
              <Option value="faith_based">Faith-based</Option>
              <Option value="community">Community</Option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Education level" value={form.educationLevel} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} required>
              <Option value="o_level">O-Level (Forms 1-4)</Option>
              <Option value="a_level">A-Level (Forms 5-6)</Option>
              <Option value="both">Both O-Level & A-Level</Option>
            </Select>
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); setForm({ code: '', name: '', regionId: '', councilId: '', ownership: 'government', educationLevel: 'o_level', status: 'active' }); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !editing}>{editing ? 'Save changes' : 'Register school'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit school" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="School code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <Input label="School name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })} required>
              <Option value="">Select a region</Option>
              {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
            </Select>
            <Select label="Council" value={form.councilId} onChange={(e) => setForm({ ...form, councilId: e.target.value })} required>
              <Option value="">Select a council</Option>
              {councils.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Ownership" value={form.ownership} onChange={(e) => setForm({ ...form, ownership: e.target.value })} required>
              <Option value="government">Government</Option>
              <Option value="private">Private</Option>
              <Option value="faith_based">Faith-based</Option>
              <Option value="community">Community</Option>
            </Select>
            <Select label="Education level" value={form.educationLevel} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} required>
              <Option value="o_level">O-Level</Option>
              <Option value="a_level">A-Level</Option>
              <Option value="both">Both</Option>
            </Select>
          </div>
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

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Deactivate school" size="sm">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>Cancel</Button>
          <Button variant="danger" type="button" onClick={handleDelete} isLoading={submitting && !!deleting}>Deactivate</Button>
        </div>
      </Dialog>
    </div>
  );
}
