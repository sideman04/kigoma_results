/**
 * Marks Entry Officer demo store.
 *
 * Frontend-only demonstration of Super Administrator-managed officer accounts.
 * Accounts are persisted in localStorage so an officer created in the Super
 * Admin console can immediately sign in with the credentials that were issued.
 *
 * PRODUCTION NOTE: never store plain-text passwords in the browser. This module
 * exists only to simulate the PHP authentication workflow. Replace it with the
 * real `request()` calls to the backend user/authentication endpoints.
 */

import type { RoleId } from '../../../super-admin/types';

export type OfficerStatus = 'active' | 'inactive';

export interface OfficerActivity {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface MarksOfficer {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  employeeNo: string;
  regionId: string;
  regionName?: string;
  councilId: string;
  councilName?: string;
  schoolId?: string;
  schoolName?: string;
  status: OfficerStatus;
  /** Demo only — production credentials are hashed and handled by the backend. */
  password: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  activity: OfficerActivity[];
}

export interface OfficerInput {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  employeeNo: string;
  regionId: string;
  regionName?: string;
  councilId: string;
  councilName?: string;
  schoolId?: string;
  schoolName?: string;
  status: OfficerStatus;
  password: string;
}

const STORAGE_KEY = 'kigoma_marks_officers_v1';
const iso = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString();

const seedOfficers: MarksOfficer[] = [
  {
    id: 'officer-1',
    fullName: 'Joseph Mwita',
    username: 'marksofficer',
    email: 'joseph.mwita@kigoma-education.go.tz',
    phone: '+255 754 118 220',
    employeeNo: 'MEO/KG/001',
    regionId: 'region-kigoma',
    regionName: 'Kigoma Region',
    councilId: 'council-kigoma-ujiji-mc',
    councilName: 'Kigoma Ujiji MC',
    status: 'active',
    password: 'demo1234',
    lastLoginAt: iso(-0.6),
    createdAt: iso(-180),
    updatedAt: iso(-1),
    activity: [
      { id: 'act-1', action: 'Marks submitted', detail: 'CSEE 2025 · Basic Mathematics · Lakeview Secondary School', timestamp: iso(-1) },
      { id: 'act-2', action: 'Draft saved', detail: 'CSEE 2025 · English Language · Ujiji Hill Secondary', timestamp: iso(-2) },
      { id: 'act-3', action: 'Signed in', detail: 'Kigoma Ujiji MC · Council scope', timestamp: iso(-0.6) },
    ],
  },
  {
    id: 'officer-2',
    fullName: 'Salma Abdallah',
    username: 'salma.officer',
    email: 'salma.abdallah@kigoma-education.go.tz',
    phone: '+255 715 442 018',
    employeeNo: 'MEO/KG/002',
    regionId: 'region-kigoma',
    regionName: 'Kigoma Region',
    councilId: 'council-kasulu-tc',
    councilName: 'Kasulu TC',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    status: 'active',
    password: 'demo1234',
    lastLoginAt: iso(-3),
    createdAt: iso(-150),
    updatedAt: iso(-4),
    activity: [
      { id: 'act-4', action: 'Draft saved', detail: 'CSEE 2025 · English Language · Kasulu Town Secondary', timestamp: iso(-3) },
      { id: 'act-5', action: 'Credentials issued', detail: 'Account created by Super Administrator', timestamp: iso(-150) },
    ],
  },
  {
    id: 'officer-3',
    fullName: 'Peter Msigwa',
    username: 'peter.officer',
    email: 'peter.msigwa@kigoma-education.go.tz',
    phone: '+255 768 330 144',
    employeeNo: 'MEO/KG/003',
    regionId: 'region-kigoma',
    regionName: 'Kigoma Region',
    councilId: 'council-uvinza-dc',
    councilName: 'Uvinza DC',
    schoolId: 'school-s0801',
    schoolName: 'Uvinza Valley Secondary',
    status: 'inactive',
    password: 'demo1234',
    lastLoginAt: iso(-40),
    createdAt: iso(-120),
    updatedAt: iso(-30),
    activity: [
      { id: 'act-6', action: 'Account deactivated', detail: 'Deactivated by Super Administrator', timestamp: iso(-30) },
      { id: 'act-7', action: 'Signed in', detail: 'Uvinza Valley Secondary', timestamp: iso(-40) },
    ],
  },
];

function readStore(): MarksOfficer[] {
  if (typeof window === 'undefined') return [...seedOfficers];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...seedOfficers];
    const parsed = JSON.parse(raw) as MarksOfficer[];
    return Array.isArray(parsed) && parsed.length ? parsed : [...seedOfficers];
  } catch {
    return [...seedOfficers];
  }
}

