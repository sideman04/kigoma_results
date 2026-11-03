/**
 * Council Administrator — Performance & Rankings.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { BarChart3, School, ArrowRight } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';

export default function Performance() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Council performance"
        description="Academic performance monitoring within Kasulu TC. Demo data only."
        action={<Button variant="outline" size="sm"><BarChart3 className="mr-1 h-4 w-4" /> View analytics</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Pass rate" value="79.4%" tone="green" />
        <StatCard title="Average GPA" value="2.80" />
        <StatCard title="Candidates" value="420" />
        <StatCard title="Schools" value="6" />
      </div>

      <Card>
        <CardHeader><CardTitle>School performance — council ranking</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <table className="table w-full text-sm">
              <thead>
                <tr>
                  <th className="th w-16">Rank</th>
                  <th className="th">School</th>
                  <th className="th">Pass rate</th>
                  <th className="th">GPA</th>
                  <th className="th">Candidates</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-neutral-50/50 bg-green-25">
                  <td className="td font-mono text-xs font-semibold">1</td>
                  <td className="td">Kasulu Town Secondary</td>
                  <td className="td text-sm text-neutral-600">79.4%</td>
                  <td className="td text-sm text-neutral-600 font-mono">2.80</td>
                  <td className="td text-sm text-neutral-600">118</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs font-semibold">2</td>
                  <td className="td">Heri Girls Secondary</td>
                  <td className="td text-sm text-neutral-600">83.9%</td>
                  <td className="td text-sm text-neutral-600 font-mono">3.00</td>
                  <td className="td text-sm text-neutral-600">56</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-neutral-500">Demo data — not official NECTA positions.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Rankings() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Council rankings"
        description="School rankings within Kasulu TC."
        action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Export</Button>}
      />
      <Card>
        <CardHeader><CardTitle>Council school rankings</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="p-8 text-center text-neutral-500">
            <School className="text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-900">Rankings</h3>
            <p className="text-sm text-neutral-500">View school rankings within the council.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
