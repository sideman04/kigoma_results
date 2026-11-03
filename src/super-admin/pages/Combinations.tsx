/**
 * Subject combinations management.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { combinationService, subjectService, educationLevelService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, ClipboardList, University } from 'lucide-react';
import type { SubjectCombination, Subject, EducationLevel } from '../types';
import { z } from 'zod';

const combinationSchema = z.object({
  name: z.string().min(2, 'Combination name is required.'),
  educationLevelId: z.string().min(1, 'Select an education level.'),
  subjectIds: z.array(z.string()).min(1, 'Select at least one subject.'),
  status: z.enum(['active', 'inactive']),
});

export default function Combinations() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [combinations, setCombinations] = useState<SubjectCombination[]>([]);
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<SubjectCombination | null>(null);
  const [form, setForm] = useState<{ name: string; educationLevelId: string; subjectIds: string[]; status: 'active' | 'inactive' }>({ name: '', educationLevelId: '', subjectIds: [], status: 'active' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    combinationService.list().then((data) => { setCombinations(data); setLoading(false); });
    educationLevelService.list().then((data) => setLevels(data));
    subjectService.list().then((data) => setSubjects(data));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = combinationSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await combinationService.update(editing.id, { name: form.name, educationLevelId: form.educationLevelId, subjectIds: form.subjectIds, status: form.status });
        toast({ title: 'Combination updated', variant: 'success' });
      } else {
        await combinationService.create({ name: form.name, educationLevelId: form.educationLevelId, subjectIds: form.subjectIds, status: form.status });
        toast({ title: 'Combination created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ name: '', educationLevelId: '', subjectIds: [], status: 'active' });
      combinationService.list().then((data) => setCombinations(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(c: SubjectCombination) {
    setEditing(c);
    setForm({ name: c.name, educationLevelId: c.educationLevelId, subjectIds: [...c.subjectIds], status: c.status });
    setEditOpen(true);
  }

  const levelName = (id: string) => levels.find((l) => l.id === id)?.name || '—';
  const subjectNames = (ids: string[]) => ids.map((id) => subjects.find((s) => s.id === id)?.code).filter(Boolean).join(', ');

  return (
    <div className="space-y-6">
      <PageHeader title="Subject Combinations" description="Create subject combinations and assign applicable subjects." action={<Button variant="primary" onClick={() => { setForm({ name: '', educationLevelId: '', subjectIds: [], status: 'active' }); setAddOpen(true); }}><Plus size={18} /> Add combination</Button>} />

      <Card>
        <CardHeader><CardTitle>Subject combinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Combination</Th><Th className="w-48">Education level</Th><Th className="w-48">Subjects</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : combinations.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No combinations" description="Create your first subject combination." action={<Button variant="ghost" size="sm">Add combination</Button>} icon="ClipboardList" /></Td></Tr>
                ) : (
                  combinations.map((c) => (
                    <Tr key={c.id} className="hover:bg-neutral-50/50">
                      <Td>{c.name}</Td>
                      <Td className="text-sm text-neutral-600">{levelName(c.educationLevelId)}</Td>
                      <Td className="text-sm text-neutral-600">{subjectNames(c.subjectIds) || '—'}</Td>
                      <Td><Badge variant={c.status === 'active' ? 'success' : 'neutral'}>{c.status}</Badge></Td>
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

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add subject combination" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Combination name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required helper="e.g. PCM" />
          <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })} required>
            <Option value="">Select a level</Option>
            {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
          </Select>
          <Select label="Subjects" value={form.subjectIds} onChange={(e) => {
            const vals = Array.from((e.target as HTMLSelectElement).selectedOptions).map((o) => o.value);
            setForm({ ...form, subjectIds: vals });
          }} multiple required>
            <Option value="">Select subjects</Option>
            {subjects.map((s) => <Option key={s.id} value={s.id}>{s.code} · {s.name}</Option>)}
          </Select>
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add combination'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit subject combination" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Combination name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Select label="Education level" value={form.educationLevelId} onChange={(e) => setForm({ ...form, educationLevelId: e.target.value })} required>
            <Option value="">Select a level</Option>
            {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
          </Select>
          <Select label="Subjects" value={form.subjectIds} onChange={(e) => {
            const vals = Array.from((e.target as HTMLSelectElement).selectedOptions).map((o) => o.value);
            setForm({ ...form, subjectIds: vals });
          }} multiple required>
            <Option value="">Select subjects</Option>
            {subjects.map((s) => <Option key={s.id} value={s.id}>{s.code} · {s.name}</Option>)}
          </Select>
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
