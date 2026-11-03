/**
 * Subjects management — register and configure subjects.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { subjectService, educationLevelService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, BookOpen, University } from 'lucide-react';
import type { Subject, EducationLevel } from '../types';
import { z } from 'zod';

const subjectSchema = z.object({
  code: z.string().min(2, 'Subject code is required.').max(10),
  name: z.string().min(2, 'Subject name is required.'),
  educationLevelId: z.string().optional(),
  compulsory: z.boolean(),
  maxMark: z.string().min(1, 'Max mark required.'),
  status: z.enum(['active', 'inactive']),
});

export default function Subjects() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState<{ code: string; name: string; educationLevelId: string; compulsory: boolean; maxMark: string; status: 'active' | 'inactive' }>({ code: '', name: '', educationLevelId: '', compulsory: true, maxMark: '100', status: 'active' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    subjectService.list().then((data) => { setSubjects(data); setLoading(false); });
    educationLevelService.list().then((data) => setLevels(data));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = subjectSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await subjectService.update(editing.id, { code: form.code, name: form.name, educationLevelId: form.educationLevelId || undefined, compulsory: form.compulsory, maxMark: Number(form.maxMark), status: form.status });
        toast({ title: 'Subject updated', variant: 'success' });
      } else {
        await subjectService.create({ code: form.code, name: form.name, educationLevelId: form.educationLevelId || undefined, compulsory: form.compulsory, maxMark: Number(form.maxMark), status: form.status });
        toast({ title: 'Subject registered', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ code: '', name: '', educationLevelId: '', compulsory: true, maxMark: '100', status: 'active' });
      subjectService.list().then((data) => setSubjects(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(s: Subject) {
    setEditing(s);
    setForm({ code: s.code, name: s.name, educationLevelId: s.educationLevelId || '', compulsory: s.compulsory, maxMark: String(s.maxMark), status: s.status });
    setEditOpen(true);
  }

  const levelName = (id?: string) => id ? levels.find((l) => l.id === id)?.name || '—' : 'All levels';

  return (
    <div className="space-y-6">
      <PageHeader title="Subjects" description="Register subjects, configure codes, and set compulsory or optional rules." action={<Button variant="primary" onClick={() => { setForm({ code: '', name: '', educationLevelId: '', compulsory: true, maxMark: '100', status: 'active' }); setAddOpen(true); }}><Plus size={18} /> Add subject</Button>} />

      <Card>
        <CardHeader><CardTitle>Subject catalogue</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Code</Th><Th>Subject</Th><Th className="w-48">Education level</Th><Th className="w-32">Rule</Th><Th className="w-32">Max mark</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={7} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : subjects.length === 0 ? (
                  <Tr><Td colSpan={7}><EmptyState title="No subjects" description="Register your first subject." action={<Button variant="ghost" size="sm">Add subject</Button>} icon="BookOpen" /></Td></Tr>
                ) : (
                  subjects.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="font-mono text-xs">{s.code}</Td>
                      <Td>{s.name}</Td>
                      <Td className="text-sm text-neutral-600">{levelName(s.educationLevelId)}</Td>
                      <Td><Badge variant={s.compulsory ? 'success' : 'neutral'}>{s.compulsory ? 'Compulsory' : 'Optional'}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{s.maxMark}</Td>
                      <Td><Badge variant={s.status === 'active' ? 'success' : 'neutral'}>{s.status}</Badge></Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Edit size={16} /></Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add subject" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Subject code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. CIV" />
            <Input label="Subject name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required helper="e.g. Civics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })}>
              <Option value="">All levels</Option>
              {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
            </Select>
            <Input label="Max mark" value={form.maxMark} onChange={(e) => setForm({ ...form, maxMark: e.target.value })} required helper="e.g. 100" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.compulsory} onChange={(e) => setForm({ ...form, compulsory: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700" />
            <label className="text-sm text-neutral-600 cursor-pointer select-none">Compulsory subject</label>
          </div>
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add subject'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit subject" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Subject code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
            <Input label="Subject name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })}>
              <Option value="">All levels</Option>
              {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
            </Select>
            <Input label="Max mark" value={form.maxMark} onChange={(e) => setForm({ ...form, maxMark: e.target.value })} required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.compulsory} onChange={(e) => setForm({ ...form, compulsory: e.target.checked })} className="h-4 w-4 rounded border border-neutral-300 text-green-700" />
            <label className="text-sm text-neutral-600 cursor-pointer select-none">Compulsory subject</label>
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
    </div>
  );
}
