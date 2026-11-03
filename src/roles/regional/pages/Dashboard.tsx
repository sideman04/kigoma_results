/**
 * Regional Administrator Dashboard — regional command centre.
 * Role scope: assigned region only.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Building, Users, School, ClipboardList, BarChart3, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { orgService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';

export default function RegionalDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [councils, setCouncils] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      orgService.listCouncils({ pageSize: 100 }),
      orgService.listSchools({ pageSize: 100 }),
    ]).then(([cRes, sRes]) => {
      setCouncils(cRes.data);
      setSchools(sRes.data);
      setLoading(false);
    }).catch(() => {
      toast({ title: 'Unable to load regional data', variant: 'default' });
      setLoading(false);
    });
  }, [toast]);

  const govSchools = schools.filter((s) => s.ownership === 'government').length;
  const privateSchools = schools.filter((s) => s.ownership === 'private').length;

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Regional Dashboard"
        description="Command centre for Kigoma Region. Monitor councils, schools, examinations and submissions within your assigned region."
        action={<Button variant="ghost" size="sm">View all reports</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Region" value="Kigoma Region" note="1 region assigned" />
        <StatCard title="Councils" value={councils.length} note={councils.length + ' councils'} icon={<Building className="h-5 w-5" />} />
        <StatCard title="Registered schools" value={schools.length} note={govSchools + ' government · ' + privateSchools + ' private'} icon={<School className="h-5 w-5" />} />
        <StatCard title="Active examinations" value={2} note="CSEE & ACSEE 2025" icon={<ClipboardList className="h-5 w-5" />} tone="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Examination monitoring */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Examination monitoring</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <StatCard title="Submissions received" value="14" note="Schools submitted" tone="green" icon={<CheckCircle className="h-5 w-5" />} />
              <StatCard title="Incomplete submissions" value="4" note="Schools pending" tone="warning" icon={<AlertCircle className="h-5 w-5" />} />
              <StatCard title="Pending verification" value="6" note="Awaiting review" tone="warning" />
              <StatCard title="Approved results" value="8" note="Ready for publication" tone="green" />
            </div>
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Examination</th>
                    <th className="th">Participating schools</th>
                    <th className="th">Submitted</th>
                    <th className="th">Pending</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">CSEE 2025</td>
                    <td className="td">10</td>
                    <td className="td">8</td>
                    <td className="td">2</td>
                    <td className="td"><StatusBadge status="open" /></td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">ACSEE 2025</td>
                    <td className="td">6</td>
                    <td className="td">4</td>
                    <td className="td">2</td>
                    <td className="td"><StatusBadge status="open" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pending administrative attention */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative attention</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <AttentionItem title="Kigoma DC — incomplete CSEE submission" desc="2 schools have not completed marks entry." to="/regional/councils" />
              <AttentionItem title="Mwandiga Secondary — missing marks" desc="Biology stream B has 23 missing entries." to="/regional/schools" />
              <AttentionItem title="Returned for correction" desc="1 school submission returned; corrections due before verification." to="/regional/submissions" />
              <AttentionItem title="Examination report due" desc="CSEE 2025 regional summary awaiting sign-off." to="/regional/reports" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Councils overview */}
      <Card>
        <CardHeader>
          <CardTitle>Councils in region</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/regional/councils" className="text-xs font-medium text-green-700 hover:underline">Manage councils →</Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Council</th>
                    <th className="th">Type</th>
                    <th className="th">Schools</th>
                    <th className="th">Submissions</th>
                    <th className="th">Status</th>
                    <th className="th w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {councils.length === 0 ? (
                    <tr><td colSpan={6} className="td h-24 text-center text-neutral-500">No councils found.</td></tr>
                  ) : (
                    councils.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-50/50">
                        <td className="td">{c.name}</td>
                        <td className="td text-sm text-neutral-600">{c.code}</td>
                        <td className="td text-sm text-neutral-600">—</td>
                        <td className="td text-sm text-neutral-600">—</td>
                        <td className="td"><StatusBadge status={c.status} /></td>
                        <td className="td">
                          <Link to={`/regional/councils/${c.id}`}><Button variant="ghost" size="sm">View</Button></Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AttentionItem({ title, desc, to }: { title: string; desc: string; to: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => {}}>
      <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 ml-auto" />
    </div>
  );
}
