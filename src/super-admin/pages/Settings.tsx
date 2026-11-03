/**
 * System Settings — institutional details and configuration sections.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select, Option,
  Separator,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { settingsService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Building, School, Shield, Bell, Clock } from 'lucide-react';
import type { SystemSettings } from '../types';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<Partial<SystemSettings>>({});

  useEffect(() => {
    settingsService.get().then((s) => {
      setSettings(s);
      setForm({ ...s });
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load settings', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
  }, [toast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const updated = await settingsService.update(form as Partial<SystemSettings>);
      setSettings(updated);
      setSaved(true);
      toast({ title: 'Settings saved', variant: 'success' });
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      toast({ title: 'Save failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
    } finally { setSaving(false); }
  }

  if (loading) return <div className="h-80 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>;
  if (!settings) return <div className="p-6">Unable to load settings.</div>;

  return (
    <div className="space-y-6">
      <PageHeader title="System Settings" description="Configure institutional details and system-wide preferences." action={<Button variant="primary" onClick={handleSave} disabled={saving} isLoading={saving}>Save changes</Button>} />

      {saved && (
        <Card className="border-green-100 bg-green-50 p-4">
          <p className="text-sm text-green-800">Settings saved successfully for this session.</p>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Building className="h-4 w-4" /> Institutional details</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Institution name" value={form.institutionName || settings.institutionName} onChange={(e) => setForm({ ...form, institutionName: e.target.value })} />
              <Input label="System name" value={form.systemName || settings.systemName} onChange={(e) => setForm({ ...form, systemName: e.target.value })} />
            </div>
            <Input label="Logo URL" value={form.logoUrl || ''} placeholder="https://..." onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
          </form>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><School className="h-4 w-4" /> Academic & examination settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Active academic year" value={form.academicYearId || settings.academicYearId} onChange={(e) => setForm({ ...form, academicYearId: e.target.value })}>
                <Option value="year-2025">Academic Year 2025</Option>
                <Option value="year-2024">Academic Year 2024</Option>
                <Option value="year-2026">Academic Year 2026</Option>
              </Select>
              <Select label="Publication enabled" value={String(form.publicationEnabled ?? settings.publicationEnabled)} onChange={(e) => setForm({ ...form, publicationEnabled: e.target.value === 'true' })}>
                <Option value="true">Enabled</Option>
                <Option value="false">Disabled</Option>
              </Select>
              <Select label="Notifications enabled" value={String(form.notificationsEnabled ?? settings.notificationsEnabled)} onChange={(e) => setForm({ ...form, notificationsEnabled: e.target.value === 'true' })}>
                <Option value="true">Enabled</Option>
                <Option value="false">Disabled</Option>
              </Select>
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Security settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Session timeout (minutes)" value={String(form.sessionTimeoutMinutes ?? settings.sessionTimeoutMinutes)} type="number" onChange={(e) => setForm({ ...form, sessionTimeoutMinutes: Number(e.target.value) })} />
              <Input label="Password minimum length" value={String(form.passwordMinLength ?? settings.passwordMinLength)} type="number" onChange={(e) => setForm({ ...form, passwordMinLength: Number(e.target.value) })} />
            </div>
            <p className="text-[10px] text-neutral-500">Authorisation and access control are ultimately enforced by the PHP backend.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
