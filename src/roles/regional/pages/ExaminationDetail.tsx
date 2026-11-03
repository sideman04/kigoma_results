/**
 * Regional Administrator — Examination detail (regional monitoring view).
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { ClipboardList, Activity, ArrowRight, Eye } from 'lucide-react';

export default function ExaminationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Examination detail"
        description={`Regional monitoring for examination ${id}.`}
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Submission tracking</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Participating schools" value="10" note="Within region" icon={<SchoolIcon />} />
        <StatCard title="Submissions received" value="8" note="Of 10 expected" tone="green" />
        <StatCard title="Pending" value="2" note="Not yet submitted" tone="warning" />
        <StatCard title="Verified" value="6" note="Quality checked" tone="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Submission progress by school</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">School</th>
                    <th className="th">Council</th>
                    <th className="th">Status</th>
                    <th className="th">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Lakeview Secondary</td>
                    <td className="td text-sm text-neutral-600">Kigoma Ujiji MC</td>
                    <td className="td"><Badge variant="success" size="sm">Submitted</Badge></td>
                    <td className="td text-sm text-neutral-600">3 days ago</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kasulu Town Secondary</td>
                    <td className="td text-sm text-neutral-600">Kasulu TC</td>
                    <td className="td"><Badge variant="warning" size="sm">Partial</Badge></td>
                    <td className="td text-sm text-neutral-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate(`/regional/submissions`)}>
                <Activity className="mr-1 h-4 w-4" /> View all submissions
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/regional/performance')}>
                <BarChart3Icon /> Regional performance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SchoolIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-6 9 6v10H3zM9 20v-6h6v6" /></svg>; }
function BarChart3Icon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
