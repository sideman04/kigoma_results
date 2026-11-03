/**
 * DEMO / MOCK DATA ONLY for the four role-based modules.
 *
 * All names, schools, people, marks and events are fictional. Used so the
 * Regional, Council, School and Teacher screens can be demonstrated without a
 * backend. When the PHP/MariaDB API is ready, replace each service body with a
 * real `request()` call.
 */

import type { Student, Teacher, MarksEntrySession, MarkInput } from '../types';

const iso = (offsetDays: number) =>
  new Date(Date.now() + offsetDays * 86400000).toISOString();

const SCHOOL_IDS = {
  lakeview: 'school-s0101',
  ujiji: 'school-s0102',
  mwandiga: 'school-s0201',
  kasulu: 'school-s0301',
  heri: 'school-s0302',
};

const CLASS_IDS = { f4: 'class-f4', f6: 'class-f6' };
const STREAM_IDS = { a: 'stream-a', b: 'stream-b', c: 'stream-c' };

export const demoStudents: Student[] = [
  // Lakeview Secondary - Form 4 Stream A
  { id: 'st-1', admissionNo: 'LV001', regNo: 'S0101/0001', name: 'Asha Ntibuka', gender: 'F', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-400), updatedAt: iso(-10) },
  { id: 'st-2', admissionNo: 'LV002', regNo: 'S0101/0002', name: 'Juma Kagoma', gender: 'M', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-400), updatedAt: iso(-10) },
  { id: 'st-3', admissionNo: 'LV003', regNo: 'S0101/0003', name: 'Rehema Bakari', gender: 'F', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-400), updatedAt: iso(-10) },
  { id: 'st-4', admissionNo: 'LV004', regNo: 'S0101/0004', name: 'Baraka Mrisho', gender: 'M', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.b, streamName: 'Stream B', educationLevel: 'o_level', status: 'active', createdAt: iso(-400), updatedAt: iso(-10) },
  { id: 'st-5', admissionNo: 'LV005', regNo: 'S0101/0005', name: 'Neema Sebastian', gender: 'F', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.b, streamName: 'Stream B', educationLevel: 'o_level', status: 'active', createdAt: iso(-400), updatedAt: iso(-10) },
  // Kasulu Town Secondary - Form 4
  { id: 'st-6', admissionNo: 'KT001', regNo: 'S0301/0001', name: 'Hamisi Rugemalila', gender: 'M', schoolId: SCHOOL_IDS.kasulu, schoolName: 'Kasulu Town Secondary', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-380), updatedAt: iso(-10) },
  { id: 'st-7', admissionNo: 'KT002', regNo: 'S0301/0002', name: 'Fatuma Ndayisenga', gender: 'F', schoolId: SCHOOL_IDS.kasulu, schoolName: 'Kasulu Town Secondary', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-380), updatedAt: iso(-10) },
  { id: 'st-8', admissionNo: 'KT003', regNo: 'S0301/0003', name: 'Emmanuel Masanja', gender: 'M', schoolId: SCHOOL_IDS.kasulu, schoolName: 'Kasulu Town Secondary', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.b, streamName: 'Stream B', educationLevel: 'o_level', status: 'active', createdAt: iso(-380), updatedAt: iso(-10) },
  // Heri Girls Secondary - Form 4
  { id: 'st-9', admissionNo: 'HG001', regNo: 'S0302/0001', name: 'Mwajuma Kabura', gender: 'F', schoolId: SCHOOL_IDS.heri, schoolName: 'Heri Girls Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-360), updatedAt: iso(-10) },
  { id: 'st-10', admissionNo: 'HG002', regNo: 'S0302/0002', name: 'Upendo Nsabi', gender: 'F', schoolId: SCHOOL_IDS.heri, schoolName: 'Heri Girls Secondary School', classId: CLASS_IDS.f4, className: 'Form 4', streamId: STREAM_IDS.a, streamName: 'Stream A', educationLevel: 'o_level', status: 'active', createdAt: iso(-360), updatedAt: iso(-10) },
];

