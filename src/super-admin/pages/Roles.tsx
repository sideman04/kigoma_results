/**
 * Role management — list roles and their permissions.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
  Input,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { roleService, permissionService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Shield, Users, Edit, Eye } from 'lucide-react';
import type { Role, Permission, RolePermission } from '../types';

export default function Roles() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePerms, setRolePerms] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    roleService.list().then((data) => { setRoles(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load roles', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    permissionService.list().then((data) => setPermissions(data));
    permissionService.listByRole('role-super_admin').then((data) => setRolePerms(data));
  }, [toast]);

  const filtered = roles.filter((r) => !search || r.name.toLowerCase().includes(search) || r.slug.toLowerCase().includes(search));
  const permNames = new Set(rolePerms.map((rp) => rp.permissionId));

  return (
    <div className="space-y-6">
      <PageHeader title="Roles" description="Define system roles and their permission sets." action={<Button variant="primary" size="sm">Edit role permissions</Button>} />

      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Input placeholder="Search roles…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white mt-3">
              <Table>
                <Thead><Tr><Th>Role</Th><Th className="w-48">Description</Th><Th className="w-32">Type</Th><Th className="w-48">Permissions</Th><Th className="w-48">Actions</Th></Tr></Thead>
                <Tbody>
                  {loading ? (
                    <Tr><Td colSpan={5} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                  ) : roles.length === 0 ? (
                    <Tr><Td colSpan={5}><EmptyState title="No roles" /></Td></Tr>
                  ) : (
                    filtered.map((r) => {
                        const count = permissions.filter((p) => permNames.has(p.id) && r.id === 'role-super_admin').length;
                      return (
                        <Tr key={r.id} className="hover:bg-neutral-50/50">
                          <Td>{r.name}</Td>
                          <Td className="text-sm text-neutral-600">{r.description}</Td>
                          <Td><Badge variant="neutral" size="sm">{r.system ? 'System' : 'Custom'}</Badge></Td>
                          <Td className="text-sm text-neutral-600">{r.system ? 'All permissions' : 'Configured'}</Td>
                          <Td>
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/roles/${r.id}`)}><Eye size={16} /></Button>
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/permissions`)}><Edit size={16} /></Button>
                          </Td>
                        </Tr>
                      );
                    })
                  )}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="w-72">
          <CardHeader><CardTitle>Super Admin permissions</CardTitle></CardHeader>
          <CardContent className="pt-0 p-3">
            <div className="space-y-2">
              {permissions.filter((p) => permNames.has(p.id)).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600">{p.name}</span>
                  <Badge variant="success" size="sm">Granted</Badge>
                </div>
              ))}
              {permissions.filter((p) => !permNames.has(p.id)).length === 0 && <p className="text-[10px] text-neutral-400">All system permissions assigned.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
