/**
 * Regional Administrator — School detail page (regional view).
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { School, Building2, ArrowRight, Users, Clock } from 'lucide-react';

export default function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School profile"
        description={`Regional view of school ${id} — enrolment, examinations and submissions within Kigoma Region.`}
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Manage school (Super Admin)</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="School code" value={id} note="Regional record" icon={<Building2 className="h-5 w-5" />} />
        <StatCard title="Students" value="140" note="Enrolled" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Teachers" value="12" note="Teaching staff" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Status" value="Active" badge={<Badge variant="success" size="sm">Active</Badge>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>School information</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span className="text-neutral-500">Region</span><span className="text-neutral-900">Kigoma Region</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span className="text-neutral-500">Council</span><span className="text-neutral-900">Kigoma Ujiji MC</span>
              </div>
              <div className="flex justify-between border-b border-neutral-50 pb-2">
                <span className="text-neutral-500">Ownership</span><span className="text-neutral-900">Government</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-neutral-500">Education level</span><span className="text-neutral-900">O-Level & A-Level</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Examination participation</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">CSEE 2025</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-green-700">8 submitted</span>
                  <StatusBadgeIcon status="submitted" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">ACSEE 2025</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-amber-700">4 submitted</span>
                  <StatusBadgeIcon status="partial" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate(`/regional/examinations`)}>
                <Clock className="mr-1 h-4 w-4" /> View examinations
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate(`/regional/submissions`)}>
                <ClipboardListIcon /> Submission tracking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${id}`)}><EditIcon /> Full management</Button>
      </div>
    </div>
  );
}

function StatusBadgeIcon({ status }: { status: string }) {
  const color = status === 'submitted' ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50';
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${capitalize(status)}`}>{status}</span>;
}
function capitalize(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }
function ClipboardListIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>; }
function EditIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 23l3-7m0 0l-7-7m7 7H3" /></svg>; }
