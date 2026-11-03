import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  School,
  University,
  GraduationCap,
  Users,
  UserCircle,
  Shield,
  FileText,
  BarChart3,
  Activity,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Search,
  Upload,
  ClipboardList,
  LayoutGrid,
  TreePine,
  BookOpen,
} from 'lucide-react';
import { cn } from './utils';
import { useAuth } from '../../context/AuthContext';
import type { RoleId } from '../types';

const ICONS: Record<string, React.ElementType> = {
  LayoutDashboard,
  Building2,
  School,
  University,
  GraduationCap,
  Users,
  UserCircle,
  Shield,
  FileText,
  BarChart3,
  Activity,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Search,
  Upload,
  ClipboardList,
  LayoutGrid,
  TreePine,
  BookOpen,
};

export interface NavItem {
  to: string;
  label: string;
  icon: string;
  roles?: RoleId[];
  exact?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const SIDEBAR_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ to: '/super-admin/dashboard', label: 'System dashboard', icon: 'LayoutDashboard', exact: true }],
  },
  {
    label: 'Organisation',
    items: [
      { to: '/super-admin/organization/regions', label: 'Regions', icon: 'Building2' },
      { to: '/super-admin/organization/councils', label: 'Councils / Districts', icon: 'University' },
      { to: '/super-admin/organization/schools', label: 'Schools', icon: 'School' },
      { to: '/super-admin/organization/hierarchy', label: 'Hierarchy Explorer', icon: 'TreePine' },
    ],
  },
  {
    label: 'Academic Management',
    items: [
      { to: '/super-admin/academic/years', label: 'Academic Years', icon: 'GraduationCap' },
      { to: '/super-admin/academic/education-levels', label: 'Education Levels', icon: 'University' },
      { to: '/super-admin/academic/classes', label: 'Classes', icon: 'LayoutGrid' },
      { to: '/super-admin/academic/streams', label: 'Streams', icon: 'LayoutGrid' },
      { to: '/super-admin/academic/subjects', label: 'Subjects', icon: 'BookOpen' },
      { to: '/super-admin/academic/combinations', label: 'Subject Combinations', icon: 'ClipboardList' },
    ],
  },
  {
    label: 'Examinations',
    items: [
      { to: '/super-admin/examinations', label: 'Examination Management', icon: 'ClipboardList' },
      { to: '/super-admin/examinations/types', label: 'Examination Types', icon: 'ClipboardList' },
      { to: '/super-admin/marks-submission', label: 'Marks Submission Monitoring', icon: 'Upload' },
      { to: '/super-admin/results/processing', label: 'Results Processing', icon: 'BarChart3' },
      { to: '/super-admin/results/verification', label: 'Results Verification', icon: 'Activity' },
      { to: '/super-admin/results/approval', label: 'Result Approval', icon: 'Shield' },
      { to: '/super-admin/results/publication', label: 'Result Publication', icon: 'FileText' },
      { to: '/super-admin/rankings', label: 'Rankings', icon: 'BarChart3' },
    ],
  },
  {
    label: 'User & Security Management',
    items: [
      { to: '/super-admin/users', label: 'All Users', icon: 'Users', exact: true },
      { to: '/super-admin/roles', label: 'Roles', icon: 'Shield' },
      { to: '/super-admin/permissions', label: 'Permissions', icon: 'Shield' },
      { to: '/super-admin/assignments', label: 'User Assignments', icon: 'UserCircle' },
      { to: '/super-admin/access-control', label: 'Access Control', icon: 'Shield' },
      { to: '/super-admin/login-activity', label: 'Login Activity', icon: 'Activity' },
    ],
  },
  {
    label: 'Reports & Analytics',
    items: [
      { to: '/super-admin/reports/system', label: 'System Reports', icon: 'FileText' },
      { to: '/super-admin/reports/regional', label: 'Regional Reports', icon: 'FileText' },
      { to: '/super-admin/reports/council', label: 'Council Reports', icon: 'FileText' },
      { to: '/super-admin/reports/school', label: 'School Reports', icon: 'FileText' },
      { to: '/super-admin/reports/examination', label: 'Examination Reports', icon: 'FileText' },
      { to: '/super-admin/analytics', label: 'Performance Analytics', icon: 'BarChart3' },
    ],
  },
  {
    label: 'System Operations',
    items: [
      { to: '/super-admin/notifications', label: 'Notifications', icon: 'Bell' },
      { to: '/super-admin/audit-logs', label: 'Audit Logs', icon: 'FileText' },
      { to: '/super-admin/backups', label: 'Backup & Recovery', icon: 'Activity' },
      { to: '/super-admin/settings', label: 'System Settings', icon: 'Settings' },
      { to: '/super-admin/system-health', label: 'System Health', icon: 'Activity' },
    ],
  },
];

export const getIcon = (name: string) => ICONS[name] || LayoutDashboard;

function RenderIcon({ name }: { name: string }) {
  const Icon = getIcon(name);
  return <Icon className="h-4 w-4 shrink-0" />;
}

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (open: boolean) => void }) {
  const auth = useAuth() as any;
  const user = auth.user;
  const signOut = auth.signOut;
  if (!user) return null;
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, setMobileOpen]);

  const isActive = (to: string, exact: boolean | undefined) => {
    if (exact) return location.pathname === to;
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const visibleGroups = SIDEBAR_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((i) => !i.roles || i.roles.includes(user.role as RoleId)),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'sidebar fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-neutral-200 bg-white transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
        aria-label="Main navigation"
      >
        <div className="brand flex items-center gap-3 px-3 py-5 border-b border-neutral-100">
          <div className="brand-mark shrink-0 rounded bg-green-700 p-1.5">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="brand-name text-sm font-semibold text-neutral-900 leading-none">
                Kigoma Education
              </span>
              <span className="brand-sub text-[10px] text-neutral-500 uppercase tracking-wider">
                Super Administrator
              </span>
            </div>
          )}
        </div>

        <nav className="nav flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {visibleGroups.map((group) => (
            <div key={group.label} className="group space-y-0.5">
              {!collapsed && (
                <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const active = isActive(item.to, item.exact);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive: match }) => {
                      const isAct = match || active;
                      return cn(
                        'nav-item flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                        isAct
                          ? 'bg-green-50 text-green-800 font-medium border-r-2 border-green-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      );
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <RenderIcon name={item.icon} />
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                    {collapsed && <span className="sr-only">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer mt-auto border-t border-neutral-100 px-3 py-4 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="logout-btn flex items-center gap-3 rounded-md px-3 py-2 text-left text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="collapse-toggle inline-block"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4 rotate-180" />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="mobile-drawer-overlay fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'mobile-drawer fixed inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-neutral-200 bg-white transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4">
          <span className="text-sm font-semibold text-neutral-900">Navigation</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded hover:bg-neutral-100 text-neutral-500"
            aria-label="Close navigation"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {visibleGroups.map((group) => (
            <div key={group.label} className="group space-y-0.5">
              <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = isActive(item.to, item.exact);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive: match }) =>
                      cn(
                        'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                        (match || active)
                          ? 'bg-green-50 text-green-800 font-medium border-r-2 border-green-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      )
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <RenderIcon name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="border-t border-neutral-100 px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-neutral-500 text-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

    </>
  );
}

function MenuIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
