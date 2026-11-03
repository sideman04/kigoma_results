/**
 * Announcements — system-wide announcements.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Input, Select, Option,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { announcementService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { FileText, Megaphone, Clock, Eye } from 'lucide-react';
import type { Announcement } from '../types';

export default function Announcements() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState<'all' | 'regional' | 'council' | 'school'>('all');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    announcementService.list().then((data) => { setAnnouncements(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load announcements', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    try {
      await announcementService.create({ title, body, published: true, audience });
      setTitle(''); setBody('');
      announcementService.list().then((data) => setAnnouncements(data));
      toast({ title: 'Announcement published', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally { setSubmitting(false); }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Publish system-wide announcements visible to schools and administrators." />

      <Card>
        <CardHeader><CardTitle>Create announcement</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleCreate} className="space-y-4">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              rows={3}
            ></textarea>
            <Select label="Audience" value={audience} onChange={(e) => setAudience(e.target.value as any)} className="w-64">
              <Option value="all">All users</Option>
              <Option value="regional">Regional administrators</Option>
              <Option value="council">Council administrators</Option>
              <Option value="school">School administrators</Option>
            </Select>
            <div className="flex gap-2">
              <Button variant="primary" type="submit" isLoading={submitting}>Publish</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : announcements.length === 0 ? (
            <EmptyState title="No announcements" description="Create your first announcement." icon="Megaphone" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead><Tr><Th>Title</Th><th>Audience</th><Th className="w-32">Published</Th><Th className="w-40">When</Th><Th className="w-48">Actions</Th></Tr></Thead>
                <Tbody>
                  {announcements.map((a) => (
                    <Tr key={a.id} className="hover:bg-neutral-50/50">
                      <Td>{a.title}</Td>
                      <td className="text-sm text-neutral-600 capitalize">{a.audience}</td>
                      <Td><Badge variant={a.published ? 'success' : 'neutral'} size="sm">{a.published ? 'Published' : 'Draft'}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{new Date(a.createdAt).toLocaleString()}</Td>
                      <Td>
                        <Button variant="ghost" size="sm" onClick={() => navigateTo(a.id)}><Eye size={16} /></Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-[10px] text-neutral-500">Announcement delivery is managed by the PHP backend notification service.</p>
    </div>
  );
}

function navigateTo(id: string) {
  // placeholder for viewing announcement detail
}
