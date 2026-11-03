import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RESULTS, SCHOOLS, EXAM } from '../data/mock';
import { schoolsInScope } from '../utils/scope';
import Bars from '../components/Bars';
import './dashboard.css';

const DIVISIONS = ['I', 'II', 'III', 'IV', '0', 'INC'];
const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const avg = (arr) => (arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100 : 0);

function summarize(rows) {
  const complete = rows.filter((r) => r.division !== 'INC');
  const passed = complete.filter((r) => r.pass).length;
  return {
    count: rows.length,
    passRate: pct(passed, complete.length),
    failureRate: pct(complete.length - passed, complete.length),
    gpa: avg(complete.map((r) => r.gpa)),
  };
}

export default function Dashboard() {
  const { user } = useAuth();

  const data = useMemo(() => {
    const schools = schoolsInScope(user, SCHOOLS);
    const ids = new Set(schools.map((s) => s.id));
    const rows = RESULTS.filter((r) => ids.has(r.student.schoolId));
    const councils = [...new Set(schools.map((s) => s.council))];
    const overall = summarize(rows);
    const divisionCounts = DIVISIONS.map((d) => ({
      label: d === 'INC' ? 'Incomplete' : d === '0' ? 'Division 0' : `Division ${d}`,
      value: rows.filter((r) => r.division === d).length,
      tone: d === '0' ? 'bad' : d === 'INC' ? 'warn' : 'lake',
    }));
    const bySchool = schools.map((school) => ({
      school,
      ...summarize(rows.filter((r) => r.student.schoolId === school.id)),
    })).sort((a, b) => b.gpa - a.gpa);
    const byCouncil = councils.map((council) => {
      const councilIds = new Set(schools.filter((school) => school.council === council).map((school) => school.id));
      return { label: council, value: summarize(rows.filter((r) => councilIds.has(r.student.schoolId))).gpa };
    }).sort((a, b) => b.value - a.value);
    const girls = summarize(rows.filter((r) => r.student.gender === 'F'));
    const boys = summarize(rows.filter((r) => r.student.gender === 'M'));
    return {
      schools, councils, rows, overall, divisionCounts, bySchool, byCouncil, girls, boys,
      incomplete: rows.filter((r) => r.division === 'INC').length,
      absent: rows.filter((r) => r.division === 'ABS').length,
    };
  }, [user]);

  const isRegional = user.role === 'regional_admin' || user.role === 'super_admin';

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div><p className="dashboard-eyebrow">{isRegional ? 'REGIONAL CONTROL CENTRE' : 'PERFORMANCE OVERVIEW'}</p><h1>Good morning, {user.name.split(' ')[0]}</h1><p>{EXAM.name} · {isRegional ? 'Kigoma Region' : user.council}</p></div>
        <div className="dashboard-heading-actions"><span className="status-pill"><i></i>System online</span><Link className="btn btn-primary" to="/results">View public results</Link></div>
      </div>

      <div className="dashboard-kpis">
        <article className="dashboard-kpi"><span className="kpi-icon">◉</span><div><strong>{data.overall.count}</strong><span>Students</span><small>Across {data.schools.length} schools</small></div></article>
        <article className="dashboard-kpi"><span className="kpi-icon">⌂</span><div><strong>{data.schools.length}</strong><span>Schools</span><small>{data.councils.length} councils</small></div></article>
        <article className="dashboard-kpi"><span className="kpi-icon">↗</span><div><strong>{data.overall.passRate}%</strong><span>Pass rate</span><small>{data.overall.failureRate}% failure rate</small></div></article>
        <article className="dashboard-kpi"><span className="kpi-icon">★</span><div><strong>{data.overall.gpa.toFixed(2)}</strong><span>Average GPA</span><small>Out of 5.00</small></div></article>
      </div>

      {(data.incomplete > 0 || data.absent > 0) && <section className="dashboard-alerts"><div className="alert-heading"><span className="alert-symbol">!</span><div><strong>Verification needs attention</strong><p>Review these items before approving or publishing results.</p></div></div><div className="alert-items">{data.incomplete > 0 && <div><strong>{data.incomplete}</strong><span>Incomplete results</span><Link to="/students">Review students →</Link></div>}{data.absent > 0 && <div><strong>{data.absent}</strong><span>Absent candidates</span><Link to="/students">View records →</Link></div>}</div></section>}

      <div className="dashboard-grid dashboard-grid-top">
        <section className="dashboard-card division-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">RESULT DISTRIBUTION</p><h2>Students by division</h2></div><span className="card-context">{data.overall.count} total</span></div><Bars items={data.divisionCounts} /></section>
        <section className="dashboard-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">PERFORMANCE</p><h2>{isRegional ? 'Average GPA by council' : 'Average GPA by school'}</h2></div><span className="card-context">/ 5.00</span></div><Bars items={isRegional ? data.byCouncil : data.bySchool.map((item) => ({ label: item.school.name, value: item.gpa }))} max={5} format={(value) => value.toFixed(2)} /></section>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">EQUITY VIEW</p><h2>Girls and boys</h2></div></div><div className="comparison-grid"><div><span>Girls</span><strong>{data.girls.passRate}%</strong><small>{data.girls.count} students · GPA {data.girls.gpa.toFixed(2)}</small><div className="comparison-track"><i style={{ width: `${data.girls.passRate}%` }}></i></div></div><div><span>Boys</span><strong>{data.boys.passRate}%</strong><small>{data.boys.count} students · GPA {data.boys.gpa.toFixed(2)}</small><div className="comparison-track"><i style={{ width: `${data.boys.passRate}%` }}></i></div></div></div></section>
        <section className="dashboard-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">PUBLICATION</p><h2>Results status</h2></div><span className="status-badge">Draft</span></div><div className="publication-status"><div><span>Data collection</span><strong className="is-complete">Complete</strong></div><div><span>Verification</span><strong className="is-review">Needs review</strong></div><div><span>Public results</span><strong className="is-pending">Not published</strong></div></div></section>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card ranking-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">RANKING</p><h2>Top-performing schools</h2></div><Link to="/schools">View schools →</Link></div><div className="ranking-list">{data.bySchool.slice(0, 5).map((item, index) => <div className="ranking-row" key={item.school.id}><span className={`rank-number rank-${index + 1}`}>{index + 1}</span><div><strong>{item.school.name}</strong><small>{item.school.council} · {item.school.ownership}</small></div><b>{item.gpa.toFixed(2)} <small>GPA</small></b></div>)}</div></section>
        <section className="dashboard-card quick-card"><div className="dashboard-card-heading"><div><p className="dashboard-eyebrow">QUICK ACCESS</p><h2>Manage the region</h2></div></div><div className="quick-links"><Link to="/schools"><span>⌂</span><div><strong>Schools</strong><small>Manage centres and councils</small></div><b>→</b></Link><Link to="/students"><span>◎</span><div><strong>Students</strong><small>Registration and records</small></div><b>→</b></Link><Link to="/marks"><span>✎</span><div><strong>Marks entry</strong><small>Enter and verify marks</small></div><b>→</b></Link></div></section>
      </div>
    </div>
  );
}

