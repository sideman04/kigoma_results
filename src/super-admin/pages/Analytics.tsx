/**
 * Performance Analytics — system-wide academic monitoring with charts.
 */

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Option, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, PieChart, Pie, Tooltip,
  Cell,
} from 'recharts';
import { useToast } from '../components/ui/use-toast';
import { BarChart3, Building2, University, School, Filter } from 'lucide-react';

const COLORS = ['#14532d', '#16a34a', '#b45309', '#78716c', '#44403c'];

export default function Analytics() {
  const { toast } = useToast();
  const [view, setView] = useState('region');

  const regionData = [
    { name: 'Kigoma Ujiji MC', avg: 68.4, gpa: 3.2, pass: 87, candidates: 296 },
    { name: 'Kigoma DC', avg: 61.2, gpa: 2.8, pass: 79, candidates: 210 },
    { name: 'Kasulu TC', avg: 63.1, gpa: 2.9, pass: 81, candidates: 174 },
    { name: 'Kasulu DC', avg: 57.4, gpa: 2.5, pass: 72, candidates: 158 },
    { name: 'Kibondo DC', avg: 55.3, gpa: 2.4, pass: 70, candidates: 78 },
    { name: 'Buhigwe DC', avg: 59.8, gpa: 2.7, pass: 75, candidates: 92 },
    { name: 'Kakonko DC', avg: 54.1, gpa: 2.3, pass: 68, candidates: 66 },
    { name: 'Uvinza DC', avg: 56.9, gpa: 2.5, pass: 71, candidates: 84 },
  ];

  const ownershipData = [
    { name: 'Government', avg: 60.2, pass: 75, schools: 7 },
    { name: 'Private', avg: 66.9, pass: 84, schools: 3 },
  ];

  const genderData = [
    { name: 'Girls', avg: 62.4, pass: 78 },
    { name: 'Boys', avg: 61.9, pass: 76 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analytics"
        description="System-wide academic monitoring. Filters apply across all charts. Demo data only."
        action={<Button variant="ghost" size="sm"><Filter className="mr-1 h-4 w-4" /> Filters</Button>}
      />

      <div className="flex items-center gap-3 mb-4">
        <Button variant={view === 'region' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('region')}>By region</Button>
        <Button variant={view === 'ownership' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('ownership')}>Government vs private</Button>
        <Button variant={view === 'gender' ? 'primary' : 'ghost'} size="sm" onClick={() => setView('gender')}>Gender comparison</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average marks by {view === 'region' ? 'region' : view === 'ownership' ? 'ownership' : 'gender'}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={view === 'region' ? regionData : view === 'ownership' ? ownershipData : genderData}>
                  <Tooltip />
                  <Bar dataKey="avg" fill="#14532d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GPA by {view === 'region' ? 'region' : view === 'ownership' ? 'ownership' : 'gender'}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={view === 'region' ? regionData : view === 'ownership' ? ownershipData : genderData}>
                  <Tooltip />
                  <Line dataKey="gpa" type="monotone" stroke="#16a34a" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pass rate by {view === 'region' ? 'region' : view === 'ownership' ? 'ownership' : 'gender'}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie dataKey="pass" data={view === 'region' ? regionData : view === 'ownership' ? ownershipData : genderData} cx="50%" cy="50%" outerRadius={90} fill="#888" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Candidate distribution</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <Tooltip />
                  <Bar dataKey="candidates" fill="#b45309" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Key system metrics</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <MetricRow label="Total regions" value="1" />
              <MetricRow label="Total councils" value="8" />
              <MetricRow label="Total schools" value="10" />
              <MetricRow label="Total candidates" value="1,098" />
              <MetricRow label="System pass rate" value="76.4%" />
              <MetricRow label="Average GPA" value="2.74" />
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-[10px] text-neutral-500">All analytics are computed from demo data. Actual values come from the PHP/MariaDB backend.</p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-neutral-50 last:border-0">
      <span className="text-sm text-neutral-600">{label}</span>
      <span className="text-sm font-semibold text-neutral-900 font-mono">{value}</span>
    </div>
  );
}
