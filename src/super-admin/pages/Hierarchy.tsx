/**
 * Organisation hierarchy explorer — Region → Council → School tree.
 */

import React, { useEffect, useState, useMemo, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '../components/ui/separator';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { hierarchyService, schoolService, councilService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { TreePine, Building2, University, School, Search, ChevronRight, ChevronDown, Eye } from 'lucide-react';
import type { OrganisationNode } from '../types';

export default function Hierarchy() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tree, setTree] = useState<OrganisationNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    hierarchyService.tree().then((t) => {
      setTree(t);
      // Expand regions by default
      const initial: Record<string, boolean> = {};
      t.forEach((r) => { initial[r.id] = true; });
      setExpanded(initial);
      setLoading(false);
    }).catch((err) => {
      toast({ title: 'Unable to load hierarchy', description: err instanceof Error ? err.message : '', variant: 'destructive' });
      setLoading(false);
    });
  }, [toast]);

  const filteredTree = useMemo(() => {
    if (!search) return tree;
    const q = search.toLowerCase();
    return tree.filter((region) => {
      const matchRegion = region.label.toLowerCase().includes(q);
      const matchingCouncils = region.children?.filter((c) =>
        c.label.toLowerCase().includes(q) ||
        c.children?.some((s) => s.label.toLowerCase().includes(q))
      ) || [];
      return matchRegion || matchingCouncils.length > 0;
    });
  }, [tree, search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hierarchy Explorer"
        description="Explore the region → council → school organisation tree and navigate to related modules."
        action={<Button variant="primary" size="sm" onClick={() => navigate('/super-admin/organization/schools')}>Manage schools</Button>}
      />

      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Organisation tree</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative">
              <div className="absolute left-3 top-4 bottom-4 w-0.5 border-l border-neutral-200" />
              <div className="search-wrap mb-3 pl-8 relative">
                <Search className="h-4 w-4 absolute left-1 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search organisation…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border border-neutral-200 bg-white pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                />
              </div>
              {loading ? (
                <div className="h-40 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>
              ) : filteredTree.length === 0 ? (
                <EmptyState title="No organisations" description="No matching regions, councils or schools." icon="folder" />
              ) : (
                <ul className="space-y-1">
                  {filteredTree.map((region) => (
                    <React.Fragment key={region.id}>
                      <TreeNode node={region} type="region" level={0} expanded={expanded} setExpanded={setExpanded} navigate={navigate} />
                      {expanded[region.id] && region.children?.map((council) => (
                        <React.Fragment key={council.id}>
                          <TreeNode node={council} type="council" level={1} expanded={expanded} setExpanded={setExpanded} navigate={navigate} />
                          {expanded[council.id] && council.children?.map((school) => (
                            <TreeNode node={school} type="school" level={2} expanded={expanded} setExpanded={setExpanded} navigate={navigate} />
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-80">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/super-admin/organization/regions')}>
              <Building2 className="mr-2 h-4 w-4" /> Manage regions
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/super-admin/organization/councils')}>
              <University className="mr-2 h-4 w-4" /> Manage councils
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => navigate('/super-admin/organization/schools')}>
              <School className="mr-2 h-4 w-4" /> Manage schools
            </Button>
            <Separator className="my-3" />
            <Button variant="primary" size="sm" className="w-full" onClick={() => navigate('/super-admin/organization/schools')}>
              Register new school
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TreeNode({
  node, type, level, expanded, setExpanded, navigate,
}: {
  node: OrganisationNode; type: 'region' | 'council' | 'school';
  level: number; expanded: Record<string, boolean>;
  setExpanded: (v: Record<string, boolean>) => void; navigate: any;
}) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isOpen = expanded[node.id] === true;
  const iconMap: Record<string, React.ElementType> = {
    region: Building2,
    council: University,
    school: School,
  };
  const Icon = iconMap[type] ?? Building2;

  const toggle = () => {
    if (hasChildren) setExpanded({ ...expanded, [node.id]: !isOpen });
  };

  const badge = (meta?: Record<string, string | number>) => {
    if (!meta) return null;
    const items: Array<{ label: string; value: string | number }> = [];
    if (meta.status) items.push({ label: 'Status', value: meta.status });
    if (meta.councils !== undefined) items.push({ label: 'Councils', value: meta.councils });
    if (meta.schools !== undefined) items.push({ label: 'Schools', value: meta.schools });
    if (meta.ownership) items.push({ label: String(meta.ownership), value: '' });
    return (
      <span className="flex gap-1">
        {items.map((it) => (
          <Badge key={it.label} variant="neutral" size="sm">{it.value !== '' ? String(it.value) : it.label}</Badge>
        ))}
      </span>
    );
  };

  return (
    <li className="flex items-center gap-2 pl-4" style={{ paddingLeft: level * 16 + 12 }}>
      {hasChildren ? (
        <button onClick={toggle} className="p-1 hover:bg-neutral-100 rounded" aria-label={isOpen ? 'Collapse' : 'Expand'}>
          {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-neutral-500" /> : <ChevronRight className="h-3.5 w-3.5 text-neutral-500" />}
        </button>
      ) : (
        <div className="w-3.5 h-3.5" />
      )}
      <button
        onClick={() => {
          if (type === 'school') navigate(`/super-admin/organization/schools/${node.id}`);
          else if (type === 'council') navigate(`/super-admin/organization/councils/${node.id}`);
          else navigate(`/super-admin/organization/regions/${node.id}`);
        }}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
      >
        <Icon className="h-4 w-4 text-neutral-400" />
        <span className="truncate max-w-[120px]">{node.label}</span>
        {badge(node.meta)}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(type === 'school' ? `/super-admin/organization/schools/${node.id}` : type === 'council' ? `/super-admin/organization/councils/${node.id}` : `/super-admin/organization/regions/${node.id}`); }}
        className="opacity-0 hover:opacity-100 p-1 text-green-700"
        title="View profile"
      >
        <Eye className="h-4 w-4" />
      </button>
    </li>
  );
}

