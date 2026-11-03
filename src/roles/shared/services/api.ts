/**
 * Shared API services for the four role-based modules.
 *
 * Production integration: every service below resolves against the demo store
 * in src/roles/shared/services/mockData.ts. Replace the demo function bodies
 * with real `request()` calls against the PHP API once ready.
 *
 * Organizational scope: each service accepts an optional `scope` (regionId,
 * councilId, schoolId) so the frontend can scope requests to the authenticated
 * user's assigned organization. The PHP backend MUST independently enforce
 * scope on every endpoint — frontend scoping is a UX convenience only.
 */

import type {
  PaginationParams,
  PaginatedResponse,
  AcademicYear,
  EducationLevel,
  SchoolClass,
  Stream,
  Subject,
  School,
  Council,
  Region,
  Examination,
  MarksSubmission,
  User,
  Student,
  Teacher,
  SubjectAssignment,
  MarksEntrySession,
  MarkInput,
  RoleScope,
} from '../types';
import { demoStudents as seededStudents, demoTeachers as seededTeachers, demoSessions as seededSessions, demoMarks as seededMarks } from './mockData';
import {
  regionService,
  councilService,
  schoolService,
  userService,
  examinationService,
  submissionService,
  notificationService,
  announcementService,
  auditService,
  settingsService,
  request,
  authHeaders,
  resetDemoStore,
} from '../../super-admin/services/api';

const BASE = import.meta.env.VITE_API_URL || '/api';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Scope-aware wrapper: appends scope query params when provided. */
function scopeParams(scope?: RoleScope): Record<string, string> {
  const params: Record<string, string> = {};
  if (scope?.regionId) params.regionId = scope.regionId;
  if (scope?.councilId) params.councilId = scope.councilId;
  if (scope?.schoolId) params.schoolId = scope.schoolId;
  return params;
}

// -----------------------------------------------------------------------------
// Role-scoped organization services (delegate to super-admin store)
// -----------------------------------------------------------------------------

export const orgService = {
  listRegions: (params?: PaginationParams & { scope?: RoleScope }) =>
    regionService.list(params) as Promise<PaginatedResponse<Region>>,
  listCouncils: (params?: PaginationParams & { scope?: RoleScope }) =>
    councilService.list(params) as Promise<PaginatedResponse<Council>>,
  listSchools: (params?: PaginationParams & { scope?: RoleScope }) =>
    schoolService.list(params) as Promise<PaginatedResponse<School>>,
  getSchool: (id: string) => schoolService.get(id) as Promise<School | null>,
};

// -----------------------------------------------------------------------------
// Users scoped to role
// -----------------------------------------------------------------------------

export const roleUserService = {
  list: (params?: PaginationParams & { scope?: RoleScope }) =>
    userService.list(params) as Promise<PaginatedResponse<User>>,
  get: (id: string) => userService.get(id) as Promise<User | null>,
};

// -----------------------------------------------------------------------------
// Students (demo store + PHP-ready)
// -----------------------------------------------------------------------------

const demoStudents: Student[] = [...seededStudents];

export const studentService = {
  list: (params?: PaginationParams & { scope?: RoleScope }): Promise<PaginatedResponse<Student>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        let result = [...demoStudents];
        if (params?.search) {
          const q = params.search.toLowerCase();
          result = result.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              (s.regNo ?? '').toLowerCase().includes(q) ||
              (s.admissionNo ?? '').toLowerCase().includes(q)
          );
        }
        if (params?.scope?.schoolId) {
          result = result.filter((s) => s.schoolId === params.scope.schoolId);
        }
        const page = Math.max(1, params?.page ?? 1);
        const pageSize = Math.max(1, params?.pageSize ?? 25);
        const total = result.length;
        resolve({
          data: result.slice((page - 1) * pageSize, page * pageSize),
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        });
      }, 300);
    }),
  get: (id: string): Promise<Student | null> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(demoStudents.find((s) => s.id === id) ?? null), 300)
    ),
  create: (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const s: Student = { ...data, id: `student-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        demoStudents.push(s);
        resolve(s);
      }, 400);
    }),
  update: (id: string, data: Partial<Student>): Promise<Student | null> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const idx = demoStudents.findIndex((s) => s.id === id);
        if (idx === -1) return resolve(null);
        demoStudents[idx] = { ...demoStudents[idx], ...data, updatedAt: new Date().toISOString() };
        resolve(demoStudents[idx]);
      }, 400);
    }),
};

// -----------------------------------------------------------------------------
// Teachers
// -----------------------------------------------------------------------------

const demoTeachers: Teacher[] = [...seededTeachers];

export const teacherService = {
  list: (params?: PaginationParams & { scope?: RoleScope }): Promise<PaginatedResponse<Teacher>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        let result = [...demoTeachers];
        if (params?.scope?.schoolId) {
          result = result.filter((t) => t.schoolId === params.schoolId);
        }
        const page = Math.max(1, params?.page ?? 1);
        const pageSize = Math.max(1, params?.pageSize ?? 25);
        const total = result.length;
        resolve({
          data: result.slice((page - 1) * pageSize, page * pageSize),
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        });
      }, 300);
    }),
  get: (id: string): Promise<Teacher | null> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(demoTeachers.find((t) => t.id === id) ?? null), 300)
    ),
  create: (data: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>): Promise<Teacher> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const t: Teacher = {
          ...data,
          id: `teacher-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        demoTeachers.push(t);
        resolve(t);
      }, 400);
    }),
};

