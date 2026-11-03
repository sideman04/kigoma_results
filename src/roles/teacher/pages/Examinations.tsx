/**
 * Teacher — Examinations (assigned).
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { ClipboardList, ArrowRight } from 'lucide-react';

export default function Examinations() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Examinations"
        description="Examinations you are assigned to enter marks for."
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> View all</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Assigned examinations</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th className="w-32">Type</Th>
                  <Th className="w-40">Year / Level</Th>
                  <Th className="w-32">Submission open</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">CSEE-2025</td>
                  <td className="td">Certificate of Secondary Education Examination 2025</td>
                  <td className="td text-sm text-neutral-600">CSEE</td>
                  <td className="td text-sm text-neutral-600">2025 · O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Open</Badge></td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/teacher/marks-entry')}>Enter marks</Button></td>
                </tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  function navigateTo(p: string) { window.location.href = p; }
}
