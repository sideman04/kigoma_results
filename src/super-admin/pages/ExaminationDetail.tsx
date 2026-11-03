/**
 * Examination detail — contextual tabs for the full examination lifecycle.
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardTitle, CardContent, Button, Badge, Table, Thead, Tbody, Tr, Th, Td,
  EmptyState, Separator,
} from '../components/ui/index';
import { PageHeader } from '../components/layout';
import { examinationService, submissionService, verificationService, resultsService } from '../services/api';
import { useToast } from '../components/ui/use-toast';
import { ClipboardList, Activity, Shield, FileText, BarChart3, ArrowRight, Eye } from 'lucide-react';
import type { ExaminationDetail, MarksSubmission, VerificationItem } from '../types';

const tabs = [
  { key: 'overview', label: 'Overview', icon: ClipboardList },
  { key: 'configuration', label: 'Configuration', icon: Activity },
  { key: 'subjects', label: 'Subjects', icon: FileText },
  { key: 'schools', label: 'Participating Schools', icon: Eye },
  { key: 'marks-progress', label: 'Marks Progress', icon: BarChart3 },
  { key: 'verification', label: 'Verification', icon: Shield },
  { key: 'results', label: 'Results', icon: FileText },
  { key: 'rankings', label: 'Rankings', icon: BarChart3 },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'activity', label: 'Activity', icon: Activity },
];

export default function ExaminationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [exam, setExam] = useState<ExaminationDetail | null>(null);
  const [submissions, setSubmissions] = useState<MarksSubmission[]>([]);
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    examinationService.get(id).then((e) => {
      setExam(e ?? null);
      setLoading(false);
    }).catch((err) => {
      toast({ title: 'Unable to load examination', description: err instanceof Error ? err.message : '', variant: 'destructive' });
      navigate('/super-admin/examinations');
    });
    submissionService.list({ pageSize: 100 }).then((res) => {
      setSubmissions(res.data as MarksSubmission[]);
    });
    verificationService.list({ pageSize: 100 }).then((res) => {
      setVerifications(res.data as VerificationItem[]);
    });
  }, [id, navigate, toast]);

  const examSubmissions = submissions.filter((s) => s.examinationId === id);
  const examVerifications = verifications.filter((v) => v.examinationId === id);

  if (loading) return <div className="h-80 flex items-center justify-center"><div className="h-4 w-32 rounded-md bg-neutral-200 animate-pulse" /></div>;
  if (!exam) return <EmptyState title="Examination not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={exam.name}
        description={`${exam.code} · ${exam.academicYearName} · ${exam.educationLevelName}`}
        action={
          <div className="flex items-center gap-2">
            <Link to={`/super-admin/examinations/${id}/submissions`}><Button variant="ghost" size="sm"><Activity className="mr-1 h-4 w-4" /> Monitor submissions</Button></Link>
            <Button variant="primary" size="sm">Configure</Button>
          </div>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
        <Kpi value={exam.participatingSchoolCount} label="Participating schools" />
        <Kpi value={exam.submissionCount} label="Submissions received" />
        <Kpi value={exam.verifiedCount} label="Verified" tone="green" />
        <Kpi value={exam.pendingCount} label="Pending" tone="warning" />
      </div>

      <div className="border-b border-neutral-200">
        <div className="flex overflow-x-auto scrollbar-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center gap-2 shrink-0 px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap',
                activeTab === tab.key
                  ? 'border-green-700 text-green-800'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              )}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'overview' && <OverviewTab exam={exam} />}
        {activeTab === 'configuration' && <ConfigurationTab exam={exam} />}
        {activeTab === 'subjects' && <SubjectsTab subjects={exam.subjects} />}
        {activeTab === 'schools' && <SchoolsTab schools={exam.schools} navigate={navigate} />}
        {activeTab === 'marks-progress' && <MarksProgressTab submissions={examSubmissions} />}
        {activeTab === 'verification' && <VerificationTab verifications={examVerifications} navigate={navigate} />}
        {activeTab === 'results' && <ResultsTab exam={exam} navigate={navigate} />}
        {activeTab === 'rankings' && <EmptyState title="Rankings" description="Rankings become available after results are approved." icon="BarChart3" />}
        {activeTab === 'reports' && <ReportsTab exam={exam} />}
        {activeTab === 'activity' && <ActivityTab exam={exam} />}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Kpi({ value, label, tone }: { value: number | string; label: string; tone?: 'green' | 'warning' }) {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p>
      <p className={cn('text-lg font-semibold text-neutral-900 leading-none', tone === 'green' ? 'text-green-700' : tone === 'warning' ? 'text-amber-700' : 'text-neutral-900')}>{value}</p>
    </div>
  );
}

function OverviewTab({ exam }: { exam: ExaminationDetail }) {
  const lifecycle = [
    { step: '1', label: 'Examination created', status: 'done' },
    { step: '2', label: 'Configuration saved', status: exam.status !== 'draft' ? 'done' : 'todo' },
    { step: '3', label: 'Marks submission open', status: exam.marksSubmissionOpen ? 'done' : 'todo' },
    { step: '4', label: 'Submissions received', status: exam.submissionCount > 0 ? 'done' : 'todo' },
    { step: '5', label: 'Verification', status: exam.verifiedCount > 0 ? 'done' : 'todo' },
    { step: '6', label: 'Approval', status: exam.approvedCount > 0 ? 'done' : 'todo' },
    { step: '7', label: 'Publication', status: exam.publishedCount > 0 ? 'done' : 'todo' },
  ];
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-neutral-100 bg-white p-6">
        <p className="text-sm text-neutral-600 mb-4">{exam.name} is configured for {exam.educationLevelName} in {exam.academicYearName}. Marks submission is currently {exam.marksSubmissionOpen ? 'open' : 'closed'}.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Type</p>
            <p className="text-sm font-semibold text-neutral-900">{exam.type.toUpperCase()}</p>
          </div>
          <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Status</p>
            <p className="text-sm font-semibold text-neutral-900 capitalize">{exam.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-100 bg-white p-6">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Examination lifecycle</h3>
        <div className="space-y-3">
          {lifecycle.map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className={cn('flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold', item.status === 'done' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-neutral-100 text-neutral-400 border border-neutral-200')}>
                {item.status === 'done' ? '✓' : item.step}
              </div>
              <span className={cn('text-sm', item.status === 'done' ? 'text-neutral-900 font-medium' : 'text-neutral-500')}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfigurationTab({ exam }: { exam: ExaminationDetail }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600">Examination configuration details. Edit via the examinations list to change type, academic year, education level or submission window.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Academic year</p>
          <p className="text-sm font-semibold text-neutral-900">{exam.academicYearName}</p>
        </div>
        <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Education level</p>
          <p className="text-sm font-semibold text-neutral-900">{exam.educationLevelName}</p>
        </div>
        <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Examination type</p>
          <p className="text-sm font-semibold text-neutral-900">{exam.type.toUpperCase()}</p>
        </div>
        <div className="p-4 rounded-lg border border-neutral-100 bg-neutral-50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Submission window</p>
          <p className="text-sm font-semibold text-neutral-900">{exam.marksSubmissionOpen ? 'Open' : 'Closed'}</p>
        </div>
      </div>
    </div>
  );
}

function SubjectsTab({ subjects }: { subjects: any[] }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Subjects applicable to this examination's education level.</p>
      {subjects.length === 0 ? (
        <EmptyState title="No subjects" description="No subjects configured for this level." icon="BookOpen" />
      ) : (
        <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
          <Table>
            <Thead><Tr><Th>Code</Th><Th>Subject</Th><Th className="w-32">Rule</Th><Th className="w-32">Max mark</Th></Tr></Thead>
            <Tbody>
              {subjects.map((s) => (
                <Tr key={s.id} className="hover:bg-neutral-50/50">
                  <Td className="font-mono text-xs">{s.code}</Td>
                  <Td>{s.name}</Td>
                  <Td><Badge variant={s.compulsory ? 'success' : 'neutral'} size="sm">{s.compulsory ? 'Compulsory' : 'Optional'}</Badge></Td>
                  <Td className="text-sm text-neutral-600">{s.maxMark}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

function SchoolsTab({ schools, navigate }: { schools: any[]; navigate: any }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Schools participating in this examination.</p>
      <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
        <Table>
          <Thead><Tr><Th>Code</Th><Th>School</Th><Th className="w-40">Council</Th><Th className="w-32">Ownership</Th><Th className="w-48">Actions</Th></Tr></Thead>
          <Tbody>
            {schools.length === 0 ? (
              <Tr><Td colSpan={5}><EmptyState title="No participating schools" description="Add schools to this examination." icon="Eye" /></Td></Tr>
            ) : (
              schools.map((s) => (
                <Tr key={s.id} className="hover:bg-neutral-50/50">
                  <Td className="font-mono text-xs">{s.code}</Td>
                  <td>{s.name}</td>
                  <Td className="text-sm text-neutral-600">{s.councilName}</Td>
                  <Td className="text-sm text-neutral-600">{s.ownership}</Td>
                  <Td>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/organization/schools/${s.id}`)}><Eye size={16} /></Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

function MarksProgressTab({ submissions }: { submissions: MarksSubmission[] }) {
  const total = submissions.length;
  const submitted = submissions.filter((s) => s.status === 'submitted').length;
  const pending = submissions.filter((s) => s.status === 'not_started').length;
  const partial = submissions.filter((s) => s.status === 'partial').length;
  const returned = submissions.filter((s) => s.status === 'returned').length;
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Marks submission progress across all participating schools, classes and subjects.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Kpi value={total} label="Records" />
        <Kpi value={submitted} label="Submitted" tone="green" />
        <Kpi value={partial} label="Partial" tone="warning" />
        <Kpi value={pending} label="Not started" tone="warning" />
      </div>
      <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
        <Table>
          <Thead>
            <Tr><Th>School</Th><Th className="w-32">Class</Th><Th className="w-32">Subject</Th><Th className="w-32">Status</Th><Th className="w-32">Submitted</Th><Th className="w-32">Missing</Th><Th className="w-32">Issues</Th></Tr>
          </Thead>
          <Tbody>
            {submissions.length === 0 ? (
              <Tr><Td colSpan={7}><EmptyState title="No submissions" description="No marks submissions recorded yet." icon="Activity" /></Td></Tr>
            ) : (
              submissions.map((s) => (
                <Tr key={s.id} className="hover:bg-neutral-50/50">
                  <Td>{s.schoolName}</Td>
                  <Td className="text-sm text-neutral-600">{s.className}</Td>
                  <Td className="font-mono text-xs">{s.subjectCode}</Td>
                  <Td><Badge variant={s.status === 'submitted' ? 'success' : s.status === 'returned' ? 'danger' : 'neutral'} size="sm">{s.status.replace('_', ' ')}</Badge></Td>
                  <Td className="text-sm text-neutral-600">{s.submittedRecords} / {s.totalRecords}</Td>
                  <Td className="text-sm text-neutral-600">{s.missingRecords}</Td>
                  <Td className="text-sm text-neutral-600">{s.validationIssues}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

function VerificationTab({ verifications, navigate }: { verifications: VerificationItem[]; navigate: any }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Verification status for this examination's school submissions.</p>
      <div className="overflow-auto rounded-md border border-neutral-100 bg-white">
        <Table>
          <Thead><Tr><Th>School</Th><th>Candidates</th><Th className="w-40">Status</Th><Th className="w-32">Exceptions</Th><Th className="w-48">Actions</Th></Tr></Thead>
          <Tbody>
            {verifications.length === 0 ? (
              <Tr><Td colSpan={5}><EmptyState title="No verification records" description="Submissions move to verification once received." icon="Shield" /></Td></Tr>
            ) : (
              verifications.map((v) => (
                <Tr key={v.id} className="hover:bg-neutral-50/50">
                  <Td>{v.schoolName}</Td>
                  <td className="text-sm text-neutral-600">{v.candidateCount}</td>
                  <Td><Badge variant={v.status === 'verified' ? 'success' : v.status === 'approved' ? 'success' : v.status === 'returned_for_correction' ? 'danger' : 'warning'} size="sm">{v.status.replace(/_/g, ' ')}</Badge></Td>
                  <Td className="text-sm text-neutral-600">{v.validationExceptions}</Td>
                  <Td>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/super-admin/examinations/${verifications[0]?.examinationId}/verification`)}>View queue</Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

function ResultsTab({ exam, navigate }: { exam: ExaminationDetail; navigate: any }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Approved and published results for this examination.</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Approved results</p>
          <p className="text-sm font-semibold text-neutral-900">{exam.approvedCount} school(s)</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/super-admin/results/approval`}><Button variant="ghost" size="sm">Approval queue</Button></Link>
          <Link to={`/super-admin/results/publication`}><Button variant="primary" size="sm">Publish results</Button></Link>
        </div>
      </div>
    </div>
  );
}

function ReportsTab({ exam }: { exam: ExaminationDetail }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Generate examination-specific reports.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button variant="ghost" size="sm" className="w-full justify-start">Examination summary PDF</Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">Marks submission CSV</Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">Verification report</Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">Result slips</Button>
      </div>
    </div>
  );
}

function ActivityTab({ exam }: { exam: ExaminationDetail }) {
  return (
    <div className="rounded-lg border border-neutral-100 bg-white p-6">
      <p className="text-sm text-neutral-600 mb-4">Recent activity for this examination.</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
          <span className="text-[10px] font-semibold text-green-700 bg-green-50 rounded-full px-2 py-0.5">Created</span>
          <p className="text-sm text-neutral-900">Examination {exam.code} created</p>
          <p className="text-xs text-neutral-500">Super administrator · Just now</p>
        </div>
        <div className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5">Configured</span>
          <p className="text-sm text-neutral-900">Education level and subjects assigned</p>
          <p className="text-xs text-neutral-500">System · Recent</p>
        </div>
      </div>
    </div>
  );
}
