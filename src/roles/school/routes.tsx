/**
 * School Administrator routes.
 * All paths under /school. Protected by the school_admin role guard in App.jsx.
 */

import { RoleLayout } from '../shared/components/RoleLayout';
import Dashboard from './pages/Dashboard';
import SchoolProfile from './pages/SchoolProfile';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Streams from './pages/Streams';
import Subjects from './pages/Subjects';
import Examinations from './pages/Examinations';
import MarksMonitoring from './pages/MarksMonitoring';
import Review from './pages/Review';
import MarksEntry from '../teacher/pages/MarksEntry';
import MarksEntryDetail from '../teacher/pages/MarksEntryDetail';
import BulkMarksImport from './pages/BulkMarksImport';
import { Reports, Notifications, Profile } from './pages/Reports';

const SCHOOL_GROUPS = [
  { label: 'Overview', items: [{ to: '/school/dashboard', label: 'School dashboard', icon: 'LayoutDashboard', exact: true }] },
  {
    label: 'School',
    items: [{ to: '/school/profile', label: 'School profile', icon: 'School' }],
  },
  {
    label: 'Academic',
    items: [
      { to: '/school/students', label: 'Students', icon: 'Users' },
      { to: '/school/teachers', label: 'Teachers & staff', icon: 'UserCircle' },
      { to: '/school/classes', label: 'Classes', icon: 'LayoutGrid' },
      { to: '/school/streams', label: 'Streams', icon: 'LayoutGrid' },
      { to: '/school/subjects', label: 'Subjects', icon: 'BookOpen' },
    ],
  },
  {
    label: 'Examinations',
    items: [
      { to: '/school/examinations', label: 'Examinations', icon: 'ClipboardList' },
      { to: '/school/marks-entry', label: 'Enter / import marks', icon: 'Upload' },
      { to: '/school/marks-import', label: 'Bulk import all subjects', icon: 'FileText' },
      { to: '/school/marks-monitoring', label: 'Marks monitoring', icon: 'ArrowUp' },
      { to: '/school/review', label: 'School-level review', icon: 'Check' },
    ],
  },
  { label: 'Reports', items: [{ to: '/school/reports', label: 'Reports', icon: 'FileText' }] },
  { label: 'Account', items: [{ to: '/school/notifications', label: 'Notifications', icon: 'Bell' }, { to: '/school/profile', label: 'Profile', icon: 'UserCircle' }] },
];

export const schoolRoutes = [
  {
    path: 'school',
    element: <RoleLayout groups={SCHOOL_GROUPS} mobileOpen={false} setMobileOpen={() => {}} brandName="Kigoma Education" brandRole="School Administrator" />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <SchoolProfile /> },
      { path: 'students', element: <Students /> },
      { path: 'students/:id', element: <div className="p-6">Student detail</div> },
      { path: 'teachers', element: <Teachers /> },
      { path: 'teachers/:id', element: <div className="p-6">Teacher detail</div> },
      { path: 'classes', element: <Classes /> },
      { path: 'classes/:id', element: <div className="p-6">Class detail</div> },
      { path: 'streams', element: <Streams /> },
      { path: 'subjects', element: <Subjects /> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'examinations/:id', element: <div className="p-6">Examination detail</div> },
      { path: 'marks-monitoring', element: <MarksMonitoring /> },
      { path: 'marks-entry', element: <MarksEntry basePath="/school" /> },
      { path: 'marks-entry/:id', element: <MarksEntryDetail basePath="/school" /> },
      { path: 'marks-import', element: <BulkMarksImport /> },
      { path: 'review', element: <Review /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
];
