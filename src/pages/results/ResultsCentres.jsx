import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listCentres } from '../../api/client';
import './necta.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ResultsCentres() {
  const { type = 'csee', year } = useParams();
  const navigate = useNavigate();
  const [centres, setCentres] = useState(null);
  const [q, setQ] = useState('');
  const [council, setCouncil] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [indexNumber, setIndexNumber] = useState('');
  const [indexError, setIndexError] = useState('');

  useEffect(() => { listCentres().then(setCentres); }, []);
  const councils = useMemo(() => [...new Set((centres || []).map((c) => c.council))].sort(), [centres]);
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = (centres || []).filter((c) => !council || c.council === council)
      .filter((c) => !term || `${c.name} ${c.code}`.toLowerCase().includes(term)).sort((a, b) => a.name.localeCompare(b.name));
    return list.reduce((all, c) => { (all[c.name[0].toUpperCase()] ||= []).push(c); return all; }, {});
  }, [centres, q, council]);

  const visible = Object.values(groups).flat();
  function findCandidate(event) {
    event.preventDefault();
    const value = indexNumber.trim().toUpperCase();
    if (!/^S\d{4}\/\d{4}$/.test(value)) {
      setIndexError('Enter the index number in this format: S0101/0001');
      return;
    }
    setIndexError('');
    navigate(`/results/type/${type}/year/${year}/candidate?cno=${encodeURIComponent(value)}`);
  }
  return <div className="regional-results">
    <header className="regional-header"><div className="regional-header-inner"><Link className="regional-brand" to="/results"><span className="regional-logo">K</span><span><strong>KIGOMA REGION</strong><small>EXAMINATION RESULTS PORTAL</small></span></Link><nav><Link to="/">Home</Link><span>/</span><Link to="/results">Results</Link><span>/</span><b>{type.toUpperCase()} {year}</b></nav></div></header>
    <main className="regional-main">
      <div className="regional-hero"><div><p className="regional-eyebrow">KIGOMA REGIONAL EXAMINATIONS · {type.toUpperCase()} {year}</p><h1>Examination results</h1><p>Choose an examination centre or find one candidate’s result directly.</p></div><div className="regional-actions"><button type="button" onClick={() => setSearchOpen((open) => !open)}>{searchOpen ? 'Close search' : 'Search by index number'}</button></div></div>
      {searchOpen && <form className="index-search-panel" onSubmit={findCandidate} noValidate><div><strong>Find a candidate result</strong><span>Enter the candidate’s index number to view an individual result slip.</span></div><div className="index-search-fields"><label htmlFor="index-number">Index number<input id="index-number" value={indexNumber} onChange={(event) => setIndexNumber(event.target.value)} placeholder="S0101/0001" autoFocus /></label><button type="submit">View result <b aria-hidden="true">→</b></button></div>{indexError && <p role="alert">{indexError}</p>}</form>}
      <section className="centre-directory">
        <div className="directory-heading"><div><p className="regional-eyebrow">CENTRE DIRECTORY</p><h2>Select examination centre</h2></div><span className="directory-count">{visible.length} centres</span></div>
        <div className="directory-toolbar"><label className="directory-search"><span>Search by centre name or number</span><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Lakeview Secondary or S0101" /></label><label className="directory-council"><span>Council</span><select value={council} onChange={(e) => setCouncil(e.target.value)}><option value="">All councils</option>{councils.map((c) => <option key={c}>{c}</option>)}</select></label></div>
        <nav className="regional-letters" aria-label="Centres A to Z">{LETTERS.map((l) => groups[l] ? <a key={l} href={`#letter-${l}`}>{l}</a> : <span key={l}>{l}</span>)}</nav>
        {!centres && <div className="directory-empty">Loading examination centres…</div>}
        {centres && !visible.length && <div className="directory-empty">No centre matches your search. Try a different name or council.</div>}
        <div className="centre-grid">{Object.keys(groups).sort().map((l) => <div key={l} id={`letter-${l}`} className="centre-letter-group"><h3>{l}</h3>{groups[l].map((c) => <Link className="centre-card" key={c.code} to={`/results/${c.code}?year=${year}&type=${type}`}><span className="centre-code">{c.code}</span><strong>{c.name}</strong><small>{c.council} <span>·</span> {c.ownership}</small><span className="centre-view">View results <b>→</b></span></Link>)}</div>)}</div>
      </section>
    </main>
  </div>;
}

