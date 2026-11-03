import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './layout';
import { ToastProvider, useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';
import './layout.css';

export function SuperAdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="super-admin-layout min-h-screen bg-neutral-50 font-sans">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className="layout-main">
          <Topbar
            title={pageTitle(location.pathname)}
            description={pageDescription(location.pathname)}
            onMenuClick={() => setMobileOpen(true)}
          />
          <main className="layout-content">
            <Outlet />
          </main>
        </div>

        <Toaster />
      </div>
    </ToastProvider>
  );
}

function pageTitle(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const last = segments[segments.length - 1] ?? '';
  const labels: Record<string, string> = {
    dashboard: 'System Dashboard',
    regions: 'Regions',
    councils: 'Councils / Districts',
    schools: 'Schools',
    hierarchy: 'Hierarchy Explorer',
    years: 'Academic Years',
    'education-levels': 'Education Levels',
    classes: 'Classes',
    streams: 'Streams',
    subjects: 'Subjects',
    combinations: 'Subject Combinations',
    users: 'All Users',
    roles: 'Roles',
    permissions: 'Permissions',
    assignments: 'User Assignments',
    'access-control': 'Access Control',
    'login-activity': 'Login Activity',
    notifications: 'Notifications',
    'audit-logs': 'Audit Logs',
    backups: 'Backup & Recovery',
    settings: 'System Settings',
    'system-health': 'System Health',
    analytics: 'Performance Analytics',
    rankings: 'Rankings',
    marks: 'Marks Submission',
  };
  if (labels[last]) return labels[last];
  if (last) return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return 'System Dashboard';
}

function pageDescription(path: string): string | undefined {
  const desc: Record<string, string> = {
    dashboard: 'Command centre for the entire examination management system.',
    regions: 'Manage regions across the Kigoma education ecosystem.',
    councils: 'Manage councils and districts within each region.',
    schools: 'Register and oversee every school in the system.',
    hierarchy: 'Explore the region → council → school organisation tree.',
    users: 'Manage all system accounts and their organisational scope.',
    settings: 'Configure institutional and system-wide settings.',
  };
  return desc[path.split('/').pop() || ''];
}
