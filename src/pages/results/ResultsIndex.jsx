import { Link } from 'react-router-dom';
import './picker.css';

const TYPES = [
  { id: 'csee', title: 'CSEE', name: 'Certificate of Secondary Education Examination', note: 'Ordinary level examination' },
  { id: 'acsee', title: 'ACSEE', name: 'Advanced Certificate of Secondary Education Examination', note: 'Advanced level examination' },
];

export default function ResultsIndex() {
  return (
    <div className="exam-picker">
      <header className="picker-header"><div className="picker-header-inner"><Link className="picker-title" to="/results"><span className="picker-mark">K</span><span>KIGOMA REGION <small>RESULTS PORTAL</small></span></Link><nav><Link to="/">Home</Link><span>/</span><Link to="/results">Results</Link></nav></div></header>
      <main className="picker-main">
        <div className="picker-steps"><span className="is-active">1</span><b>Examination type</b><i></i><span>2</span><b>Year</b><i></i><span>3</span><b>Centre</b></div>
        <div className="picker-intro"><p>Kigoma Regional Examination Results</p><h1>Choose examination type</h1><span>Select the examination you want to view results for</span></div>
        <section className="exam-cards exam-type-cards" aria-label="Examination types">
          {TYPES.map((type) => <Link className="exam-card" key={type.id} to={`/results/type/${type.id}`}><div className="exam-icon" aria-hidden="true"><span className="document-icon"><i></i><i></i><i></i></span></div><div className="exam-card-copy"><span className="exam-eyebrow">EXAMINATION</span><h2>{type.title}</h2><p className="exam-name">{type.name}</p><p className="exam-note">{type.note}</p></div><span className="exam-link">View results <b aria-hidden="true">→</b></span></Link>)}
        </section>
      </main>
      <footer className="picker-footer">National Examinations Council of Tanzania <span>·</span> Public results portal</footer>
    </div>
  );
}

