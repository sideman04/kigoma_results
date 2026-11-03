import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../utils/scope';
import Icon from './Icon';

const ALL = ['regional_admin', 'council_admin', 'school_admin', 'teacher'];
const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid', roles: ALL, end: true },
  { to: '/schools', label: 'Schools', icon: 'school', roles: ['regional_admin', 'council_admin'] },
  { to: '/students', label: 'Students', icon: 'users', roles: ['regional_admin', 'council_admin', 'school_admin'] },
  { to: '/marks', label: 'Marks entry', icon: 'edit', roles: ['school_admin', 'teacher'] },
];

export default function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const scopeText =
    user.role === 'council_admin' ? user.council : user.role === 'regional_admin' ? 'Kigoma Region' : null;

  return (
    <div className="shell">
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Kigoma Results</span>
        </div>

        <nav aria-label="Main">
          {NAV.filter((n) => n.roles.includes(user.role)).map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className="nav-link" onClick={() => setOpen(false)}>
              <Icon name={n.icon} />
              {n.label}
            </NavLink>
          ))}
          <a className="nav-link" href="/results" target="_blank" rel="noreferrer">
            <Icon name="search" />
            Public results page
          </a>
        </nav>

        <div className="sidebar-foot">
          <div className="who">
            <strong>{user.name}</strong>
            <span>{ROLE_LABELS[user.role]}</span>
            {scopeText && <span>{scopeText}</span>}
          </div>
          <button
            className="nav-link nav-button"
            onClick={() => {
              signOut();
              navigate('/login');
            }}
          >
            <Icon name="out" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <span className="topbar-title">{ROLE_LABELS[user.role]}</span>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
    </div>
  );
}
