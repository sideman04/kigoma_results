/**
 * Super Administrator route configuration.
 * All routes are protected by the super_admin role guard in App.jsx.
 */

import { Outlet } from 'react-router-dom';
import { SuperAdminLayout } from './components/SuperAdminLayout';
import Dashboard from './pages/Dashboard';
import Regions from './pages/Regions';
import Councils from './pages/Councils';
import Schools from './pages/Schools';
import SchoolDetail from './pages/SchoolDetail';
import Hierarchy from './pages/Hierarchy';
import AcademicYears from './pages/AcademicYears';
import EducationLevels from './pages/EducationLevels';
import Classes from './pages/Classes';
import Streams from './pages/Streams';
import Subjects from './pages/Subjects';
import Combinations from './pages/Combinations';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';
import Assignments from './pages/Assignments';
import Examinations from './pages/Examinations';
import ExaminationDetail from './pages/ExaminationDetail';
import Grading from './pages/Grading';
import ResultsProcessing from './pages/ResultsProcessing';
import Verification from './pages/Verification';
import Approval from './pages/Approval';
import Publication from './pages/Publication';
import Rankings from './pages/Rankings';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Announcements from './pages/Announcements';
import AuditLogs from './pages/AuditLogs';
import Security from './pages/Security';
import Backups from './pages/Backups';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import GlobalSearch from './pages/GlobalSearch';

function DetailPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">Detail view for this record. Backend-powered record pages are wired through the service layer.</p>
    </div>
  );
}

function ExamPlaceholder({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">Examination sub-module. Backend integration pending.</p>
    </div>
  );
}

export const superAdminRoutes = [
  {
    path: 'super-admin',
    element: <SuperAdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'search', element: <GlobalSearch /> },
      { path: 'organization/regions', element: <Regions /> },
      { path: 'organization/regions/:id', element: <DetailPlaceholder title="Region detail" /> },
      { path: 'organization/councils', element: <Councils /> },
      { path: 'organization/councils/:id', element: <DetailPlaceholder title="Council detail" /> },
      { path: 'organization/schools', element: <Schools /> },
      { path: 'organization/schools/:id', element: <SchoolDetail /> },
      { path: 'organization/hierarchy', element: <Hierarchy /> },
      { path: 'academic/years', element: <AcademicYears /> },
      { path: 'academic/education-levels', element: <EducationLevels /> },
      { path: 'academic/classes', element: <Classes /> },
      { path: 'academic/streams', element: <Streams /> },
      { path: 'academic/subjects', element: <Subjects /> },
      { path: 'academic/combinations', element: <Combinations /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <DetailPlaceholder title="User detail" /> },
      { path: 'roles', element: <Roles /> },
      { path: 'roles/:id', element: <DetailPlaceholder title="Role detail" /> },
      { path: 'permissions', element: <Permissions /> },
      { path: 'assignments', element: <Assignments /> },
      { path: 'access-control', element: <Assignments /> },
      { path: 'login-activity', element: <AuditLogs /> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'examinations/:id', element: <ExaminationDetail /> },
      { path: 'examinations/:id/subjects', element: <ExamPlaceholder title="Examination subjects" /> },
      { path: 'examinations/:id/schools', element: <ExamPlaceholder title="Participating schools" /> },
      { path: 'examinations/:id/submissions', element: <ExamPlaceholder title="Marks submissions" /> },
      { path: 'examinations/:id/processing', element: <ExamPlaceholder title="Results processing" /> },
      { path: 'examinations/:id/verification', element: <ExamPlaceholder title="Verification" /> },
      { path: 'examinations/:id/approval', element: <ExamPlaceholder title="Approval" /> },
      { path: 'examinations/:id/publication', element: <ExamPlaceholder title="Publication" /> },
      { path: 'examinations/types', element: <Examinations /> },
      { path: 'marks-submission', element: <ResultsProcessing /> },
      { path: 'grading', element: <Grading /> },
      { path: 'results/processing', element: <ResultsProcessing /> },
      { path: 'results/verification', element: <Verification /> },
      { path: 'results/approval', element: <Approval /> },
      { path: 'results/publication', element: <Publication /> },
      { path: 'rankings', element: <Rankings /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'reports/system', element: <Reports /> },
      { path: 'reports/regional', element: <Reports /> },
      { path: 'reports/council', element: <Reports /> },
      { path: 'reports/school', element: <Reports /> },
      { path: 'reports/examination', element: <Reports /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'announcements', element: <Announcements /> },
      { path: 'audit-logs', element: <AuditLogs /> },
      { path: 'security', element: <Security /> },
      { path: 'backups', element: <Backups /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> },
      { path: 'system-health', element: <Security /> },
    ],
  },
];
