/**
 * Super Administrator — Marks Entry Officers Management.
 *
 * Dedicated account administration for the Marks Entry Officer role:
 * create, edit, assign organisational scope, activate/deactivate, inspect
 * activity and reset demo credentials. This role is never created through the
 * Teacher registration workflow and has no public self-registration.
 */

import { useEffect, useMemo, useState } from 'react';
import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle, ConfirmDialog, Dialog,
  EmptyState, Input, Option, Select, Table, Tbody, Td, Th, Thead, Tr, useToast,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { regionService, councilService, schoolService } from '../services/api';
import {
  createOfficer, listOfficers, resetOfficerCredentials, setOfficerStatus, updateOfficer,
  type MarksOfficer, type OfficerStatus,
} from '../../roles/shared/services/marksOfficers';
import type { Region, Council, School } from '../types';
import { Activity, KeyRound, Pencil, Plus, Search, UserCheck, UserX } from 'lucide-react';

interface OfficerFormState {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  employeeNo: string;
  regionId: string;
  councilId: string;
  schoolId: string;
  status: OfficerStatus;
  password: string;
}

const EMPTY_FORM: OfficerFormState = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  employeeNo: '',
  regionId: 'region-kigoma',
  councilId: '',
  schoolId: '',
  status: 'active',
  password: '',
};

