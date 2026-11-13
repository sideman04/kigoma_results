/**
 * Marks Entry Officer routes — examination marks management only.
 * Unknown paths inside the workspace return to the officer dashboard.
 */

import { Navigate } from 'react-router-dom';
import { RoleLayout } from '../shared/components/RoleLayout';
import { RoleProfilePage, RoleSettingsPage } from '../shared/components/RoleAccountPages';
import { MARKS_OFFICER_NAVIGATION } from '../shared/config/navigation';
import { ROLE_DEFINITIONS } from '../shared/config/roles';
import MarksEntryDetail from '../teacher/pages/MarksEntryDetail';
import Dashboard from './pages/Dashboard';
import Examinations from './pages/Examinations';
import EnterMarks from './pages/EnterMarks';
import MarksManagement from './pages/MarksManagement';
import StudentRecords from './pages/StudentRecords';
import SubmissionHistory from './pages/SubmissionHistory';

export const marksOfficerRoutes = [
  {
    path: 'marks-officer',
    element: (
      <RoleLayout
        groups={MARKS_OFFICER_NAVIGATION}
        brandName="Kigoma Regional ERMS"
        brandRole={ROLE_DEFINITIONS.marks_entry_officer.workspace}
      />
    ),
    children: [
      { index: true, element: <Navigate to="/marks-officer/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'examinations', element: <Examinations /> },
      { path: 'enter-marks', element: <EnterMarks /> },
      { path: 'enter-marks/:id', element: <MarksEntryDetail basePath="/marks-officer" /> },
      { path: 'marks-management', element: <MarksManagement /> },
      { path: 'student-records', element: <StudentRecords /> },
      { path: 'submission-history', element: <SubmissionHistory /> },
      { path: 'profile', element: <RoleProfilePage /> },
      { path: 'settings', element: <RoleSettingsPage /> },
      { path: '*', element: <Navigate to="/marks-officer/dashboard" replace /> },
    ],
  },
];
