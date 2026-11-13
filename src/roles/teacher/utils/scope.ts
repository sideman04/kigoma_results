/**
 * Teacher scope helpers.
 *
 * The demo login user carries a numeric school id while the role services use
 * stable string school ids. This helper centralises that mapping and the
 * student query scope for the teacher workspace.
 */

import type { Student } from '../../shared/types';

const DEMO_SCHOOL_BY_NUMBER: Record<number, string> = {
  1: 'school-s0101',
  2: 'school-s0102',
  3: 'school-s0201',
  4: 'school-s0301',
  5: 'school-s0302',
  6: 'school-s0501',
  7: 'school-s0801',
  8: 'school-s0601',
};

export function resolveTeacherSchoolId(user: any): string {
  if (!user) return 'school-s0101';
  if (typeof user.schoolId === 'string' && user.schoolId.startsWith('school-')) return user.schoolId;
  if (typeof user.schoolId === 'number' && DEMO_SCHOOL_BY_NUMBER[user.schoolId]) return DEMO_SCHOOL_BY_NUMBER[user.schoolId]!;
  return 'school-s0101';
}

export function resolveTeacherSchoolName(user: any): string {
  return user?.schoolName || 'Lakeview Secondary School';
}

export function isTeacherStudent(student: Student, user: any): boolean {
  return student.schoolId === resolveTeacherSchoolId(user);
}

export function fullName(student: Pick<Student, 'name'>): string {
  return student.name;
}
