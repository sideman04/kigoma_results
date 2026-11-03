/**
 * Classes management — associate classes with education levels.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { classService, educationLevelService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, LayoutGrid, University } from 'lucide-react';
import type { SchoolClass, EducationLevel } from '../types';
import { z } from 'zod';

const classSchema = z.object({
  educationLevelId: z.string().min(1, 'Select an education level.'),
  name: z.string().min(1, 'Class name is required.'),
  code: z.string().min(1, 'Class code is required.').max(10),
});

export default function Classes() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<SchoolClass | null>(null);
  const [form, setForm] = useState<{ educationLevelId: string; name: string; code: string }>({ educationLevelId: '', name: '', code: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    classService.list().then((data) => { setClasses(data); setLoading(false); });
    educationLevelService.list().then((data) => setLevels(data));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = classSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await classService.update(editing.id, { name: form.name, code: form.code, educationLevelId: form.educationLevelId });
        toast({ title: 'Class updated', variant: 'success' });
      } else {
        await classService.create({ educationLevelId: form.educationLevelId, name: form.name, code: form.code, active: true });
        toast({ title: 'Class created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ educationLevelId: '', name: '', code: '' });
      classService.list().then((data) => setClasses(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(c: SchoolClass) {
    setEditing(c);
    setForm({ educationLevelId: c.educationLevelId, name: c.name, code: c.code });
    setEditOpen(true);
  }

  const levelName = (id: string) => levels.find((l) => l.id === id)?.name || '—';

  return (
    <div className="space-y-6">
      <PageHeader title="Classes & Streams" description="Configure classes and associate them with education levels." action={<Button variant="primary" onClick={() => { setForm({ educationLevelId: '', name: '', code: '' }); setAddOpen(true); }}><Plus size={18} /> Add class</Button>} />

      <Card>
        <CardHeader><CardTitle>Classes</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Name</Th><Th className="w-32">Code</Th><Th className="w-48">Education level</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : classes.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No classes" description="Add your first class." action={<Button variant="ghost" size="sm">Add class</Button>} icon="LayoutGrid" /></Td></Tr>
                ) : (
                  classes.map((c) => (
                    <Tr key={c.id} className="hover:bg-neutral-50/50">
                      <Td>{c.name}</Td>
                      <Td className="font-mono text-xs">{c.code}</Td>
                      <Td className="text-sm text-neutral-600">{levelName(c.educationLevelId)}</Td>
                      <Td><Badge variant="success">Active</Badge></Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(c)}><Edit size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add class" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })} required>
            <Option value="">Select a level</Option>
            {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
          </Select>
          <Input label="Class name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required helper="e.g. Form 4" />
          <Input label="Class code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. F4" />
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add class'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit class" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })} required>
            <Option value="">Select a level</Option>
            {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
          </Select>
          <Input label="Class name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Class code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
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
