/**
 * Rankings — regional, council and school performance rankings.
 */

import { useEffect, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Select, Option, Input,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { useToast } from '../components/ui/use-toast';
import { BarChart3, School, Building2, University, ArrowRight } from 'lucide-react';
import type { SchoolPerformance } from '../types';

export default function Rankings() {
  const { toast } = useToast();
  const [rankings, setRankings] = useState<SchoolPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const data: SchoolPerformance[] = [
    { schoolId: 's1', schoolName: 'Lakeview Secondary School', schoolCode: 'S0101', region: 'Kigoma Region', council: 'Kigoma Ujiji MC', ownership: 'Government', candidates: 140, averageMarks: 68.4, gpa: 3.2, passRate: 87.1, rank: 1 },
    { schoolId: 's2', schoolName: 'Kasulu Town Secondary', schoolCode: 'S0301', region: 'Kigoma Region', council: 'Kasulu TC', ownership: 'Government', candidates: 118, averageMarks: 61.2, gpa: 2.8, passRate: 79.4, rank: 2 },
    { schoolId: 's3', schoolName: 'Ujiji Hill Secondary', schoolCode: 'S0102', region: 'Kigoma Region', council: 'Kigoma Ujiji MC', ownership: 'Private', candidates: 56, averageMarks: 66.9, gpa: 3.0, passRate: 83.9, rank: 3 },
    { schoolId: 's4', schoolName: 'Mwandiga Secondary School', schoolCode: 'S0201', region: 'Kigoma Region', council: 'Kigoma DC', ownership: 'Government', candidates: 92, averageMarks: 58.1, gpa: 2.6, passRate: 74.2, rank: 4 },
    { schoolId: 's5', schoolName: 'Kibondo Central Secondary', schoolCode: 'S0501', region: 'Kigoma Region', council: 'Kibondo DC', ownership: 'Government', candidates: 78, averageMarks: 55.3, gpa: 2.4, passRate: 70.1, rank: 5 },
  ];

  useEffect(() => {
    setLoading(false);
    setRankings(data);
  }, []);

  const filtered = rankings.filter((r) => {
    if (filter !== 'all' && r.ownership !== filter) return false;
    if (search && !r.schoolName.toLowerCase().includes(search.toLowerCase()) && !r.council.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Rankings"
        description="Regional and council school rankings by GPA and pass rate. Demo data only."
        action={<Button variant="ghost" size="sm"><ArrowRight className="mr-1 h-4 w-4" /> Export ranking</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi value={rankings.length} label="Ranked schools" />
        <Kpi value={data[0]?.gpa.toFixed(2) || '—'} label="Top GPA" tone="green" />
        <Kpi value={data[0]?.passRate + '%' || '—'} label="Top pass rate" tone="green" />
        <Kpi value={data.reduce((a, b) => a + b.candidates, 0)} label="Candidates" />
      </div>

      <div className="flex gap-3 mb-4">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="w-64">
          <Option value="all">All ownership types</Option>
          <Option value="government">Government</Option>
          <Option value="private">Private</Option>
          <Option value="faith_based">Faith-based</Option>
          <Option value="community">Community</Option>
        </Select>
        <Input placeholder="Search school or council…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-80" />
      </div>

      <Card>
        <CardHeader><CardTitle>Regional school rankings</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {loading ? (
            <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No rankings" description="No schools match your filters." icon="BarChart3" />
          ) : (
            <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
              <Table>
                <Thead>
                  <Tr><Th className="w-16">Rank</Th><Th>School</Th><Th className="w-40">Council</Th><Th className="w-32">Ownership</Th><Th className="w-32">Candidates</Th><Th className="w-32">Avg marks</Th><Th className="w-32">GPA</Th><Th className="w-32">Pass rate</Th></Tr>
                </Thead>
                <Tbody>
                  {filtered.map((r) => (
                    <Tr key={r.schoolId} className={cn('hover:bg-neutral-50/50', r.rank <= 3 ? 'bg-green-25' : '')}>
                      <Td className="font-mono text-xs font-semibold">{r.rank}</Td>
                      <Td>{r.schoolName}<span className="text-xs text-neutral-500 block">({r.schoolCode})</span></Td>
                      <Td className="text-sm text-neutral-600">{r.council}</Td>
                      <Td><Badge variant="neutral" size="sm">{r.ownership}</Badge></Td>
                      <Td className="text-sm text-neutral-600">{r.candidates}</Td>
                      <Td className="text-sm text-neutral-600 font-mono">{r.averageMarks}</Td>
                      <Td className="text-sm text-neutral-600 font-mono">{r.gpa}</Td>
                      <Td className="text-sm text-neutral-600">{r.passRate}%</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-[10px] text-neutral-500">Rankings are computed from demo data and do not represent official NECTA positions.</p>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' }) {
  const color = tone === 'green' ? 'text-green-700' : 'text-neutral-900';
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={`text-lg font-semibold leading-none ${color}`}>{value}</p>
    </div>
  );
}
