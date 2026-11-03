/**
 * Regional Administrator — Councils directory within assigned region.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select, Option, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { orgService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';
import { University, School, Eye, Edit } from 'lucide-react';

export default function Councils() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [councils, setCouncils] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    orgService.listCouncils({ pageSize: 100 }).then((res) => {
      setCouncils(res.data);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load councils', description: err instanceof Error ? err.message : '', variant: 'default' }));
  }, [toast]);

  const filtered = councils.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Councils"
        description="View and monitor councils within Kigoma Region."
        action={<Button variant="primary" onClick={() => navigate('/super-admin/organization/councils')}>Manage councils (Super Admin)</Button>}
      />

      <div className="flex gap-3 mb-4">
        <Input placeholder="Search councils…" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="w-80" />
      </div>

      <Card>
        <CardHeader><CardTitle>Council directory</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">No councils match your search.</div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Council</th>
                    <th className="th">Code</th>
                    <th className="th">Schools</th>
                    <th className="th">Status</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-neutral-50/50">
                      <td className="td">{c.name}</td>
                      <td className="td font-mono text-xs">{c.code}</td>
                      <td className="td text-sm text-neutral-600">—</td>
                      <td className="td"><Badge variant={c.status === 'active' ? 'success' : 'neutral'} size="sm">{c.status}</Badge></td>
                      <td className="td">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/regional/councils/${c.id}`)}><Eye size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/councils/${c.id}`)}><Edit size={16} /></Button>
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
