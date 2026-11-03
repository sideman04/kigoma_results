/**
 * School profile — complete view with organised tabs.
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { schoolService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { School as SchoolIcon, Users, Building, Clock, FileText, ArrowRight } from 'lucide-react';
import type { School } from '../types';

const tabList = [
  { key: 'overview', label: 'Overview' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'students', label: 'Students' },
  { key: 'classes', label: 'Classes & Streams' },
  { key: 'subjects', label: 'Subjects' },
  { key: 'examinations', label: 'Examinations' },
  { key: 'results', label: 'Results' },
  { key: 'activity', label: 'Activity' },
];

export default function SchoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    schoolService.get(id).then((s) => {
      setSchool(s ?? null);
      setLoading(false);
    }).catch((err) => {
      toast({ title: 'Unable to load school', description: err instanceof Error ? err.message : '', variant: 'destructive' });
      navigate('/super-admin/organization/schools');
    });
  }, [id, navigate, toast]);

  if (loading) return <div className="h-64 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>;
  if (!school) return <EmptyState title="School not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={school.name}
        description={`School code ${school.code} · ${school.councilName}, ${school.regionName}`}
        action={<Button variant="ghost" size="sm"><EditIcon /> Edit school</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>School profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="School code" value={school.code} icon={<Building className="h-5 w-5" />} />
            <StatCard label="Region" value={school.regionName || ''} icon={<ArrowRight className="h-5 w-5" />} />
            <StatCard label="Council" value={school.councilName || ''} icon={<ArrowRight className="h-5 w-5" />} />
            <StatCard label="Ownership" value={school.ownership.replace('_', ' ')} icon={<Building className="h-5 w-5" />} />
            <StatCard label="Education level" value={school.educationLevel.replace('_', ' ').toUpperCase()} icon={<Building className="h-5 w-5" />} />
            <StatCard label="Status" value={school.status.replace('_', ' ')} icon={<Building className="h-5 w-5" />} badge={school.status === 'active' ? 'success' : 'neutral'} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Contact</p>
              <p className="text-sm text-neutral-600">{school.phone || 'Not on file'}</p>
              <p className="text-sm text-neutral-600">{school.email || 'Not on file'}</p>
              <p className="text-sm text-neutral-600">{school.address || 'Not on file'}</p>
            </div>
            <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Headteacher</p>
              <p className="text-sm text-neutral-600">{school.headteacherName || 'Not assigned'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-3 mb-1">Registered</p>
              <p className="text-sm text-neutral-600">{new Date(school.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2',
                activeTab === tab.key
                  ? 'border-green-700 text-green-800'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
              )}
            >
              <TabIcon name={tab.key} className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {activeTab === 'overview' && <OverviewTab school={school} />}
        {activeTab === 'teachers' && <ListTab title="Teachers" items={[]} empty="No teachers assigned." />}
        {activeTab === 'students' && <ListTab title="Students" items={[]} empty="No students enrolled." />}
        {activeTab === 'classes' && <ListTab title="Classes & Streams" items={[]} empty="No classes configured." />}
        {activeTab === 'subjects' && <ListTab title="Subjects" items={[]} empty="No subjects assigned." />}
        {activeTab === 'examinations' && <ListTab title="Examinations" items={[]} empty="No examinations scheduled." />}
        {activeTab === 'results' && <ListTab title="Results" items={[]} empty="No results processed." />}
        {activeTab === 'activity' && <ActivityTab />}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function StatCard({ label, value, icon, badge }: { label: string; value: string; icon: React.ReactNode; badge?: 'success' | 'neutral' }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-100 bg-white">
      <div className="flex items-center gap-3">
        <span className="rounded p-1.5 bg-green-50 text-green-700">{icon}</span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
          <p className="text-sm font-semibold text-neutral-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ school }: { school: School }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600">{school.name} is a {school.ownership} school operating at {school.educationLevel} level, located in {school.councilName}, {school.regionName}. Use the tabs above to manage teachers, students, classes, subjects, examinations and results for this school.</p>
    </div>
  );
}

function ListTab({ title, items, empty }: { title: string; items: any[]; empty: string }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">{title}</p>
      {items.length === 0 ? (
        <EmptyState title={title} description={empty} icon="folder" />
      ) : (
        <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
          <Table>
            <Thead><Tr><Th>Name</Th><Th>Status</Th><Th className="w-32">Actions</Th></Tr></Thead>
            <Tbody>
              {items.map((it, i) => (
                <Tr key={i}><Td>{it.name || 'Item ' + (i+1)}</Td><Td><Badge variant="success">Active</Badge></Td><Td></Td></Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ActivityTab() {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600">Recent activity for this school will appear here once actions are recorded in the audit log.</p>
    </div>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 23l3-7m0 0l-7-7m7 7H3" />
    </svg>
  );
}

function TabIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    overview: <SchoolIcon className={className} />,
    teachers: <Users className={className} />,
    students: <Users className={className} />,
    classes: <Building className={className} />,
    subjects: <FileText className={className} />,
    examinations: <Clock className={className} />,
    results: <FileText className={className} />,
    activity: <Clock className={className} />,
  };
  return icons[name] || <Building className={className} />;
}
