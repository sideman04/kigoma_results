/**
 * Domain types for the Super Administrator control panel.
 * These mirror the organisational hierarchy and business entities used by the
 * PHP/MariaDB backend. Demo/mock services use these shapes; the real API will
 * return the same contracts once integrated.
 */

// -----------------------------------------------------------------------------
// Base / common
// -----------------------------------------------------------------------------

export type RoleId =
  | 'super_admin'
  | 'regional_admin'
  | 'council_admin'
  | 'school_admin'
  | 'teacher';

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError extends Error {
  status?: number;
  message: string;
}

export interface LookupOption {
  value: string | number;
  label: string;
}

// -----------------------------------------------------------------------------
// Organisation
// -----------------------------------------------------------------------------

export interface Region {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Council {
  id: string;
  regionId: string;
  regionName?: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface School {
  id: string;
  code: string;
  name: string;
  regionId: string;
  councilId: string;
  regionName?: string;
  councilName?: string;
  ownership: 'government' | 'private' | 'faith_based' | 'community';
  educationLevel: 'o_level' | 'a_level' | 'both';
  status: 'active' | 'inactive';
  phone?: string;
  email?: string;
  address?: string;
  headteacherName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganisationNode {
  id: string;
  type: 'region' | 'council' | 'school';
  label: string;
  children?: OrganisationNode[];
  meta?: Record<string, string | number>;
}

// -----------------------------------------------------------------------------
// Users, roles, permissions
// -----------------------------------------------------------------------------

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: RoleId;
  status: 'active' | 'inactive' | 'suspended';
  regionId?: string;
  councilId?: string;
  schoolId?: string;
  regionName?: string;
  councilName?: string;
  schoolName?: string;
  lastLoginAt?: string;
  loginCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  slug: RoleId;
  description: string;
  system: boolean;
  createdAt: string;
}

export interface Permission {
  id: string;
  category: string;
  name: string;
  action: 'view' | 'create' | 'edit' | 'delete' | 'submit' | 'verify' | 'approve' | 'publish' | 'export';
  description: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  granted: boolean;
}

export interface UserAssignment {
  userId: string;
  userName: string;
  role: RoleId;
  regionId?: string;
  councilId?: string;
  schoolId?: string;
}

// -----------------------------------------------------------------------------
// Academic configuration
// -----------------------------------------------------------------------------

export interface AcademicYear {
  id: string;
  name: string;
  label: string;
  status: 'active' | 'historical' | 'upcoming';
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface EducationLevel {
  id: string;
  name: string;
  code: 'o_level' | 'a_level';
  description?: string;
  active: boolean;
  createdAt: string;
}

export interface SchoolClass {
  id: string;
  educationLevelId: string;
  educationLevelName?: string;
  name: string; // e.g. Form 4, Form 6
  code: string;
  active: boolean;
}

export interface Stream {
  id: string;
  classId: string;
  className?: string;
  name: string; // e.g. Stream A, Stream B
  code: string;
  active: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  educationLevelId?: string;
  educationLevelName?: string;
  compulsory: boolean;
  maxMark: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface SubjectCombination {
  id: string;
  name: string; // e.g. PCM, PCB
  educationLevelId: string;
  educationLevelName?: string;
  subjectIds: string[];
  subjectCodes?: string[];
  status: 'active' | 'inactive';
}

// -----------------------------------------------------------------------------
// Examinations
// -----------------------------------------------------------------------------

export type ExamType = 'csee' | 'acsee' | 'mock' | 'terminal';

export interface Examination {
  id: string;
  code: string;
  name: string;
  type: ExamType;
  academicYearId: string;
  academicYearName?: string;
  educationLevelId: string;
  educationLevelName?: string;
  status: 'draft' | 'open' | 'closed' | 'archived';
  marksSubmissionOpen: boolean;
  startDate?: string;
  endDate?: string;
  participatingSchoolCount: number;
  submissionCount: number;
  pendingCount: number;
  verifiedCount: number;
  approvedCount: number;
  publishedCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExaminationDetail extends Examination {
  subjects: Subject[];
  schools: School[];
}

// -----------------------------------------------------------------------------
// Marks submission monitoring
// -----------------------------------------------------------------------------

export type SubmissionStatus = 'not_started' | 'partial' | 'submitted' | 'verified' | 'returned';

export interface MarksSubmission {
  id: string;
  examinationId: string;
  examinationName?: string;
  schoolId: string;
  schoolName?: string;
  schoolCode?: string;
  regionId?: string;
  councilId?: string;
  classId?: string;
  className?: string;
  streamId?: string;
  streamName?: string;
  subjectId: string;
  subjectName?: string;
  subjectCode?: string;
  teacherId?: string;
  teacherName?: string;
  status: SubmissionStatus;
  submittedAt?: string;
  totalRecords: number;
  submittedRecords: number;
  missingRecords: number;
  validationIssues: number;
}

// -----------------------------------------------------------------------------
// Results processing & grading
// -----------------------------------------------------------------------------

export interface GradeBand {
  id: string;
  grade: string;
  label: string;
  minMark: number;
  maxMark: number;
  points: number;
  gpa: number;
  educationLevelId?: string;
  examinationTypeId?: string;
}

export interface DivisionRule {
  id: string;
  division: string;
  maxPoints: number;
  educationLevelId?: string;
}

export interface GradingPolicy {
  id: string;
  name: string;
  educationLevelId: string;
  educationLevelName?: string;
  maxMark: number;
  bestSubjects: number;
  gradeBands: GradeBand[];
  divisionRules: DivisionRule[];
  active: boolean;
}

export interface ProcessingRun {
  id: string;
  examinationId: string;
  examinationName?: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  candidates: number;
  processed: number;
  errors: number;
  missingData: number;
  startedAt?: string;
  completedAt?: string;
  errorSummary?: string;
}

// -----------------------------------------------------------------------------
// Verification / Approval / Publication
// -----------------------------------------------------------------------------

export type RecordStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'returned_for_correction'
  | 'verified'
  | 'approved'
  | 'published';

export interface VerificationItem {
  id: string;
  examinationId: string;
  examinationName?: string;
  schoolId: string;
  schoolName?: string;
  schoolCode?: string;
  candidateCount: number;
  status: RecordStatus;
  submittedAt?: string;
  verifiedAt?: string;
  approvedAt?: string;
  publishedAt?: string;
  validationExceptions: number;
  reviewerId?: string;
  reviewerName?: string;
}

export interface ApprovalHistory {
  id: string;
  examinationId: string;
  action: 'verified' | 'approved' | 'published' | 'returned' | 'suspended';
  performedBy: string;
  performedAt: string;
  note?: string;
}

export interface PublicationSummary {
  examination: string;
  year: string;
  educationLevel: string;
  participatingSchools: number;
  candidateCount: number;
  verificationStatus: string;
  approvalStatus: string;
  scope: string;
}

// -----------------------------------------------------------------------------
// Analytics / reports
// -----------------------------------------------------------------------------

export interface PerformancePoint {
  name: string;
  value: number;
  gpa?: number;
  passRate?: number;
  candidates?: number;
}

export interface SchoolPerformance {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  region: string;
  council: string;
  ownership: string;
  candidates: number;
  averageMarks: number;
  gpa: number;
  passRate: number;
  rank: number;
}

// -----------------------------------------------------------------------------
// Notifications / announcements
// -----------------------------------------------------------------------------

export interface Notification {
  id: string;
  title: string;
  message: string;
  category:
    | 'submission'
    | 'verification'
    | 'approval'
    | 'publication'
    | 'security'
    | 'system'
    | 'announcement';
  read: boolean;
  createdAt: string;
  link?: string;
  actorName?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  published: boolean;
  audience: 'all' | 'regional' | 'council' | 'school';
  createdAt: string;
  createdBy: string;
}

// -----------------------------------------------------------------------------
// Audit / security / backup
// -----------------------------------------------------------------------------

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: RoleId;
  action: string;
  module: string;
  recordReference?: string;
  timestamp: string;
  regionId?: string;
  councilId?: string;
  schoolId?: string;
  ipAddress?: string;
  result: 'success' | 'failure';
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'failed_login' | 'suspension' | 'session' | 'security';
  userName?: string;
  ipAddress?: string;
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Backup {
  id: string;
  date: string;
  status: 'success' | 'failed' | 'in_progress';
  type: 'full' | 'incremental';
  size: string;
  fileName: string;
  restorePoint: boolean;
}

export interface SystemSettings {
  institutionName: string;
  systemName: string;
  logoUrl?: string;
  academicYearId?: string;
  gradingPolicyId?: string;
  publicationEnabled: boolean;
  notificationsEnabled: boolean;
  sessionTimeoutMinutes: number;
  passwordMinLength: number;
}

// -----------------------------------------------------------------------------
// Demo markers
// -----------------------------------------------------------------------------

export interface DemoRecord {
  _demo: true;
}

/** Marks a value as demo-only so it can be clearly separated from real API data. */
export const demo = <T>(value: T): T & DemoRecord => ({ ...value, _demo: true } as unknown as T & DemoRecord);
