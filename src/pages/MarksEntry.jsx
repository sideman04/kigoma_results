import { useMemo, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EXAM, FORMS, SCHOOLS, STUDENTS, SUBJECTS } from '../data/mock';
import { GRADING, gradeFor, validateMark } from '../utils/grading';
import { schoolsInScope } from '../utils/scope';
import { saveMarks } from '../api/client';
import Icon from '../components/Icon';

const ABSENT = 'ABS';

export default function MarksEntry() {
  const { user } = useAuth();
  const mySchools = schoolsInScope(user, SCHOOLS);
  const subjects = user.role === 'teacher' ? SUBJECTS.filter((s) => user.subjects.includes(s.code)) : SUBJECTS;

  const [schoolId, setSchoolId] = useState(mySchools[0].id);
  const [form, setForm] = useState('Form 4');
  const [subject, setSubject] = useState(subjects[0].code);
  const [drafts, setDrafts] = useState({}); // key "studentId|SUBJECT" -> typed text or 'ABS'
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { tone, text }
  const fileRef = useRef(null);

  const roster = useMemo(
    () => STUDENTS.filter((s) => s.schoolId === Number(schoolId) && s.form === form),
    [schoolId, form]
  );

  const keyOf = (s) => `${s.id}|${subject}`;
  const valueOf = (s) => {
    const k = keyOf(s);
    if (k in drafts) return drafts[k];
    const m = s.marks[subject];
    return m === ABSENT ? ABSENT : m == null ? '' : String(m);
  };
  const setValue = (s, v) => {
    setStatus(null);
    setDrafts((d) => ({ ...d, [keyOf(s)]: v }));
  };

  const rows = roster.map((s) => {
    const v = valueOf(s);
    const absent = v === ABSENT;
    const check = absent ? { ok: true, value: null } : validateMark(v);
    return { s, v, absent, ...check };
  });

  const counts = {
    entered: rows.filter((r) => r.ok && r.value !== null).length,
    absent: rows.filter((r) => r.absent).length,
    missing: rows.filter((r) => r.ok && !r.absent && r.value === null).length,
    invalid: rows.filter((r) => !r.ok).length,
  };

  function focusRow(i) {
    document.querySelector(`[data-row="${i}"]`)?.focus();
  }

  function onKey(e, i) {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusRow(i + 1);
    }
  }

  async function onSave() {
    setSaving(true);
    try {
      const payload = rows.map((r) => ({ studentId: r.s.id, mark: r.absent ? ABSENT : r.value }));
      const res = await saveMarks({ schoolId, form, subject, exam: EXAM.id, rows: payload });
      const name = SUBJECTS.find((x) => x.code === subject).name;
      setStatus({ tone: 'ok', text: `Saved ${res.saved} entries for ${name}, ${form}.` });
    } catch (err) {
      setStatus({ tone: 'bad', text: err.message });
    } finally {
      setSaving(false);
    }
  }

  function onImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result).split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      const next = {};
      const unknown = [];
      let matched = 0;
      lines.forEach((line, idx) => {
        const [reg, raw] = line.split(',').map((x) => x?.trim());
        if (idx === 0 && Number.isNaN(Number(raw)) && raw?.toUpperCase() !== ABSENT) return; // header row
        const student = roster.find((s) => s.regNo.toUpperCase() === (reg || '').toUpperCase());
        if (!student) { unknown.push(reg); return; }
        next[keyOf(student)] = raw?.toUpperCase() === ABSENT ? ABSENT : raw ?? '';
        matched++;
      });
      setDrafts((d) => ({ ...d, ...next }));
      setStatus({
        tone: unknown.length ? 'warn' : 'ok',
        text:
          `Imported ${matched} marks. Review them below, then save.` +
          (unknown.length ? ` ${unknown.length} rows did not match a student in this class: ${unknown.slice(0, 4).join(', ')}${unknown.length > 4 ? '…' : ''}` : ''),
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Marks entry</h1>
          <p className="muted">{EXAM.name}</p>
        </div>
      </div>

      <div className="toolbar">
        {mySchools.length > 1 && (
          <select className="input" value={schoolId} onChange={(e) => setSchoolId(e.target.value)} aria-label="School">
            {mySchools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        )}
        <select className="input" value={form} onChange={(e) => setForm(e.target.value)} aria-label="Class">
          {FORMS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject">
          {subjects.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
        <span className="grow" />
        <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={onImport} />
        <button className="btn" onClick={() => fileRef.current.click()}>
          <Icon name="upload" size={18} /> Import CSV
        </button>
      </div>

      <p className="hint">
        Maximum mark is {GRADING.maxMark}. Press Enter to move to the next student. CSV format: registration number, mark (use ABS for absent).
      </p>

      {status && <div className={`notice notice-${status.tone}`} role="status">{status.text}</div>}

      <div className="summary">
        <span><strong>{counts.entered}</strong> entered</span>
        <span><strong>{counts.missing}</strong> missing</span>
        <span><strong>{counts.absent}</strong> absent</span>
        <span className={counts.invalid ? 'text-bad' : ''}><strong>{counts.invalid}</strong> with errors</span>
      </div>

      <div className="card flush table-wrap">
        <table className="table">
          <thead>
            <tr><th>Reg. number</th><th>Name</th><th className="num">Mark</th><th>Grade</th><th>Absent</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const grade = r.absent ? 'ABS' : gradeFor(r.value)?.grade ?? '–';
              return (
                <tr key={r.s.id} className={!r.ok ? 'row-bad' : ''}>
                  <td>{r.s.regNo}</td>
                  <td>{r.s.name}</td>
                  <td className="num">
                    <input
                      className={`mark-input ${!r.ok ? 'is-invalid' : ''}`}
                      data-row={i}
                      inputMode="decimal"
                      value={r.absent ? '' : r.v}
                      disabled={r.absent}
                      onChange={(e) => setValue(r.s, e.target.value)}
                      onKeyDown={(e) => onKey(e, i)}
                      aria-label={`Mark for ${r.s.name}`}
                      aria-invalid={!r.ok}
                    />
                    {!r.ok && <em className="field-error">{r.error}</em>}
                  </td>
                  <td><span className={`grade grade-${grade}`}>{grade}</span></td>
                  <td>
                    <input
                      type="checkbox"
                      checked={r.absent}
                      onChange={(e) => setValue(r.s, e.target.checked ? ABSENT : '')}
                      aria-label={`${r.s.name} was absent`}
                    />
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan="5" className="empty">There are no students in {form} at this school. Register students first.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="save-bar">
        <span className="muted">
          {counts.invalid ? 'Fix the marks with errors before saving.' : 'Nothing is final until the head of school approves the results.'}
        </span>
        <button className="btn btn-primary" disabled={saving || counts.invalid > 0 || rows.length === 0} onClick={onSave}>
          {saving ? 'Saving…' : 'Save marks'}
        </button>
      </div>
    </>
  );
}
