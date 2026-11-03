/**
 * Council Administrator — Reports.
 */

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Option } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { FileText, Download, ArrowRight, Building2 } from 'lucide-react';
import { useToast } from '../../shared/components/ui';

export function Reports() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [format, setFormat] = useState<'pdf' | 'excel' | 'print'>('pdf');
  const runExport = () => {
    if (!selected) return;
    toast({ title: `Exporting ${selected}`, description: `Exporting to ${format.toUpperCase()}… (demo)`, variant: 'success' });
    setTimeout(() => toast({ title: 'Export complete', description: `council-${selected}-report.${format === 'print' ? 'pdf' : format} downloaded.`, variant: 'success' }), 900);
  };
  const REPORTS = [
    { id: 'council-perf', title: 'Council performance report', desc: 'Performance summary for Kasulu TC.', cat: 'Performance', icon: Building2 },
    { id: 'school-perf', title: 'School performance report', desc: 'School performance and submission status.', cat: 'Schools', icon: Building2 },
    { id: 'submission', title: 'Marks submission report', desc: 'Submission progress and missing marks.', cat: 'Marks', icon: FileText },
  ];
  return (
    <div className="space-y-6">
      <RolePageHeader title="Council reports" description="Council-level academic and submission reports." action={<Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" /> Downloads</Button>} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Reports</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
              {REPORTS.map((r) => (
                <button key={r.id} onClick={() => setSelected(r.id)} className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors ${selected === r.id ? 'border-green-700 bg-green-50' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-2"><r.icon className="h-5 w-5 text-neutral-500" /><span className="text-sm font-semibold text-neutral-900">{r.title}</span></div>
                  <p className="text-xs text-neutral-500">{r.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">{r.cat}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Export</CardTitle></CardHeader>
          <CardContent className="pt-0">
            {!selected ? <div className="p-12 text-center text-neutral-500">Select a report.</div> : (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-neutral-900">{REPORTS.find((r) => r.id === selected)!.title}</p>
                <Select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-64"><Option value="pdf">PDF</Option><Option value="excel">Excel</Option><Option value="print">Print</Option></Select>
                <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => window.print()}>Print preview</Button><Button variant="primary" size="sm" onClick={runExport}>Export {format.toUpperCase()}</Button></div>
              </div>
            )}
            <p className="text-[10px] text-neutral-500 mt-3">Demo file only. PHP backend generates real reports.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Notifications() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Notifications" description="Council alerts — school submissions, deadlines and verification updates." action={<Button variant="outline" size="sm">Mark all as read</Button>} />
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <NotifRow title="Heri Girls — incomplete CSEE submission" cat="submission" time="2h ago" unread />
            <NotifRow title="Verification window open" cat="verification" time="5h ago" />
            <NotifRow title="Returned submission — Kasulu Town" cat="approval" time="1d ago" unread />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotifRow({ title, cat, time, unread }: { title: string; cat: string; time: string; unread?: boolean }) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${unread ? 'bg-green-25 border-green-100' : 'border-neutral-100 bg-white hover:bg-neutral-50'}`}>
      <Bell className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <p className={`text-sm ${unread ? 'font-semibold text-neutral-900' : 'text-neutral-600'}`}>{title}</p>
        <p className="text-xs text-neutral-500">{cat} · {time}</p>
      </div>
    </div>
  );
}

function Bell({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>; }

export function Profile() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Profile" description="Council Administrator account details." />
      <Card>
        <CardHeader><CardTitle>Account profile</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="user-avatar shrink-0 rounded bg-green-700 p-2"><User className="h-10 w-10 text-white" /></div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Hamisi Ntibuka</h3>
                <p className="text-xs text-neutral-500">kasulu</p>
                <Badge variant="success">Council Administrator</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">kasulu@kigoma-education.go.tz</span></div>
              <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">Council scope: Kasulu TC</span></div>
              <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">Last login: Just now</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Shield({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>; }
function Mail({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>; }
function Clock({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function User({ className }: { className?: string }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0-7V5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2z" /></svg>; }
