/**
 * Centralized API client and service layer for the Super Administrator module.
 *
 * Demo mode: every service resolves against the in-memory store in
 * ./mockData.ts after a small artificial delay. This lets every screen work
 * without a backend while clearly simulating real API calls.
 *
 * Production integration: replace the demo function bodies with real
 * `request()` calls against your PHP API. Base URL is resolved from
 * VITE_API_URL, falling back to /api (proxied to the PHP dev server in
 * vite.config.js). Never place credentials in this file.
 */

import type {
  AcademicYear,
  Announcement,
  ApprovalHistory,
  AuditLog,
  Backup,
  SchoolClass,
  Council,
  EducationLevel,
  Examination,
  ExaminationDetail,
  GradeBand,
  GradingPolicy,
  MarksSubmission,
  Notification,
  OrganisationNode,
  PaginatedResponse,
  Permission,
  PaginationParams,
  ProcessingRun,
  Region,
  Role,
  RolePermission,
  School,
  SecurityEvent,
  Stream,
  Subject,
  SubjectCombination,
  SystemSettings,
  User,
  VerificationItem,
} from '../types';
import { demoData, resetDemoStore as _resetDemoStore } from './mockData';

const BASE = import.meta.env.VITE_API_URL || '/api';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Lightweight request wrapper for real PHP API integration. */
export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include', // lets PHP session cookies work
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) {
    const err = new Error(
      (data as { message?: string }).message || 'Request failed.'
    ) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Attach an auth bearer token when the auth layer provides one. */
export function authHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Expose demo-store reset for development/testing only. */
export { _resetDemoStore as resetDemoStore };

// -----------------------------------------------------------------------------
// Generic demo-store helpers (operate on the shared in-memory store)
// -----------------------------------------------------------------------------

type Entity = { id: string };

const demoList = <T extends Entity>(
  items: T[],
  params: PaginationParams = {}
): Promise<PaginatedResponse<T>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      let result = [...items];
      if (params.search) {
        const q = params.search.toLowerCase();
        result = result.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(q)
        );
      }
      if (params.sortBy) {
        const dir = params.sortDirection === 'desc' ? -1 : 1;
        result.sort((a, b) => {
          const av = (a as any)[params.sortBy!];
          const bv = (b as any)[params.sortBy!];
          if (av < bv) return -dir;
          if (av > bv) return dir;
          return 0;
        });
      }
      const page = Math.max(1, params.page ?? 1);
      const pageSize = Math.max(1, params.pageSize ?? 25);
      const total = result.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      resolve({
        data: result.slice(start, start + pageSize),
        total,
        page,
        pageSize,
        totalPages,
      });
    }, 350);
  });

const demoGet = <T extends Entity>(
  items: T[],
  id: string
): Promise<T | null> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(items.find((i) => i.id === id) ?? null), 300);
  });

const demoCreate = <T extends Entity>(
  items: T[],
  item: Partial<T>
): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const created = { ...item, id: `demo-${Date.now()}` } as T;
      items.push(created);
      resolve(created);
    }, 400);
  });

const demoUpdate = <T extends Entity>(
  items: T[],
  id: string,
  patch: Partial<T>
): Promise<T | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return resolve(null);
      items[idx] = { ...items[idx], ...patch } as T;
      resolve(items[idx] ?? null);
    }, 400);
  });

const demoRemove = <T extends Entity>(
  items: T[],
  id: string
): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return resolve(false);
      items.splice(idx, 1);
      resolve(true);
    }, 350);
  });

// -----------------------------------------------------------------------------
// Services
// -----------------------------------------------------------------------------

export const regionService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.regions, params) as Promise<PaginatedResponse<Region>>,
  get: (id: string) => demoGet(demoData.regions, id) as Promise<Region | null>,
  create: (data: Omit<Region, 'id' | 'createdAt' | 'updatedAt'>) =>
    demoCreate(demoData.regions, data) as Promise<Region>,
  update: (id: string, data: Partial<Region>) =>
    demoUpdate(demoData.regions, id, data) as Promise<Region | null>,
  remove: (id: string) => demoRemove(demoData.regions, id),
};

