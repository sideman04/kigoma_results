/**
 * Teacher routes — student management workspace only.
 *
 * Deliberately excludes marks entry, marks management, marks submission,
 * marks approval and results pages. Any unknown /teacher/* path is redirected
 * to the teacher dashboard rather than exposing another role's screen.
 */

import { Navigate } from 'react-router-dom';
import { RoleLayout } from '../shared/components/RoleLayout';
import { RoleProfilePage, RoleSettingsPage } from '../shared/components/RoleAccountPages';
import { TEACHER_NAVIGATION } from '../shared/config/navigation';
import { ROLE_DEFINITIONS } from '../shared/config/roles';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import RegisterStudent from './pages/RegisterStudent';
import StudentLists from './pages/StudentLists';
import StudentDetails from './pages/StudentDetails';

export const teacherRoutes = [
  {
    path: 'teacher',
    element: (
      <RoleLayout
        groups={TEACHER_NAVIGATION}
        brandName="Kigoma Regional ERMS"
        brandRole={ROLE_DEFINITIONS.teacher.workspace}
      />
    ),
    children: [
      { index: true, element: <Navigate to="/teacher/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'students', element: <Students /> },
      { path: 'register', element: <RegisterStudent /> },
      { path: 'student-lists', element: <StudentLists /> },
      { path: 'student-details', element: <StudentDetails /> },
      { path: 'profile', element: <RoleProfilePage /> },
      { path: 'settings', element: <RoleSettingsPage /> },
      { path: '*', element: <Navigate to="/teacher/dashboard" replace /> },
    ],
  },
];
