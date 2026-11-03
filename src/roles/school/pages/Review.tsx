/**
 * School Administrator — School-level review of submitted marks.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Check, AlertCircle, ClipboardList } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';

export default function Review() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="School-level review"
        description="Review submitted marks before forwarding to the council for verification."
        action={<Button variant="ghost" size="sm"><ClipboardList className="mr-1 h-4 w-4" /> View all submissions</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Awaiting review" value="2" note="Submitted by teachers" tone="warning" />
        <StatCard title="Reviewed" value="5" note="Cleared by school" tone="green" />
        <StatCard title="Returned" value="1" note="Sent back for correction" tone="danger" />
        <StatCard title="Verified" value="0" note="Council verified" />
      </div>

      <Card>
        <CardHeader><CardTitle>Submissions for school review</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Examination</Th>
                  <Th>Class · Subject</Th>
                  <Th className="w-32">Teacher</Th>
                  <Th className="w-40">Status</Th>
                  <Th className="w-32">Issues</Th>
                  <Th className="w-56">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="font-mono text-xs">CSEE 2025</td>
                  <td className="text-sm text-neutral-600">Form 4 · Mathematics</td>
                  <td className="text-sm text-neutral-600">Elias Mrisho</td>
                  <td className="td"><Badge variant="warning" size="sm">Submitted</Badge></td>
                  <td className="td text-sm text-neutral-600">0</td>
                  <td className="td">
                    <Button variant="ghost" size="sm">Review</Button>
                    <Button variant="ghost" size="sm"><Check size={16} /></Button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="font-mono text-xs">CSEE 2025</td>
                  <td className="text-sm text-neutral-600">Form 4 · Biology</td>
                  <td className="text-sm text-neutral-600">Elias Mrisho</td>
                  <td className="td"><Badge variant="danger" size="sm">Returned</Badge></td>
                  <td className="td text-sm text-neutral-600">2</td>
                  <td className="td">
                    <Button variant="ghost" size="sm">Review</Button>
                    <Button variant="ghost" size="sm"><AlertCircle size={16} /></Button>
                  </td>
                </tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-700 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">Review scope</p>
            <p className="text-sm text-neutral-600">The school administrator reviews submitted marks for completeness and obvious errors. Approval and publication remain with the authorised regional authority.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
