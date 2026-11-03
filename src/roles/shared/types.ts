/**
 * Role-scoped domain types for the four administrator/teacher modules.
 * These extend the shared Super Administrator types in src/super-admin/types.
 * All demo data is clearly labelled; production contracts come from the PHP API.
 */

import type {
  RoleId,
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
} from '../../super-admin/types';

// -----------------------------------------------------------------------------
// Shared role-scoped context
// -----------------------------------------------------------------------------

export interface RoleScope {
  role: RoleId;
  regionId?: string;
  councilId?: string;
  schoolId?: string;
  regionName?: string;
  councilName?: string;
  schoolName?: string;
}

// -----------------------------------------------------------------------------
// Students
// -----------------------------------------------------------------------------

export type Gender = 'M' | 'F';

export interface Student {
  id: string;
  admissionNo?: string;
  regNo?: string; // NECTA index number where assigned
  name: string;
  gender: Gender;
  dateOfBirth?: string;
  schoolId: string;
  schoolName?: string;
  classId?: string;
  className?: string;
  streamId?: string;
  streamName?: string;
  educationLevel?: 'o_level' | 'a_level';
  combination?: string;
  status: 'active' | 'withdrawn' | 'transferred';
  createdAt: string;
  updatedAt: string;
}

export interface StudentEnrolment {
  id: string;
  studentId: string;
  schoolId: string;
  classId: string;
  streamId?: string;
  academicYearId: string;
  enrolledAt: string;
}

// -----------------------------------------------------------------------------
// Teachers / staff
// -----------------------------------------------------------------------------

export interface Teacher {
  id: string;
  employeeNo?: string;
  name: string;
  email?: string;
  phone?: string;
  schoolId: string;
  schoolName?: string;
  subjects: string[]; // subject ids
  classes: string[]; // class ids
  status: 'active' | 'inactive' | 'on_leave';
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------------------------
// Classes & streams (school-scoped view)
// -----------------------------------------------------------------------------

export interface SchoolClassView extends SchoolClass {
  studentCount?: number;
  streamCount?: number;
  teacherCount?: number;
}

export interface StreamView extends Stream {
  studentCount?: number;
  teacherCount?: number;
}

// -----------------------------------------------------------------------------
// Subject assignment (school level)
// -----------------------------------------------------------------------------

export interface SubjectAssignment {
  id: string;
  subjectId: string;
  subjectCode?: string;
  subjectName?: string;
  classId: string;
  className?: string;
  streamId?: string;
  streamName?: string;
  teacherId?: string;
  teacherName?: string;
  academicYearId: string;
  compulsory: boolean;
  active: boolean;
}

// -----------------------------------------------------------------------------
// Marks entry
// -----------------------------------------------------------------------------

export type MarkEntryStatus = 'draft' | 'entered' | 'submitted' | 'returned' | 'verified';

export interface MarkInput {
  studentId: string;
  studentName: string;
  regNo?: string;
  mark?: number | null;
  status: MarkEntryStatus;
  error?: string;
}

export interface MarksEntrySession {
  id: string;
  examinationId: string;
  examinationName?: string;
  schoolId: string;
  classId: string;
  className?: string;
  streamId?: string;
  streamName?: string;
  subjectId: string;
  subjectName?: string;
  subjectCode?: string;
  teacherId: string;
  academicYearId: string;
  status: MarkEntryStatus;
  totalStudents: number;
  enteredCount: number;
  submittedCount: number;
  missingCount: number;
  invalidCount: number;
  createdAt: string;
  submittedAt?: string;
  updatedAt: string;
}

export interface MarkValidationRule {
  maxMark: number;
  minMark: number;
  allowDecimals: boolean;
}

// -----------------------------------------------------------------------------
// Results / student performance
// -----------------------------------------------------------------------------

export interface StudentResult {
  studentId: string;
  studentName: string;
  regNo?: string;
  className?: string;
  streamName?: string;
  subjectCode?: string;
  subjectName?: string;
  mark?: number;
  grade?: string;
  points?: number;
  status: MarkEntryStatus;
}

// -----------------------------------------------------------------------------
// Performance / analytics (role-scoped)
// -----------------------------------------------------------------------------

export interface ClassPerformance {
  classId: string;
  className: string;
  streamName?: string;
  candidates: number;
  averageMarks: number;
  gpa: number;
  passRate: number;
  rank: number;
}

export interface SubjectPerformance {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  candidates: number;
  averageMarks: number;
  passRate: number;
  meanGrade?: string;
}

// -----------------------------------------------------------------------------
// Role-aware navigation
// -----------------------------------------------------------------------------

export interface RoleNavItem {
  to: string;
  label: string;
  icon: string;
  exact?: boolean;
  roles?: RoleId[];
}

export interface RoleNavGroup {
  label: string;
  items: RoleNavItem[];
}

// -----------------------------------------------------------------------------
// Re-export common types for convenience
// -----------------------------------------------------------------------------

export type {
  PaginationParams,
  PaginatedResponse,
  RoleId,
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
};
