/**
 * Regional Administrator — Reports.
 */

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select, Option } from '../../shared/components/ui';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { useToast } from '../../shared/components/ui';
import { FileText, Download, ArrowRight, School, Building2 } from 'lucide-react';

const REPORTS = [
  { id: 'regional-perf', icon: Building2, title: 'Regional performance report', desc: 'Performance summary for Kigoma Region across all councils.', category: 'Performance' },
  { id: 'council-perf', icon: Building2, title: 'Council performance report', desc: 'Performance breakdown by council within the region.', category: 'Performance' },
  { id: 'school-perf', icon: School, title: 'School performance report', desc: 'Individual school performance and submission status.', category: 'Schools' },
  { id: 'submission', icon: FileText, title: 'Marks submission report', desc: 'Submission progress, missing marks and validation issues.', category: 'Marks' },
  { id: 'exams', icon: FileText, title: 'Examination report', desc: 'Examination configuration and participation across the region.', category: 'Examinations' },
];

export default function Reports() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<string | null>(null);
  const [format, setFormat] = useState<'pdf' | 'excel' | 'print'>('pdf');

  const runExport = () => {
    if (!selected) return;
    toast({ title: `Exporting ${selected} report`, description: `Exporting to ${format.toUpperCase()}… (demo)`, variant: 'success' });
    setTimeout(() => {
      toast({ title: 'Export complete', description: `kigoma-regional-${selected}-report.${format === 'print' ? 'pdf' : format} downloaded.`, variant: 'success' });
    }, 900);
  };

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Regional reports"
        description="Select a report type, preview, print or export."
        action={<Button variant="ghost" size="sm"><Download className="mr-1 h-4 w-4" /> Downloads</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Reports</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
              {REPORTS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={`flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors ${
                    selected === r.id ? 'border-green-700 bg-green-50' : 'border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <r.icon className="h-5 w-5 text-neutral-500" />
                    <span className="text-sm font-semibold text-neutral-900">{r.title}</span>
                  </div>
                  <p className="text-xs text-neutral-500">{r.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">{r.category}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Preview & Export</CardTitle></CardHeader>
          <CardContent className="pt-0">
            {!selected ? (
              <div className="p-12 text-center text-neutral-500">Select a report to preview.</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Selected report</p>
                  <p className="text-sm font-semibold text-neutral-900">{REPORTS.find((r) => r.id === selected)!.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Format</span>
                  <Select value={format} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormat(e.target.value as any)} className="w-48">
                    <Option value="pdf">PDF</Option>
                    <Option value="excel">Excel</Option>
                    <Option value="print">Print</Option>
                  </Select>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Report metadata</p>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <div className="flex justify-between"><span>Generated</span><span className="font-mono">Just now</span></div>
                    <div className="flex justify-between"><span>Scope</span><span className="font-mono">Kigoma Region</span></div>
                    <div className="flex justify-between"><span>Records</span><span className="font-mono">Demo data</span></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => window.print()}>Print preview</Button>
                  <Button variant="primary" size="sm" onClick={runExport}>Export {format.toUpperCase()}</Button>
                </div>
                <p className="text-[10px] text-neutral-500 mt-3">Export produces a demonstration file. The PHP backend generates real reports.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


