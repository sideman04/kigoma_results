import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCentre } from '../../api/client';
import { DIVS } from '../../utils/centre';
import './result.css';

export default function CentreResults() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const year = params.get('year') || '2025';
  const type = params.get('type') || 'csee';
  const wanted = (params.get('cno') || '').toUpperCase();

  const [data, setData] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    setData(undefined);
    getCentre(code).then(setData);
  }, [code]);

  // scroll to the searched candidate
  useEffect(() => {
    if (!data || !wanted) return;
    document.getElementById(`c-${wanted.replace('/', '-')}`)?.scrollIntoView({ block: 'center' });
  }, [data, wanted]);

  if (data === undefined) {
    return <div className="necta"><main className="necta-page"><p className="necta-note">Loading results…</p></main></div>;
  }

  if (data === null) {
    return (
      <div className="necta">
        <main className="necta-page">
          <h1 className="necta-title">CENTRE NOT FOUND</h1>
          <p className="necta-note">
            There is no school with centre number {code.toUpperCase()}. <Link to="/results">Go back to the list of schools</Link>.
          </p>
        </main>
      </div>
    );
  }

  const { school, candidates, divisionSummary, summary, subjects, gpa } = data;
  const found = wanted && candidates.some((c) => c.cno === wanted);

  return (
    <div className="result-page">
      <div className="necta-banner no-print">
        <Link className="necta-brand" to="/results"><span className="regional-mark">K</span><span>KIGOMA REGIONAL EXAMINATIONS RESULTS</span></Link>
        <span className="necta-banner-actions"><span>Kigoma Region</span><Link to={`/results/type/${type}/year/${year}`}>All centres</Link><button type="button" className="necta-linkbtn" onClick={() => window.print()}>Print page</button></span>
      </div>

      <main className="necta-page">
        <div className="necta-page-intro centre-intro"><h1 className="necta-title">{type.toUpperCase()} {year} EXAMINATION RESULTS</h1><h2 className="necta-centre">{school.code} {school.name.toUpperCase()}</h2></div>

        {wanted && !found && (
          <p className="necta-error" role="alert">
            Candidate {wanted} was not found at this centre. Check the number and try again.
          </p>
        )}

        <h3 className="table-title">DIVISION PERFORMANCE SUMMARY</h3>
        <div className="necta-scroll narrow-scroll division-scroll">
          <table className="necta-table narrow">
            <thead>
              <tr><th>SEX</th>{DIVS.map((d) => <th key={d}>{d}</th>)}<th>INC</th></tr>
            </thead>
            <tbody>
              {divisionSummary.map((r) => (
                <tr key={r.sex}>
                  <td>{r.sex}</td>
                  {DIVS.map((d) => <td key={d}>{r[d]}</td>)}
                  <td>{r.INC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="table-title">CANDIDATES’ RESULTS</h3>
        <div className="necta-scroll">
          <table className="necta-table">
            <thead>
              <tr><th>CNO</th><th>SEX</th><th>AGGT</th><th>DIV</th><th className="left">DETAILED SUBJECTS</th></tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.cno} id={`c-${c.cno.replace('/', '-')}`} className={c.cno === wanted ? 'is-found' : ''}>
                  <td className="nowrap">{c.cno}</td>
                  <td>{c.sex}</td>
                  <td>{c.aggt}</td>
                  <td>{c.div}</td>
                  <td className="left detail">{c.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="table-title">EXAMINATION CENTRE SUMMARY</h3>
        <div className="necta-scroll narrow-scroll summary-scroll">
          <table className="necta-table narrow">
            <thead>
              <tr>
                <th>REGIST</th><th>ABSENT</th><th>SAT</th><th>WITHHELD</th><th>NO-CA</th><th>CLEAN</th>
                {DIVS.map((d) => <th key={d}>DIV {d}</th>)}<th>INC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summary.registered}</td><td>{summary.absent}</td><td>{summary.sat}</td>
                <td>{summary.withheld}</td><td>{summary.noCa}</td><td>{summary.clean}</td>
                {DIVS.map((d) => <td key={d}>{summary[d]}</td>)}<td>{summary.INC}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="table-title">EXAMINATION CENTRE SUBJECTS PERFORMANCE</h3>
        <div className="necta-scroll">
          <table className="necta-table">
            <thead>
              <tr>
                <th>CODE</th><th className="left">SUBJECT NAME</th><th>REG</th><th>SAT</th><th>NO-CA</th>
                <th>W/HD</th><th>CLEAN</th><th>PASS</th><th>A</th><th>B</th><th>C</th><th>D</th><th>F</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.code}>
                  <td>{s.code}</td><td className="left">{s.name}</td><td>{s.reg}</td><td>{s.sat}</td>
                  <td>{s.noCa}</td><td>{s.withheld}</td><td>{s.clean}</td><td>{s.pass}</td>
                  {['A', 'B', 'C', 'D', 'F'].map((g) => <td key={g}>{s.grades[g]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
