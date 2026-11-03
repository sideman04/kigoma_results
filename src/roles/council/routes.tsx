/**
 * Council/District Administrator routes.
 * All paths under /council. Protected by the council_admin role guard in App.jsx.
 */

import { RoleLayout } from '../shared/components/RoleLayout';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import SchoolDetail from './pages/SchoolDetail';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Examinations from './pages/Examinations';
import Submissions from './pages/Submissions';
import Verification from './pages/Verification';
import Performance, { Rankings } from './pages/Performance';
import { Reports, Notifications, Profile } from './pages/Reports';

const COUNCIL_GROUPS = [
  { label: 'Overview', items: [{ to: '/council/dashboard', label: 'Council dashboard', icon: 'LayoutDashboard', exact: true }] },
  {
    label: 'Organisation',
    items: [{ to: '/council/schools', label: 'Schools', icon: 'School' }],
  },
  {
    label: 'People',
    items: [{ to: '/council/students', label: 'Students', icon: 'Users' }, { to: '/council/teachers', label: 'Teachers', icon: 'UserCircle' }],
  },
  {
    label: 'Examinations',
    items: [
      { to: '/council/examinations', label: 'Examinations', icon: 'ClipboardList' },
      { to: '/council/submissions', label: 'Marks submissions', icon: 'ArrowUp' },
      { to: '/council/verification', label: 'Verification', icon: 'Check' },
    ],
  },
  {
    label: 'Performance',
    items: [{ to: '/council/performance', label: 'Performance', icon: 'BarChart3' }, { to: '/council/rankings', label: 'Rankings', icon: 'BarChart3' }],
  },
  {
    label: 'Reports & Notifications',
    items: [{ to: '/council/reports', label: 'Reports', icon: 'FileText' }, { to: '/council/notifications', label: 'Notifications', icon: 'Bell' }],
  },
  { label: 'Account', items: [{ to: '/council/profile', label: 'Profile', icon: 'UserCircle' }] },
];

export const councilRoutes = [
  {
    path: 'council',
    element: <RoleLayout groups={COUNCIL_GROUPS} mobileOpen={false} setMobileOpen={() => {}} brandName="Kigoma Education" brandRole="Council Administrator" />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'schools', element: <Schools /> },
      { path: 'schools/:id', element: <SchoolDetail /> },
      { path: 'students', element: <Students /> },
      { path: 'students/:id', element: <div className="p-6">Student detail</div> },
      { path: 'teachers', element: <Teachers /> },
      { path: 'teachers/:id', element: <div className="p-6">Teacher detail</div> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'examinations/:id', element: <div className="p-6">Examination detail</div> },
      { path: 'submissions', element: <Submissions /> },
      { path: 'verification', element: <Verification /> },
      { path: 'performance', element: <Performance /> },
      { path: 'rankings', element: <Rankings /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
];
