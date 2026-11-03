/**
 * School Administrator — School-level review of submitted marks.
 */

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Check, AlertCircle, ClipboardList } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';
import { marksService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';

export default function Review() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadSessions = () => {
    setLoading(true);
    marksService.listSessions({ pageSize: 100 }).then((response) => {
      setSessions(response.data.filter((session) => ['submitted', 'returned', 'verified'].includes(session.status)));
    }).catch(() => {
      toast({ title: 'Unable to load submissions', description: 'Try again in a moment.', variant: 'default' });
    }).finally(() => setLoading(false));
  };

  useEffect(loadSessions, [toast]);

  const review = async (sessionId: string, decision: 'verify' | 'return') => {
    setBusyId(sessionId);
    try {
      const updated = await marksService.reviewSession(sessionId, decision);
      if (updated) {
        setSessions((current) => current.map((session) => session.id === sessionId ? updated : session));
        toast({ title: decision === 'verify' ? 'Submission cleared' : 'Submission returned', variant: 'success' });
      }
    } finally {
      setBusyId(null);
    }
  };

  const awaiting = sessions.filter((session) => session.status === 'submitted').length;
  const reviewed = sessions.filter((session) => session.status === 'verified').length;
  const returned = sessions.filter((session) => session.status === 'returned').length;

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School-level review"
        description="Review submitted marks before forwarding to the council for verification."
        action={<Button variant="ghost" size="sm" onClick={loadSessions}><ClipboardList className="mr-1 h-4 w-4" /> Refresh</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Awaiting review" value={awaiting} note="Submitted by teachers" tone="warning" />
        <StatCard title="Reviewed" value={reviewed} note="Cleared by school" tone="green" />
        <StatCard title="Returned" value={returned} note="Sent back for correction" tone="danger" />
        <StatCard title="Verified" value={reviewed} note="Ready for council" />
      </div>

      <Card>
        <CardHeader><CardTitle>Submissions for school review</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? <div className="p-12 text-center text-neutral-500">Loading submissions…</div> : <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Examination</Th>
                  <Th>Class · Subject</Th>
                  <Th className="w-32">Teacher</Th>
                  <Th className="w-40">Status</Th>
                  <Th className="w-32">Issues</Th>
                  <Th className="w-56">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-neutral-50/50">
                    <td className="td font-mono text-xs">{session.examinationName}</td>
                    <td className="td text-sm text-neutral-600">{session.className} · {session.subjectName}</td>
                    <td className="td text-sm text-neutral-600">{session.teacherName || 'Assigned teacher'}</td>
                    <td className="td"><Badge variant={session.status === 'verified' ? 'success' : session.status === 'returned' ? 'danger' : 'warning'} size="sm">{session.status}</Badge></td>
                    <td className="td text-sm text-neutral-600">{session.invalidCount || 0}</td>
                    <td className="td">
                      {session.status === 'submitted' ? <>
                        <Button variant="ghost" size="sm" onClick={() => review(session.id, 'return')} disabled={busyId === session.id}>Return</Button>
                        <Button variant="primary" size="sm" onClick={() => review(session.id, 'verify')} disabled={busyId === session.id}><Check size={16} /> Clear</Button>
                      </> : <span className="text-xs text-neutral-500">No action</span>}
                    </td>
                  </tr>
                ))}
                {!sessions.length && <tr><td colSpan={6} className="td h-24 text-center text-neutral-500">No submissions require school review.</td></tr>}
              </Tbody>
            </Table>
          </div>}
        </CardContent>
      </Card>

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-700 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">Review scope</p>
            <p className="text-sm text-neutral-600">The school administrator reviews submitted marks for completeness and obvious errors. Approval and publication remain with the authorised regional authority.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
