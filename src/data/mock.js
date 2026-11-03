/**
 * DEMO DATA ONLY. Names, schools and marks are invented so you can see the
 * screens working. Replace with data from your PHP API (see src/api/client.js).
 */
import { computeResult } from '../utils/grading';

export const COUNCILS = [
  'Kigoma Ujiji MC',
  'Kigoma DC',
  'Kasulu TC',
  'Kasulu DC',
  'Kibondo DC',
  'Buhigwe DC',
  'Kakonko DC',
  'Uvinza DC',
];

export const SUBJECTS = [
  { code: 'CIV', name: 'Civics', compulsory: true },
  { code: 'HIS', name: 'History', compulsory: true },
  { code: 'GEO', name: 'Geography', compulsory: true },
  { code: 'KIS', name: 'Kiswahili', compulsory: true },
  { code: 'ENG', name: 'English', compulsory: true },
  { code: 'BIO', name: 'Biology', compulsory: true },
  { code: 'PHY', name: 'Physics', compulsory: false },
  { code: 'CHE', name: 'Chemistry', compulsory: false },
  { code: 'MAT', name: 'Mathematics', compulsory: true },
];

export const FORMS = ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'];
export const COMBINATIONS = ['PCM', 'PCB', 'CBG', 'HGL', 'HGK', 'EGM', 'HKL'];

export const EXAM = { id: 'mock-2026', name: 'Form Four Mock 2026' };

export const SCHOOLS = [
  { id: 1, code: 'S0101', name: 'Lakeview Secondary', council: 'Kigoma Ujiji MC', ownership: 'Government' },
  { id: 2, code: 'S0102', name: 'Ujiji Hill Secondary', council: 'Kigoma Ujiji MC', ownership: 'Private' },
  { id: 3, code: 'S0201', name: 'Mwandiga Secondary', council: 'Kigoma DC', ownership: 'Government' },
  { id: 4, code: 'S0301', name: 'Kasulu Town Secondary', council: 'Kasulu TC', ownership: 'Government' },
  { id: 5, code: 'S0302', name: 'Heri Girls Secondary', council: 'Kasulu TC', ownership: 'Private' },
  { id: 6, code: 'S0501', name: 'Kibondo Central Secondary', council: 'Kibondo DC', ownership: 'Government' },
  { id: 7, code: 'S0801', name: 'Uvinza Valley Secondary', council: 'Uvinza DC', ownership: 'Government' },
  { id: 8, code: 'S0601', name: 'Buhigwe Ridge Secondary', council: 'Buhigwe DC', ownership: 'Government' },
];

export const USERS = [
  { username: 'region', password: 'demo1234', name: 'Neema Kagoma', role: 'regional_admin' },
  { username: 'kasulu', password: 'demo1234', name: 'Hamisi Ntibuka', role: 'council_admin', council: 'Kasulu TC' },
  { username: 'lakeview', password: 'demo1234', name: 'Mwajuma Bakari', role: 'school_admin', schoolId: 1 },
  { username: 'teacher', password: 'demo1234', name: 'Elias Mrisho', role: 'teacher', schoolId: 1, subjects: ['BIO', 'CHE'] },
];

// ---- deterministic fake data generator ----
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(2026);

const FIRST_F = ['Asha', 'Neema', 'Rehema', 'Zawadi', 'Mwajuma', 'Upendo', 'Furaha', 'Tumaini', 'Esther', 'Joyce', 'Grace', 'Amina'];
const FIRST_M = ['Juma', 'Baraka', 'Elias', 'Hamisi', 'Emmanuel', 'Daudi', 'Salum', 'Peter', 'Yusuph', 'Samson', 'Ibrahim', 'Jackson'];
const LAST = ['Ntibuka', 'Kagoma', 'Bakari', 'Mrisho', 'Rugemalila', 'Sebastian', 'Mwita', 'Nsabi', 'Kabura', 'Hakizimana', 'Ndayisenga', 'Masanja'];
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

export const STUDENTS = [];
SCHOOLS.forEach((school) => {
  const girlsSchool = school.name.includes('Girls');
  for (let i = 1; i <= 14; i++) {
    const gender = girlsSchool || rand() < 0.5 ? 'F' : 'M';
    const ability = 28 + rand() * 55 + (school.ownership === 'Private' ? 6 : 0);
    const marks = {};
    SUBJECTS.forEach((sub) => {
      const roll = rand();
      if (roll < 0.015) marks[sub.code] = 'ABS';
      else if (roll < 0.03) marks[sub.code] = null;
      else marks[sub.code] = Math.max(4, Math.min(98, Math.round(ability + (rand() - 0.5) * 30)));
    });
    STUDENTS.push({
      id: school.id * 100 + i,
      regNo: `${school.code}/${String(i).padStart(4, '0')}`,
      name: `${pick(gender === 'F' ? FIRST_F : FIRST_M)} ${pick(LAST)}`,
      gender,
      form: 'Form 4',
      schoolId: school.id,
      combination: null,
      marks,
    });
  }
});

export function resultFor(student) {
  const subjectMarks = SUBJECTS.map((s) => ({ code: s.code, name: s.name, mark: student.marks[s.code] ?? null }));
  return { student, ...computeResult(subjectMarks) };
}

export const RESULTS = STUDENTS.map(resultFor);
