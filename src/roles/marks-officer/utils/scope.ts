/**
 * Marks Entry Officer scope helpers.
 *
 * An officer may be assigned to a whole region, a council, or a single school /
 * examination centre. These helpers resolve the set of school ids the officer
 * can process marks for on the frontend. The backend must enforce the same
 * scope on every request.
 */

import type { School } from '../../shared/types';

export function resolveOfficerSchoolIds(user: any, schools: School[]): string[] {
  if (!user) return [];
  if (user.schoolId) return [user.schoolId];
  if (Array.isArray(user.schoolIds) && user.schoolIds.length) return user.schoolIds;
  if (user.councilId) return schools.filter((school) => school.councilId === user.councilId).map((school) => school.id);
  if (user.regionId) return schools.filter((school) => school.regionId === user.regionId).map((school) => school.id);
  return schools.map((school) => school.id);
}

export function officerScopeLabel(user: any): string {
  if (!user) return 'Assigned scope';
  if (user.schoolName) return user.schoolName;
  if (user.councilName) return `${user.councilName} (all schools)`;
  if (user.regionName) return `${user.regionName} (all schools)`;
  return user.scopeLabel || 'Assigned scope';
}

export function inOfficerScope(studentSchoolId: string | undefined, schoolIds: string[]): boolean {
  if (!studentSchoolId) return false;
  return schoolIds.includes(studentSchoolId);
}
