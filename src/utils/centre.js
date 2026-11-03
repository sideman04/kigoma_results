/**
 * Builds everything a NECTA-style "centre results" page needs from the raw
 * results. When your PHP API is ready, do this work in SQL/PHP and return the
 * same shape, then delete this file.
 */
import { RESULTS, SCHOOLS, SUBJECTS } from '../data/mock';
import { gradeFor } from './grading';

// Short subject names as shown on NECTA pages
export const SHORT = {
  CIV: 'CIV', HIS: 'HIST', GEO: 'GEO', KIS: 'KISW', ENG: 'ENGL',
  BIO: 'BIO', PHY: 'PHYS', CHE: 'CHEM', MAT: 'B/MATH',
};
export const DIVS = ['I', 'II', 'III', 'IV', '0'];

const absentAll = (r) => r.subjects.every((s) => s.mark === 'ABS');

function detailedSubjects(r) {
  return r.subjects
    .map((s) => {
      const g = s.mark === 'ABS' ? 'X' : typeof s.mark === 'number' ? s.grade : '*';
      return `${SHORT[s.code] || s.code} - '${g}'`;
    })
    .join('  ');
}

export function centreList() {
  return SCHOOLS.map((s) => ({ code: s.code, name: s.name, council: s.council, ownership: s.ownership }));
}

export function buildCentre(code) {
  const school = SCHOOLS.find((s) => s.code.toUpperCase() === String(code).toUpperCase());
  if (!school) return null;

  const rows = RESULTS.filter((r) => r.student.schoolId === school.id).sort((a, b) =>
    a.student.regNo.localeCompare(b.student.regNo)
  );

  const candidates = rows.map((r) => {
    const abs = absentAll(r);
    return {
      cno: r.student.regNo,
      sex: r.student.gender,
      aggt: abs || r.division === 'INC' ? '-' : r.points,
      div: abs ? 'ABS' : r.division,
      detail: abs ? '' : detailedSubjects(r),
    };
  });

  const sitting = rows.filter((r) => !absentAll(r));
  const countDiv = (list, d) => list.filter((r) => r.division === d && !absentAll(r)).length;

  const divisionSummary = ['F', 'M', 'T'].map((sex) => {
    const list = sex === 'T' ? rows : rows.filter((r) => r.student.gender === sex);
    return { sex, ...Object.fromEntries(DIVS.map((d) => [d, countDiv(list, d)])), INC: countDiv(list, 'INC') };
  });

  const registered = rows.length;
  const absent = registered - sitting.length;
  const summary = {
    registered,
    absent,
    sat: sitting.length,
    withheld: 0,
    noCa: 0,
    clean: sitting.length,
    ...Object.fromEntries(DIVS.map((d) => [d, countDiv(rows, d)])),
    INC: countDiv(rows, 'INC'),
  };

  const complete = sitting.filter((r) => r.division !== 'INC');
  const gpa = complete.length ? complete.reduce((a, r) => a + r.gpa, 0) / complete.length : 0;

  const subjects = SUBJECTS.map((sub) => {
    const marks = rows.map((r) => r.student.marks[sub.code] ?? null);
    const grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    marks.forEach((m) => {
      if (typeof m === 'number') grades[gradeFor(m).grade]++;
    });
    const sat = marks.filter((m) => typeof m === 'number').length;
    return {
      code: SHORT[sub.code] || sub.code,
      name: sub.name.toUpperCase(),
      reg: marks.length,
      sat,
      noCa: 0,
      withheld: 0,
      clean: sat,
      pass: sat - grades.F,
      grades,
    };
  });

  return { school, candidates, divisionSummary, summary, subjects, gpa: Math.round(gpa * 100) / 100 };
}
