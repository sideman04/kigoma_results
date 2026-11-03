/**
 * User assignments — role ↔ permission matrix with organisational scope.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { roleService, permissionService, userService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Users, Shield, Link, Eye } from 'lucide-react';
import type { Role, Permission, RolePermission, User } from '../types';

export default function Assignments() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePerms, setRolePerms] = useState<RolePermission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    roleService.list().then((data) => { setRoles(data); if (data.length) setSelectedRole(data[0]!.id); });
    permissionService.list().then((data) => setPermissions(data));
    userService.list({ pageSize: 100 }).then((r) => setUsers(r.data as User[]));
    loadPerms();
  }, [toast]);

  function loadPerms() {
    if (!selectedRole) return;
    permissionService.listByRole(selectedRole).then((data) => setRolePerms(data));
  }

  const granted = new Set(rolePerms.filter((rp) => rp.granted).map((rp) => rp.permissionId));
  const role = roles.find((r) => r.id === selectedRole);
  const [submitting, setSubmitting] = useState(false);

  function toggle(permissionId: string) {
    const currentlyGranted = granted.has(permissionId);
    setSubmitting(true);
    if (currentlyGranted) {
      permissionService.revoke(selectedRole!, permissionId).then(() => {
        setRolePerms(rolePerms.filter((rp) => !(rp.roleId === selectedRole && rp.permissionId === permissionId)));
        granted.delete(permissionId);
        setSubmitting(false);
        toast({ title: 'Permission revoked', variant: 'success' });
      });
    } else {
      permissionService.grant(selectedRole!, permissionId).then(() => {
        setRolePerms([...rolePerms, { roleId: selectedRole!, permissionId, granted: true }]);
        granted.add(permissionId);
        setSubmitting(false);
        toast({ title: 'Permission granted', variant: 'success' });
      });
    }
  }

  const roleContent = loading ? (
    <div className="h-48 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
  ) : !role ? (
    <EmptyState title="No roles" />
  ) : (
    <>
      <div className="overflow-auto max-h-[400] rounded-md border border-neutral-100 bg-white mb-3">
        <Table>
          <Thead><Tr><Th>Permission</Th><Th className="w-24">Granted</Th><Th className="w-40">Category</Th></Tr></Thead>
          <Tbody>
            {permissions.map((p) => (
              <Tr key={p.id} className="hover:bg-neutral-50/50">
                <Td className="text-sm">{p.name}</Td>
                <Td>
                  <input
                    type="checkbox"
                    checked={granted.has(p.id)}
                    onChange={() => toggle(p.id)}
                    disabled={submitting}
                    className="h-4 w-4 rounded border border-neutral-300 text-green-700 focus:ring-2 focus:ring-green-700"
                  />
                </Td>
                <Td className="text-xs text-neutral-500 capitalize">{p.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <p className="text-[10px] text-neutral-500 mt-3">Changes are saved immediately. Backend enforces actual authorisation.</p>
    </>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" description="Map roles to permissions and review user organisational scope." />

      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader><CardTitle>Roles</CardTitle></CardHeader>
          <CardContent className="pt-0 p-3">
            <div className="space-y-2">
              {loading ? (
                <div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" />
              ) : roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRole(r.id); loadPerms(); }}
                  className={cn(
                    'flex items-center justify-between w-full px-3 py-2 rounded-md text-sm text-left transition-colors',
                    selectedRole === r.id ? 'bg-green-50 text-green-800 font-medium border border-green-100' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <span>{r.name}</span>
                  <Badge variant={selectedRole === r.id ? 'success' : 'neutral'} size="sm">{selectedRole === r.id ? 'Selected' : r.system ? 'System' : 'Custom'}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-[420px]">
          <CardHeader>
            <CardTitle>{role ? role.name : 'Select a role'}</CardTitle>
            <p className="text-[11px] text-neutral-500">{role ? role.description : ''}</p>
          </CardHeader>
          <CardContent className="pt-0 p-3">
            {roleContent}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>User organisational scope</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead><Tr><Th>User</Th><Th className="w-32">Role</Th><Th className="w-40">Scope</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr></Thead>
              <Tbody>
                {users.map((u) => (
                  <Tr key={u.id} className="hover:bg-neutral-50/50">
                    <Td>{u.fullName}</Td>
                    <Td><Badge variant="neutral" size="sm">{u.role.replace('_', ' ')}</Badge></Td>
                    <Td className="text-sm text-neutral-600">{u.schoolName || u.councilName || u.regionName || 'System-wide'}</Td>
                    <Td><Badge variant={u.status === 'active' ? 'success' : 'neutral'}>{u.status}</Badge></Td>
                    <Td>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/users/${u.id}`)}><Eye size={16} /></Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
