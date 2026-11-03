import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { findResult } from '../../api/client';
import './result.css';

export default function CandidateResult() {
  const { type = 'csee', year } = useParams();
  const [params] = useSearchParams();
  const cno = (params.get('cno') || '').toUpperCase();
  const [result, setResult] = useState(undefined);

  useEffect(() => { setResult(undefined); findResult(cno).then(setResult); }, [cno]);

  return <div className="candidate-page">
    <header className="regional-header"><div className="regional-header-inner"><Link className="regional-brand" to="/results"><span className="regional-logo">K</span><span><strong>KIGOMA REGION</strong><small>EXAMINATION RESULTS PORTAL</small></span></Link><nav><Link to={`/results/type/${type}/year/${year}`}>All centres</Link></nav></div></header>
    <main className="candidate-main">
      <div className="candidate-top"><div><p className="regional-eyebrow">KIGOMA REGIONAL EXAMINATIONS · {type.toUpperCase()} {year}</p><h1>Candidate result</h1><p>Individual examination result slip</p></div><Link className="candidate-back" to={`/results/type/${type}/year/${year}`}>← All centres</Link></div>
      {result === undefined && <div className="candidate-state">Searching for <strong>{cno}</strong>…</div>}
      {result === null && <div className="candidate-state candidate-error"><strong>Result not found</strong><span>No result was found for index number {cno}. Check the number and try again.</span><Link to={`/results/type/${type}/year/${year}`}>Return to centre directory</Link></div>}
      {result && <ResultSlip result={result} cno={cno} />}
    </main>
  </div>;
}

function ResultSlip({ result, cno }) {
  const { student } = result;
  return <section className="candidate-slip"><div className="slip-heading"><div><p className="regional-eyebrow">OFFICIAL RESULT SLIP</p><h2>{student.name}</h2><span>{cno} · {student.form}</span></div><div className={`slip-division ${result.pass ? 'is-pass' : 'is-fail'}`}><small>DIVISION</small><strong>{result.division}</strong></div></div><div className="candidate-summary"><div><span>Sex</span><strong>{student.gender === 'F' ? 'Female' : 'Male'}</strong></div><div><span>Points</span><strong>{result.points || '—'}</strong></div><div><span>GPA</span><strong>{result.gpa.toFixed(2)}</strong></div><div><span>Status</span><strong>{result.pass ? 'Passed' : 'Incomplete'}</strong></div></div><h3>Subject results</h3><div className="candidate-table-wrap"><table className="candidate-table"><thead><tr><th>Subject</th><th>Mark</th><th>Grade</th></tr></thead><tbody>{result.subjects.map((subject) => <tr key={subject.code}><td>{subject.name}</td><td>{typeof subject.mark === 'number' ? subject.mark : subject.mark || '—'}</td><td>{subject.grade}</td></tr>)}</tbody></table></div><button className="print-result" type="button" onClick={() => window.print()}>Print result</button></section>;
}
