/**
 * School Administrator — Streams management.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { LayoutGrid, Plus } from 'lucide-react';

export default function Streams() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Streams"
        description="Streams within classes at Lakeview Secondary School."
        action={<Button variant="primary" onClick={() => {}}><Plus size={18} /> Create stream</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Stream list</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Class</th>
                  <th>Stream</th>
                  <Th className="w-32">Code</th>
                  <Th className="w-32">Students</th>
                  <Th className="w-32">Status</th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 4</td>
                  <td className="td">Stream A</td>
                  <td className="td font-mono text-xs">F4A</td>
                  <td className="td text-sm text-neutral-600">17</td>
                  <td className="td"><Badge variant="success" size="sm">Active</Badge></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 4</td>
                  <td className="td">Stream B</td>
                  <td className="td font-mono text-xs">F4B</td>
                  <td className="td text-sm text-neutral-600">17</td>
                  <td className="td"><Badge variant="success" size="sm">Active</Badge></td>
                </tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
