/**
 * Role-aware sidebar navigation.
 * Accepts nav groups, the authenticated user's role, and mobile-open state.
 * Active route indicator, collapsible desktop mode, responsive mobile drawer.
 */

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
  ClipboardList,
  TreePine,
  BookOpen,
  ArrowUp,
  Check,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../../shared/utils';
import { useAuth } from '../../../../context/AuthContext';
import type { RoleId, RoleNavGroup } from '../types';

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
  ClipboardList,
  TreePine,
  BookOpen,
  ArrowUp,
  Check,
  AlertCircle,
  ArrowRight,
};

export interface RoleSidebarProps {
  groups: RoleNavGroup[];
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  brandName?: string;
  brandRole?: string;
}

function RenderIcon({ name }: { name: string }) {
  const Icon = ICONS[name] || LayoutDashboard;
  return <Icon className="h-4 w-4 shrink-0" />;
}

export function RoleSidebar({ groups, mobileOpen, setMobileOpen, brandName = 'Kigoma Education', brandRole }: RoleSidebarProps) {
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

  // Filter nav items by role if present on item
  const visibleGroups = groups.map((group) => ({
    ...group,
    items: group.items.filter((i) => !i.roles || (i.roles as RoleId[]).includes(user.role as RoleId)),
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
              <span className="brand-name text-sm font-semibold text-neutral-900 leading-none">{brandName}</span>
              <span className="brand-sub text-[10px] text-neutral-500 uppercase tracking-wider">{brandRole || user.role}</span>
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

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn hidden md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>
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