export const councilService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.councils, params) as Promise<PaginatedResponse<Council>>,
  get: (id: string) => demoGet(demoData.councils, id) as Promise<Council | null>,
  create: (data: Omit<Council, 'id' | 'createdAt' | 'updatedAt'>) =>
    demoCreate(demoData.councils, data) as Promise<Council>,
  update: (id: string, data: Partial<Council>) =>
    demoUpdate(demoData.councils, id, data) as Promise<Council | null>,
  remove: (id: string) => demoRemove(demoData.councils, id),
};

export const schoolService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.schools, params) as Promise<PaginatedResponse<School>>,
  get: (id: string) => demoGet(demoData.schools, id) as Promise<School | null>,
  create: (data: Omit<School, 'id' | 'createdAt' | 'updatedAt'>) =>
    demoCreate(demoData.schools, data) as Promise<School>,
  update: (id: string, data: Partial<School>) =>
    demoUpdate(demoData.schools, id, data) as Promise<School | null>,
  remove: (id: string) => demoRemove(demoData.schools, id),
};

export const hierarchyService = {
  tree: (): Promise<OrganisationNode[]> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(buildHierarchy()), 400);
    }),
};

export const userService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.users, params) as Promise<PaginatedResponse<User>>,
  get: (id: string) => demoGet(demoData.users, id) as Promise<User | null>,
  create: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'loginCount'>) =>
    demoCreate(demoData.users, data) as Promise<User>,
  update: (id: string, data: Partial<User>) =>
    demoUpdate(demoData.users, id, data) as Promise<User | null>,
  remove: (id: string) => demoRemove(demoData.users, id),
  setStatus: (id: string, status: User['status']) =>
    demoUpdate(demoData.users, id, { status }) as Promise<User | null>,
};

export const roleService = {
  list: () =>
    new Promise<Role[]>((resolve) => setTimeout(() => resolve([...demoData.roles]), 300)),
  get: (id: string) => demoGet(demoData.roles, id) as Promise<Role | null>,
  create: (data: Omit<Role, 'id' | 'createdAt'>) =>
    demoCreate(demoData.roles, data) as Promise<Role>,
  update: (id: string, data: Partial<Role>) =>
    demoUpdate(demoData.roles, id, data) as Promise<Role | null>,
};

export const permissionService = {
  list: () =>
    new Promise<Permission[]>((resolve) =>
      setTimeout(() => resolve([...demoData.permissions]), 300)
    ),
  listByRole: (roleId: string) =>
    new Promise<RolePermission[]>((resolve) =>
      setTimeout(
        () =>
          resolve(demoData.rolePermissions.filter((rp) => rp.roleId === roleId)),
        300
      )
    ),
  grant: (roleId: string, permissionId: string) =>
    new Promise<void>((resolve) => {
      const exists = demoData.rolePermissions.find(
        (rp) => rp.roleId === roleId && rp.permissionId === permissionId
      );
      if (!exists)
        demoData.rolePermissions.push({ roleId, permissionId, granted: true });
      setTimeout(resolve, 300);
    }),
  revoke: (roleId: string, permissionId: string) =>
    new Promise<void>((resolve) => {
      const idx = demoData.rolePermissions.findIndex(
        (rp) => rp.roleId === roleId && rp.permissionId === permissionId
      );
      if (idx !== -1) demoData.rolePermissions.splice(idx, 1);
      setTimeout(resolve, 300);
    }),
};

export const academicYearService = {
  list: () =>
    new Promise<AcademicYear[]>((resolve) =>
      setTimeout(() => resolve([...demoData.academicYears]), 300)
    ),
  create: (data: Omit<AcademicYear, 'id' | 'createdAt'>) =>
    demoCreate(demoData.academicYears, data) as Promise<AcademicYear>,
  update: (id: string, data: Partial<AcademicYear>) =>
    demoUpdate(demoData.academicYears, id, data) as Promise<AcademicYear | null>,
};

