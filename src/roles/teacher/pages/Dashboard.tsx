/**
 * Teacher Dashboard — focused on assigned classes, subjects and marks work.
 * Role scope: assigned school, classes and subjects only.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { UserCircle, LayoutGrid, BookOpen, ClipboardList, AlertCircle, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { teacherService, marksService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';

export default function TeacherDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    marksService.listSessions({ pageSize: 100 }).then((res) => {
      setSessions(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const drafts = sessions.filter((s) => s.status === 'draft' || s.status === 'entered');
  const submitted = sessions.filter((s) => s.status === 'submitted');
  const returned = sessions.filter((s) => s.status === 'returned');

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Teacher Dashboard"
        description="Your assigned classes, subjects and marks-entry work. Elias Mrisho — Lakeview Secondary School."
        action={<Button variant="ghost" size="sm">View my subjects</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Assigned classes" value="1" note="Form 4" icon={<LayoutGrid className="h-5 w-5" />} />
        <StatCard title="Assigned subjects" value="2" note="Mathematics · Biology" icon={<BookOpen className="h-5 w-5" />} />
        <StatCard title="Active examinations" value={1} note="CSEE 2025" icon={<ClipboardList className="h-5 w-5" />} tone="green" />
        <StatCard title="Pending marks" value={drafts.length} note="Drafts to complete" tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Marks entry — needs attention</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? (
              <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
            ) : drafts.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">No drafts or incomplete sessions.</div>
            ) : (
              <div className="space-y-3">
                {drafts.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 cursor-pointer" onClick={() => navigate(`/teacher/marks-entry/${s.id}`)}>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{s.examinationName} · {s.subjectName}</p>
                      <p className="text-xs text-neutral-500">{s.className} · {s.streamName || '—'} · {s.teacherName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-neutral-900">{s.enteredCount} / {s.totalStudents}</p>
                      <StatusBadge status={s.status} size="sm" />
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Work summary</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Submitted</span>
                <span className="text-sm font-semibold text-neutral-900">{submitted.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Returned for correction</span>
                <span className="text-sm font-semibold text-neutral-900">{returned.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total students</span>
                <span className="text-sm font-semibold text-neutral-900">{sessions.reduce((a, s) => a + s.totalStudents, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Marks entered</span>
                <span className="text-sm font-semibold text-neutral-900">{sessions.reduce((a, s) => a + s.enteredCount, 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <ActivityRow title="CSEE 2025 · Mathematics — Form 4 Stream A" desc="Marks submitted for 28 students." time="2 days ago" type="submitted" />
            <ActivityRow title="CSEE 2025 · Biology — Form 4 Stream B" desc="Draft saved; 4 marks pending." time="1 week ago" type="draft" />
            <ActivityRow title="CSEE 2025 · English — Form 4" desc="No marks entered yet." time="2 weeks ago" type="not_started" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityRow({ title, desc, time, type }: { title: string; desc: string; time: string; type: string }) {
  const map: Record<string, string> = { submitted: 'text-green-700 bg-green-50', draft: 'text-blue-700 bg-blue-50', not_started: 'text-neutral-600 bg-neutral-100' };
  return (
    <div className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${map[type]}`}>{type.replace('_', ' ')}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      <p className="text-xs text-neutral-500">{time}</p>
    </div>
  );
}
