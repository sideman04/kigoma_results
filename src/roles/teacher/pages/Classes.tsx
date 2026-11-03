/**
 * Teacher — My classes.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { LayoutGrid, Users, ArrowRight } from 'lucide-react';

export default function Classes() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="My classes"
        description="Classes assigned to you at Lakeview Secondary School."
        action={<Button variant="outline" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> View all</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Assigned classes</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Class</th>
                  <th>Code</th>
                  <Th className="w-40">Level</th>
                  <Th className="w-32">Students</th>
                  <Th className="w-32">Streams</th>
                  <Th className="w-48">Actions</th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 4</td>
                  <td className="td font-mono text-xs">F4</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td text-sm text-neutral-600">34</td>
                  <td className="td text-sm text-neutral-600">2</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/teacher/classes/class-f4')}>View students</Button></td>
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
