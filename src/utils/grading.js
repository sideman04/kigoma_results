/**
 * GRADING RULES
 * -------------
 * These values are a PLACEHOLDER based on the common O-level scale.
 * Confirm the official rules (grade boundaries, points, how many subjects
 * count, division limits) with the regional education office and change them
 * here only. Later, load this object from the database (System Settings).
 */
export const GRADING = {
  maxMark: 100,
  scale: [
    { grade: 'A', min: 75, points: 1, gpa: 5 },
    { grade: 'B', min: 65, points: 2, gpa: 4 },
    { grade: 'C', min: 45, points: 3, gpa: 3 },
    { grade: 'D', min: 30, points: 4, gpa: 2 },
    { grade: 'F', min: 0, points: 5, gpa: 1 },
  ],
  bestSubjects: 7,
  divisions: [
    { name: 'I', maxPoints: 17 },
    { name: 'II', maxPoints: 21 },
    { name: 'III', maxPoints: 25 },
    { name: 'IV', maxPoints: 33 },
    { name: '0', maxPoints: Infinity },
  ],
  passDivisions: ['I', 'II', 'III', 'IV'],
};

export function gradeFor(mark) {
  if (typeof mark !== 'number') return null;
  return GRADING.scale.find((g) => mark >= g.min) || null;
}

/** Checks one typed value. Returns { ok, value, error }. Empty is allowed (not entered yet). */
export function validateMark(raw) {
  const text = String(raw ?? '').trim();
  if (text === '') return { ok: true, value: null };
  if (!/^\d+(\.\d+)?$/.test(text)) {
    return { ok: false, value: null, error: 'Enter numbers only' };
  }
  const n = Number(text);
  if (n > GRADING.maxMark) {
    return { ok: false, value: null, error: `Maximum is ${GRADING.maxMark}` };
  }
  return { ok: true, value: n };
}

/**
 * subjectMarks: [{ code, name, mark }] where mark is a number, null (missing) or 'ABS' (absent)
 */
export function computeResult(subjectMarks) {
  const graded = subjectMarks
    .filter((s) => typeof s.mark === 'number')
    .map((s) => ({ ...s, ...gradeFor(s.mark) }));

  const total = graded.reduce((sum, s) => sum + s.mark, 0);
  const average = graded.length ? total / graded.length : 0;

  const best = [...graded].sort((a, b) => a.points - b.points || b.mark - a.mark).slice(0, GRADING.bestSubjects);
  const complete = best.length >= GRADING.bestSubjects;
  const points = best.reduce((sum, s) => sum + s.points, 0);
  const gpa = best.length ? best.reduce((sum, s) => sum + s.gpa, 0) / best.length : 0;

  let division = 'INC';
  if (complete) division = GRADING.divisions.find((d) => points <= d.maxPoints).name;

  return {
    subjects: subjectMarks.map((s) => ({
      ...s,
      grade: gradeFor(s.mark)?.grade ?? (s.mark === 'ABS' ? 'ABS' : '–'),
    })),
    total,
    average: Math.round(average * 10) / 10,
    points,
    gpa: Math.round(gpa * 100) / 100,
    division,
    pass: GRADING.passDivisions.includes(division),
  };
}
