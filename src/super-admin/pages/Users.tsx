/**
 * User management — create, edit, assign roles & organisational scope.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { userService, regionService, councilService, schoolService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, Shield, Clock, Mail } from 'lucide-react';
import type { User, Region, Council, School } from '../types';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3, 'Username is required.'),
  email: z.string().email('Valid email required.'),
  fullName: z.string().min(2, 'Full name is required.'),
  role: z.enum(['super_admin', 'regional_admin', 'council_admin', 'school_admin', 'teacher']),
  status: z.enum(['active', 'inactive', 'suspended']),
  regionId: z.string().optional(),
  councilId: z.string().optional(),
  schoolId: z.string().optional(),
});

export default function Users() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState<Region[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<{ username: string; email: string; fullName: string; role: string; status: string; regionId: string; councilId: string; schoolId: string }>({
    username: '', email: '', fullName: '', role: 'teacher', status: 'active', regionId: '', councilId: '', schoolId: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    load();
    regionService.list({ pageSize: 100 }).then((r) => setRegions(r.data as Region[]));
    councilService.list({ pageSize: 100 }).then((r) => setCouncils(r.data as Council[]));
    schoolService.list({ pageSize: 100 }).then((r) => setSchools(r.data as School[]));
  }, [toast]);

  async function load() {
    setLoading(true);
    try {
      const res = await userService.list({ pageSize: 100 });
      setUsers(res.data as User[]);
    } catch (err) {
      toast({ title: 'Failed to load users', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally { setLoading(false); }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = userSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      const payload: any = {
        username: form.username, email: form.email, fullName: form.fullName,
        role: form.role as any, status: form.status as any,
      };
      if (form.regionId) payload.regionId = form.regionId;
      if (form.councilId) payload.councilId = form.councilId;
      if (form.schoolId) payload.schoolId = form.schoolId;
      if (editing) {
        await userService.update(editing.id, payload);
        toast({ title: 'User updated', variant: 'success' });
      } else {
        await userService.create(payload);
        toast({ title: 'User created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ username: '', email: '', fullName: '', role: 'teacher', status: 'active', regionId: '', councilId: '', schoolId: '' });
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(u: User) {
    setEditing(u);
    setForm({ username: u.username, email: u.email, fullName: u.fullName, role: u.role, status: u.status, regionId: u.regionId || '', councilId: u.councilId || '', schoolId: u.schoolId || '' });
    setEditOpen(true);
  }

  async function handleDelete() {
    if (!deleting) return;
    setSubmitting(true);
    try {
      await userService.remove(deleting);
      toast({ title: 'User deactivated', variant: 'success' });
      setDeleteOpen(false); setDeleting(null); load();
    } catch (err) {
      toast({ title: 'Delete failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally { setSubmitting(false); }
  }

  const roleLabel: Record<string, string> = {
    super_admin: 'Super Administrator', regional_admin: 'Regional Administrator',
    council_admin: 'Council / District Administrator', school_admin: 'School Administrator',
    teacher: 'Teacher',
  };
  const statusBadge = (status: string) => (
    <Badge variant={status === 'active' ? 'success' : status === 'suspended' ? 'danger' : 'neutral'}>{status.replace('_', ' ')}</Badge>
  );
  const regionName = (id?: string) => id ? regions.find((r) => r.id === id)?.name || '—' : '—';
  const councilName = (id?: string) => id ? councils.find((c) => c.id === id)?.name || '—' : '—';
  const schoolName = (id?: string) => id ? schools.find((s) => s.id === id)?.name || '—' : '—';

  return (
    <div className="space-y-6">
      <PageHeader title="All Users" description="Manage system accounts, roles and organisational scope." action={<Button variant="primary" onClick={() => { setForm({ username: '', email: '', fullName: '', role: 'teacher', status: 'active', regionId: '', councilId: '', schoolId: '' }); setAddOpen(true); }}><Plus size={18} /> Create user</Button>} />

      <Card>
        <CardHeader><CardTitle>User directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr><Th>User</Th><Th className="w-32">Username</Th><Th className="w-48">Role</Th><Th className="w-40">Scope</Th><Th className="w-32">Status</Th><Th className="w-32">Last login</Th><Th className="w-48">Actions</Th></Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={7} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : users.length === 0 ? (
                  <Tr><Td colSpan={7}><EmptyState title="No users" description="Create your first system user." action={<Button variant="ghost" size="sm">Create user</Button>} icon="Users" /></Td></Tr>
                ) : (
                  users.map((u) => (
                    <Tr key={u.id} className="hover:bg-neutral-50/50">
                      <Td>{u.fullName}</Td>
                      <Td className="font-mono text-xs">{u.username}</Td>
                      <Td><Badge variant="neutral" size="sm">{roleLabel[u.role]}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{u.schoolName || u.councilName || u.regionName || 'System-wide'}</Td>
                      <Td>{statusBadge(u.status)}</Td>
                      <Td className="text-xs text-neutral-600">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : '—'}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/users/${u.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(u)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { setDeleting(u.id); setDeleteOpen(true); }}><Delete size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Create user" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <Input label="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required>
              <Option value="super_admin">Super Administrator</Option>
              <Option value="regional_admin">Regional Administrator</Option>
              <Option value="council_admin">Council / District Administrator</Option>
              <Option value="school_admin">School Administrator</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })}>
              <Option value="">Select a region</Option>
              {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
            </Select>
            <Select label="Council" value={form.councilId} onChange={(e) => setForm({ ...form, councilId: e.target.value })}>
              <Option value="">Select a council</Option>
              {councils.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
            </Select>
            <Select label="School" value={form.schoolId} onChange={(e) => setForm({ ...form, schoolId: e.target.value })}>
              <Option value="">Select a school</Option>
              {schools.map((s) => <Option key={s.id} value={s.id}>{s.name}</Option>)}
            </Select>
          </div>
          <p className="text-[10px] text-neutral-500">Organisational scope limits what the user can view and manage. Enforced by the backend.</p>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); setForm({ username: '', email: '', fullName: '', role: 'teacher', status: 'active', regionId: '', councilId: '', schoolId: '' }); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !editing}>{editing ? 'Save changes' : 'Create user'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit user" size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          </div>
          <Input label="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required>
              <Option value="super_admin">Super Administrator</Option>
              <Option value="regional_admin">Regional Administrator</Option>
              <Option value="council_admin">Council / District Administrator</Option>
              <Option value="school_admin">School Administrator</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} required>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select label="Region" value={form.regionId} onChange={(e) => setForm({ ...form, regionId: e.target.value })}>
              <Option value="">Select a region</Option>
              {regions.map((r) => <Option key={r.id} value={r.id}>{r.name}</Option>)}
            </Select>
            <Select label="Council" value={form.councilId} onChange={(e) => setForm({ ...form, councilId: e.target.value })}>
              <Option value="">Select a council</Option>
              {councils.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
            </Select>
            <Select label="School" value={form.schoolId} onChange={(e) => setForm({ ...form, schoolId: e.target.value })}>
              <Option value="">Select a school</Option>
              {schools.map((s) => <Option key={s.id} value={s.id}>{s.name}</Option>)}
            </Select>
          </div>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setEditing(null); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>Save changes</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen} title="Deactivate user" size="sm">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => { setDeleteOpen(false); setDeleting(null); }}>Cancel</Button>
          <Button variant="danger" type="button" onClick={handleDelete} isLoading={submitting && !!deleting}>Deactivate</Button>
        </div>
      </Dialog>
    </div>
  );
}
