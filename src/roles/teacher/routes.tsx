/**
 * Teacher routes.
 * All paths under /teacher. Protected by the teacher role guard in App.jsx.
 */

import RoleLayout from '../../shared/components/RoleLayout';
import Dashboard from './pages/Dashboard';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import Examinations from './pages/Examinations';
import MarksEntry from './pages/MarksEntry';
import MarksEntryDetail from './pages/MarksEntryDetail';
import Drafts from './pages/Drafts';
import Submissions from './pages/Submissions';
import History from './pages/History';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

const TEACHER_GROUPS = [
  { label: 'Overview', items: [{ to: '/teacher/dashboard', label: 'Teacher dashboard', icon: 'LayoutDashboard', exact: true }] },
  {
    label: 'My teaching',
    items: [
      { to: '/teacher/classes', label: 'My classes', icon: 'LayoutGrid' },
      { to: '/teacher/subjects', label: 'My subjects', icon: 'BookOpen' },
      { to: '/teacher/examinations', label: 'Examinations', icon: 'ClipboardList' },
    ],
  },
  {
    label: 'Marks entry',
    items: [
      { to: '/teacher/marks-entry', label: 'Marks entry', icon: 'ArrowUp' },
      { to: '/teacher/drafts', label: 'Drafts', icon: 'FileText' },
      { to: '/teacher/submissions', label: 'Submissions', icon: 'Check' },
      { to: '/teacher/history', label: 'Submission history', icon: 'Activity' },
    ],
  },
  { label: 'Account', items: [{ to: '/teacher/notifications', label: 'Notifications', icon: 'Bell' }, { to: '/teacher/profile', label: 'Profile', icon: 'UserCircle' }] },
];

export const teacherRoutes = [
  {
    path: 'teacher',
    element: <RoleLayout groups={TEACHER_GROUPS} mobileOpen={false} setMobileOpen={() => {}} brandName="Kigoma Education" brandRole="Teacher" />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'classes', element: <Classes /> },
      { path: 'classes/:id', element: <div className="p-6">Class detail</div> },
      { path: 'subjects', element: <Subjects /> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'examinations/:id', element: <div className="p-6">Examination detail</div> },
      { path: 'marks-entry', element: <MarksEntry /> },
      { path: 'marks-entry/:id', element: <MarksEntryDetail /> },
      { path: 'drafts', element: <Drafts /> },
      { path: 'submissions', element: <Submissions /> },
      { path: 'submissions/:id', element: <div className="p-6">Submission detail</div> },
      { path: 'history', element: <History /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
];
