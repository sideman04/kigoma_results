/**
 * Regional Administrator — Rankings.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { BarChart3, ArrowRight, School } from 'lucide-react';

export default function Rankings() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Regional rankings"
        description="School and council rankings within Kigoma Region. Demo data only."
        action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Export ranking</Button>}
      />

      <Card>
        <CardHeader><CardTitle>School rankings — by GPA</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <table className="table w-full text-sm">
              <thead>
                <tr>
                  <th className="th w-16">Rank</th>
                  <th className="th">School</th>
                  <th className="th">Council</th>
                  <th className="th">Ownership</th>
                  <th className="th">Candidates</th>
                  <th className="th">GPA</th>
                  <th className="th">Pass rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-neutral-50/50 bg-green-25">
                  <td className="td font-mono text-xs font-semibold">1</td>
                  <td className="td">Lakeview Secondary</td>
                  <td className="td text-sm text-neutral-600">Kigoma Ujiji MC</td>
                  <td className="td"><Badge variant="neutral" size="sm">Government</Badge></td>
                  <td className="td text-sm text-neutral-600">140</td>
                  <td className="td text-sm text-neutral-600 font-mono">3.20</td>
                  <td className="td text-sm text-neutral-600">87.1%</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs font-semibold">2</td>
                  <td className="td">Kasulu Town Secondary</td>
                  <td className="td text-sm text-neutral-600">Kasulu TC</td>
                  <td className="td"><Badge variant="neutral" size="sm">Government</Badge></td>
                  <td className="td text-sm text-neutral-600">118</td>
                  <td className="td text-sm text-neutral-600 font-mono">2.80</td>
                  <td className="td text-sm text-neutral-600">79.4%</td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs font-semibold">3</td>
                  <td className="td">Ujiji Hill Secondary</td>
                  <td className="td text-sm text-neutral-600">Kigoma Ujiji MC</td>
                  <td className="td"><Badge variant="neutral" size="sm">Private</Badge></td>
                  <td className="td text-sm text-neutral-600">56</td>
                  <td className="td text-sm text-neutral-600 font-mono">3.00</td>
                  <td className="td text-sm text-neutral-600">83.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] text-neutral-500">Rankings are computed from demo data and do not represent official NECTA positions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
