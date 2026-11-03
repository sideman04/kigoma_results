/** Which schools can this user see? */
export function schoolsInScope(user, schools) {
  if (user.role === 'regional_admin') return schools;
  if (user.role === 'council_admin') return schools.filter((s) => s.council === user.council);
  return schools.filter((s) => s.id === user.schoolId);
}

export const ROLE_LABELS = {
  regional_admin: 'Regional admin',
  council_admin: 'Council admin',
  school_admin: 'School admin',
  teacher: 'Teacher',
};
