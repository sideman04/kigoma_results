/**
 * Education levels management.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState, Switch,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { educationLevelService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, University } from 'lucide-react';
import type { EducationLevel } from '../types';
import { z } from 'zod';

const levelSchema = z.object({
  name: z.string().min(2, 'Level name is required.'),
  code: z.enum(['o_level', 'a_level']),
  active: z.boolean(),
});

export default function EducationLevels() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<EducationLevel | null>(null);
  const [form, setForm] = useState<{ name: string; code: string; active: boolean }>({ name: '', code: 'o_level', active: true });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    educationLevelService.list().then((data) => { setLevels(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = levelSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await educationLevelService.update(editing.id, { name: form.name, code: form.code as any, active: form.active });
        toast({ title: 'Education level updated', variant: 'success' });
      } else {
        await educationLevelService.create({ name: form.name, code: form.code as any, active: form.active });
        toast({ title: 'Education level created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ name: '', code: 'o_level', active: true });
      educationLevelService.list().then((data) => setLevels(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(l: EducationLevel) {
    setEditing(l);
    setForm({ name: l.name, code: l.code, active: l.active });
    setEditOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Education Levels" description="Configure the supported education levels (O-Level and A-Level)." action={<Button variant="primary" onClick={() => { setForm({ name: '', code: 'o_level', active: true }); setAddOpen(true); }}><Plus size={18} /> Add level</Button>} />

      <Card>
        <CardHeader><CardTitle>Education levels</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Name</Th><Th className="w-32">Code</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={4} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : levels.length === 0 ? (
                  <Tr><Td colSpan={4}><EmptyState title="No education levels" description="Add your first level." action={<Button variant="ghost" size="sm">Add level</Button>} icon="University" /></Td></Tr>
                ) : (
                  levels.map((l) => (
                    <Tr key={l.id} className="hover:bg-neutral-50/50">
                      <Td>{l.name}</Td>
                      <Td className="font-mono text-xs">{l.code.toUpperCase()}</Td>
                      <Td><Badge variant={l.active ? 'success' : 'neutral'}>{l.active ? 'Active' : 'Inactive'}</Badge></Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(l)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(l)}><Edit size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add education level" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Select label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required>
            <Option value="o_level">O-Level</Option>
            <Option value="a_level">A-Level</Option>
          </Select>
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700 bg-neutral-50 focus:ring-2 focus:ring-green-700" />
          <label className="ml-2 text-sm text-neutral-600 cursor-pointer select-none">Active</label>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add level'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit education level" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Select label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required>
            <Option value="o_level">O-Level</Option>
            <Option value="a_level">A-Level</Option>
          </Select>
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700 bg-neutral-50 focus:ring-2 focus:ring-green-700" />
          <label className="ml-2 text-sm text-neutral-600 cursor-pointer select-none">Active</label>
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
