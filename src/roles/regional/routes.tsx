/**
 * Regional Administrator routes.
 * All paths under /regional. Protected by the regional_admin role guard in App.jsx.
 */

import RoleLayout from '../../shared/components/RoleLayout';
import Dashboard from './pages/Dashboard';
import Councils from './pages/Councils';
import CouncilDetail from './pages/CouncilDetail';
import Schools from './pages/Schools';
import SchoolDetail from './pages/SchoolDetail';
import Examinations from './pages/Examinations';
import ExaminationDetail from './pages/ExaminationDetail';
import Submissions from './pages/Submissions';
import Performance from './pages/Performance';
import Rankings from './pages/Rankings';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

const REGIONAL_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/regional/dashboard', label: 'Regional dashboard', icon: 'LayoutDashboard', exact: true }],
  },
  {
    label: 'Organisation',
    items: [
      { to: '/regional/councils', label: 'Councils', icon: 'University' },
      { to: '/regional/schools', label: 'Schools', icon: 'School' },
    ],
  },
  {
    label: 'Examinations',
    items: [
      { to: '/regional/examinations', label: 'Examinations', icon: 'ClipboardList' },
      { to: '/regional/submissions', label: 'Submission tracking', icon: 'ArrowUp' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { to: '/regional/performance', label: 'Performance', icon: 'BarChart3' },
      { to: '/regional/rankings', label: 'Rankings', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Reports & Notifications',
    items: [
      { to: '/regional/reports', label: 'Reports', icon: 'FileText' },
      { to: '/regional/notifications', label: 'Notifications', icon: 'Bell' },
    ],
  },
  { label: 'Account', items: [{ to: '/regional/profile', label: 'Profile', icon: 'UserCircle' }] },
];

export const regionalRoutes = [
  {
    path: 'regional',
    element: <RoleLayout groups={REGIONAL_GROUPS} mobileOpen={false} setMobileOpen={() => {}} brandName="Kigoma Education" brandRole="Regional Administrator" />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'councils', element: <Councils /> },
      { path: 'councils/:id', element: <CouncilDetail /> },
      { path: 'schools', element: <Schools /> },
      { path: 'schools/:id', element: <SchoolDetail /> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'examinations/:id', element: <ExaminationDetail /> },
      { path: 'submissions', element: <Submissions /> },
      { path: 'performance', element: <Performance /> },
      { path: 'rankings', element: <Rankings /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
];
