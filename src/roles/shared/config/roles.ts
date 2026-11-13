/**
 * Central role configuration.
 *
 * A single source of truth for role ids, human labels, workspace names and the
 * landing route for each role. Used by authentication, route guards, login and
 * role navigation so role behaviour is not duplicated across the app.
 */

import type { RoleId } from '../types';

export interface RoleDefinition {
  id: RoleId;
  label: string;
  shortLabel: string;
  description: string;
  /** Landing / home route for this role. */
  home: string;
  /** Workspace name shown in the sidebar brand area. */
  workspace: string;
}

export const ROLE_DEFINITIONS: Record<RoleId, RoleDefinition> = {
  super_admin: {
    id: 'super_admin',
    label: 'Super Administrator',
    shortLabel: 'Super Admin',
    description: 'Full system administration, including Marks Entry Officer accounts and all organisational data.',
    home: '/super-admin',
    workspace: 'System Administration',
  },
  regional_admin: {
    id: 'regional_admin',
    label: 'Regional Administrator',
    shortLabel: 'Regional Admin',
    description: 'Oversees councils, schools, submissions and results across the region.',
    home: '/regional',
    workspace: 'Regional Administration',
  },
  council_admin: {
    id: 'council_admin',
    label: 'Council Administrator',
    shortLabel: 'Council Admin',
    description: 'Manages schools, teachers and examination data within the assigned council.',
    home: '/council',
    workspace: 'Council Administration',
  },
  school_admin: {
    id: 'school_admin',
    label: 'School Administrator',
    shortLabel: 'School Admin',
    description: 'Manages school users, classes, students and marks submission for one school.',
    home: '/school',
    workspace: 'School Operations',
  },
  teacher: {
    id: 'teacher',
    label: 'Teacher',
    shortLabel: 'Teacher',
    description: 'Registers and maintains student information only. No access to examination marks.',
    home: '/teacher',
    workspace: 'Student Administration',
  },
  marks_entry_officer: {
    id: 'marks_entry_officer',
    label: 'Marks Entry Officer',
    shortLabel: 'Marks Officer',
    description: 'Enters, reviews and submits examination marks for assigned schools or centres.',
    home: '/marks-officer',
    workspace: 'Marks Processing',
  },
};

export const ALL_ROLE_IDS: RoleId[] = Object.keys(ROLE_DEFINITIONS) as RoleId[];

export const ROLE_LABELS: Record<string, string> = Object.fromEntries(
  ALL_ROLE_IDS.map((role) => [role, ROLE_DEFINITIONS[role].label])
);

export const ROLE_HOME: Record<string, string> = Object.fromEntries(
  ALL_ROLE_IDS.map((role) => [role, ROLE_DEFINITIONS[role].home])
);

/** Resolve the correct landing route for a role. */
export function getRoleHome(role?: string | null): string {
  if (!role) return '/login';
  return ROLE_HOME[role] ?? '/login';
}

/** Human-readable role label, with a safe fallback. */
export function getRoleLabel(role?: string | null): string {
  if (!role) return 'User';
  return ROLE_LABELS[role] ?? role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Roles allowed to access the shared legacy staff pages. */
export const STAFF_ROLES: string[] = ['super_admin', 'regional_admin', 'council_admin', 'school_admin'];
