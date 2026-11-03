/**
 * Council Administrator Dashboard — council command centre.
 * Role scope: assigned council only.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { University, School, Users, ClipboardList, AlertCircle, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { orgService, examinationService, submissionService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';

export default function CouncilDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    orgService.listSchools({ pageSize: 100 }).then((res) => {
      setSchools(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const activeSchools = schools.filter((s) => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Council Dashboard"
        description="Command centre for Kasulu TC. Monitor schools, examinations and submissions within your assigned council."
        action={<Button variant="ghost" size="sm">View all reports</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Council" value="Kasulu TC" note="Council / District" icon={<University className="h-5 w-5" />} />
        <StatCard title="Schools" value={schools.length} note={activeSchools + ' active'} icon={<School className="h-5 w-5" />} />
        <StatCard title="Students" value="420" note="Enrolled learners" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Active examinations" value={2} note="CSEE & ACSEE 2025" icon={<ClipboardList className="h-5 w-5" />} tone="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Examination operations</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <StatCard title="Expected submissions" value="10" note="Schools to submit" />
              <StatCard title="Submitted" value="7" note="Schools submitted" tone="green" icon={<CheckCircle className="h-5 w-5" />} />
              <StatCard title="Incomplete" value="3" note="Pending schools" tone="warning" />
              <StatCard title="Returned" value="1" note="For correction" tone="danger" icon={<AlertCircle className="h-5 w-5" />} />
            </div>
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">School</th>
                    <th className="th">CSEE 2025</th>
                    <th className="th">ACSEE 2025</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kasulu Town Secondary</td>
                    <td className="td"><Badge variant="success" size="sm">Submitted</Badge></td>
                    <td className="td"><Badge variant="success" size="sm">Submitted</Badge></td>
                    <td className="td text-sm text-neutral-600">Complete</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Heri Girls Secondary</td>
                    <td className="td"><Badge variant="warning" size="sm">Partial</Badge></td>
                    <td className="td"><Badge variant="neutral" size="sm">Not started</Badge></td>
                    <td className="td text-sm text-neutral-600">Incomplete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pending actions</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <AttentionItem title="Heri Girls — incomplete CSEE submission" desc="Biology and English marks not yet entered." to="/council/schools" />
              <AttentionItem title="Returned submission" desc="1 school submission returned for correction; resubmit before verification." to="/council/submissions" />
              <AttentionItem title="Verification window open" desc="Review submitted results before regional sign-off." to="/council/verification" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schools in council</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/council/schools" className="text-xs font-medium text-green-700 hover:underline">Manage schools →</Link>
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
                    <th className="th">School</th>
                    <th className="th">Code</th>
                    <th className="th">Ownership</th>
                    <th className="th">Level</th>
                    <th className="th">Status</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.length === 0 ? (
                    <tr><td colSpan={6} className="td h-24 text-center text-neutral-500">No schools found.</td></tr>
                  ) : (
                    schools.map((s) => (
                      <tr key={s.id} className="hover:bg-neutral-50/50">
                        <td className="td">{s.name}</td>
                        <td className="td font-mono text-xs">{s.code}</td>
                        <td className="td text-sm text-neutral-600">{s.ownership}</td>
                        <td className="td text-sm text-neutral-600">{s.educationLevel}</td>
                        <td className="td"><Badge variant={s.status === 'active' ? 'success' : 'neutral'} size="sm">{s.status}</Badge></td>
                        <td className="td">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/council/schools/${s.id}`)}><EyeIcon size={16} /></Button>
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

function EyeIcon({ size = 16 }: { size?: number }) { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`h-${size} w-${size}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function AttentionItem({ title, desc, to }: { title: string; desc: string; to: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-100 bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors">
      <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="text-xs text-neutral-500">{desc}</p>
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 ml-auto" />
    </div>
  );
}
