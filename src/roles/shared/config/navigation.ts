/**
 * Role navigation configuration.
 *
 * Navigation is declared once per role and consumed by the shared RoleLayout.
 * Adding or removing a permitted module is a single, auditable change here.
 */

import type { RoleNavGroup } from '../types';

/**
 * Teacher workspace — student administration only.
 * Marks-entry, examinations, submissions and results are intentionally absent.
 */
export const TEACHER_NAVIGATION: RoleNavGroup[] = [
  {
    label: 'Overview',
    items: [
      { to: '/teacher/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', exact: true },
    ],
  },
  {
    label: 'Student management',
    items: [
      { to: '/teacher/students', label: 'Students', icon: 'Users' },
      { to: '/teacher/register', label: 'Register Student', icon: 'UserPlus' },
      { to: '/teacher/student-lists', label: 'Student Lists', icon: 'ListChecks' },
      { to: '/teacher/student-details', label: 'Student Details', icon: 'UserCircle' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/teacher/profile', label: 'Profile', icon: 'UserCircle' },
      { to: '/teacher/settings', label: 'Settings', icon: 'Settings' },
    ],
  },
];

/**
 * Marks Entry Officer workspace — examination marks processing only.
 * Student registration and school management are intentionally absent.
 */
export const MARKS_OFFICER_NAVIGATION: RoleNavGroup[] = [
  {
    label: 'Overview',
    items: [
      { to: '/marks-officer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', exact: true },
    ],
  },
  {
    label: 'Examination marks',
    items: [
      { to: '/marks-officer/examinations', label: 'Examinations', icon: 'ClipboardList' },
      { to: '/marks-officer/enter-marks', label: 'Enter Marks', icon: 'ArrowUp' },
      { to: '/marks-officer/marks-management', label: 'Marks Management', icon: 'FileText' },
      { to: '/marks-officer/student-records', label: 'Student Examination Records', icon: 'GraduationCap' },
      { to: '/marks-officer/submission-history', label: 'Submission History', icon: 'Activity' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/marks-officer/profile', label: 'Profile', icon: 'UserCircle' },
      { to: '/marks-officer/settings', label: 'Settings', icon: 'Settings' },
    ],
  },
];
