/**
 * Marks Entry Officer — Examinations.
 * Available examinations in the officer's scope, with direct links into the
 * marks-entry workflow.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { RolePageHeader } from '../../shared/components/RoleTopbar';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, EmptyState, Input, Option, Select, useToast } from '../../shared/components/ui';
import { examinationService, orgService } from '../../shared/services/api';
import type { Examination, School } from '../../shared/types';
import { officerScopeLabel, resolveOfficerSchoolIds } from '../utils/scope';
import { ArrowRight, CalendarDays, ClipboardList, Search } from 'lucide-react';

const YEAR_LABELS: Record<string, string> = {
  'year-2025': 'Academic Year 2025',
  'year-2024': 'Academic Year 2024',
  'year-2026': 'Academic Year 2026',
};

export default function MarksOfficerExaminations() {
  const { user } = useAuth() as any;
  const { toast } = useToast();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Examination[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    Promise.all([examinationService.list({ pageSize: 100 }), orgService.listSchools({ pageSize: 100 })])
      .then(([examRes, schoolRes]) => {
        setExams(examRes.data as Examination[]);
        const allSchools = schoolRes.data as School[];
        setSchools(allSchools.filter((school) => resolveOfficerSchoolIds(user, allSchools).includes(school.id)));
      })
      .catch((err) => toast({ title: 'Unable to load examinations', description: err instanceof Error ? err.message : '', variant: 'destructive' }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return exams.filter((exam) => {
      const matchesSearch = !query || exam.name.toLowerCase().includes(query) || exam.code.toLowerCase().includes(query);
      const matchesStatus = !statusFilter || exam.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [exams, search, statusFilter]);

  return (
    <div className="space-y-6">
      <RolePageHeader
        title="Examinations"
        description={`Examinations available for marks entry within ${officerScopeLabel(user)}.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>Available examinations</CardTitle>
                <p className="mt-1 text-xs text-neutral-500">Select an examination to start or continue marks entry.</p>
              </div>
              <div className="flex w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input placeholder="Search examinations…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" aria-label="Search examinations" />
                </div>
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-32" aria-label="Filter examination status">
                  <Option value="">All</Option>
                  <Option value="open">Open</Option>
                  <Option value="closed">Closed</Option>
                  <Option value="draft">Draft</Option>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {loading ? (
              <div className="space-y-2">{[1, 2, 3].map((item) => <div key={item} className="h-16 rounded-md bg-neutral-100 animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
              <EmptyState title="No examinations available" description="No examination matches your search or current assignment." icon="ClipboardList" />
            ) : (
              <div className="space-y-3">
                {filtered.map((exam) => (
                  <div key={exam.id} className="rounded-lg border border-neutral-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-neutral-900">{exam.name}</p>
                          <Badge variant={exam.status === 'open' ? 'success' : exam.status === 'closed' ? 'neutral' : 'warning'} size="sm">{exam.status}</Badge>
                        </div>
                        <p className="mt-1 text-xs text-neutral-500">{exam.code} · {exam.type.toUpperCase()} · {YEAR_LABELS[exam.academicYearId] || exam.academicYearId} · {exam.educationLevelName || 'Education level'}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500">
                          <span><CalendarDays className="mr-1 inline h-3 w-3" />{exam.startDate ? new Date(exam.startDate).toLocaleDateString() : 'Schedule not set'}</span>
                          <span>{exam.participatingSchoolCount} participating schools</span>
                          <span>{exam.submissionCount} submissions</span>
                          <span>{exam.pendingCount} pending</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/marks-officer/student-records?exam=${exam.id}`)}>Student records</Button>
                        <Button variant="primary" size="sm" onClick={() => navigate(`/marks-officer/enter-marks?exam=${exam.id}`)} disabled={exam.status === 'closed' || exam.status === 'archived'}>
                          Enter marks <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Your assigned centres</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Scope</p>
              <p className="mt-1 text-sm font-medium text-neutral-900">{officerScopeLabel(user)}</p>
              <p className="mt-1 text-xs text-neutral-500">{schools.length} school / examination centre{schools.length === 1 ? '' : 's'}</p>
            </div>
            <div className="mt-3 space-y-1.5">
              {schools.map((school) => (
                <div key={school.id} className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-xs">
                  <span className="text-neutral-700">{school.name}</span>
                  <span className="font-mono text-[10px] text-neutral-400">{school.code}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
              Marks entry covers every student registered at the centres above for the selected examination.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