// -----------------------------------------------------------------------------
// Classes & streams (school scoped)
// -----------------------------------------------------------------------------

export const classService = {
  list: (params?: PaginationParams & { scope?: RoleScope }) =>
    new Promise<PaginatedResponse<SchoolClassView>>((resolve) => {
      setTimeout(() => {
        const all: SchoolClassView[] = [
          { id: 'class-f1', educationLevelId: 'level-o', educationLevelName: 'O-Level', name: 'Form 1', code: 'F1', active: true },
          { id: 'class-f2', educationLevelId: 'level-o', educationLevelName: 'O-Level', name: 'Form 2', code: 'F2', active: true },
          { id: 'class-f3', educationLevelId: 'level-o', educationLevelName: 'O-Level', name: 'Form 3', code: 'F3', active: true },
          { id: 'class-f4', educationLevelId: 'level-o', educationLevelName: 'O-Level', name: 'Form 4', code: 'F4', active: true },
          { id: 'class-f5', educationLevelId: 'level-a', educationLevelName: 'A-Level', name: 'Form 5', code: 'F5', active: true },
          { id: 'class-f6', educationLevelId: 'level-a', educationLevelName: 'A-Level', name: 'Form 6', code: 'F6', active: true },
        ];
        resolve({ data: all, total: all.length, page: 1, pageSize: 25, totalPages: 1 });
      }, 300);
    }),
};

export const streamService = {
  list: (params?: PaginationParams & { scope?: RoleScope }) =>
    new Promise<PaginatedResponse<StreamView>>((resolve) => {
      setTimeout(() => {
        const all: StreamView[] = [
          { id: 'stream-a', classId: 'class-f4', className: 'Form 4', name: 'Stream A', code: 'F4A', active: true },
          { id: 'stream-b', classId: 'class-f4', className: 'Form 4', name: 'Stream B', code: 'F4B', active: true },
          { id: 'stream-c', classId: 'class-f6', className: 'Form 6', name: 'Stream A', code: 'F6A', active: true },
        ];
        resolve({ data: all, total: all.length, page: 1, pageSize: 25, totalPages: 1 });
      }, 300);
    }),
};

// -----------------------------------------------------------------------------
// Subjects & subject assignments
// -----------------------------------------------------------------------------

export const subjectService = {
  list: () =>
    new Promise<Subject[]>((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: 'sub-mat', code: 'MAT', name: 'Basic Mathematics', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: true, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-eng', code: 'ENG', name: 'English Language', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: true, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-kis', code: 'KIS', name: 'Kiswahili', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: true, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-bio', code: 'BIO', name: 'Biology', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: true, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-phy', code: 'PHY', name: 'Physics', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: false, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-chem', code: 'CHE', name: 'Chemistry', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: false, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-geo', code: 'GEO', name: 'Geography', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: false, maxMark: 100, status: 'active', createdAt: '' },
            { id: 'sub-his', code: 'HIS', name: 'History', educationLevelId: 'level-o', educationLevelName: 'O-Level', compulsory: false, maxMark: 100, status: 'active', createdAt: '' },
          ]),
        300
      )
    ),
};

