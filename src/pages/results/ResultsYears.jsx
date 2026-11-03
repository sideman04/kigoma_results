import { Link, useParams } from 'react-router-dom';
import './picker.css';

const YEARS = ['2025', '2024', '2023'];

export default function ResultsYears() {
  const { type } = useParams();
  const examType = type.toUpperCase();
  return (
    <div className="exam-picker">
      <header className="picker-header"><div className="picker-header-inner"><Link className="picker-title" to="/results"><span className="picker-mark">K</span><span>KIGOMA REGION <small>RESULTS PORTAL</small></span></Link><nav><Link to="/">Home</Link><span>/</span><Link to="/results">Results</Link><span>/</span><span>{examType}</span></nav></div></header>
      <main className="picker-main">
        <div className="picker-steps"><span className="is-done">✓</span><b>Examination type</b><i></i><span className="is-active">2</span><b>Year</b><i></i><span>3</span><b>Centre</b></div>
        <div className="picker-intro"><p>KIGOMA REGIONAL RESULTS · {examType}</p><h1>Choose examination year</h1><span>Select a year to continue to examination centres</span></div>
        <section className="exam-cards year-cards" aria-label={`${examType} examination years`}>{YEARS.map((year) => <Link className="exam-card" to={`/results/type/${type}/year/${year}`} key={year}><div className="exam-icon" aria-hidden="true"><span className="document-icon"><i></i><i></i><i></i></span></div><div className="exam-card-copy"><span className="exam-eyebrow">{examType} RESULTS</span><h2>{year}</h2><p className="exam-name">Examination results</p></div><span className="exam-link">View results <b aria-hidden="true">→</b></span></Link>)}</section>
        <p className="picker-back"><Link to="/results">← Choose another examination type</Link></p>
      </main>
    </div>
  );
}

