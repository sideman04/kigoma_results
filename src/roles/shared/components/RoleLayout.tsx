/**
 * Shared role-based application shell.
 * Each role module renders its pages inside this layout.
 */

import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { RoleSidebar } from './RoleSidebar';
import { RoleTopbar } from './RoleTopbar';
import { ToastProvider, Toaster } from './ui';
import { cn } from '../utils';

export interface RoleLayoutProps {
  groups: React.ComponentProps<typeof RoleSidebar>['groups'];
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  brandName?: string;
  brandRole?: string;
  title?: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
}

export function RoleLayout({
  groups,
  brandName,
  brandRole,
  title,
  description,
  breadcrumbs,
}: RoleLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <ToastProvider>
      <div className="role-layout min-h-screen bg-neutral-50 font-sans">
        <RoleSidebar
          groups={groups}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          brandName={brandName}
          brandRole={brandRole}
        />

        <div className="layout-main">
          <RoleTopbar
            breadcrumbs={breadcrumbs}
            title={title}
            description={description}
            showSearch
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

export function cnRoles(...classes: (string | boolean | undefined)[]) {
  return cn(...classes);
}
