/**
 * Regional Administrator — Performance analytics (regional).
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Option } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { BarChart3, School, Building2, Users } from 'lucide-react';

export default function Performance() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Regional performance"
        description="Academic performance monitoring across councils and schools in Kigoma Region. Demo data only."
        action={<Button variant="outline" size="sm"><BarChart3 className="mr-1 h-4 w-4" /> View analytics</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Average pass rate" value="76.4%" tone="green" />
        <StatCard title="Average GPA" value="2.74" />
        <StatCard title="Total candidates" value="1,098" />
        <StatCard title="Councils ranked" value="8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Performance by council</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">Council</th>
                    <th className="th">Pass rate</th>
                    <th className="th">GPA</th>
                    <th className="th">Candidates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kigoma Ujiji MC</td>
                    <td className="td text-sm text-neutral-600">87.1%</td>
                    <td className="td text-sm text-neutral-600">3.2</td>
                    <td className="td text-sm text-neutral-600">296</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kasulu TC</td>
                    <td className="td text-sm text-neutral-600">79.4%</td>
                    <td className="td text-sm text-neutral-600">2.8</td>
                    <td className="td text-sm text-neutral-600">174</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kigoma DC</td>
                    <td className="td text-sm text-neutral-600">74.2%</td>
                    <td className="td text-sm text-neutral-600">2.6</td>
                    <td className="td text-sm text-neutral-600">210</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Performance by school</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th className="th">School</th>
                    <th className="th">Council</th>
                    <th className="th">Pass rate</th>
                    <th className="th">GPA</th>
                    <th className="th">Rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Lakeview Secondary</td>
                    <td className="td text-sm text-neutral-600">Kigoma Ujiji MC</td>
                    <td className="td text-sm text-neutral-600">87.1%</td>
                    <td className="td text-sm text-neutral-600">3.2</td>
                    <td className="td text-sm font-semibold text-green-700">1</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50">
                    <td className="td">Kasulu Town Secondary</td>
                    <td className="td text-sm text-neutral-600">Kasulu TC</td>
                    <td className="td text-sm text-neutral-600">79.4%</td>
                    <td className="td text-sm text-neutral-600">2.8</td>
                    <td className="td text-sm font-semibold">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Gender comparison</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Girls</span>
                <span className="text-sm font-semibold text-neutral-900">78.2% pass</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-green-700 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Boys</span>
                <span className="text-sm font-semibold text-neutral-900">75.1% pass</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-green-700 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-[10px] text-neutral-500 mt-2">Demo data — not official NECTA statistics.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