export const educationLevelService = {
  list: () =>
    new Promise<EducationLevel[]>((resolve) =>
      setTimeout(() => resolve([...demoData.educationLevels]), 300)
    ),
  create: (data: Omit<EducationLevel, 'id' | 'createdAt'>) =>
    demoCreate(demoData.educationLevels, data) as Promise<EducationLevel>,
  update: (id: string, data: Partial<EducationLevel>) =>
    demoUpdate(demoData.educationLevels, id, data) as Promise<EducationLevel | null>,
};

export const classService = {
  list: () =>
    new Promise<SchoolClass[]>((resolve) =>
      setTimeout(() => resolve([...demoData.schoolClasses]), 300)
    ),
  create: (data: Omit<SchoolClass, 'id'>) =>
    demoCreate(demoData.schoolClasses, data) as Promise<SchoolClass>,
  update: (id: string, data: Partial<SchoolClass>) =>
    demoUpdate(demoData.schoolClasses, id, data) as Promise<SchoolClass | null>,
};

export const streamService = {
  list: () =>
    new Promise<Stream[]>((resolve) =>
      setTimeout(() => resolve([...demoData.streams]), 300)
    ),
  create: (data: Omit<Stream, 'id'>) =>
    demoCreate(demoData.streams, data) as Promise<Stream>,
  update: (id: string, data: Partial<Stream>) =>
    demoUpdate(demoData.streams, id, data) as Promise<Stream | null>,
};

export const subjectService = {
  list: () =>
    new Promise<Subject[]>((resolve) => setTimeout(() => resolve([...demoData.subjects]), 300)),
  create: (data: Omit<Subject, 'id' | 'createdAt'>) =>
    demoCreate(demoData.subjects, data) as Promise<Subject>,
  update: (id: string, data: Partial<Subject>) =>
    demoUpdate(demoData.subjects, id, data) as Promise<Subject | null>,
};

export const combinationService = {
  list: () =>
    new Promise<SubjectCombination[]>((resolve) =>
      setTimeout(() => resolve([...demoData.combinations]), 300)
    ),
  create: (data: Omit<SubjectCombination, 'id'>) =>
    demoCreate(demoData.combinations, data) as Promise<SubjectCombination>,
  update: (id: string, data: Partial<SubjectCombination>) =>
    demoUpdate(demoData.combinations, id, data) as Promise<SubjectCombination | null>,
};

export const examinationService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.examinations, params) as Promise<PaginatedResponse<Examination>>,
  get: (id: string) =>
    new Promise<ExaminationDetail | null>((resolve) => {
      const exam = demoData.examinations.find((e) => e.id === id);
      if (!exam) return resolve(null);
      const detail: ExaminationDetail = {
        ...exam,
        subjects: demoData.subjects.filter((s) =>
          exam.educationLevelId ? s.educationLevelId === exam.educationLevelId : true
        ),
        schools: demoData.schools,
      };
      setTimeout(() => resolve(detail), 400);
    }),
  create: (data: Omit<Examination, 'id' | 'createdAt' | 'updatedAt' | 'participatingSchoolCount' | 'submissionCount' | 'pendingCount' | 'verifiedCount' | 'approvedCount' | 'publishedCount'>) =>
    demoCreate(demoData.examinations, data as Examination) as Promise<Examination>,
  update: (id: string, data: Partial<Examination>) =>
    demoUpdate(demoData.examinations, id, data) as Promise<Examination | null>,
};

export const submissionService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.submissions, params) as Promise<PaginatedResponse<MarksSubmission>>,
};

export const gradingService = {
  list: () =>
    new Promise<GradingPolicy[]>((resolve) =>
      setTimeout(() => resolve([...demoData.gradingPolicies]), 300)
    ),
  get: (id: string) => demoGet(demoData.gradingPolicies, id) as Promise<GradingPolicy | null>,
  create: (data: Omit<GradingPolicy, 'id'>) =>
    demoCreate(demoData.gradingPolicies, data) as Promise<GradingPolicy>,
  update: (id: string, data: Partial<GradingPolicy>) =>
    demoUpdate(demoData.gradingPolicies, id, data) as Promise<GradingPolicy | null>,
};

