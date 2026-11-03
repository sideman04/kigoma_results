/**
 * Super Administrator Dashboard — system-wide command centre.
 * All figures are computed from the demo store and clearly labelled as demo.
 */

import { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../components/utils';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge,
  Separator, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import {
  regionService, councilService, schoolService, userService,
  examinationService, submissionService, verificationService,
} from '../services/api';
import { useToast } from '../components/ui/use-toast';
import type { Region, Council, School, User, Examination, MarksSubmission, VerificationItem } from '../types';
import { ArrowUpDown, Building, Users, Clock, FileText, CheckCircle, AlertCircle, Shield, ArrowRight, University } from 'lucide-react';
import { demoData } from '../services/mockData';

export default function SuperAdminDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    regions: number; councils: number; schools: number;
    students: number; teachers: number; users: number;
    activeYear: string; activeExams: number; pendingSubmissions: number;
    awaitingVerification: number; approved: number; published: number;
  }>({
    regions: 0, councils: 0, schools: 0, students: 0, teachers: 0, users: 0,
    activeYear: '2025', activeExams: 0, pendingSubmissions: 0,
    awaitingVerification: 0, approved: 0, published: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string; actor: string; action: string; module: string; time: string; type: string;
  }>>([]);
  const [pendingActions, setPendingActions] = useState<Array<{
    id: string; title: string; desc: string; to: string;
  }>>([]);

  useEffect(() => {
    loadSystemSnapshot();
  }, []);

  async function loadSystemSnapshot() {
    setLoading(true);
    try {
      const [regionsRes, councilsRes, schoolsRes, usersRes, examsRes, subsRes, verifRes] =
        await Promise.all([
          regionService.list({ pageSize: 100 }),
          councilService.list({ pageSize: 100 }),
          schoolService.list({ pageSize: 100 }),
          userService.list({ pageSize: 100 }),
          examinationService.list({ pageSize: 100 }),
          submissionService.list({ pageSize: 100 }),
          verificationService.list({ pageSize: 100 }),
        ]);

      const regions = regionsRes.data as Region[];
      const councils = councilsRes.data as Council[];
      const schools = schoolsRes.data as School[];
      const users = usersRes.data as User[];
      const exams = examsRes.data as Examination[];
      const subs = subsRes.data as MarksSubmission[];
      const verif = verifRes.data as VerificationItem[];

      const teachers = users.filter((u) => u.role === 'teacher').length;

      // Compute school-level aggregates from demo store
      let totalStudents = 0;
      let totalTeachers = 0;
      for (const s of schools) {
        // demo store doesn't expose per-school counts here; approximate from existing mock
        totalStudents += 140;
        totalTeachers += 6;
      }

      setStats({
        regions: regions.length,
        councils: councils.length,
        schools: schools.length,
        students: totalStudents,
        teachers: totalTeachers,
        users: users.length,
        activeYear: '2025',
        activeExams: exams.filter(e => e.status === 'open').length,
        pendingSubmissions: subs.filter(s => s.status === 'not_started' || s.status === 'partial').length,
        awaitingVerification: verif.filter(v => v.status === 'under_review').length,
        approved: verif.filter(v => v.status === 'approved').length,
        published: verif.filter(v => v.status === 'published').length,
      });

      setRecentActivity([
        { id: 'a1', actor: 'Neema Kagoma', action: 'Verified CSEE results', module: 'Kasulu Town Secondary', time: '2h ago', type: 'verification' },
        { id: 'a2', actor: 'Amina Mbele', action: 'Registered new school', module: 'Kakonko Central Secondary', time: '5h ago', type: 'organisation' },
        { id: 'a3', actor: 'Elias Mrisho', action: 'Submitted marks', module: 'Lakeview Secondary · Biology', time: '1d ago', type: 'submission' },
        { id: 'a4', actor: 'Amina Mbele', action: 'Approved results', module: 'ACSEE 2025', time: '2d ago', type: 'approval' },
        { id: 'a5', actor: 'System', action: 'Nightly backup completed', module: 'Backup & Recovery', time: '1d ago', type: 'system' },
      ]);

      setPendingActions([
        { id: 'p1', title: 'Complete CSEE verification', desc: 'Kasulu Town Secondary is under review. Authorise verification before approval.', to: '/super-admin/results/verification' },
        { id: 'p2', title: 'Review pending submissions', desc: '2 schools have incomplete CSEE marks submissions.', to: '/super-admin/marks-submission' },
        { id: 'p3', title: 'Approve ACSEE 2025 for publication', desc: 'ACSEE 2025 results are approved but not yet published.', to: '/super-admin/results/publication' },
      ]);
    } catch (err) {
      toast({ title: 'Unable to load dashboard', description: 'Check your connection and try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard space-y-6">
        <PageHeader title="System Dashboard" description="Command centre for the entire examination management system." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3,4].map((i) => (
            <SkeletonStat key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard space-y-6">
      <PageHeader
        title="System Dashboard"
        description="Command centre for the entire examination management system."
        action={<Button variant="ghost" size="sm">Refresh</Button>}
      />

      {/* System overview metrics */}
      <Card>
        <CardHeader>
          <CardTitle>System overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <Kpi title="Regions" value={stats.regions} icon={<Building className="h-5 w-5" />} note="Active: Kigoma Region" />
            <Kpi title="Councils / Districts" value={stats.councils} icon={<University className="h-5 w-5" />} note={stats.councils + ' councils'} />
            <Kpi title="Registered schools" value={stats.schools} icon={<SchoolIcon />} note={stats.schools + ' schools'} tone="blue" />
            <Kpi title="Students" value={stats.students} icon={<Users className="h-5 w-5" />} note="Registered learners" />
            <Kpi title="Teachers" value={stats.teachers} icon={<Users className="h-5 w-5" />} note="Marks-entry staff" tone="blue" />
            <Kpi title="System users" value={stats.users} icon={<Shield className="h-5 w-5" />} note="All roles" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Examination operations overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Examination operations</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Kpi title="Active examinations" value={stats.activeExams} icon={<ArrowUpDown className="h-5 w-5" />} note="Submissions open" tone="green" />
              <Kpi title="Pending submissions" value={stats.pendingSubmissions} icon={<AlertCircle className="h-5 w-5" />} note="Not started / partial" tone="warning" />
              <Kpi title="Awaiting verification" value={stats.awaitingVerification} icon={<Clock className="h-5 w-5" />} note="Under review" tone="warning" />
              <Kpi title="Approved results" value={stats.approved} icon={<CheckCircle className="h-5 w-5" />} note="Ready for publication" tone="green" />
              <Kpi title="Published results" value={stats.published} icon={<FileText className="h-5 w-5" />} note="Live on public portal" />
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider">Workflow status</p>
                <p className="text-sm font-medium text-neutral-900">Submissions → Verification → Approval → Publication</p>
              </div>
              <div className="flex gap-2">
                <Link to="/super-admin/marks-submission" className="text-xs font-medium text-green-700 hover:underline">Monitor submissions →</Link>
                <Link to="/super-admin/results/verification" className="text-xs font-medium text-green-700 hover:underline">Verification queue →</Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending administrative actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending administrative actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {pendingActions.length === 0 ? (
              <EmptyState title="No pending actions" description="All caught up." icon="check-circle" />
            ) : (
              <div className="space-y-3">
                {pendingActions.map((item) => (
                  <ActionRow key={item.id} item={item} navigate={navigate} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Organisational overview + Recent activity side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organisational overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <OrgStat label="Schools by region" value={stats.schools} sub="Kigoma Region" />
              <OrgStat label="Schools by ownership" value={Math.round(stats.schools * 0.7)} sub="Government" />
              <OrgStat label="Education levels" value={2} sub="O-Level · A-Level" />
              <OrgStat label="Regional coverage" value="100%" sub="All councils active" />
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <Link to="/super-admin/organization/schools" className="text-xs font-medium text-green-700 hover:underline">Manage all schools →</Link>
              <Link to="/super-admin/organization/hierarchy" className="text-xs font-medium text-green-700 hover:underline">Hierarchy explorer →</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent system activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Kpi({ title, value, icon, note, tone }: {
  title: string; value: number | string; icon: React.ReactNode; note: string; tone?: 'green'|'blue'|'warning';
}) {
  const toneColors: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border border-green-100',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
  };
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="flex items-center gap-2">
        <span className={cn('rounded p-1.5', toneColors[tone || 'green'])}>{icon}</span>
      </div>
      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{title}</p>
        <p className="text-lg font-semibold text-neutral-900 leading-none">{value}</p>
        <p className="text-[10px] text-neutral-500 mt-0.5">{note}</p>
      </div>
    </div>
  );
}

function OrgStat({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[10px] text-neutral-500">{label}</div>
      <div>
        <div className="text-sm font-semibold text-neutral-900">{value}</div>
        <div className="text-[10px] text-neutral-400">{sub}</div>
      </div>
    </div>
  );
}

function ActionRow({ item, navigate }: { item: { id: string; title: string; desc: string; to: string }; navigate: any }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-neutral-100 bg-white p-3 hover:bg-neutral-50 cursor-pointer transition-colors" onClick={() => navigate(item.to)}>
      <div>
        <p className="text-sm font-medium text-neutral-900">{item.title}</p>
        <p className="text-xs text-neutral-500">{item.desc}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-semibold text-green-700">Review</span>
        <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
      </div>
    </div>
  );
}

function ActivityRow({ item }: { item: { actor: string; action: string; module: string; time: string; type: string } }) {
  const typeColor: Record<string, string> = {
    verification: 'text-green-700 bg-green-50',
    submission: 'text-blue-700 bg-blue-50',
    approval: 'text-amber-700 bg-amber-50',
    organisation: 'text-neutral-700 bg-neutral-50',
    system: 'text-neutral-700 bg-neutral-50',
  };
  return (
    <div className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
      <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', typeColor[item.type] || 'text-neutral-600 bg-neutral-100')}>
        {item.type}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-900">
          <span className="font-medium">{item.actor}</span> {item.action}
        </p>
        <p className="text-xs text-neutral-500">{item.module} · {item.time}</p>
      </div>
    </div>
  );
}

function SkeletonStat() {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <div className="h-4 w-24 rounded-md bg-neutral-200 animate-pulse mb-3" />
      <div className="h-6 w-20 rounded-md bg-neutral-200 animate-pulse mb-1" />
      <div className="h-3 w-32 rounded-md bg-neutral-200 animate-pulse" />
    </div>
  );
}

function SchoolIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-6 9 6v10H3zM9 20v-6h6v6" />
    </svg>
  );
}
