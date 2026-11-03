/**
 * Permission management — list permissions by category.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td, EmptyState,
  Input,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { permissionService, roleService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Shield, Key, Users } from 'lucide-react';
import type { Permission, Role } from '../types';

export default function Permissions() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    permissionService.list().then((data) => { setPermissions(data); setLoading(false); }).catch((err) => toast({ title: 'Failed to load permissions', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    roleService.list().then((data) => setRoles(data));
  }, [toast]);

  const categories = [...new Set(permissions.map((p) => p.category))];
  const filtered = permissions.filter((p) => !search || p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));

  return (
    <div className="space-y-6">
      <PageHeader title="Permissions" description="Configure what each role can do across organisational, user, academic, examination and system modules." action={<Button variant="primary" size="sm" onClick={() => navigate('/super-admin/assignments')}>Manage role assignments</Button>} />

      <Input placeholder="Search permissions…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md mb-4" />

      {categories.map((category) => {
        const catPerms = filtered.filter((p) => p.category === category);
        if (catPerms.length === 0) return null;
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> {category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
                <Table>
                  <Thead><Tr><Th>Permission</Th><Th className="w-48">Action</Th><Th className="w-40">Description</Th></Tr></Thead>
                  <Tbody>
                    {catPerms.map((p) => (
                      <Tr key={p.id} className="hover:bg-neutral-50/50">
                        <Td>{p.name}</Td>
                        <Td className="text-sm text-neutral-600 capitalize">{p.action}</Td>
                        <Td className="text-sm text-neutral-600">{p.description}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
