/**
 * Council Administrator — School detail (council view).
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { StatCard } from '../../shared/components/StatCard';
import { School, Building2, ArrowRight, Users, Clock } from 'lucide-react';
import { StatusBadge } from '../../shared/components/StatusBadge';

export default function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School profile"
        description={`Council view of school ${id}.`}
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Manage school</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="School code" value={id} note="Council record" icon={<Building2 className="h-5 w-5" />} />
        <StatCard title="Students" value="118" note="Enrolled" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Teachers" value="10" note="Teaching staff" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Status" value="Active" badge={<Badge variant="success" size="sm">Active</Badge>} />
      </div>

      <Card>
        <CardHeader><CardTitle>Submission status</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">CSEE 2025 · Mathematics</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-700">Submitted</span>
                <StatusBadge status="submitted" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">CSEE 2025 · English</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-600">Not started</span>
                <StatusBadge status="not_started" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate(`/council/submissions`)}>
              <Clock className="mr-1 h-4 w-4" /> Track submissions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
