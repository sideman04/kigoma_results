/**
 * School Administrator — Subjects management.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { BookOpen, Plus } from 'lucide-react';

export default function Subjects() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Subjects"
        description="Subjects offered at Lakeview Secondary School."
        action={<Button variant="primary" onClick={() => {}}><Plus size={18} /> Add subject</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Subject catalogue</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code</th>
                  <th>Subject</th>
                  <Th className="w-40">Level</th>
                  <Th className="w-32">Rule</th>
                  <Th className="w-32">Max mark</th>
                  <Th className="w-32">Status</th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">MAT</td>
                  <td className="td">Basic Mathematics</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Compulsory</Badge></td>
                  <td className="td text-sm text-neutral-600">100</td>
                  <td className="td"><Badge variant="success" size="sm">Active</Badge></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">ENG</td>
                  <td className="td">English Language</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Compulsory</Badge></td>
                  <td className="td text-sm text-neutral-600">100</td>
                  <td className="td"><Badge variant="success" size="sm">Active</Badge></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">BIO</td>
                  <td className="td">Biology</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Compulsory</Badge></td>
                  <td className="td text-sm text-neutral-600">100</td>
                  <td className="td"><Badge variant="success" size="sm">Active</Badge></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">PHY</td>
                  <td className="td">Physics</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="neutral" size="sm">Optional</Badge></td>
                  <td className="td text-sm text-neutral-600">100</td>
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