export default function MarksOfficers() {
  const { toast } = useToast();
  const [officers, setOfficers] = useState<MarksOfficer[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState<OfficerFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<MarksOfficer | null>(null);
  const [activityOfficer, setActivityOfficer] = useState<MarksOfficer | null>(null);
  const [statusTarget, setStatusTarget] = useState<MarksOfficer | null>(null);
  const [resetTarget, setResetTarget] = useState<MarksOfficer | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOfficers(listOfficers());
    Promise.all([
      regionService.list({ pageSize: 100 }),
      councilService.list({ pageSize: 200 }),
      schoolService.list({ pageSize: 200 }),
    ]).then(([regionRes, councilRes, schoolRes]) => {
      setRegions(regionRes.data as Region[]);
      setCouncils(councilRes.data as Council[]);
      setSchools(schoolRes.data as School[]);
    }).catch((err) => toast({ title: 'Unable to load organisational data', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
  }, [toast]);

  const reload = () => setOfficers(listOfficers());

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return officers.filter((officer) => {
      const haystack = `${officer.fullName} ${officer.username} ${officer.email} ${officer.employeeNo} ${officer.regionName} ${officer.councilName} ${officer.schoolName}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matchesStatus = !statusFilter || officer.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [officers, search, statusFilter]);

  const stats = useMemo(() => ({
    total: officers.length,
    active: officers.filter((officer) => officer.status === 'active').length,
    inactive: officers.filter((officer) => officer.status === 'inactive').length,
    centres: new Set(officers.map((officer) => officer.schoolId || officer.councilId).filter(Boolean)).size,
  }), [officers]);

  const visibleCouncils = (regionId: string) => councils.filter((council) => !regionId || council.regionId === regionId);
  const visibleSchools = (councilId: string) => schools.filter((school) => !councilId || school.councilId === councilId);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setCreateOpen(true);
  };

  const openEdit = (officer: MarksOfficer) => {
    setEditing(officer);
    setForm({
      fullName: officer.fullName,
      username: officer.username,
      email: officer.email,
      phone: officer.phone,
      employeeNo: officer.employeeNo,
      regionId: officer.regionId,
      councilId: officer.councilId,
      schoolId: officer.schoolId || '',
      status: officer.status,
      password: '',
    });
    setErrors({});
    setEditOpen(true);
  };

  const validate = (mode: 'create' | 'edit') => {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 3) next.fullName = 'Enter the officer’s full name.';
    if (!/^[a-zA-Z0-9._-]{3,}$/.test(form.username.trim())) next.username = 'Use at least 3 letters, numbers, dots, dashes or underscores.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Enter a phone number.';
    if (!form.employeeNo.trim()) next.employeeNo = 'Enter the employee / officer identification number.';
    if (!form.regionId) next.regionId = 'Assign a region.';
    if (!form.councilId) next.councilId = 'Assign a council.';
    if (mode === 'create' && form.password.length < 8) next.password = 'Use an initial password of at least 8 characters.';

    const duplicateUsername = officers.find((officer) => officer.username.toLowerCase() === form.username.trim().toLowerCase());
    if (duplicateUsername && duplicateUsername.id !== editing?.id) next.username = 'That username is already in use.';
    const duplicateEmail = officers.find((officer) => officer.email.toLowerCase() === form.email.trim().toLowerCase());
    if (duplicateEmail && duplicateEmail.id !== editing?.id) next.email = 'That email address is already in use.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildScopeNames = () => {
    const region = regions.find((item) => item.id === form.regionId);
    const council = councils.find((item) => item.id === form.councilId);
    const school = schools.find((item) => item.id === form.schoolId);
    return {
      regionName: region?.name,
      councilName: council?.name,
      schoolName: school?.name,
    };
  };

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate('create')) return;
    setBusy(true);
    try {
      const scope = buildScopeNames();
      createOfficer({
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        employeeNo: form.employeeNo.trim(),
        regionId: form.regionId,
        councilId: form.councilId,
        schoolId: form.schoolId || undefined,
        status: form.status,
        password: form.password,
        ...scope,
      });
      reload();
      setCreateOpen(false);
      setForm(EMPTY_FORM);
      toast({ title: 'Marks Entry Officer created', description: 'The officer can now sign in using the issued credentials.', variant: 'success' });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Unable to create officer.' });
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing || !validate('edit')) return;
    setBusy(true);
    try {
      const scope = buildScopeNames();
      updateOfficer(editing.id, {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        employeeNo: form.employeeNo.trim(),
        regionId: form.regionId,
        councilId: form.councilId,
        schoolId: form.schoolId || undefined,
        status: form.status,
        ...scope,
      });
      reload();
      setEditOpen(false);
      setEditing(null);
      toast({ title: 'Officer details updated', variant: 'success' });
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Unable to update officer.' });
    } finally {
      setBusy(false);
    }
  };

  const toggleStatus = () => {
    if (!statusTarget) return;
    setOfficerStatus(statusTarget.id, statusTarget.status === 'active' ? 'inactive' : 'active');
    reload();
    toast({ title: statusTarget.status === 'active' ? 'Account deactivated' : 'Account activated', variant: 'success' });
    setStatusTarget(null);
  };

  const handleResetPassword = (event: React.FormEvent) => {
    event.preventDefault();
    if (!resetTarget) return;
    if (resetPassword.length < 8) {
      setResetError('Use a password of at least 8 characters.');
      return;
    }
    resetOfficerCredentials(resetTarget.id, resetPassword);
    reload();
    toast({ title: 'Credentials reset', description: `A new password has been set for ${resetTarget.fullName} (frontend demo).`, variant: 'success' });
    setResetTarget(null);
    setResetPassword('');
    setResetError('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marks Entry Officers Management"
        description="Create and manage the dedicated officers who enter examination marks for assigned schools or centres."
        action={<Button variant="primary" onClick={openCreate}><Plus size={18} /> Create New Marks Entry Officer</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <OfficerStat label="Total officers" value={stats.total} />
        <OfficerStat label="Active accounts" value={stats.active} tone="green" />
        <OfficerStat label="Inactive accounts" value={stats.inactive} tone="warning" />
        <OfficerStat label="Assigned centres" value={stats.centres} tone="blue" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Marks Entry Officers</CardTitle>
              <p className="mt-1 text-xs text-neutral-500">Accounts are provisioned here only — this role has no public self-registration.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input placeholder="Search officers…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 sm:w-64" aria-label="Search officers" />
              </div>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-36" aria-label="Filter officer status">
                <Option value="">All statuses</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Officer</Th>
                  <Th>Employee ID</Th>
                  <Th>Region / council</Th>
                  <Th>School / centre</Th>
                  <Th>Status</Th>
                  <Th>Last activity</Th>
                  <Th className="w-56">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr><Td colSpan={7} className="h-24"><div className="mx-auto h-4 w-40 rounded bg-neutral-200 animate-pulse" /></Td></Tr>
                ) : filtered.length === 0 ? (
                  <Tr><Td colSpan={7}><EmptyState title="No Marks Entry Officers" description="Create the first officer account to begin examination marks processing." icon="Users" action={<Button variant="primary" size="sm" onClick={openCreate}>Create officer</Button>} /></Td></Tr>
                ) : (
                  filtered.map((officer) => (
                    <Tr key={officer.id} className="hover:bg-neutral-50/60">
                      <Td>
                        <p className="font-medium text-neutral-900">{officer.fullName}</p>
                        <p className="text-[11px] text-neutral-500">@{officer.username} · {officer.email}</p>
                        <p className="text-[11px] text-neutral-400">{officer.phone}</p>
                      </Td>
                      <Td className="font-mono text-xs">{officer.employeeNo}</Td>
                      <Td className="text-sm text-neutral-600">{officer.regionName || officer.regionId}<br /><span className="text-xs text-neutral-500">{officer.councilName || officer.councilId}</span></Td>
                      <Td className="text-sm text-neutral-600">{officer.schoolName || 'All schools in council'}</Td>
                      <Td><Badge variant={officer.status === 'active' ? 'success' : 'neutral'}>{officer.status}</Badge></Td>
                      <Td className="text-xs text-neutral-500">{officer.lastLoginAt ? new Date(officer.lastLoginAt).toLocaleString() : 'Never signed in'}</Td>
                      <Td>
                        <div className="flex flex-wrap items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(officer)} aria-label="Edit officer details"><Pencil size={15} /></Button>
                          <Button variant="ghost" size="sm" onClick={() => setStatusTarget(officer)} aria-label={officer.status === 'active' ? 'Deactivate officer' : 'Activate officer'}>
                            {officer.status === 'active' ? <UserX size={15} /> : <UserCheck size={15} />}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => { setResetTarget(officer); setResetPassword(''); setResetError(''); }} aria-label="Reset credentials"><KeyRound size={15} /></Button>
                          <Button variant="ghost" size="sm" onClick={() => setActivityOfficer(officer)} aria-label="View officer activity"><Activity size={15} /></Button>
                        </div>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={(open) => { setCreateOpen(open); if (!open) setErrors({}); }} title="Create New Marks Entry Officer" description="Issue a dedicated marks-processing account. The officer signs in with these credentials." size="lg">
        <form onSubmit={handleCreate} className="space-y-5" noValidate>
          <OfficerFormFields form={form} setForm={setForm} errors={errors} regions={regions} councils={visibleCouncils(form.regionId)} schools={visibleSchools(form.councilId)} mode="create" />
          {errors.form && <p className="text-xs text-red-600">{errors.form}</p>}
          <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-100 pt-4">
            <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={busy}>Create officer account</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) setEditing(null); }} title="Edit Officer Details" description="Update contact information, account status and assigned administrative scope." size="lg">
        <form onSubmit={handleEdit} className="space-y-5" noValidate>
          <OfficerFormFields form={form} setForm={setForm} errors={errors} regions={regions} councils={visibleCouncils(form.regionId)} schools={visibleSchools(form.councilId)} mode="edit" />
          {errors.form && <p className="text-xs text-red-600">{errors.form}</p>}
          <div className="flex flex-wrap justify-end gap-2 border-t border-neutral-100 pt-4">
            <Button type="button" variant="ghost" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={busy}>Save changes</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={!!statusTarget}
        onOpenChange={(open) => { if (!open) setStatusTarget(null); }}
        title={statusTarget?.status === 'active' ? 'Deactivate officer account?' : 'Activate officer account?'}
        description={statusTarget?.status === 'active' ? `${statusTarget?.fullName} will no longer be able to sign in or submit marks until the account is reactivated.` : `${statusTarget?.fullName} will be able to sign in and process marks again.`}
        confirmLabel={statusTarget?.status === 'active' ? 'Deactivate account' : 'Activate account'}
        variant={statusTarget?.status === 'active' ? 'destructive' : 'default'}
        onConfirm={toggleStatus}
      />

      <Dialog open={!!resetTarget} onOpenChange={(open) => { if (!open) { setResetTarget(null); setResetPassword(''); setResetError(''); } }} title="Reset Account Credentials" description={resetTarget ? `Set a new demo password for ${resetTarget.fullName}.` : undefined} size="sm">
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input label="New password" type="password" value={resetPassword} onChange={(e) => { setResetPassword(e.target.value); setResetError(''); }} error={resetError} helper="Minimum 8 characters. Frontend demo only." required />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setResetTarget(null)}>Cancel</Button>
            <Button type="submit" variant="primary"><KeyRound size={16} /> Reset credentials</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={!!activityOfficer} onOpenChange={(open) => { if (!open) setActivityOfficer(null); }} title={activityOfficer ? `${activityOfficer.fullName} — activity` : 'Officer activity'} description={activityOfficer ? `${activityOfficer.employeeNo} · ${activityOfficer.schoolName || activityOfficer.councilName}` : undefined} size="lg">
        {activityOfficer && (
          activityOfficer.activity.length === 0 ? (
            <EmptyState title="No activity recorded" icon="Activity" />
          ) : (
            <div className="space-y-3">
              {activityOfficer.activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-lg border border-neutral-100 p-3">
                  <span className="rounded-full bg-neutral-50 p-1.5 text-neutral-500"><Activity className="h-3.5 w-3.5" /></span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{item.action}</p>
                    <p className="text-xs text-neutral-500">{item.detail}</p>
                  </div>
                  <p className="text-[11px] text-neutral-400">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )
        )}
      </Dialog>

      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <p className="text-[11px] text-neutral-500">
          Marks Entry Officers are not teachers and are not created through Teacher registration. Public self-registration is disabled. Account credentials and scope are managed exclusively by the Super Administrator. Frontend enforcement is for navigation and UX; the backend must enforce final authorisation.
        </p>
      </div>
    </div>
  );
}

function OfficerFormFields({
  form, setForm, errors, regions, councils, schools, mode,
}: {
  form: OfficerFormState;
  setForm: (form: OfficerFormState) => void;
  errors: Record<string, string>;
  regions: Region[];
  councils: Council[];
  schools: School[];
  mode: 'create' | 'edit';
}) {
  const update = (patch: Partial<OfficerFormState>) => setForm({ ...form, ...patch });
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full name" value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} error={errors.fullName} required />
        <Input label="Username" value={form.username} onChange={(e) => update({ username: e.target.value })} error={errors.username} required />
        <Input label="Email address" type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} error={errors.email} required />
        <Input label="Phone number" value={form.phone} onChange={(e) => update({ phone: e.target.value })} error={errors.phone} placeholder="+255 …" required />
        <Input label="Employee / Officer Identification Number" value={form.employeeNo} onChange={(e) => update({ employeeNo: e.target.value })} error={errors.employeeNo} required />
        <Select label="Account status" value={form.status} onChange={(e) => update({ status: e.target.value as OfficerStatus })}>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-900">Administrative assignment</h3>
        <p className="text-xs text-neutral-500">The scope controls which schools or examination centres the officer can process.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Region"
          value={form.regionId}
          onChange={(e) => update({ regionId: e.target.value, councilId: '', schoolId: '' })}
          error={errors.regionId}
          required
        >
          <Option value="">Select region</Option>
          {regions.map((region) => <Option key={region.id} value={region.id}>{region.name}</Option>)}
        </Select>
        <Select
          label="Council"
          value={form.councilId}
          onChange={(e) => update({ councilId: e.target.value, schoolId: '' })}
          error={errors.councilId}
          disabled={!form.regionId}
          required
        >
          <Option value="">Select council</Option>
          {councils.map((council) => <Option key={council.id} value={council.id}>{council.name}</Option>)}
        </Select>
        <Select label="School / Examination Centre" value={form.schoolId} onChange={(e) => update({ schoolId: e.target.value })} disabled={!form.councilId}>
          <Option value="">All schools in council</Option>
          {schools.map((school) => <Option key={school.id} value={school.id}>{school.name} ({school.code})</Option>)}
        </Select>
      </div>
      <p className="text-[11px] text-neutral-500">Leave the school/centre blank to grant access to all schools in the selected council.</p>

      {mode === 'create' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Initial password" type="password" value={form.password} onChange={(e) => update({ password: e.target.value })} error={errors.password} helper="Minimum 8 characters. Shared securely with the officer." required />
          <div className="flex items-center rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-800">
            The officer will use this username and initial password to sign in. They will land directly in the marks-processing workspace.
          </div>
        </div>
      )}
    </>
  );
}

function OfficerStat({ label, value, tone = 'neutral' }: { label: string; value: number; tone?: 'neutral' | 'green' | 'warning' | 'blue' }) {
  const tones: Record<string, string> = {
    neutral: 'border-neutral-200 bg-white text-neutral-900',
    green: 'border-green-100 bg-green-50 text-green-800',
    warning: 'border-amber-100 bg-amber-50 text-amber-800',
    blue: 'border-blue-100 bg-blue-50 text-blue-800',
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
