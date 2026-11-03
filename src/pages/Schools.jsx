import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COUNCILS, RESULTS, SCHOOLS } from '../data/mock';
import { schoolsInScope } from '../utils/scope';

export default function Schools() {
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const [council, setCouncil] = useState('');
  const [ownership, setOwnership] = useState('');

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return schoolsInScope(user, SCHOOLS)
      .filter((s) => !council || s.council === council)
      .filter((s) => !ownership || s.ownership === ownership)
      .filter((s) => !term || s.name.toLowerCase().includes(term) || s.code.toLowerCase().includes(term))
      .map((s) => ({ ...s, students: RESULTS.filter((r) => r.student.schoolId === s.id).length }));
  }, [user, q, council, ownership]);

  const councils = user.role === 'council_admin' ? [user.council] : COUNCILS;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Schools</h1>
          <p className="muted">{rows.length} schools</p>
        </div>
      </div>

      <div className="toolbar">
        <input className="input grow" placeholder="Search by school name or code" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search schools" />
        <select className="input" value={council} onChange={(e) => setCouncil(e.target.value)} aria-label="Council">
          <option value="">All councils</option>
          {councils.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="input" value={ownership} onChange={(e) => setOwnership(e.target.value)} aria-label="Ownership">
          <option value="">Government and private</option>
          <option>Government</option>
          <option>Private</option>
        </select>
      </div>

      <div className="card flush table-wrap">
        <table className="table">
          <thead>
            <tr><th>Code</th><th>School</th><th>Council</th><th>Ownership</th><th className="num">Students</th></tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.code}</td>
                <td>{s.name}</td>
                <td>{s.council}</td>
                <td><span className={`badge ${s.ownership === 'Government' ? 'badge-lake' : 'badge-sun'}`}>{s.ownership}</span></td>
                <td className="num">{s.students}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="5" className="empty">No schools match. Clear the search or filters to see all schools.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
