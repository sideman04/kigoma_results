/**
 * School Administrator — School profile.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { School, Building2, ArrowRight, Users, Clock } from 'lucide-react';

export default function SchoolProfile() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School profile"
        description="Lakeview Secondary School — your assigned school."
        action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Manage school (Super Admin)</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="School code" value="S0101" note="Lakeview Secondary" icon={<Building2 className="h-5 w-5" />} />
        <StatCard title="Region" value="Kigoma Region" note="Assigned region" icon={<ArrowRight className="h-5 w-5" />} />
        <StatCard title="Council" value="Kigoma Ujiji MC" note="Assigned council" icon={<ArrowRight className="h-5 w-5" />} />
        <StatCard title="Status" value="Active" badge={<Badge variant="success" size="sm">Active</Badge>} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>School information</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-neutral-50 pb-2"><span className="text-neutral-500">Ownership</span><span className="text-neutral-900">Government</span></div>
              <div className="flex justify-between border-b border-neutral-50 pb-2"><span className="text-neutral-500">Education level</span><span className="text-neutral-900">O-Level & A-Level</span></div>
              <div className="flex justify-between border-b border-neutral-50 pb-2"><span className="text-neutral-500">Headteacher</span><span className="text-neutral-900">Amina Juma</span></div>
              <div className="flex justify-between pb-2"><span className="text-neutral-500">Contact</span><span className="text-neutral-900">+255 7xx xxx xxx</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>School statistics</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-neutral-500">Total students</span><span className="text-neutral-900 font-mono">140</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Total teachers</span><span className="text-neutral-900 font-mono">12</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Classes</span><span className="text-neutral-900 font-mono">4</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Streams</span><span className="text-neutral-900 font-mono">8</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/school/students')}>Manage students</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/school/teachers')}>Manage teachers</Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/school/classes')}>Manage classes</Button>
        <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/school-s0101`)}><EditIcon /> Full management (Super Admin)</Button>
      </div>
    </div>
  );
}

function EditIcon() { return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 23l3-7m0 0l-7-7m7 7H3" /></svg>; }
