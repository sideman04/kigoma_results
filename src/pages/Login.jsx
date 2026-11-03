import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO = [
  { label: 'Super admin', username: 'superadmin' },
  { label: 'Regional admin', username: 'region' },
  { label: 'Council admin', username: 'kasulu' },
  { label: 'School admin', username: 'lakeview' },
  { label: 'Teacher', username: 'teacher' },
];

const ROLE_HOME = {
  super_admin: '/super-admin',
  regional_admin: '/regional',
  council_admin: '/council',
  school_admin: '/school',
  teacher: '/teacher',
};

export default function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={ROLE_HOME[user.role] || '/dashboard'} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }
    setBusy(true);
    try {
      const signedIn = await signIn(username, password);
      const from = location.state?.from;
      const destination = from
        ? `${from.pathname}${from.search || ''}${from.hash || ''}`
        : (ROLE_HOME[signedIn.role] || '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <section className="login-hero">
        <div>
          <p className="login-kicker">Kigoma Region</p>
          <h1>Results, from marks entry to published slip.</h1>
          <p className="login-sub">
            Teachers enter marks, schools check them, councils and the region see how every school is doing.
          </p>
        </div>
        <svg className="waves" viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 100 30, 200 90, 300 60 S 500 30, 600 60 V160 H0Z" />
          <path d="M0 90 C 120 60, 220 120, 330 90 S 520 70, 600 95 V160 H0Z" />
          <path d="M0 120 C 100 100, 220 140, 330 118 S 500 110, 600 125 V160 H0Z" />
        </svg>
      </section>

      <section className="login-panel">
        <form onSubmit={onSubmit} className="login-form" noValidate>
          <h2>Sign in</h2>

          <label className="field">
            <span>Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoFocus />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="btn btn-primary" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="login-link">
            Looking for a student’s results? <Link to="/results">Check results</Link>
          </p>
        </form>

        <div className="demo-box">
          <p>
            <strong>Demo accounts</strong> (password <code>demo1234</code>). Pick one to fill the form:
          </p>
          <div className="demo-list">
            {DEMO.map((d) => (
              <button
                key={d.username}
                type="button"
                className="chip"
                onClick={() => {
                  setUsername(d.username);
                  setPassword('demo1234');
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
