/**
 * Grading configuration — configurable grade bands and division rules.
 * Demo rules only; not official NECTA thresholds.
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Input, Select, Option, Separator, Dialog,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { gradingService, educationLevelService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { GraduationCap, Shield, AlertTriangle, Eye } from 'lucide-react';
import type { GradingPolicy, GradeBand, DivisionRule, EducationLevel } from '../types';

export default function Grading() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<GradingPolicy[]>([]);
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePolicyId, setActivePolicyId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<GradingPolicy | null>(null);

  useEffect(() => {
    gradingService.list().then((data) => {
      setPolicies(data);
      setActivePolicyId(data.find((p) => p.active)?.id || null);
      setLoading(false);
    }).catch((err) => toast({ title: 'Failed to load grading policies', description: err instanceof Error ? err.message : '', variant: 'destructive' }));
    educationLevelService.list().then((data) => setLevels(data));
  }, [toast]);

  const policy = policies.find((p) => p.id === activePolicyId);
  const levelName = (id?: string) => id ? levels.find((l) => l.id === id)?.name || '—' : 'All levels';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Grading Configuration"
        description="Configure grade ranges, grade labels, GPA rules and division rules. O-Level and A-Level use separate policies."
        action={<Button variant="primary" size="sm">Add policy</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grading policies</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr><Th>Policy</Th><Th className="w-40">Education level</Th><Th className="w-32">Max mark</Th><Th className="w-32">Best subjects</Th><Th className="w-32">Status</Th><Th className="w-48">Actions</Th></Tr>
                </Thead>
                <Tbody>
                  {loading ? (
                    <Tr><Td colSpan={6} className="h-24 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></Td></Tr>
                  ) : policies.length === 0 ? (
                    <Tr><Td colSpan={6}><EmptyState title="No grading policies" description="Create your first grading policy." icon="GraduationCap" /></Td></Tr>
                  ) : (
                    policies.map((p) => (
                      <Tr key={p.id} className={cnRow('hover:bg-neutral-50/50', activePolicyId === p.id ? 'bg-green-50 border-l-2 border-green-700' : '')}>
                        <Td>{p.name}</Td>
                        <Td className="text-sm text-neutral-600">{levelName(p.educationLevelId)}</Td>
                        <Td className="text-sm text-neutral-600">{p.maxMark}</Td>
                        <Td className="text-sm text-neutral-600">{p.bestSubjects}</Td>
                        <Td><Badge variant={p.active ? 'success' : 'neutral'} size="sm">{p.active ? 'Active' : 'Inactive'}</Badge></Td>
                        <Td>
                          <Button variant="ghost" size="sm" onClick={() => { setActivePolicyId(p.id); setEditing(p); setEditOpen(true); }}><Eye size={16} /></Button>
                          {p.active ? <Button variant="ghost" size="sm" onClick={() => setActivePolicyId(null)}>Deactivate</Button> : null}
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active policy bands</CardTitle></CardHeader>
          <CardContent className="pt-0">
            {policy ? (
              <div className="space-y-4">
                <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
                  <Table>
                    <Thead><Tr><Th>Grade</Th><th>Range</th><Th className="w-32">Points</Th><Th className="w-32">GPA</Th></Tr></Thead>
                    <Tbody>
                      {policy.gradeBands.map((b) => (
                        <Tr key={b.id} className="hover:bg-neutral-50/50">
                          <Td className="font-semibold">{b.grade}</Td>
                          <td className="text-sm text-neutral-600">{b.minMark} – {b.maxMark === Infinity ? '100+' : b.maxMark}</td>
                          <Td className="text-sm text-neutral-600">{b.points}</Td>
                          <Td className="text-sm text-neutral-600">{b.gpa}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
                {policy.divisionRules.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Division rules</p>
                    <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
                      <Table>
                        <Thead><Tr><Th>Division</Th><th>Max points</th></Tr></Thead>
                        <Tbody>
                          {policy.divisionRules.map((d) => (
                            <Tr key={d.id}><Td>{d.division}</Td><td className="text-sm text-neutral-600">{d.maxPoints === Infinity ? '∞' : d.maxPoints}</td></Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-neutral-500 mt-4">These are DEMO rules. Confirm official thresholds with the regional education office before using in production.</p>
              </div>
            ) : (
              <EmptyState title="No policy selected" description="Select a grading policy to view its bands." icon="Shield" />
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen} title="Edit grading policy" size="md">
        <form className="space-y-4">
          <Input label="Policy name" defaultValue={editing?.name} className="w-full" />
          <Select label="Education level" defaultValue={editing?.educationLevelId || ''} className="w-full">
            <Option value="">All levels</Option>
            {levels.map((l) => <Option key={l.id} value={l.id}>{l.name}</Option>)}
          </Select>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Max mark" defaultValue={String(editing?.maxMark)} type="number" />
            <Input label="Best subjects count" defaultValue={String(editing?.bestSubjects)} type="number" />
          </div>
          <Separator className="my-3" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Grade bands</p>
          {policy?.gradeBands.map((b) => (
            <div key={b.id} className="grid grid-cols-4 gap-3 mb-2">
              <Input defaultValue={b.grade} disabled className="bg-neutral-50" />
              <Input defaultValue={String(b.minMark)} type="number" />
              <Input defaultValue={String(b.points)} type="number" />
              <Input defaultValue={String(b.gpa)} type="number" step="0.01" />
            </div>
          ))}
          <p className="text-[10px] text-neutral-500">Full band editing is managed through the backend settings API.</p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={() => { setEditOpen(false); setEditing(null); }}>Close</Button>
            <Button variant="primary" type="button" disabled>Save (backend)</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

function cnRow(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
