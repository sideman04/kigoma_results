import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listCentres } from '../../api/client';
import './necta.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ResultsCentres() {
  const { type = 'csee', year } = useParams();
  const navigate = useNavigate();
  const [centres, setCentres] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [indexNumber, setIndexNumber] = useState('');
  const [indexError, setIndexError] = useState('');

  useEffect(() => { listCentres().then(setCentres); }, []);
  const visible = useMemo(() => (centres || [])
    .filter((centre) => !selectedLetter || centre.name.trim().toUpperCase().startsWith(selectedLetter))
    .sort((a, b) => a.name.localeCompare(b.name)), [centres, selectedLetter]);
  const rowsPerColumn = Math.ceil(visible.length / 3);
  const columns = Array.from({ length: 3 }, (_, index) =>
    visible.slice(index * rowsPerColumn, (index + 1) * rowsPerColumn)
  );

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
  return <div className="centres-page">
    <header className="centres-header">
      <p>CLICK ANY LETTER BELOW TO FILTER CENTRES BY ALPHABET</p>
      <nav className="centres-letters" aria-label="Filter centres by first letter">
        <button type="button" className={selectedLetter ? '' : 'is-selected'} aria-pressed={!selectedLetter} onClick={() => setSelectedLetter('')}>ALL CENTRES</button>
        {LETTERS.map((letter) => <button
          type="button"
          key={letter}
          className={selectedLetter === letter ? 'is-selected' : ''}
          aria-pressed={selectedLetter === letter}
          onClick={() => setSelectedLetter((current) => current === letter ? '' : letter)}
        >{letter}</button>)}
      </nav>
    </header>
    <main className="centres-main">
      {!centres && <p className="centres-message" role="status">Loading examination centres…</p>}
      {centres && !visible.length && <p className="centres-message">No centres found for {selectedLetter}.</p>}
      {centres && visible.length > 0 && <div className="centres-columns">
        {columns.map((column, index) => <div className="centres-column" key={index}>
          {column.map((centre) => <Link
            className="centres-entry"
            key={centre.code}
            to={`/results/${centre.code}?year=${year}&type=${type}`}
          >{centre.name.toUpperCase()} - {centre.code}</Link>)}
        </div>)}
      </div>}
      <details className="centres-candidate-search">
        <summary>Find a candidate by index number</summary>
        <form onSubmit={findCandidate} noValidate>
          <label htmlFor="index-number">Index number</label>
          <input id="index-number" value={indexNumber} onChange={(event) => setIndexNumber(event.target.value)} placeholder="S0101/0001" />
          <button type="submit">View result</button>
          {indexError && <p role="alert">{indexError}</p>}
        </form>
      </details>
    </main>
  </div>;
}
