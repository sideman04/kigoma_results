/**
 * Teacher — My subjects.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Subjects() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="My subjects"
        description="Subjects assigned to you at Lakeview Secondary School."
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> View all</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Assigned subjects</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Subject</Th>
                  <Th className="w-40">Level</Th>
                  <Th className="w-32">Rule</Th>
                  <Th className="w-32">Classes</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">MAT</td>
                  <td className="td">Basic Mathematics</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Compulsory</Badge></td>
                  <td className="td text-sm text-neutral-600">Form 4</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/teacher/marks-entry')}>Enter marks</Button></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td font-mono text-xs">BIO</td>
                  <td className="td">Biology</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td"><Badge variant="success" size="sm">Compulsory</Badge></td>
                  <td className="td text-sm text-neutral-600">Form 4</td>
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