export const demoTeachers: Teacher[] = [
  { id: 't-1', employeeNo: 'TCH001', name: 'Elias Mrisho', email: 'elias@lakeview.sch.tz', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', subjects: ['sub-mat', 'sub-bio'], classes: [CLASS_IDS.f4], status: 'active', createdAt: iso(-500), updatedAt: iso(-5) },
  { id: 't-2', employeeNo: 'TCH002', name: 'Mwajuma Bakari', email: 'mwajuma@lakeview.sch.tz', schoolId: SCHOOL_IDS.lakeview, schoolName: 'Lakeview Secondary School', subjects: ['sub-eng'], classes: [CLASS_IDS.f4], status: 'active', createdAt: iso(-500), updatedAt: iso(-5) },
  { id: 't-3', employeeNo: 'TCH003', name: 'Hamisi Ntibuka', email: 'hamisi@kasulutown.sch.tz', schoolId: SCHOOL_IDS.kasulu, schoolName: 'Kasulu Town Secondary', subjects: ['sub-mat', 'sub-phy'], classes: [CLASS_IDS.f4], status: 'active', createdAt: iso(-480), updatedAt: iso(-8) },
  { id: 't-4', employeeNo: 'TCH004', name: 'Neema Kabura', email: 'neema@herigirls.sch.tz', schoolId: SCHOOL_IDS.heri, schoolName: 'Heri Girls Secondary School', subjects: ['sub-bio', 'sub-eng'], classes: [CLASS_IDS.f4], status: 'active', createdAt: iso(-460), updatedAt: iso(-6) },
];

export const demoSessions: MarksEntrySession[] = [
  {
    id: 'session-1',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: SCHOOL_IDS.lakeview,
    classId: CLASS_IDS.f4,
    className: 'Form 4',
    streamId: STREAM_IDS.a,
    streamName: 'Stream A',
    subjectId: 'sub-mat',
    subjectName: 'Basic Mathematics',
    subjectCode: 'MAT',
    teacherId: 't-1',
    academicYearId: 'year-2025',
    status: 'submitted',
    totalStudents: 5,
    enteredCount: 5,
    submittedCount: 5,
    missingCount: 0,
    invalidCount: 0,
    createdAt: iso(-15),
    submittedAt: iso(-5),
    updatedAt: iso(-5),
  },
  {
    id: 'session-2',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: SCHOOL_IDS.lakeview,
    classId: CLASS_IDS.f4,
    className: 'Form 4',
    streamId: STREAM_IDS.b,
    streamName: 'Stream B',
    subjectId: 'sub-mat',
    subjectName: 'Basic Mathematics',
    subjectCode: 'MAT',
    teacherId: 't-1',
    academicYearId: 'year-2025',
    status: 'draft',
    totalStudents: 5,
    enteredCount: 3,
    submittedCount: 0,
    missingCount: 2,
    invalidCount: 0,
    createdAt: iso(-3),
    updatedAt: iso(-1),
  },
  {
    id: 'session-3',
    examinationId: 'exam-1',
    examinationName: 'CSEE 2025',
    schoolId: SCHOOL_IDS.kasulu,
    classId: CLASS_IDS.f4,
    className: 'Form 4',
    streamId: STREAM_IDS.a,
    streamName: 'Stream A',
    subjectId: 'sub-eng',
    subjectName: 'English Language',
    subjectCode: 'ENG',
    teacherId: 't-3',
    academicYearId: 'year-2025',
    status: 'returned',
    totalStudents: 8,
    enteredCount: 8,
    submittedCount: 0,
    missingCount: 0,
    invalidCount: 2,
    createdAt: iso(-10),
    submittedAt: iso(-6),
    updatedAt: iso(-2),
  },
];

export const demoMarks: Record<string, MarkInput[]> = {
  'session-1': [
    { studentId: 'st-1', studentName: 'Asha Ntibuka', regNo: 'S0101/0001', mark: 78, status: 'submitted' },
    { studentId: 'st-2', studentName: 'Juma Kagoma', regNo: 'S0101/0002', mark: 64, status: 'submitted' },
    { studentId: 'st-3', studentName: 'Rehema Bakari', regNo: 'S0101/0003', mark: 89, status: 'submitted' },
    { studentId: 'st-4', studentName: 'Baraka Mrisho', regNo: 'S0101/0004', mark: 52, status: 'submitted' },
    { studentId: 'st-5', studentName: 'Neema Sebastian', regNo: 'S0101/0005', mark: 71, status: 'submitted' },
  ],
  'session-2': [
    { studentId: 'st-1', studentName: 'Asha Ntibuka', regNo: 'S0101/0001', mark: 80, status: 'entered' },
    { studentId: 'st-2', studentName: 'Juma Kagoma', regNo: 'S0101/0002', mark: null, status: 'draft' },
    { studentId: 'st-3', studentName: 'Rehema Bakari', regNo: 'S0101/0003', mark: 90, status: 'entered' },
    { studentId: 'st-4', studentName: 'Baraka Mrisho', regNo: 'S0101/0004', mark: null, status: 'draft' },
    { studentId: 'st-5', studentName: 'Neema Sebastian', regNo: 'S0101/0005', mark: 68, status: 'entered' },
  ],
  'session-3': [
    { studentId: 'st-6', studentName: 'Hamisi Rugemalila', regNo: 'S0301/0001', mark: 45, status: 'returned', error: 'Below pass threshold - review required' },
    { studentId: 'st-7', studentName: 'Fatuma Ndayisenga', regNo: 'S0301/0002', mark: 67, status: 'returned' },
    { studentId: 'st-8', studentName: 'Emmanuel Masisha', regNo: 'S0301/0003', mark: 105, status: 'returned', error: 'Exceeds maximum mark of 100' },
  ],
};

export const demoRoleUsers = [
  {
    id: 'user-regional',
    username: 'regional',
    email: 'regional@kigoma-education.go.tz',
    fullName: 'Neema Kagoma',
    role: 'regional_admin' as const,
    status: 'active' as const,
    regionId: 'region-kigoma',
    regionName: 'Kigoma Region',
    lastLoginAt: iso(-1),
    loginCount: 86,
    createdAt: iso(-700),
    updatedAt: iso(-10),
    scopeLabel: 'Kigoma Region',
  },
  {
    id: 'user-council',
    username: 'kasulu',
    email: 'kasulu@kigoma-education.go.tz',
    fullName: 'Hamisi Ntibuka',
    role: 'council_admin' as const,
    status: 'active' as const,
    councilId: 'council-kasulu-tc',
    councilName: 'Kasulu TC',
    lastLoginAt: iso(-2),
    loginCount: 64,
    createdAt: iso(-650),
    updatedAt: iso(-15),
    scopeLabel: 'Kasulu TC',
  },
  {
    id: 'user-school',
    username: 'lakeview',
    email: 'lakeview@kigoma-education.go.tz',
    fullName: 'Mwajuma Bakari',
    role: 'school_admin' as const,
    status: 'active' as const,
    schoolId: SCHOOL_IDS.lakeview,
    schoolName: 'Lakeview Secondary School',
    lastLoginAt: iso(-0.8),
    loginCount: 120,
    createdAt: iso(-600),
    updatedAt: iso(-2),
    scopeLabel: 'Lakeview Secondary School',
  },
  {
    id: 'user-teacher',
    username: 'teacher',
    email: 'elias@lakeview.sch.tz',
    fullName: 'Elias Mrisho',
    role: 'teacher' as const,
    status: 'active' as const,
    schoolId: SCHOOL_IDS.lakeview,
    schoolName: 'Lakeview Secondary School',
    lastLoginAt: iso(-3),
    loginCount: 210,
    createdAt: iso(-550),
    updatedAt: iso(-20),
    scopeLabel: 'Lakeview Secondary School',
  },
];
