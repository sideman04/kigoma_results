/**
 * Shared account pages used by role workspaces.
 * Reads the authenticated user from AuthContext, so it stays role-aware without
 * duplicating a profile screen for every role.
 */

import { useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Separator, Switch, useToast } from './ui';
import { RolePageHeader } from './RoleTopbar';
import { useAuth } from '../../../context/AuthContext';
import { getRoleLabel } from '../config/roles';
import { Mail, Phone, Shield, User, Building2, Clock, KeyRound } from 'lucide-react';

export function RoleProfilePage() {
  const { user } = useAuth() as any;
  const scope = user?.schoolName || user?.councilName || user?.regionName || user?.scopeLabel || 'Assigned scope';

  return (
    <div className="space-y-6">
      <RolePageHeader title="Profile" description="Your account details and current organisational scope." />

      <Card>
        <CardHeader><CardTitle>Account profile</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="shrink-0 rounded-lg bg-green-700 p-3">
                <User className="h-9 w-9 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-900">{user?.fullName || user?.name || 'User'}</h3>
                <p className="text-xs text-neutral-500">@{user?.username || 'user'}</p>
                <div className="mt-2"><Badge variant="success">{getRoleLabel(user?.role)}</Badge></div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={user?.email || '—'} />
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={user?.phone || 'Not provided'} />
              {user?.employeeNo && <InfoRow icon={<Shield className="h-4 w-4" />} label="Officer ID" value={user.employeeNo} />}
              <InfoRow icon={<Building2 className="h-4 w-4" />} label="Scope" value={scope} />
              <InfoRow icon={<Clock className="h-4 w-4" />} label="Last sign-in" value={user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'This session'} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Access summary</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-neutral-600">
            {user?.role === 'teacher'
              ? 'Your account is limited to student registration and student records. Examination marks, marks submission and results management are not part of this workspace.'
              : user?.role === 'marks_entry_officer'
                ? 'Your account is limited to examination marks processing for the schools or examination centres assigned to you.'
                : 'Your account permissions are determined by your assigned role and organisational scope.'}
          </p>
          <Separator className="my-4" />
          <p className="text-[11px] text-neutral-500">
            Account changes are managed by the system administrator. Frontend access is a usability restriction; the backend enforces the final authorisation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function RoleSettingsPage() {
  const { toast } = useToast();
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [submissionAlerts, setSubmissionAlerts] = useState(true);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast({ title: 'Preferences saved', description: 'Your workspace settings have been updated (frontend demo).', variant: 'success' });
    }, 450);
  };

  return (
    <div className="space-y-6">
      <RolePageHeader title="Settings" description="Workspace preferences for your role." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">Email updates</p>
                <p className="text-xs text-neutral-500">Receive account and system notifications by email.</p>
              </div>
              <Switch checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">Workspace alerts</p>
                <p className="text-xs text-neutral-500">Show deadline and submission reminders inside the workspace.</p>
              </div>
              <Switch checked={submissionAlerts} onChange={(e) => setSubmissionAlerts(e.target.checked)} />
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="primary" size="sm" onClick={save} isLoading={saving}>Save preferences</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Security</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-start gap-3">
              <KeyRound className="h-5 w-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Password</p>
                <p className="text-xs text-neutral-500">Password changes are handled by the system administrator in this frontend demo.</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-neutral-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Session security</p>
                <p className="text-xs text-neutral-500">Sessions expire automatically. Sign out when using a shared device.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-neutral-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
        <p className="text-sm text-neutral-700">{value}</p>
      </div>
    </div>
  );
}
