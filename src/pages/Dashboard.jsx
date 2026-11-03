import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { RESULTS, SCHOOLS, EXAM } from '../data/mock';
import { schoolsInScope } from '../utils/scope';
import Bars from '../components/Bars';

const DIVISIONS = ['I', 'II', 'III', 'IV', '0', 'INC'];
const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const avg = (arr) => (arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100 : 0);

function summarize(rows) {
  const complete = rows.filter((r) => r.division !== 'INC');
  return {
    count: rows.length,
    passRate: pct(complete.filter((r) => r.pass).length, complete.length),
    gpa: avg(complete.map((r) => r.gpa)),
  };
}

export default function Dashboard() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const schools = schoolsInScope(user, SCHOOLS);
    const ids = new Set(schools.map((s) => s.id));
    const rows = RESULTS.filter((r) => ids.has(r.student.schoolId));
    const overall = summarize(rows);

    const divisionCounts = DIVISIONS.map((d) => ({
      label: d === 'INC' ? 'Incomplete' : d === '0' ? 'Division 0' : `Division ${d}`,
      value: rows.filter((r) => r.division === d).length,
      tone: d === '0' ? 'bad' : d === 'INC' ? 'warn' : 'lake',
    }));

    const girls = summarize(rows.filter((r) => r.student.gender === 'F'));
    const boys = summarize(rows.filter((r) => r.student.gender === 'M'));

    const bySchool = schools
      .map((s) => ({ school: s, ...summarize(rows.filter((r) => r.student.schoolId === s.id)) }))
      .sort((a, b) => a.gpa < b.gpa ? 1 : -1);

    const byCouncil = [...new Set(schools.map((s) => s.council))].map((c) => {
      const cs = new Set(schools.filter((s) => s.council === c).map((s) => s.id));
      return { label: c, value: summarize(rows.filter((r) => cs.has(r.student.schoolId))).gpa };
    }).sort((a, b) => b.value - a.value);

    const missing = rows.filter((r) => r.division === 'INC').length;

    return { schools, overall, divisionCounts, girls, boys, bySchool, byCouncil, missing };
  }, [user]);

  const { overall, schools } = data;
  const regional = user.role === 'regional_admin';

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">{EXAM.name}</p>
        </div>
      </div>

      {data.missing > 0 && (
        <div className="notice notice-warn" role="status">
          {data.missing} students have incomplete results because marks are missing. Ask teachers to finish marks entry.
        </div>
      )}

      <div className="stats">
        <div className="stat"><span className="stat-value">{overall.count}</span><span className="stat-label">Students</span></div>
        <div className="stat"><span className="stat-value">{schools.length}</span><span className="stat-label">Schools</span></div>
        <div className="stat"><span className="stat-value">{overall.passRate}%</span><span className="stat-label">Pass rate</span></div>
        <div className="stat"><span className="stat-value">{overall.gpa.toFixed(2)}</span><span className="stat-label">Average GPA (out of 5)</span></div>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2>Students by division</h2>
          <Bars items={data.divisionCounts} />
        </section>

        <section className="card">
          <h2>{regional ? 'Average GPA by council' : 'Average GPA by school'}</h2>
          <Bars
            items={regional ? data.byCouncil : data.bySchool.map((s) => ({ label: s.school.name, value: s.gpa }))}
            max={5}
            format={(v) => v.toFixed(2)}
          />
        </section>

        <section className="card">
          <h2>Girls and boys</h2>
          <table className="table compact">
            <thead>
              <tr><th>Group</th><th className="num">Students</th><th className="num">Pass rate</th><th className="num">Avg GPA</th></tr>
            </thead>
            <tbody>
              <tr><td>Girls</td><td className="num">{data.girls.count}</td><td className="num">{data.girls.passRate}%</td><td className="num">{data.girls.gpa.toFixed(2)}</td></tr>
              <tr><td>Boys</td><td className="num">{data.boys.count}</td><td className="num">{data.boys.passRate}%</td><td className="num">{data.boys.gpa.toFixed(2)}</td></tr>
            </tbody>
          </table>
        </section>

        <section className="card">
          <h2>School ranking</h2>
          <div className="table-wrap">
            <table className="table compact">
              <thead>
                <tr><th className="num">#</th><th>School</th><th className="num">Pass rate</th><th className="num">Avg GPA</th></tr>
              </thead>
              <tbody>
                {data.bySchool.map((s, i) => (
                  <tr key={s.school.id}>
                    <td className="num">{i + 1}</td>
                    <td>{s.school.name}</td>
                    <td className="num">{s.passRate}%</td>
                    <td className="num">{s.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
