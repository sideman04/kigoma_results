import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCentre } from '../../api/client';
import { DIVS } from '../../utils/centre';
import './result.css';

const SUBJECT_CODES = {
  CIV: '011',
  HIST: '012',
  GEO: '013',
  KISW: '021',
  ENGL: '022',
  PHYS: '031',
  CHEM: '032',
  BIO: '033',
  'B/MATH': '041',
};
const GRADE_POINTS = { A: 1, B: 2, C: 3, D: 4, F: 5 };
const COMPETENCIES = [
  { max: 1.5, grade: 'A', label: 'EXCELLENT' },
  { max: 2.5, grade: 'B', label: 'VERY GOOD' },
  { max: 3.5, grade: 'C', label: 'GOOD' },
  { max: 4.6, grade: 'D', label: 'SATISFACTORY' },
  { max: 5, grade: 'F', label: 'FAIL' },
];

function competencyFor(gpa) {
  if (!gpa) return { grade: 'N/A', label: 'NO DATA' };
  return COMPETENCIES.find(({ max }) => gpa <= max) || COMPETENCIES.at(-1);
}

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
  const subjectPerformance = subjects.map((subject) => {
    const gradePoints = Object.entries(subject.grades)
      .reduce((sum, [grade, count]) => sum + GRADE_POINTS[grade] * count, 0);
    const gpa = subject.sat ? gradePoints / subject.sat : 0;
    return {
      ...subject,
      examCode: SUBJECT_CODES[subject.code],
      name: subject.code === 'B/MATH' ? 'BASIC MATHEMATICS' : subject.name,
      gpa,
      competency: competencyFor(gpa),
    };
  }).sort((a, b) => a.examCode.localeCompare(b.examCode));
  const centreCompetency = competencyFor(gpa);
  const totalPassed = DIVS.filter((division) => division !== '0')
    .reduce((sum, division) => sum + summary[division], 0);

  return (
    <div className="result-page">
      <div className="necta-banner no-print">
        <p className="centre-exam-meta">
          <strong>{type.toUpperCase()} EXAMINATION</strong><span>{year}</span><span>KIGOMA REGION</span>
        </p>
        <nav className="centre-page-actions" aria-label="Page actions">
          <Link to={`/results/type/${type}/year/${year}`}>All centres</Link>
          <button type="button" onClick={() => window.print()}>Print page</button>
        </nav>
      </div>

      <main className="necta-page">
        <div className="centre-intro">
          <h1>{school.code} {school.name.toUpperCase()}</h1>
        </div>

        {wanted && !found && (
          <p className="necta-error" role="alert">
            Candidate {wanted} was not found at this centre. Check the number and try again.
          </p>
        )}

        <h3 className="table-title">DIVISION PERFORMANCE SUMMARY</h3>
        <div className="necta-scroll narrow-scroll division-scroll">
          <table className="necta-table narrow">
            <thead>
              <tr><th>SEX</th>{DIVS.map((division) => <th key={division}>{division}</th>)}</tr>
            </thead>
            <tbody>
              {divisionSummary.map((row) => (
                <tr key={row.sex}>
                  <td>{row.sex}</td>
                  {DIVS.map((division) => <td key={division}>{row[division]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="necta-scroll candidate-results-scroll">
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

        <section className="centre-performance" aria-label="Examination centre performance">
          <h3 className="performance-title">EXAMINATION CENTRE OVERALL PERFORMANCE</h3>
          <div className="necta-scroll">
            <table className="necta-table performance-overall">
              <tbody>
                <tr><td className="left">EXAMINATION CENTRE REGION</td><td colSpan="2">KIGOMA</td></tr>
                <tr><td className="left">TOTAL PASSED CANDIDATES</td><td colSpan="2">{totalPassed}</td></tr>
                <tr>
                  <td className="left">EXAMINATION CENTRE GPA</td>
                  <td>{gpa.toFixed(4)}</td>
                  <td className={`competency competency-${centreCompetency.grade}`}>
                    GRADE {centreCompetency.grade} ({centreCompetency.label})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="performance-title">EXAMINATION CENTRE DIVISION PERFORMANCE</h3>
          <div className="necta-scroll">
            <table className="necta-table performance-division">
              <thead>
                <tr>
                  <th>REGIST</th><th>ABSENT</th><th>SAT</th><th>WITHHELD</th><th>NO-CA</th><th>CLEAN</th>
                  {DIVS.map((division) => <th key={division}>DIV {division}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{summary.registered}</td><td>{summary.absent}</td><td>{summary.sat}</td>
                  <td>{summary.withheld}</td><td>{summary.noCa}</td><td>{summary.clean}</td>
                  {DIVS.map((division) => <td key={division}>{summary[division]}</td>)}
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="performance-title">EXAMINATION CENTRE SUBJECTS PERFORMANCE</h3>
          <div className="necta-scroll">
            <table className="necta-table performance-subjects">
              <thead>
                <tr>
                  <th>CODE</th><th className="left">SUBJECT NAME</th><th>REG</th><th>SAT</th><th>NO-CA</th>
                  <th>W/HD</th><th>CLEAN</th><th>PASS</th><th>GPA</th><th>COMPETENCY LEVEL</th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformance.map((subject) => (
                  <tr key={subject.code}>
                    <td>{subject.examCode}</td><td className="left">{subject.name}</td><td>{subject.reg}</td>
                    <td>{subject.sat}</td><td>{subject.noCa}</td><td>{subject.withheld}</td>
                    <td>{subject.clean}</td><td>{subject.pass}</td><td>{subject.gpa.toFixed(4)}</td>
                    <td className={`competency competency-${subject.competency.grade}`}>
                      GRADE {subject.competency.grade} ({subject.competency.label})
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
