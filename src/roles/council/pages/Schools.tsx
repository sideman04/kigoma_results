/**
 * Council Administrator — Schools directory (council scoped).
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { orgService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { School, Eye, Edit } from 'lucide-react';

export default function Schools() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    orgService.listSchools({ pageSize: 100 }).then((res) => {
      setSchools(res.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load schools', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const filtered = schools.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.code ?? '').toLowerCase().includes(search));

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Schools"
        description="Schools within Kasulu TC."
        action={<Button variant="primary" onClick={() => navigate('/super-admin/organization/schools')}>Manage schools (Super Admin)</Button>}
      />

      <Input placeholder="Search schools…" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="w-80 mb-4" />

      <Card>
        <CardHeader><CardTitle>School directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No schools match your search.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Code</th>
                    <th className="th">School</th>
                    <th className="th">Ownership</th>
                    <th className="th">Level</th>
                    <th className="th">Status</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-neutral-50/50">
                      <td className="td font-mono text-xs">{s.code}</td>
                      <td className="td">{s.name}</td>
                      <td className="td text-sm text-neutral-600">{s.ownership}</td>
                      <td className="td text-sm text-neutral-600">{s.educationLevel}</td>
                      <td className="td"><Badge variant={s.status === 'active' ? 'success' : 'neutral'} size="sm">{s.status}</Badge></td>
                      <td className="td">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/council/schools/${s.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${s.id}`)}><Edit size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