export const subjectAssignmentService = {
  list: (params?: { scope?: RoleScope; classId?: string }): Promise<SubjectAssignment[]> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const all: SubjectAssignment[] = [
          { id: 'sa-1', subjectId: 'sub-mat', subjectCode: 'MAT', subjectName: 'Basic Mathematics', classId: 'class-f4', className: 'Form 4', teacherId: 't-1', teacherName: 'Elias Mrisho', academicYearId: 'year-2025', compulsory: true, active: true },
          { id: 'sa-2', subjectId: 'sub-eng', subjectCode: 'ENG', subjectName: 'English Language', classId: 'class-f4', className: 'Form 4', teacherId: 't-2', teacherName: 'Mwajuma Bakari', academicYearId: 'year-2025', compulsory: true, active: true },
          { id: 'sa-3', subjectId: 'sub-bio', subjectCode: 'BIO', subjectName: 'Biology', classId: 'class-f4', className: 'Form 4', streamId: 'stream-a', streamName: 'Stream A', teacherId: 't-1', teacherName: 'Elias Mrisho', academicYearId: 'year-2025', compulsory: true, active: true },
        ];
        let result = all;
        if (params?.classId) result = result.filter((a) => a.classId === params.classId);
        resolve(result);
      }, 300);
    }),
};

// -----------------------------------------------------------------------------
// Marks entry sessions
// -----------------------------------------------------------------------------

const demoSessions: MarksEntrySession[] = [...seededSessions];
const demoMarks: Record<string, MarkInput[]> = { ...seededMarks };

export const marksService = {
  listSessions: (params?: PaginationParams & { scope?: RoleScope }): Promise<PaginatedResponse<MarksEntrySession>> =>
    new Promise((resolve) => {
      setTimeout(() => {
        let result = [...demoSessions];
        if (params?.scope?.schoolId) {
          result = result.filter((s) => s.schoolId === params.scope.schoolId);
        }
        const page = Math.max(1, params?.page ?? 1);
        const pageSize = Math.max(1, params?.pageSize ?? 25);
        const total = result.length;
        resolve({
          data: result.slice((page - 1) * pageSize, page * pageSize),
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        });
      }, 350);
    }),
  getSession: (id: string): Promise<MarksEntrySession | null> =>
    new Promise((resolve) => setTimeout(() => resolve(demoSessions.find((s) => s.id === id) ?? null), 300)),
  getMarks: (sessionId: string): Promise<MarkInput[]> =>
    new Promise((resolve) => setTimeout(() => resolve(demoMarks[sessionId] ?? []), 300)),
  saveMarks: (sessionId: string, marks: MarkInput[]): Promise<{ saved: number }> =>
    new Promise((resolve) => {
      setTimeout(() => {
        demoMarks[sessionId] = marks;
        const session = demoSessions.find((s) => s.id === sessionId);
        if (session) {
          session.enteredCount = marks.filter((m) => typeof m.mark === 'number').length;
          session.missingCount = marks.filter((m) => typeof m.mark !== 'number').length;
          session.invalidCount = marks.filter((m) => !!m.error).length;
          session.updatedAt = new Date().toISOString();
        }
        resolve({ saved: marks.length });
      }, 500);
    }),
  submitSession: (sessionId: string): Promise<MarksEntrySession> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const session = demoSessions.find((s) => s.id === sessionId);
        if (session) {
          session.status = 'submitted';
          session.submittedAt = new Date().toISOString();
          session.updatedAt = new Date().toISOString();
          resolve(session);
        } else {
          resolve(session! as MarksEntrySession);
        }
      }, 600);
    }),
  createSession: (data: Omit<MarksEntrySession, 'id' | 'createdAt' | 'updatedAt' | ...(['totalStudents','enteredCount','submittedCount','missingCount','invalidCount'] as const)>): Promise<MarksEntrySession> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const s: MarksEntrySession = {
          ...data,
          id: `session-${Date.now()}`,
          totalStudents: data.totalStudents ?? 0,
          enteredCount: 0,
          submittedCount: 0,
          missingCount: data.totalStudents ?? 0,
          invalidCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        demoSessions.push(s);
        resolve(s);
      }, 400);
    }),
};

// -----------------------------------------------------------------------------
// Re-export super-admin services for shared use
// -----------------------------------------------------------------------------

export {
  regionService,
  councilService,
  schoolService,
  userService,
  examinationService,
  submissionService,
  notificationService,
  announcementService,
  auditService,
  settingsService,
  request,
  authHeaders,
  resetDemoStore,
};
