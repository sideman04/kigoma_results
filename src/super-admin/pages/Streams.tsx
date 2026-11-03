/**
 * Streams management — manage streams within classes.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option,
  Dialog, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { streamService, classService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Plus, Edit, Eye, Delete, LayoutGrid } from 'lucide-react';
import type { Stream, SchoolClass } from '../types';
import { z } from 'zod';

const streamSchema = z.object({
  classId: z.string().min(1, 'Select a class.'),
  name: z.string().min(1, 'Stream name is required.'),
  code: z.string().min(1, 'Stream code is required.').max(10),
});

export default function Streams() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [streams, setStreams] = useState<Stream[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Stream | null>(null);
  const [form, setForm] = useState<{ classId: string; name: string; code: string }>({ classId: '', name: '', code: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    streamService.list().then((data) => { setStreams(data); setLoading(false); });
    classService.list().then((data) => setClasses(data));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = streamSchema.safeParse(form);
    if (!parsed.success) { setFormError(parsed.error.issues.map((e: { message: string }) => e.message).join(', ')); return; }
    setSubmitting(true);
    try {
      if (editing) {
        await streamService.update(editing.id, { name: form.name, code: form.code, classId: form.classId });
        toast({ title: 'Stream updated', variant: 'success' });
      } else {
        await streamService.create({ classId: form.classId, name: form.name, code: form.code, active: true });
        toast({ title: 'Stream created', variant: 'success' });
      }
      setAddOpen(false); setEditOpen(false); setEditing(null);
      setForm({ classId: '', name: '', code: '' });
      streamService.list().then((data) => setStreams(data));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally { setSubmitting(false); }
  }

  function openEdit(s: Stream) {
    setEditing(s);
    setForm({ classId: s.classId, name: s.name, code: s.code });
    setEditOpen(true);
  }

  const className = (id: string) => classes.find((c) => c.id === id)?.name || '—';

  return (
    <div className="space-y-6">
      <PageHeader title="Streams" description="Manage streams within classes." action={<Button variant="primary" onClick={() => { setForm({ classId: '', name: '', code: '' }); setAddOpen(true); }}><Plus size={18} /> Add stream</Button>} />

      <Card>
        <CardHeader><CardTitle>Streams</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>Class</Th><Th>Stream name</Th><Th className="w-32">Code</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : streams.length === 0 ? (
                  <Tr><Td colSpan={5}><EmptyState title="No streams" description="Add your first stream." action={<Button variant="ghost" size="sm">Add stream</Button>} icon="LayoutGrid" /></Td></Tr>
                ) : (
                  streams.map((s) => (
                    <Tr key={s.id} className="hover:bg-neutral-50/50">
                      <Td className="text-sm text-neutral-600">{className(s.classId)}</Td>
                      <Td>{s.name}</Td>
                      <Td className="font-mono text-xs">{s.code}</Td>
                      <Td><Badge variant="success">Active</Badge></Td>
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

      <Dialog open={addOpen} onOpenChange={setAddOpen} title="Add stream" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Class" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} required>
            <Option value="">Select a class</Option>
            {classes.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
          </Select>
          <Input label="Stream name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required helper="e.g. Stream A" />
          <Input label="Stream code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required helper="e.g. F4A" />
          {formError && <p className="text-xs text-red-600">{formError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => { setAddOpen(false); setFormError(null); }}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={submitting && !!editing}>{editing ? 'Save changes' : 'Add stream'}</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit stream" size="sm">
        <form onSubmit={handleSave} className="space-y-4">
          <Select label="Class" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} required>
            <Option value="">Select a class</Option>
            {classes.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
          </Select>
          <Input label="Stream name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Stream code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
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