export const verificationService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.verificationItems, params) as Promise<PaginatedResponse<VerificationItem>>,
  setStatus: (id: string, status: RecordStatus) =>
    demoUpdate(demoData.verificationItems, id, { status }) as Promise<VerificationItem | null>,
};

export const resultsService = {
  processingRuns: () =>
    new Promise<ProcessingRun[]>((resolve) =>
      setTimeout(() => resolve([...demoData.processingRuns]), 400)
    ),
  approvalHistory: () =>
    new Promise<ApprovalHistory[]>((resolve) =>
      setTimeout(() => resolve([...demoData.approvalHistory]), 400)
    ),
};

export const notificationService = {
  list: () =>
    new Promise<Notification[]>((resolve) =>
      setTimeout(() => resolve([...demoData.notifications]), 350)
    ),
  markRead: (id: string) =>
    demoUpdate(demoData.notifications, id, { read: true }) as Promise<Notification | null>,
};

export const announcementService = {
  list: () =>
    new Promise<Announcement[]>((resolve) =>
      setTimeout(() => resolve([...demoData.announcements]), 300)
    ),
  create: (data: Omit<Announcement, 'id' | 'createdAt' | 'createdBy'>) =>
    demoCreate(demoData.announcements, data) as Promise<Announcement>,
  update: (id: string, data: Partial<Announcement>) =>
    demoUpdate(demoData.announcements, id, data) as Promise<Announcement | null>,
};

export const auditService = {
  list: (params?: PaginationParams) =>
    demoList(demoData.auditLogs, params) as Promise<PaginatedResponse<AuditLog>>,
};

export const securityService = {
  list: () =>
    new Promise<SecurityEvent[]>((resolve) =>
      setTimeout(() => resolve([...demoData.securityEvents]), 350)
    ),
};

export const backupService = {
  list: () =>
    new Promise<Backup[]>((resolve) => setTimeout(() => resolve([...demoData.backups]), 350)),
  create: () =>
    new Promise<Backup>((resolve) => {
      setTimeout(() => {
        const b: Backup = {
          id: `backup-${Date.now()}`,
          date: new Date().toISOString(),
          status: 'success',
          type: 'full',
          size: '12.4 MB',
          fileName: `kigoma_db_${new Date().toISOString().slice(0, 10)}.sql`,
          restorePoint: true,
        };
        demoData.backups.unshift(b);
        resolve(b);
      }, 900);
    }),
};

export const settingsService = {
  get: () =>
    new Promise<SystemSettings>((resolve) =>
      setTimeout(() => resolve({ ...demoData.settings }), 300)
    ),
  update: (data: Partial<SystemSettings>) =>
    new Promise<SystemSettings>((resolve) =>
      setTimeout(() => {
        Object.assign(demoData.settings, data);
        resolve({ ...demoData.settings });
      }, 500)
    ),
};

// -----------------------------------------------------------------------------
// Hierarchy builder (region > council > school)
// -----------------------------------------------------------------------------

function buildHierarchy(): OrganisationNode[] {
  return demoData.regions.map((region) => {
    const regionCouncils = demoData.councils.filter((c) => c.regionId === region.id);
    return {
      id: region.id,
      type: 'region' as const,
      label: region.name,
      meta: { status: region.status, councils: regionCouncils.length },
      children: regionCouncils.map((council) => {
        const councilSchools = demoData.schools.filter((s) => s.councilId === council.id);
        return {
          id: council.id,
          type: 'council' as const,
          label: council.name,
          meta: { status: council.status, schools: councilSchools.length },
          children: councilSchools.map((school) => ({
            id: school.id,
            type: 'school' as const,
            label: `${school.code} · ${school.name}`,
            meta: { status: school.status, ownership: school.ownership },
          })),
        };
      }),
    };
  });
}

// Type alias used by verification service
type RecordStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'returned_for_correction'
  | 'verified'
  | 'approved'
  | 'published';
