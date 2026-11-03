/**
 * School Administrator Dashboard — school command centre.
 * Role scope: assigned school only.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { School, Users, Building, ClipboardList, AlertCircle, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { orgService } from '../../shared/services/api';
import { useToast } from '../../shared/components/ui';

export default function SchoolDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School Dashboard"
        description="Command centre for Lakeview Secondary School. Manage students, teachers, classes, subjects and marks within your assigned school."
        action={<Button variant="outline" size="sm">View all reports</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="School" value="Lakeview Secondary" note="Lakeview Secondary School" icon={<School className="h-5 w-5" />} />
        <StatCard title="Students" value="140" note="Enrolled learners" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Teachers" value="12" note="Teaching staff" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Active examinations" value={2} note="CSEE & ACSEE 2025" icon={<ClipboardList className="h-5 w-5" />} tone="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Marks submission progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <StatCard title="Submitted" value="6" note="Classes complete" tone="green" icon={<CheckCircle className="h-5 w-5" />} />
              <StatCard title="In progress" value="4" note="Drafts open" tone="warning" />
              <StatCard title="Not started" value="2" note="No marks entered" tone="neutral" />
              <StatCard title="Returned" value="1" note="For correction" tone="danger" icon={<AlertCircle className="h-5 w-5" />} />
            </div>
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Class / Subject</th>
                    <th className="th">Teacher</th>
                    <th className="th">Entered</th>
                    <th className="th">Missing</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Form 4 · Mathematics</td>
                    <td className="td text-sm text-neutral-600">Elias Mrisho</td>
                    <td className="td text-sm text-neutral-600">28 / 28</td>
                    <td className="td text-sm text-neutral-600">0</td>
                    <td className="td"><StatusBadge status="submitted" /></td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Form 4 · Biology</td>
                    <td className="td text-sm text-neutral-600">Elias Mrisho</td>
                    <td className="td text-sm text-neutral-600">24 / 28</td>
                    <td className="td text-sm text-neutral-600">4</td>
                    <td className="td"><StatusBadge status="partial" /></td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Form 4 · English</td>
                    <td className="td text-sm text-neutral-600">Mwajuma Bakari</td>
                    <td className="td text-sm text-neutral-600">0 / 28</td>
                    <td className="td text-sm text-neutral-600">28</td>
                    <td className="td"><StatusBadge status="not_started" /></td>
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
              <Button variant="primary" size="sm" className="w-full justify-start" onClick={() => navigate('/school/marks-monitoring')}>
                <ClipboardList className="mr-2 h-4 w-4" /> Marks monitoring
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/school/students')}>
                <Users className="mr-2 h-4 w-4" /> Manage students
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/school/teachers')}>
                <UserCircleIcon /> Manage teachers
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/school/review')}>
                <CheckIcon /> School-level review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending attention</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/school/marks-monitoring" className="text-xs font-medium text-green-700 hover:underline">Review all →</Link>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <AttentionItem title="Form 4 · English — not started" desc="No marks entered for English. Remind the assigned teacher." to="/school/marks-monitoring" />
            <AttentionItem title="Form 4 · Biology — 4 missing" desc="4 students missing marks; submission incomplete." to="/school/marks-monitoring" />
            <AttentionItem title="Returned for correction" desc="1 submission returned; corrections due before school review." to="/school/review" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserCircleIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /></svg>; }
function CheckIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>; }
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