function writeStore(officers: MarksOfficer[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(officers));
  } catch {
    // Storage can be unavailable in private modes; the in-memory seed remains usable.
  }
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function listOfficers(): MarksOfficer[] {
  return readStore().sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export function getOfficer(id: string): MarksOfficer | undefined {
  return readStore().find((officer) => officer.id === id);
}

export function createOfficer(input: OfficerInput): MarksOfficer {
  const officers = readStore();
  const username = input.username.trim().toLowerCase();
  const email = input.email.trim().toLowerCase();

  if (officers.some((officer) => officer.username.toLowerCase() === username)) {
    throw new Error('That username is already in use by another officer.');
  }
  if (officers.some((officer) => officer.email.toLowerCase() === email)) {
    throw new Error('That email address is already assigned to another officer.');
  }

  const now = new Date().toISOString();
  const officer: MarksOfficer = {
    ...input,
    id: makeId('officer'),
    username,
    email,
    password: input.password,
    createdAt: now,
    updatedAt: now,
    activity: [
      {
        id: makeId('act'),
        action: 'Account created',
        detail: 'Marks Entry Officer account issued by Super Administrator',
        timestamp: now,
      },
    ],
  };

  writeStore([...officers, officer]);
  return officer;
}

export function updateOfficer(id: string, patch: Partial<Omit<MarksOfficer, 'id' | 'createdAt' | 'password' | 'activity'>>): MarksOfficer | null {
  const officers = readStore();
  const index = officers.findIndex((officer) => officer.id === id);
  if (index === -1) return null;

  const existing = officers[index]!;
  const updated: MarksOfficer = {
    ...existing,
    ...patch,
    username: (patch.username ?? existing.username).trim().toLowerCase(),
    email: (patch.email ?? existing.email).trim().toLowerCase(),
    updatedAt: new Date().toISOString(),
    activity: [
      {
        id: makeId('act'),
        action: 'Account updated',
        detail: 'Officer details updated by Super Administrator',
        timestamp: new Date().toISOString(),
      },
      ...existing.activity,
    ],
  };
  officers[index] = updated;
  writeStore(officers);
  return updated;
}

export function setOfficerStatus(id: string, status: OfficerStatus): MarksOfficer | null {
  const officers = readStore();
  const index = officers.findIndex((officer) => officer.id === id);
  if (index === -1) return null;
  const existing = officers[index]!;
  const now = new Date().toISOString();
  const updated: MarksOfficer = {
    ...existing,
    status,
    updatedAt: now,
    activity: [
      {
        id: makeId('act'),
        action: status === 'active' ? 'Account activated' : 'Account deactivated',
        detail: `Account ${status === 'active' ? 'activated' : 'deactivated'} by Super Administrator`,
        timestamp: now,
      },
      ...existing.activity,
    ],
  };
  officers[index] = updated;
  writeStore(officers);
  return updated;
}

export function resetOfficerCredentials(id: string, password: string): MarksOfficer | null {
  const officers = readStore();
  const index = officers.findIndex((officer) => officer.id === id);
  if (index === -1) return null;
  const existing = officers[index]!;
  const now = new Date().toISOString();
  const updated: MarksOfficer = {
    ...existing,
    password,
    updatedAt: now,
    activity: [
      {
        id: makeId('act'),
        action: 'Credentials reset',
        detail: 'Login credentials reset by Super Administrator',
        timestamp: now,
      },
      ...existing.activity,
    ],
  };
  officers[index] = updated;
  writeStore(officers);
  return updated;
}

export function recordOfficerActivity(id: string, action: string, detail: string): void {
  const officers = readStore();
  const index = officers.findIndex((officer) => officer.id === id);
  if (index === -1) return;
  officers[index]!.activity.unshift({
    id: makeId('act'),
    action,
    detail,
    timestamp: new Date().toISOString(),
  });
  writeStore(officers);
}

/** Authenticate a marks entry officer against the demo officer store. */
export function authenticateOfficer(username: string, password: string): Record<string, unknown> | null {
  const officers = readStore();
  const officer = officers.find((item) => item.username.toLowerCase() === username.trim().toLowerCase());
  if (!officer || officer.password !== password) return null;
  if (officer.status !== 'active') {
    throw new Error('This Marks Entry Officer account is inactive. Contact the Super Administrator.');
  }

  const now = new Date().toISOString();
  const index = officers.findIndex((item) => item.id === officer.id);
  officers[index] = {
    ...officer,
    lastLoginAt: now,
    activity: [
      { id: makeId('act'), action: 'Signed in', detail: officer.schoolName || officer.councilName || 'Assigned scope', timestamp: now },
      ...officer.activity,
    ],
  };
  writeStore(officers);

  const scopeLabel = officer.schoolName || officer.councilName || officer.regionName || 'Assigned scope';
  return {
    id: officer.id,
    username: officer.username,
    name: officer.fullName,
    fullName: officer.fullName,
    email: officer.email,
    phone: officer.phone,
    employeeNo: officer.employeeNo,
    role: 'marks_entry_officer' as RoleId,
    status: officer.status,
    regionId: officer.regionId,
    regionName: officer.regionName,
    councilId: officer.councilId,
    councilName: officer.councilName,
    schoolId: officer.schoolId,
    schoolName: officer.schoolName,
    scopeLabel,
    lastLoginAt: now,
  };
}

/** Development-only helper used by the login screen. */
export function getDemoOfficerCredentials(): Array<{ label: string; username: string; password: string }> {
  return listOfficers()
    .filter((officer) => officer.status === 'active')
    .slice(0, 2)
    .map((officer) => ({
      label: `${officer.fullName} (${officer.schoolName || officer.councilName || 'Region'})`,
      username: officer.username,
      password: officer.password,
    }));
}
