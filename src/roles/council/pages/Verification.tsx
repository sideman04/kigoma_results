/**
 * Council Administrator — Verification (where permitted).
 */

import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';

export default function Verification() {
  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Verification"
        description="Review school submissions before regional sign-off."
        action={<Button variant="ghost" size="sm"><Shield className="mr-1 h-4 w-4" /> View queue</Button>}
      />

      <div className="rounded-lg border border-neutral-100 bg-neutral-50 p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-green-700 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-neutral-900">Verification permissions</p>
            <p className="text-sm text-neutral-600">Council administrators may review and verify submissions within their assigned council. Final approval rests with the regional authority.</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Submissions awaiting verification</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
            <Table>
              <Thead>
                <Tr>
                  <Th>School</Th>
                  <Th>Examination</Th>
                  <Th className="w-40">Candidates</Th>
                  <Th className="w-40">Status</Th>
                  <Th className="w-32">Exceptions</Th>
                  <Th className="w-56">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr className="hover:bg-neutral-50/50">
                  <Td>Kasulu Town Secondary</Td>
                  <td className="text-sm text-neutral-600">CSEE 2025</td>
                  <Td className="text-sm text-neutral-600">118</Td>
                  <Td><Badge variant="warning" size="sm">Under review</Badge></Td>
                  <Td className="text-sm text-neutral-600">3</Td>
                  <Td>
                    <Button variant="ghost" size="sm">Review</Button>
                    <Button variant="ghost" size="sm"><CheckCircle size={16} /></Button>
                  </Td>
                </Tr>
                <Tr className="hover:bg-neutral-50/50">
                  <Td>Heri Girls Secondary</Td>
                  <td className="text-sm text-neutral-600">CSEE 2025</td>
                  <Td className="text-sm text-neutral-600">56</Td>
                  <Td><Badge variant="danger" size="sm">Returned</Badge></Td>
                  <Td className="text-sm text-neutral-600">12</Td>
                  <Td>
                    <Button variant="ghost" size="sm">Review</Button>
                    <Button variant="ghost" size="sm"><AlertCircle size={16} /></Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
