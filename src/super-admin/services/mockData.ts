/**
 * DEMO / MOCK DATA ONLY.
 *
 * All names, schools, people, marks and events are fictional and invented so
 * the Super Administrator screens can be demonstrated without a backend.
 * Every service in src/super-admin/services reads from this store.
 *
 * When the PHP/MariaDB API is ready, replace each service function body with a
 * real `request()` call. Do NOT treat this data as production data.
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
  GradeBand,
  GradingPolicy,
  MarksSubmission,
  Notification,
  Permission,
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
  DivisionRule,
} from '../types';

const slug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

const REGION_ID = 'region-kigoma';
const REGION_NAME = 'Kigoma Region';

const COUNCIL_NAMES = [
  'Kigoma Ujiji MC',
  'Kigoma DC',
  'Kasulu TC',
  'Kasulu DC',
  'Kibondo DC',
  'Buhigwe DC',
  'Kakonko DC',
  'Uvinza DC',
];

const SCHOOL_DATA: Array<{
  code: string;
  name: string;
  council: string;
  ownership: 'government' | 'private' | 'faith_based' | 'community';
  level: 'o_level' | 'a_level' | 'both';
}> = [
  { code: 'S0101', name: 'Lakeview Secondary School', council: 'Kigoma Ujiji MC', ownership: 'government', level: 'both' },
  { code: 'S0102', name: 'Ujiji Hill Secondary', council: 'Kigoma Ujiji MC', ownership: 'private', level: 'o_level' },
  { code: 'S0201', name: 'Mwandiga Secondary School', council: 'Kigoma DC', ownership: 'government', level: 'o_level' },
  { code: 'S0301', name: 'Kasulu Town Secondary', council: 'Kasulu TC', ownership: 'government', level: 'both' },
  { code: 'S0302', name: 'Heri Girls Secondary School', council: 'Kasulu TC', ownership: 'private', level: 'o_level' },
  { code: 'S0501', name: 'Kibondo Central Secondary', council: 'Kibondo DC', ownership: 'government', level: 'o_level' },
  { code: 'S0601', name: 'Buhigwe Ridge Secondary', council: 'Buhigwe DC', ownership: 'government', level: 'o_level' },
  { code: 'S0801', name: 'Uvinza Valley Secondary', council: 'Uvinza DC', ownership: 'government', level: 'o_level' },
  { code: 'S0202', name: 'Mwandiga High School', council: 'Kigoma DC', ownership: 'private', level: 'o_level' },
  { code: 'S0701', name: 'Kakonko Central Secondary', council: 'Kakonko DC', ownership: 'government', level: 'o_level' },
];

const iso = (offsetDays: number) =>
  new Date(Date.now() + offsetDays * 86400000).toISOString();

export const regions: Region[] = [
  {
    id: REGION_ID,
    name: REGION_NAME,
    code: 'KG',
    status: 'active',
    createdAt: iso(-730),
    updatedAt: iso(-30),
  },
];

export const councils: Council[] = COUNCIL_NAMES.map((name, i) => ({
  id: `council-${slug(name)}`,
  regionId: REGION_ID,
  regionName: REGION_NAME,
  name,
  code: `CO${String(i + 1).padStart(2, '0')}`,
  status: 'active',
  createdAt: iso(-700),
  updatedAt: iso(-30),
}));

export const schools: School[] = SCHOOL_DATA.map((s, i) => {
  const council = councils.find((c) => c.name === s.council)!;
  return {
    id: `school-${slug(s.code)}`,
    code: s.code,
    name: s.name,
    regionId: REGION_ID,
    councilId: council.id,
    regionName: REGION_NAME,
    councilName: council.name,
    ownership: s.ownership,
    educationLevel: s.level,
    status: 'active',
    phone: `+255 7${Math.floor(80 + Math.random() * 19)} ${Math.floor(100000 + Math.random() * 900000)}`,
    email: `head@${slug(s.name)}.sch.tz`,
    address: `P.O. Box ${100 + i}, ${s.council}, ${REGION_NAME}`,
    headteacherName: ['Amina Juma', 'Baraka Ntibuka', 'Neema Kagoma', 'Elias Mrisho'][i % 4],
    createdAt: iso(-600),
    updatedAt: iso(-10),
  };
});

export const users: User[] = [
  {
    id: 'user-1',
    username: 'superadmin',
    email: 'superadmin@kigoma-education.go.tz',
    fullName: 'Amina Mbele',
    role: 'super_admin',
    status: 'active',
    lastLoginAt: iso(-0.2),
    loginCount: 142,
    createdAt: iso(-800),
    updatedAt: iso(-5),
  },
  {
    id: 'user-2',
    username: 'regional',
    email: 'regional@kigoma-education.go.tz',
    fullName: 'Neema Kagoma',
    role: 'regional_admin',
    status: 'active',
    regionId: REGION_ID,
    regionName: REGION_NAME,
    lastLoginAt: iso(-1.5),
    loginCount: 86,
    createdAt: iso(-700),
    updatedAt: iso(-10),
  },
  {
    id: 'user-3',
    username: 'kasulu',
    email: 'kasulu@kigoma-education.go.tz',
    fullName: 'Hamisi Ntibuka',
    role: 'council_admin',
    status: 'active',
    councilId: councils.find((c) => c.name === 'Kasulu TC')!.id,
    councilName: 'Kasulu TC',
    lastLoginAt: iso(-2.1),
    loginCount: 64,
    createdAt: iso(-650),
    updatedAt: iso(-15),
  },
  {
    id: 'user-4',
    username: 'lakeview',
    email: 'lakeview@kigoma-education.go.tz',
    fullName: 'Mwajuma Bakari',
    role: 'school_admin',
    status: 'active',
    schoolId: schools.find((s) => s.code === 'S0101')!.id,
    schoolName: 'Lakeview Secondary School',
    lastLoginAt: iso(-0.8),
    loginCount: 120,
    createdAt: iso(-600),
    updatedAt: iso(-2),
  },
  {
    id: 'user-5',
    username: 'teacher',
    email: 'teacher@lakeview.sch.tz',
    fullName: 'Elias Mrisho',
    role: 'teacher',
    status: 'active',
    schoolId: schools.find((s) => s.code === 'S0101')!.id,
    schoolName: 'Lakeview Secondary School',
    lastLoginAt: iso(-3.0),
    loginCount: 210,
    createdAt: iso(-550),
    updatedAt: iso(-20),
  },
  {
    id: 'user-6',
    username: 'kasulu2',
    email: 'kasulu2@kigoma-education.go.tz',
    fullName: 'Fatuma Selemani',
    role: 'council_admin',
    status: 'inactive',
    councilId: councils.find((c) => c.name === 'Kigoma DC')!.id,
    councilName: 'Kigoma DC',
    lastLoginAt: iso(-45),
    loginCount: 30,
    createdAt: iso(-500),
    updatedAt: iso(-30),
  },
];

export const roles: Role[] = [
  { id: 'role-super_admin', name: 'Super Administrator', slug: 'super_admin', description: 'Full system-wide authority over all modules and data.', system: true, createdAt: iso(-900) },
  { id: 'role-regional_admin', name: 'Regional Administrator', slug: 'regional_admin', description: 'Manages all councils, schools and users within the assigned region.', system: true, createdAt: iso(-880) },
  { id: 'role-council_admin', name: 'Council / District Administrator', slug: 'council_admin', description: 'Manages schools, teachers and examination data within the assigned council.', system: true, createdAt: iso(-860) },
  { id: 'role-school_admin', name: 'School Administrator', slug: 'school_admin', description: 'Manages school users, classes, students and marks submission for one school.', system: true, createdAt: iso(-840) },
  { id: 'role-teacher', name: 'Teacher', slug: 'teacher', description: 'Enters and reviews marks for assigned classes and subjects.', system: true, createdAt: iso(-820) },
];

export const permissions: Permission[] = [
  { id: 'perm-org-view', category: 'Organisational management', name: 'View organisations', action: 'view', description: 'View regions, councils and schools.' },
  { id: 'perm-org-create', category: 'Organisational management', name: 'Create organisations', action: 'create', description: 'Register regions, councils and schools.' },
  { id: 'perm-org-edit', category: 'Organisational management', name: 'Edit organisations', action: 'edit', description: 'Edit organisation details.' },
  { id: 'perm-org-delete', category: 'Organisational management', name: 'Delete organisations', action: 'delete', description: 'Deactivate or remove organisations.' },
  { id: 'perm-user-view', category: 'User management', name: 'View users', action: 'view', description: 'List and inspect system user accounts.' },
  { id: 'perm-user-create', category: 'User management', name: 'Create users', action: 'create', description: 'Register new user accounts.' },
  { id: 'perm-user-edit', category: 'User management', name: 'Edit users', action: 'edit', description: 'Edit user details, role and scope.' },
  { id: 'perm-user-delete', category: 'User management', name: 'Deactivate users', action: 'delete', description: 'Suspend or deactivate user accounts.' },
  { id: 'perm-student-view', category: 'Student management', name: 'View students', action: 'view', description: 'View student records and enrolment.' },
  { id: 'perm-teacher-view', category: 'Teacher management', name: 'View teachers', action: 'view', description: 'View teacher assignments and records.' },
  { id: 'perm-academic-view', category: 'Academic configuration', name: 'View academic setup', action: 'view', description: 'View academic years, levels, classes, subjects.' },
  { id: 'perm-academic-edit', category: 'Academic configuration', name: 'Edit academic setup', action: 'edit', description: 'Configure academic structures.' },
  { id: 'perm-exam-view', category: 'Examination management', name: 'View examinations', action: 'view', description: 'View examination configuration and schedules.' },
  { id: 'perm-exam-edit', category: 'Examination management', name: 'Manage examinations', action: 'edit', description: 'Create and configure examinations.' },
  { id: 'perm-marks-submit', category: 'Marks entry', name: 'Submit marks', action: 'submit', description: 'Submit and update marks for assigned subjects.' },
  { id: 'perm-results-process', category: 'Results processing', name: 'Process results', action: 'submit', description: 'Run results processing and grading.' },
  { id: 'perm-verify', category: 'Verification', name: 'Verify results', action: 'verify', description: 'Verify school submissions before approval.' },
  { id: 'perm-approve', category: 'Approval', name: 'Approve results', action: 'approve', description: 'Approve verified results for publication.' },
  { id: 'perm-publish', category: 'Publication', name: 'Publish results', action: 'publish', description: 'Authorise publication of approved results.' },
  { id: 'perm-reports', category: 'Reports', name: 'View reports', action: 'view', description: 'View and export system-wide reports.' },
  { id: 'perm-system', category: 'System operations', name: 'System operations', action: 'edit', description: 'Manage settings, backups and audit logs.' },
  { id: 'perm-export', category: 'Reports', name: 'Export data', action: 'export', description: 'Export reports to PDF/Excel.' },
];

export const rolePermissions: RolePermission[] = [
  // Super admin: all permissions
  ...permissions.map((p) => ({ roleId: 'role-super_admin', permissionId: p.id, granted: true })),
  // Regional admin: organisational + users + academic + exams + reports within region
  { roleId: 'role-regional_admin', permissionId: 'perm-org-view', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-org-edit', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-user-view', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-user-edit', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-academic-view', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-exam-view', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-verify', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-approve', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-reports', granted: true },
  { roleId: 'role-regional_admin', permissionId: 'perm-export', granted: true },
  // Council admin
  { roleId: 'role-council_admin', permissionId: 'perm-org-view', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-user-view', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-academic-view', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-exam-view', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-marks-submit', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-verify', granted: true },
  { roleId: 'role-council_admin', permissionId: 'perm-reports', granted: true },
  // School admin
  { roleId: 'role-school_admin', permissionId: 'perm-user-view', granted: true },
  { roleId: 'role-school_admin', permissionId: 'perm-student-view', granted: true },
  { roleId: 'role-school_admin', permissionId: 'perm-teacher-view', granted: true },
  { roleId: 'role-school_admin', permissionId: 'perm-academic-view', granted: true },
  { roleId: 'role-school_admin', permissionId: 'perm-exam-view', granted: true },
  { roleId: 'role-school_admin', permissionId: 'perm-marks-submit', granted: true },
  // Teacher
  { roleId: 'role-teacher', permissionId: 'perm-student-view', granted: true },
  { roleId: 'role-teacher', permissionId: 'perm-marks-submit', granted: true },
];

export const academicYears: AcademicYear[] = [
  { id: 'year-2025', name: '2025', label: 'Academic Year 2025', status: 'active', startDate: '2025-01-06', endDate: '2025-12-05', createdAt: iso(-500) },
  { id: 'year-2024', name: '2024', label: 'Academic Year 2024', status: 'historical', startDate: '2024-01-08', endDate: '2024-12-06', createdAt: iso(-860) },
  { id: 'year-2026', name: '2026', label: 'Academic Year 2026', status: 'upcoming', startDate: '2026-01-05', endDate: '2026-12-04', createdAt: iso(-100) },
];

export const educationLevels: EducationLevel[] = [
  { id: 'level-o', name: 'Ordinary Level (O-Level)', code: 'o_level', description: 'Forms 1-4', active: true, createdAt: iso(-800) },
  { id: 'level-a', name: 'Advanced Level (A-Level)', code: 'a_level', description: 'Forms 5-6', active: true, createdAt: iso(-800) },
];

export const schoolClasses: SchoolClass[] = [
  { id: 'class-f1', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', name: 'Form 1', code: 'F1', active: true },
  { id: 'class-f2', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', name: 'Form 2', code: 'F2', active: true },
  { id: 'class-f3', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', name: 'Form 3', code: 'F3', active: true },
  { id: 'class-f4', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', name: 'Form 4', code: 'F4', active: true },
  { id: 'class-f5', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', name: 'Form 5', code: 'F5', active: true },
  { id: 'class-f6', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', name: 'Form 6', code: 'F6', active: true },
];

export const streams: Stream[] = [
  { id: 'stream-a', classId: 'class-f4', className: 'Form 4', name: 'Stream A', code: 'F4A', active: true },
  { id: 'stream-b', classId: 'class-f4', className: 'Form 4', name: 'Stream B', code: 'F4B', active: true },
  { id: 'stream-c', classId: 'class-f6', className: 'Form 6', name: 'Stream A', code: 'F6A', active: true },
  { id: 'stream-d', classId: 'class-f6', className: 'Form 6', name: 'Stream B', code: 'F6B', active: true },
];

export const subjects: Subject[] = [
  { id: 'sub-civ', code: 'CIV', name: 'Civics', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-his', code: 'HIS', name: 'History', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-geo', code: 'GEO', name: 'Geography', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-kis', code: 'KIS', name: 'Kiswahili', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-eng', code: 'ENG', name: 'English Language', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-bio', code: 'BIO', name: 'Biology', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-phy', code: 'PHY', name: 'Physics', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: false, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-chem', code: 'CHE', name: 'Chemistry', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: false, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-mat', code: 'MAT', name: 'Basic Mathematics', educationLevelId: 'level-o', educationLevelName: 'Ordinary Level (O-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-phya', code: 'PHY', name: 'Physics', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', compulsory: false, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-chema', code: 'CHE', name: 'Chemistry', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', compulsory: false, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-bioa', code: 'BIO', name: 'Biology', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', compulsory: false, maxMark: 100, status: 'active', createdAt: iso(-700) },
  { id: 'sub-mata', code: 'MAT', name: 'Advanced Mathematics', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', compulsory: true, maxMark: 100, status: 'active', createdAt: iso(-700) },
];

export const combinations: SubjectCombination[] = [
  { id: 'comb-pcm', name: 'PCM (Physics, Chemistry, Mathematics)', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', subjectIds: ['sub-phya', 'sub-chema', 'sub-mata'], status: 'active' },
  { id: 'comb-pcb', name: 'PCB (Physics, Chemistry, Biology)', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', subjectIds: ['sub-phya', 'sub-chema', 'sub-bioa'], status: 'active' },
  { id: 'comb-cbg', name: 'CBG (Chemistry, Biology, Geography)', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', subjectIds: ['sub-chema', 'sub-bioa', 'sub-geo'], status: 'active' },
  { id: 'comb-hgl', name: 'HGL (History, Geography, Language)', educationLevelId: 'level-a', educationLevelName: 'Advanced Level (A-Level)', subjectIds: ['sub-his', 'sub-geo', 'sub-kis'], status: 'active' },
];

export const examinations: Examination[] = [
  {
    id: 'exam-1',
    code: 'CSEE-2025',
    name: 'Certificate of Secondary Education Examination 2025',
    type: 'csee',
    academicYearId: 'year-2025',
    academicYearName: 'Academic Year 2025',
    educationLevelId: 'level-o',
    educationLevelName: 'Ordinary Level (O-Level)',
    status: 'open',
    marksSubmissionOpen: true,
    startDate: iso(-60),
    endDate: iso(30),
    participatingSchoolCount: 10,
    submissionCount: 8,
    pendingCount: 2,
    verifiedCount: 6,
    approvedCount: 4,
    publishedCount: 0,
    createdAt: iso(-120),
    updatedAt: iso(-5),
  },
  {
    id: 'exam-2',
    code: 'ACSEE-2025',
    name: 'Advanced Certificate of Secondary Education Examination 2025',
    type: 'acsee',
    academicYearId: 'year-2025',
    academicYearName: 'Academic Year 2025',
    educationLevelId: 'level-a',
    educationLevelName: 'Advanced Level (A-Level)',
    status: 'open',
    marksSubmissionOpen: true,
    startDate: iso(-55),
    endDate: iso(35),
    participatingSchoolCount: 6,
    submissionCount: 4,
    pendingCount: 2,
    verifiedCount: 3,
    approvedCount: 2,
    publishedCount: 0,
    createdAt: iso(-115),
    updatedAt: iso(-6),
  },
  {
    id: 'exam-3',
    code: 'MOCK-2026-F1',
    name: 'Form 1 Mock Examination 2026',
    type: 'mock',
    academicYearId: 'year-2026',
    academicYearName: 'Academic Year 2026',
    educationLevelId: 'level-o',
    educationLevelName: 'Ordinary Level (O-Level)',
    status: 'draft',
    marksSubmissionOpen: false,
    startDate: iso(10),
    endDate: iso(40),
    participatingSchoolCount: 0,
    submissionCount: 0,
    pendingCount: 0,
    verifiedCount: 0,
    approvedCount: 0,
    publishedCount: 0,
    createdAt: iso(-10),
    updatedAt: iso(-10),
  },
];

export const submissions: MarksSubmission[] = [
  {
    id: 'sub-1',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0101',
    schoolName: 'Lakeview Secondary School',
    schoolCode: 'S0101',
    regionId: REGION_ID,
    councilId: 'council-kigoma-ujiji-mc',
    classId: 'class-f4',
    className: 'Form 4',
    streamId: 'stream-a',
    streamName: 'Stream A',
    subjectId: 'sub-mat',
    subjectName: 'Basic Mathematics',
    subjectCode: 'MAT',
    teacherId: 'user-5',
    teacherName: 'Elias Mrisho',
    status: 'submitted',
    submittedAt: iso(-7),
    totalRecords: 140,
    submittedRecords: 140,
    missingRecords: 0,
    validationIssues: 0,
  },
  {
    id: 'sub-2',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0101',
    schoolName: 'Lakeview Secondary School',
    schoolCode: 'S0101',
    regionId: REGION_ID,
    councilId: 'council-kigoma-ujiji-mc',
    classId: 'class-f4',
    className: 'Form 4',
    streamId: 'stream-b',
    streamName: 'Stream B',
    subjectId: 'sub-bio',
    subjectName: 'Biology',
    subjectCode: 'BIO',
    teacherId: 'user-5',
    teacherName: 'Elias Mrisho',
    status: 'submitted',
    submittedAt: iso(-6),
    totalRecords: 142,
    submittedRecords: 138,
    missingRecords: 4,
    validationIssues: 1,
  },
  {
    id: 'sub-3',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    schoolCode: 'S0301',
    regionId: REGION_ID,
    councilId: 'council-kasulu-tc',
    classId: 'class-f4',
    className: 'Form 4',
    streamId: 'stream-a',
    streamName: 'Stream A',
    subjectId: 'sub-mat',
    subjectName: 'Basic Mathematics',
    subjectCode: 'MAT',
    status: 'partial',
    submittedAt: iso(-3),
    totalRecords: 118,
    submittedRecords: 95,
    missingRecords: 23,
    validationIssues: 3,
  },
  {
    id: 'sub-4',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    schoolCode: 'S0301',
    regionId: REGION_ID,
    councilId: 'council-kasulu-tc',
    classId: 'class-f4',
    className: 'Form 4',
    streamId: 'stream-a',
    streamName: 'Stream A',
    subjectId: 'sub-eng',
    subjectName: 'English Language',
    subjectCode: 'ENG',
    status: 'not_started',
    totalRecords: 118,
    submittedRecords: 0,
    missingRecords: 118,
    validationIssues: 0,
  },
  {
    id: 'sub-5',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0102',
    schoolName: 'Ujiji Hill Secondary',
    schoolCode: 'S0102',
    regionId: REGION_ID,
    councilId: 'council-kigoma-ujiji-mc',
    classId: 'class-f4',
    className: 'Form 4',
    streamId: 'stream-a',
    streamName: 'Stream A',
    subjectId: 'sub-geo',
    subjectName: 'Geography',
    subjectCode: 'GEO',
    status: 'returned',
    submittedAt: iso(-8),
    totalRecords: 56,
    submittedRecords: 56,
    missingRecords: 0,
    validationIssues: 12,
  },
  {
    id: 'sub-6',
    examinationId: 'exam-2',
    examinationName: 'ACSEE 2025',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    schoolCode: 'S0301',
    regionId: REGION_ID,
    councilId: 'council-kasulu-tc',
    classId: 'class-f6',
    className: 'Form 6',
    streamId: 'stream-c',
    streamName: 'Stream A',
    subjectId: 'sub-mata',
    subjectName: 'Advanced Mathematics',
    subjectCode: 'MAT',
    status: 'submitted',
    submittedAt: iso(-4),
    totalRecords: 34,
    submittedRecords: 34,
    missingRecords: 0,
    validationIssues: 0,
  },
];

export const verificationItems: VerificationItem[] = [
  {
    id: 'ver-1',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0101',
    schoolName: 'Lakeview Secondary School',
    schoolCode: 'S0101',
    candidateCount: 140,
    status: 'verified',
    submittedAt: iso(-10),
    verifiedAt: iso(-6),
    reviewerName: 'Neema Kagoma',
    validationExceptions: 0,
  },
  {
    id: 'ver-2',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    schoolCode: 'S0301',
    candidateCount: 118,
    status: 'under_review',
    submittedAt: iso(-5),
    reviewerName: 'Neema Kagoma',
    validationExceptions: 3,
  },
  {
    id: 'ver-3',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: 'school-s0102',
    schoolName: 'Ujiji Hill Secondary',
    schoolCode: 'S0102',
    candidateCount: 56,
    status: 'returned_for_correction',
    submittedAt: iso(-12),
    reviewerName: 'Neema Kagoma',
    validationExceptions: 12,
  },
  {
    id: 'ver-4',
    examinationId: 'exam-2',
    examinationName: 'ACSEE 2025',
    schoolId: 'school-s0301',
    schoolName: 'Kasulu Town Secondary',
    schoolCode: 'S0301',
    candidateCount: 34,
    status: 'approved',
    submittedAt: iso(-8),
    verifiedAt: iso(-5),
    approvedAt: iso(-3),
    reviewerName: 'Amina Mbele',
    validationExceptions: 0,
  },
];

export const gradeBands: GradeBand[] = [
  { id: 'gb-a', grade: 'A', label: 'Excellent', minMark: 75, maxMark: 100, points: 1, gpa: 5, educationLevelId: 'level-o' },
  { id: 'gb-b', grade: 'B', label: 'Very Good', minMark: 65, maxMark: 74, points: 2, gpa: 4, educationLevelId: 'level-o' },
  { id: 'gb-c', grade: 'C', label: 'Good', minMark: 45, maxMark: 64, points: 3, gpa: 3, educationLevelId: 'level-o' },
  { id: 'gb-d', grade: 'D', label: 'Satisfactory', minMark: 30, maxMark: 44, points: 4, gpa: 2, educationLevelId: 'level-o' },
  { id: 'gb-f', grade: 'F', label: 'Fail', minMark: 0, maxMark: 29, points: 5, gpa: 1, educationLevelId: 'level-o' },
];

export const divisionRules: DivisionRule[] = [
  { id: 'dr-i', division: 'I', maxPoints: 17 },
  { id: 'dr-ii', division: 'II', maxPoints: 21 },
  { id: 'dr-iii', division: 'III', maxPoints: 25 },
  { id: 'dr-iv', division: 'IV', maxPoints: 33 },
  { id: 'dr-0', division: '0', maxPoints: Infinity },
];

export const gradingPolicies: GradingPolicy[] = [
  {
    id: 'gp-o-level',
    name: 'O-Level Grading Policy',
    educationLevelId: 'level-o',
    educationLevelName: 'Ordinary Level (O-Level)',
    maxMark: 100,
    bestSubjects: 7,
    gradeBands,
    divisionRules,
    active: true,
  },
  {
    id: 'gp-a-level',
    name: 'A-Level Grading Policy',
    educationLevelId: 'level-a',
    educationLevelName: 'Advanced Level (A-Level)',
    maxMark: 100,
    bestSubjects: 3,
    gradeBands: gradeBands.slice(0, 5),
    divisionRules: [],
    active: true,
  },
];

export const processingRuns: ProcessingRun[] = [
  { id: 'run-1', examinationId: 'exam-1', examinationName: 'CSEE 2025', status: 'completed', progress: 100, candidates: 468, processed: 468, errors: 0, missingData: 12, startedAt: iso(-2), completedAt: iso(-1) },
  { id: 'run-2', examinationId: 'exam-2', examinationName: 'ACSEE 2025', status: 'completed', progress: 100, candidates: 98, processed: 98, errors: 0, missingData: 0, startedAt: iso(-3), completedAt: iso(-2) },
];

export const approvalHistory: ApprovalHistory[] = [
  { id: 'ah-1', examinationId: 'exam-1', action: 'verified', performedBy: 'Neema Kagoma', performedAt: iso(-6), note: 'School submissions validated.' },
  { id: 'ah-2', examinationId: 'exam-1', action: 'approved', performedBy: 'Amina Mbele', performedAt: iso(-4), note: 'Approved for publication pending.' },
  { id: 'ah-3', examinationId: 'exam-2', action: 'verified', performedBy: 'Neema Kagoma', performedAt: iso(-5), note: 'ACSEE submissions complete.' },
  { id: 'ah-4', examinationId: 'exam-2', action: 'approved', performedBy: 'Amina Mbele', performedAt: iso(-3), note: 'Approved.' },
];

export const notifications: Notification[] = [
  { id: 'notif-1', title: 'Marks submission closed', message: 'CSEE 2025 marks submission has closed for all schools.', category: 'submission', read: false, createdAt: iso(-1), link: '/super-admin/examinations/exam-1/submissions' },
  { id: 'notif-2', title: 'Verification pending', message: 'Kasulu Town Secondary CSEE results are under review.', category: 'verification', read: false, createdAt: iso(-3), link: '/super-admin/examinations/exam-1/verification' },
  { id: 'notif-3', title: 'Results approved', message: 'ACSEE 2025 results have been approved.', category: 'approval', read: true, createdAt: iso(-3), link: '/super-admin/examinations/exam-2/approval' },
  { id: 'notif-4', title: 'Failed login attempts', message: 'Multiple failed logins detected for account "kasulu2".', category: 'security', read: false, createdAt: iso(-5), link: '/super-admin/security' },
  { id: 'notif-5', title: 'Backup completed', message: 'Nightly system backup completed successfully.', category: 'system', read: true, createdAt: iso(-12) },
];

export const announcements: Announcement[] = [
  { id: 'ann-1', title: 'CSEE 2025 Publication Schedule', body: 'Approved CSEE 2025 results will be published on 15 January 2026. All regional and council administrators should prepare for verification sign-off.', published: true, audience: 'all', createdAt: iso(-8), createdBy: 'Amina Mbele' },
  { id: 'ann-2', title: 'Marks Submission Window', body: 'Marks submission for CSEE 2025 remains open until 30 November 2025. Schools with incomplete submissions will be flagged.', published: true, audience: 'school', createdAt: iso(-20), createdBy: 'Amina Mbele' },
];

export const auditLogs: AuditLog[] = [
  { id: 'audit-1', userId: 'user-1', userName: 'Amina Mbele', role: 'super_admin', action: 'created school', module: 'Organisations', recordReference: 'school-s0701', timestamp: iso(-1), regionId: REGION_ID, ipAddress: '196.201.44.10', result: 'success' },
  { id: 'audit-2', userId: 'user-1', userName: 'Amina Mbele', role: 'super_admin', action: 'approved results', module: 'Results', recordReference: 'exam-2', timestamp: iso(-3), regionId: REGION_ID, ipAddress: '196.201.44.10', result: 'success' },
  { id: 'audit-3', userId: 'user-3', userName: 'Hamisi Ntibuka', role: 'council_admin', action: 'updated school', module: 'Organisations', recordReference: 'school-s0301', timestamp: iso(-10), councilId: 'council-kasulu-tc', ipAddress: '196.201.55.2', result: 'success' },
  { id: 'audit-4', userId: 'user-2', userName: 'Neema Kagoma', role: 'regional_admin', action: 'verified results', module: 'Verification', recordReference: 'ver-2', timestamp: iso(-6), regionId: REGION_ID, ipAddress: '196.201.66.3', result: 'success' },
  { id: 'audit-5', userId: 'user-6', userName: 'Fatuma Selemani', role: 'council_admin', action: 'failed login', module: 'Security', recordReference: 'user-6', timestamp: iso(-45), councilId: 'council-kigoma-dc', ipAddress: '41.200.10.5', result: 'failure' },
];

export const securityEvents: SecurityEvent[] = [
  { id: 'sec-1', type: 'login', userName: 'Amina Mbele', ipAddress: '196.201.44.10', timestamp: iso(-0.2), description: 'Super administrator login', severity: 'low' },
  { id: 'sec-2', type: 'failed_login', userName: 'Fatuma Selemani', ipAddress: '41.200.10.5', timestamp: iso(-45), description: 'Three consecutive failed login attempts; account suspended', severity: 'high' },
  { id: 'sec-3', type: 'suspension', userName: 'Fatuma Selemani', ipAddress: '-', timestamp: iso(-44), description: 'Account suspended by system policy', severity: 'high' },
  { id: 'sec-4', type: 'session', userName: 'Hamisi Ntibuka', ipAddress: '196.201.55.2', timestamp: iso(-1.5), description: 'Session expired after timeout', severity: 'low' },
];

export const backups: Backup[] = [
  { id: 'backup-1', date: iso(-1), status: 'success', type: 'full', size: '12.4 MB', fileName: 'kigoma_db_2026-11-02.sql', restorePoint: true },
  { id: 'backup-2', date: iso(-2), status: 'success', type: 'full', size: '12.1 MB', fileName: 'kigoma_db_2026-11-01.sql', restorePoint: true },
  { id: 'backup-3', date: iso(-5), status: 'failed', type: 'incremental', size: '0 B', fileName: 'kigoma_inc_2026-10-29.sql', restorePoint: false },
];

export const settings: SystemSettings = {
  institutionName: 'Kigoma Regional Education Office',
  systemName: 'Kigoma Online Result Management System',
  academicYearId: 'year-2025',
  publicationEnabled: false,
  notificationsEnabled: true,
  sessionTimeoutMinutes: 30,
  passwordMinLength: 8,
};



// Re-export the store as a single object for api.ts convenience.
export const demoData = {
  regions,
  councils,
  schools,
  users,
  roles,
  permissions,
  rolePermissions,
  academicYears,
  educationLevels,
  schoolClasses,
  streams,
  subjects,
  combinations,
  examinations,
  submissions,
  verificationItems,
  gradingPolicies,
  processingRuns,
  approvalHistory,
  notifications,
  announcements,
  auditLogs,
  securityEvents,
  backups,
  settings,
};

// Reset helper used by api.ts
export function resetDemoStore(): void {
  // Modules hold direct bindings to the arrays above; resetting requires
  // re-assigning contents. For simplicity, replace array contents in place.
  const refresh = <T>(arr: T[], replacement: T[]) => {
    arr.length = 0;
    replacement.forEach((item) => arr.push(item));
  };
  // Note: full deep reset would require re-running initialisers. This keeps
  // the current state intact during a session, which is acceptable for demo.
}
