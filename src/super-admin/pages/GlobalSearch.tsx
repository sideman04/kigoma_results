import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import {
  regionService, councilService, schoolService, userService, examinationService,
  academicYearService,
} from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { Search, Building2, University, School as SchoolIcon, Users, Clock, GraduationCap } from 'lucide-react';
import type { Region, Council, School, User, Examination, AcademicYear } from '../types';

type SearchResult =
  | { type: 'region'; data: Region }
  | { type: 'council'; data: Council }
  | { type: 'school'; data: School }
  | { type: 'user'; data: User }
  | { type: 'examination'; data: Examination }
  | { type: 'year'; data: AcademicYear };

export default function GlobalSearch() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const ICONS: Record<string, React.ElementType> = {
    region: Building2,
    council: University,
    user: Users,
    examination: Clock,
    year: GraduationCap,
    school: SchoolIcon,
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setFocusIndex(-1);
      return;
    }
    setLoading(true);
    const q = query.trim();
    Promise.all([
      regionService.list({ pageSize: 20, search: q }),
      councilService.list({ pageSize: 20, search: q }),
      schoolService.list({ pageSize: 20, search: q }),
      userService.list({ pageSize: 20, search: q }),
      examinationService.list({ pageSize: 20, search: q }),
      academicYearService.list(),
    ]).then(([regions, councils, schools, users, exams, years]) => {
      const list: SearchResult[] = [
        ...(regions.data as Region[]).map((d) => ({ type: 'region' as const, data: d })),
        ...(councils.data as Council[]).map((d) => ({ type: 'council' as const, data: d })),
        ...(schools.data as School[]).map((d) => ({ type: 'school' as const, data: d })),
        ...(users.data as User[]).map((d) => ({ type: 'user' as const, data: d })),
        ...(exams.data as Examination[]).map((d) => ({ type: 'examination' as const, data: d })),
        ...(years.map((d) => ({ type: 'year' as const, data: d }))),
      ];
      setResults(list);
      setFocusIndex(list.length > 0 ? 0 : -1);
      setLoading(false);
    }).catch((err) => {
      toast({ title: 'Search failed', description: err instanceof Error ? err.message : '', variant: 'destructive' });
      setLoading(false);
    });
  }, [query, toast]);

  const toPath = (r: SearchResult) => {
    switch (r.type) {
      case 'region': return `/super-admin/organization/regions/${r.data.id}`;
      case 'council': return `/super-admin/organization/councils/${r.data.id}`;
      case 'school': return `/super-admin/organization/schools/${r.data.id}`;
      case 'user': return `/super-admin/users/${r.data.id}`;
      case 'examination': return `/super-admin/examinations/${r.data.id}`;
      case 'year': return `/super-admin/academic/years`;
    }
  };

  const label = (r: SearchResult) => {
    switch (r.type) {
      case 'region': return r.data.name;
      case 'council': return r.data.name;
      case 'school': return `${r.data.code} · ${r.data.name}`;
      case 'user': return `${r.data.fullName} (${r.data.username})`;
      case 'examination': return r.data.code;
      case 'year': return r.data.label;
    }
  };

  const subtitle = (r: SearchResult) => {
    switch (r.type) {
      case 'region': return 'Region';
      case 'council': return `Council · ${r.data.regionName || '—'}`;
      case 'school': return `${r.data.councilName || '—'}, ${r.data.regionName || '—'}`;
      case 'user': return r.data.role.replace('_', ' ');
      case 'examination': return r.data.type.toUpperCase();
      case 'year': return r.data.status;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Global Search" description="Search regions, councils, schools, users, examinations and academic years." />

      <Card>
        <CardHeader><CardTitle>Search</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search all records…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIndex((i) => Math.min(i + 1, results.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIndex((i) => Math.max(i - 1, -1)); }
                if (e.key === 'Enter' && focusIndex >= 0) { navigate(toPath(results[focusIndex]!)); }
              }}
              className="w-full rounded-md border border-neutral-200 bg-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
            />
          </div>
          {loading && <p className="text-xs text-neutral-500 mt-2">Searching…</p>}
        </CardContent>
      </Card>

      {!query.trim() ? (
        <EmptyState title="Enter a search term" description="Type above to search across authorised records." icon="Search" />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Results ({results.length})</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {results.length === 0 ? (
              <EmptyState title="No results" description="No matching records found." icon="Search" />
            ) : (
              <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
                <SearchResultTable
                  results={results}
                  toPath={toPath}
                  label={label}
                  subtitle={subtitle}
                  ICONS={ICONS}
                  focusIndex={focusIndex}
                  onSelect={(r) => navigate(toPath(r))}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SearchResultTable({
  results, toPath, label, subtitle, ICONS, focusIndex, onSelect,
}: {
  results: SearchResult[]; toPath: (r: SearchResult) => string; label: (r: SearchResult) => string; subtitle: (r: SearchResult) => string;
  ICONS: Record<string, React.ElementType>; focusIndex: number; onSelect: (r: SearchResult) => void;
}) {
  return (
    <table className="table w-full text-sm">
      <tbody>
        {results.map((r, i) => {
          const Icon = ICONS[r.type] ?? SchoolIcon;
          const active = i === focusIndex;
          return (
            <tr
              key={r.type + '-' + r.data.id}
              onClick={() => onSelect(r)}
              className={`cursor-pointer hover:bg-neutral-50 transition-colors${active ? ' bg-green-50' : ''}`}
            >
              <td className="px-4 py-3 w-10">
                <Icon className="h-4 w-4 text-neutral-500" />
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-neutral-900">{label(r)}</div>
                <div className="text-xs text-neutral-500">{subtitle(r)}</div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">{r.type}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
