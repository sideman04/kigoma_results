import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COMBINATIONS, FORMS, SCHOOLS, STUDENTS } from '../data/mock';
import { schoolsInScope } from '../utils/scope';
import Modal from '../components/Modal';
import Icon from '../components/Icon';

const PAGE_SIZE = 10;

export default function Students() {
  const { user } = useAuth();
  const mySchools = schoolsInScope(user, SCHOOLS);
  const schoolName = (id) => SCHOOLS.find((s) => s.id === id)?.name ?? '';

  const [students, setStudents] = useState(STUDENTS);
  const [q, setQ] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [form, setForm] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = useMemo(() => {
    const ids = new Set(mySchools.map((s) => s.id));
    const term = q.trim().toLowerCase();
    return students
      .filter((s) => ids.has(s.schoolId))
      .filter((s) => !schoolId || s.schoolId === Number(schoolId))
      .filter((s) => !form || s.form === form)
      .filter((s) => !gender || s.gender === gender)
      .filter((s) => !term || s.name.toLowerCase().includes(term) || s.regNo.toLowerCase().includes(term));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, q, schoolId, form, gender, user]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const reset = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  function addStudent(s) {
    setStudents((list) => [{ ...s, id: Date.now(), marks: {} }, ...list]);
    setAdding(false);
    setMessage(`${s.name} was registered with number ${s.regNo}.`);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Students</h1>
          <p className="muted">{filtered.length} students</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setMessage(''); setAdding(true); }}>
          <Icon name="plus" size={18} /> Register student
        </button>
      </div>

      {message && <div className="notice notice-ok" role="status">{message}</div>}

      <div className="toolbar">
        <input className="input grow" placeholder="Search by name or registration number" value={q} onChange={reset(setQ)} aria-label="Search students" />
        {mySchools.length > 1 && (
          <select className="input" value={schoolId} onChange={reset(setSchoolId)} aria-label="School">
            <option value="">All schools</option>
            {mySchools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        )}
        <select className="input" value={form} onChange={reset(setForm)} aria-label="Class">
          <option value="">All classes</option>
          {FORMS.map((f) => <option key={f}>{f}</option>)}
        </select>
        <select className="input" value={gender} onChange={reset(setGender)} aria-label="Gender">
          <option value="">Girls and boys</option>
          <option value="F">Girls</option>
          <option value="M">Boys</option>
        </select>
      </div>

      <div className="card flush table-wrap">
        <table className="table">
          <thead>
            <tr><th>Reg. number</th><th>Name</th><th>Gender</th><th>Class</th><th>School</th></tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id}>
                <td>{s.regNo}</td>
                <td>{s.name}</td>
                <td>{s.gender === 'F' ? 'Girl' : 'Boy'}</td>
                <td>{s.form}{s.combination ? ` (${s.combination})` : ''}</td>
                <td>{schoolName(s.schoolId)}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan="5" className="empty">No students match. Clear the search or filters, or register a new student.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <span className="muted">Page {current} of {pages}</span>
        <div>
          <button className="btn" disabled={current <= 1} onClick={() => setPage(current - 1)}>Previous</button>
          <button className="btn" disabled={current >= pages} onClick={() => setPage(current + 1)}>Next</button>
        </div>
      </div>

      {adding && <AddStudent schools={mySchools} existing={students} onSave={addStudent} onClose={() => setAdding(false)} />}
    </>
  );
}

function AddStudent({ schools, existing, onSave, onClose }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [form, setForm] = useState('Form 1');
  const [schoolId, setSchoolId] = useState(String(schools[0]?.id ?? ''));
  const [combination, setCombination] = useState('');
  const [errors, setErrors] = useState({});

  const school = SCHOOLS.find((s) => s.id === Number(schoolId));
  const advanced = form === 'Form 5' || form === 'Form 6';
  const nextNo = existing.filter((s) => s.schoolId === Number(schoolId)).length + 1;
  const regNo = school ? `${school.code}/${String(nextNo).padStart(4, '0')}` : '';

  function submit(e) {
    e.preventDefault();
    const err = {};
    if (name.trim().split(/\s+/).length < 2) err.name = 'Enter at least two names, for example “Asha Bakari”.';
    if (!gender) err.gender = 'Choose girl or boy.';
    if (advanced && !combination) err.combination = 'Choose a subject combination for A-level students.';
    setErrors(err);
    if (Object.keys(err).length) return;
    onSave({ name: name.trim(), gender, form, schoolId: Number(schoolId), combination: advanced ? combination : null, regNo });
  }

  return (
    <Modal title="Register student" onClose={onClose}>
      <form onSubmit={submit} noValidate className="form-grid">
        <label className="field span-2">
          <span>Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          {errors.name && <em className="field-error">{errors.name}</em>}
        </label>

        <label className="field">
          <span>Gender</span>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Choose…</option>
            <option value="F">Girl</option>
            <option value="M">Boy</option>
          </select>
          {errors.gender && <em className="field-error">{errors.gender}</em>}
        </label>

        <label className="field">
          <span>Class</span>
          <select value={form} onChange={(e) => setForm(e.target.value)}>
            {FORMS.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>

        {schools.length > 1 && (
          <label className="field span-2">
            <span>School</span>
            <select value={schoolId} onChange={(e) => setSchoolId(e.target.value)}>
              {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
        )}

        {advanced && (
          <label className="field span-2">
            <span>Subject combination</span>
            <select value={combination} onChange={(e) => setCombination(e.target.value)}>
              <option value="">Choose…</option>
              {COMBINATIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
            {errors.combination && <em className="field-error">{errors.combination}</em>}
          </label>
        )}

        <p className="span-2 muted">Registration number will be <strong>{regNo}</strong></p>

        <div className="span-2 modal-actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary">Register student</button>
        </div>
      </form>
    </Modal>
  );
}
