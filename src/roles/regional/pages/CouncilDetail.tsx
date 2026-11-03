/**
 * Regional Administrator — Council detail page.
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { University, School, ArrowRight, Users } from 'lucide-react';

export default function CouncilDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Council detail"
        description={`Council ${id} — view schools, examination progress and performance within this council.`}
        action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> View schools</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Council" value={id} note="Within Kigoma Region" icon={<University className="h-5 w-5" />} />
        <StatCard title="Schools" value="6" note="Registered schools" icon={<School className="h-5 w-5" />} />
        <StatCard title="Students" value="420" note="Enrolled learners" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Status" value="Active" badge={<Badge variant="success" size="sm">Active</Badge>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Schools in council</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">School</th>
                    <th className="th">Code</th>
                    <th className="th">Ownership</th>
                    <th className="th">Level</th>
                    <th className="th w-48">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kasulu Town Secondary</td>
                    <td className="td font-mono text-xs">S0301</td>
                    <td className="td text-sm text-neutral-600">Government</td>
                    <td className="td text-sm text-neutral-600">O-Level & A-Level</td>
                    <td className="td"><Button variant="ghost" size="sm" onClick={() => navigate(`/regional/schools/school-s0301`)}><EyeIcon /> View</Button></td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Heri Girls Secondary</td>
                    <td className="td font-mono text-xs">S0302</td>
                    <td className="td text-sm text-neutral-600">Private</td>
                    <td className="td text-sm text-neutral-600">O-Level</td>
                    <td className="td"><Button variant="ghost" size="sm" onClick={() => navigate(`/regional/schools/school-s0302`)}><EyeIcon /> View</Button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate(`/regional/councils/${id}/schools`)}>
                <School className="mr-2 h-4 w-4" /> Browse schools
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/regional/submissions')}>
                <ClipboardListIcon /> Submission tracking
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/regional/performance')}>
                <BarChart3Icon /> Council performance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function EyeIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function ClipboardListIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>; }
function BarChart3Icon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>; }
