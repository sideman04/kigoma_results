/**
 * Teacher — Drafts, Submissions, History, Notifications, Profile (compact).
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { FileText, Check, Upload, Activity, ArrowRight, Bell, User, Shield, Mail, Clock, LogOut } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';

export function Drafts() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Drafts" description="Your saved but unsubmitted marks entry sessions." action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Continue entry</Button>} />
      <Card>
        <CardHeader><CardTitle>Saved drafts</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Examination</th>
                  <th>Class · Subject</th>
                  <Th className="w-40">Progress</th>
                  <Th className="w-40">Updated</th>
                  <Th className="w-48">Actions</th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="font-mono text-xs">CSEE 2025</td>
                  <td className="text-sm text-neutral-600">Form 4 · Biology</td>
                  <td className="td">
                    <div className="w-full bg-neutral-200 rounded-full h-1.5"><div className="bg-green-700 h-1.5 rounded-full" style={{ width: '75%' }} /></div>
                    <span className="text-[10px] text-neutral-600 block mt-1">24 / 32</span>
                  </td>
                  <td className="text-sm text-neutral-600">1 hour ago</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/teacher/marks-entry/session-draft')}>Continue</Button></td>
                </tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <p className="text-[10px] text-neutral-500">Drafts are saved locally and synced when the backend is integrated.</p>
    </div>
  );
}

function navigateTo(p: string) { window.location.href = p; }

export function Submissions() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Submissions" description="Your submitted marks and their review status." />
      <Card>
        <CardHeader><CardTitle>Submitted marks</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Examination</th>
                  <th>Class · Subject</th>
                  <Th className="w-40">Students</th>
                  <Th className="w-40">Submitted</th>
                  <Th className="w-40">Status</th>
                  <Th className="w-48">Actions</th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="font-mono text-xs">CSEE 2025</td>
                  <td className="text-sm text-neutral-600">Form 4 · Mathematics</td>
                  <td className="td text-sm text-neutral-600">28</td>
                  <td className="text-sm text-neutral-600">2 days ago</td>
                  <td className="td"><Badge variant="success" size="sm">Submitted</Badge></td>
                  <td className="td"><Button variant="ghost" size="sm"><EyeIcon size={16} /></Button></td>
                </tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EyeIcon({ size }: { size?: number }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`h-${size ?? 14} w-${size ?? 14}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }

export function History() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Submission history" description="History of your marks submissions and corrections." />
      <Card>
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <HistRow title="CSEE 2025 · Mathematics — Submitted" desc="28 students submitted to school review." time="2 days ago" status="submitted" />
            <HistRow title="CSEE 2025 · Biology — Returned" desc="2 errors corrected; resubmitted." time="1 week ago" status="returned" />
            <HistRow title="CSEE 2025 · English — Draft" desc="No submission yet." time="2 weeks ago" status="draft" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HistRow({ title, desc, time, status }: { title: string; desc: string; time: string; status: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 bg-white hover:bg-neutral-50 transition-colors">
      <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-medium ${status === 'submitted' ? 'bg-green-50 text-green-700' : status === 'returned' ? 'bg-red-50 text-red-700' : 'bg-neutral-100 text-neutral-500'}`}>
        {status === 'submitted' ? '✓' : status === 'returned' ? '↩' : '○'}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      <p className="text-xs text-neutral-500">{time}</p>
    </div>
  );
}

export function Notifications() {
  return (
    <div className="space-y-6">
      <RolePageHeader title="Notifications" description="Deadlines, submission confirmations and returned corrections." action={<Button variant="outline" size="sm">Mark all as read</Button>} />
      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <NotifRow title="CSEE 2025 marks-entry deadline approaching" cat="submission" time="1d ago" unread />
            <NotifRow title="Biology submission returned — 2 errors" cat="approval" time="3d ago" unread />
            <NotifRow title="Mathematics submitted successfully" cat="submission" time="5d ago" />
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
      <RolePageHeader title="Profile" description="Teacher account details." />
      <Card>
        <CardHeader><CardTitle>Account profile</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="user-avatar shrink-0 rounded bg-green-700 p-2"><User className="h-10 w-10 text-white" /></div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Elias Mrisho</h3>
                <p className="text-xs text-neutral-500">teacher</p>
                <Badge variant="success">Teacher</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">elias@lakeview.sch.tz</span></div>
              <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">School: Lakeview Secondary</span></div>
              <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">Subjects: Mathematics, Biology</span></div>
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
