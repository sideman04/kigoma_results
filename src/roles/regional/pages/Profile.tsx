/**
 * Regional Administrator — Profile.
 */

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Separator } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { User, Shield, Mail, Clock, LogOut } from 'lucide-react';

export default function Profile() {
  const [saving, setSaving] = useState(false);

  return (
    <div className="space-y-6">
      <RolePageHeader title="Profile" description="Regional Administrator account details." />

      <Card>
        <CardHeader><CardTitle>Account profile</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="user-avatar shrink-0 rounded bg-green-700 p-2"><User className="h-10 w-10 text-white" /></div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Neema Kagoma</h3>
                <p className="text-xs text-neutral-500">regional</p>
                <Badge variant="success">Regional Administrator</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">regional@kigoma-education.go.tz</span></div>
              <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">Regional scope: Kigoma Region</span></div>
              <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-neutral-400" /><span className="text-sm text-neutral-600">Last login: Just now</span></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <form className="space-y-4">
            <Input label="New password" type="password" placeholder="••••••••" />
            <Input label="Confirm password" type="password" placeholder="••••••••" />
            <div className="flex gap-2">
              <Button variant="primary" onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 800); }} disabled={saving} isLoading={saving}>Change password</Button>
              <Button variant="danger" onClick={() => {}} disabled={saving} isLoading={saving}>Sign out</Button>
            </div>
          </form>
          <p className="text-[10px] text-neutral-500 mt-4">Password changes are validated by the PHP backend.</p>
        </CardContent>
      </Card>
    </div>
  );
}
