/**
 * School Administrator — Classes management.
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { LayoutGrid, Plus, ArrowRight } from 'lucide-react';
import { StatCard } from '../../shared/components/StatCard';

export default function Classes() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Classes"
        description="Classes and enrolment at Lakeview Secondary School."
        action={<Button variant="primary" onClick={() => {}}><Plus size={18} /> Create class</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Total classes" value="4" note="Active classes" icon={<LayoutGrid className="h-5 w-5" />} />
        <StatCard title="Streams" value="8" note="Across classes" />
        <StatCard title="Students" value="140" note="Enrolled" />
        <StatCard title="Teachers" value="12" note="Assigned" />
      </div>

      <Card>
        <CardHeader><CardTitle>Class list</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>Class</Th>
                  <Th>Code</Th>
                  <Th className="w-40">Level</Th>
                  <Th className="w-32">Students</Th>
                  <Th className="w-32">Streams</Th>
                  <Th className="w-48">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 1</td>
                  <td className="td font-mono text-xs">F1</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td text-sm text-neutral-600">35</td>
                  <td className="td text-sm text-neutral-600">2</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/school/classes/class-f1')}>View</Button></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 2</td>
                  <td className="td font-mono text-xs">F2</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td text-sm text-neutral-600">36</td>
                  <td className="td text-sm text-neutral-600">2</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/school/classes/class-f2')}>View</Button></td>
                </tr>
                <tr className="hover:bg-neutral-50/50">
                  <td className="td">Form 3</td>
                  <td className="td font-mono text-xs">F3</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td text-sm text-neutral-600">35</td>
                  <td className="td text-sm text-neutral-600">2</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/school/classes/class-f3')}>View</Button></td>
                </tr>
                <tr className="hover:bg-neutral-50/50 bg-green-25">
                  <td className="td">Form 4</td>
                  <td className="td font-mono text-xs">F4</td>
                  <td className="td text-sm text-neutral-600">O-Level</td>
                  <td className="td text-sm text-neutral-600 font-semibold">34</td>
                  <td className="td text-sm text-neutral-600 font-semibold">2</td>
                  <td className="td"><Button variant="ghost" size="sm" onClick={() => navigateTo('/school/classes/class-f4')}>View</Button></td>
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
