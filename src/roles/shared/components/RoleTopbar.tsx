/**
 * Role-aware top navigation.
 * Breadcrumbs, page title, global search, notifications, user profile,
 * role/organisation indicator and account menu.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, LogOut, Mail } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Button, Input, Badge } from './ui';
import { cn } from '../utils';

export interface RoleTopbarProps {
  breadcrumbs?: React.ReactNode;
  title?: string;
  description?: string;
  showSearch?: boolean;
  onMenuClick?: () => void;
}

export function RoleTopbar({ breadcrumbs, title, description, showSearch = true, onMenuClick }: RoleTopbarProps) {
  const auth = useAuth() as any;
  const user = auth.user;
  const signOut = auth.signOut;
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/login');
    setUserMenuOpen(false);
  };

  return (
    <header className="topbar sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 md:gap-6">
          <button
            className="mobile-menu-button items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          {breadcrumbs && (
            <nav className="breadcrumbs hidden sm:flex items-center gap-1 text-[11px] text-neutral-500 uppercase tracking-wider" aria-label="Breadcrumb">
              {breadcrumbs}
            </nav>
          )}

          <div className="page-title flex flex-col leading-tight">
            {title && (
              <h1 className="text-sm font-semibold text-neutral-900 leading-none">{title}</h1>
            )}
            {description && (
              <p className="text-[11px] text-neutral-500 leading-none">{description}</p>
            )}
          </div>
        </div>

        <div className="topbar-right flex items-center gap-2">
          {showSearch && (
            <div className="search-wrap hidden sm:flex items-center relative">
              <Search className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search records…"
                className="search-input w-64 rounded-md border border-neutral-200 bg-white pl-9 pr-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              />
            </div>
          )}

          <button
            className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-md"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="notif-dot absolute top-1 right-1 h-2 w-2 rounded-full bg-green-600 border-2 border-white" />
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100 focus:outline-none"
              aria-label="Account menu"
              aria-expanded={userMenuOpen}
            >
              <div className="user-avatar shrink-0 rounded bg-green-700 p-[1px]">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="user-info hidden sm:flex flex-col leading-tight">
                <span className="text-xs font-semibold text-neutral-900">{user?.fullName || user?.name || 'User'}</span>
                <span className="text-[10px] text-green-700 font-medium">
                  {(user?.role?.replace('_', ' ') || 'User')?.replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </span>
                {user?.scopeLabel && (
                  <span className="text-[10px] text-neutral-500">{user.scopeLabel}</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-neutral-400" />
            </button>

            {userMenuOpen && (
              <div className="user-menu absolute right-0 mt-2 w-48 rounded border border-neutral-200 bg-white shadow-lg py-2 z-50 animate-in fade-in slide-in-from-right-200">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100">
                  <div className="user-avatar rounded bg-green-700 p-[1px]">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-neutral-900">{user?.fullName || user?.name || 'User'}</span>
                    <span className="text-[10px] text-neutral-500">{user?.username || 'user'}</span>
                  </div>
                </div>
                <div className="menu-items py-1">
                  <button className="menu-item flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserMenuOpen(false)}>
                    <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
                    Profile
                  </button>
                  <hr className="my-1 border-neutral-100" />
                  <button className="menu-item flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 shrink-0" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
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

export function BreadcrumbItem({ to, label }: { to: string; label: string }) {
  return (
    <>
      <a href={to} className="text-green-700 hover:underline font-medium">{label}</a>
      <ChevronBreadcrumb className="h-3 w-3 mx-1 text-neutral-400" />
    </>
  );
}

function ChevronBreadcrumb({ className }: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function RolePageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="page-head mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
      </div>
      {action && <div className="ml-auto flex items-center gap-2">{action}</div>}
    </div>
  );
}
