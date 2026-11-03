/**
 * ALL backend calls live in this file.
 * Right now they return demo data. When your PHP API is ready, replace the
 * body of each function with a real request() call (examples in comments).
 */
import { USERS, STUDENTS, RESULTS } from '../data/mock';

const BASE = import.meta.env.VITE_API_URL || '/api';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include', // lets PHP session cookies work
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Try again.');
  return data;
}

export async function login(username, password) {
  // Real version: return request('/auth/login.php', { method: 'POST', body: JSON.stringify({ username, password }) });
  await wait(400);
  const found = USERS.find((u) => u.username === username.trim() && u.password === password);
  if (!found) throw new Error('Wrong username or password. Check both and try again.');
  const { password: _omit, ...safe } = found;
  return safe;
}

export async function saveMarks({ schoolId, form, subject, exam, rows }) {
  // Real version: return request('/marks/save.php', { method: 'POST', body: JSON.stringify({ schoolId, form, subject, exam, rows }) });
  await wait(600);
  return { saved: rows.length };
}

export async function findResult(regNo) {
  // Real version: return request(`/results/search.php?reg_no=${encodeURIComponent(regNo)}`);
  await wait(500);
  const clean = regNo.trim().toUpperCase();
  const student = STUDENTS.find((s) => s.regNo.toUpperCase() === clean);
  if (!student) return null;
  return RESULTS.find((r) => r.student.id === student.id);
}

// ---- Public results (NECTA-style pages) ----
import { buildCentre, centreList } from '../utils/centre';

export async function listCentres() {
  // Real version: return request('/results/centres.php');
  await wait(250);
  return centreList();
}

export async function getCentre(code) {
  // Real version: return request(`/results/centre.php?code=${encodeURIComponent(code)}`);
  await wait(350);
  return buildCentre(code);
}
