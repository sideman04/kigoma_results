import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Students from './pages/Students';
import MarksEntry from './pages/MarksEntry';
import ResultsIndex from './pages/results/ResultsIndex';
import ResultsYears from './pages/results/ResultsYears';
import ResultsCentres from './pages/results/ResultsCentres';
import CentreResults from './pages/results/CentreResults';
import CandidateResult from './pages/results/CandidateResult';
import { superAdminRoutes } from './super-admin/routes';

const superAdminRoute = superAdminRoutes[0];

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />} />
      <Route path="/results" element={<ResultsIndex />} />
      <Route path="/results/type/:type" element={<ResultsYears />} />
      <Route path="/results/type/:type/year/:year" element={<ResultsCentres />} />
      <Route path="/results/type/:type/year/:year/candidate" element={<CandidateResult />} />
      <Route path="/results/year/:year" element={<ResultsCentres />} />
      <Route path="/results/:code" element={<CentreResults />} />

      {/* Staff pages (need login) */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="schools"
          element={<ProtectedRoute roles={['regional_admin', 'super_admin', 'council_admin']}><Schools /></ProtectedRoute>}
        />
        <Route
          path="students"
          element={<ProtectedRoute roles={['regional_admin', 'super_admin', 'council_admin', 'school_admin']}><Students /></ProtectedRoute>}
        />
        <Route
          path="marks"
          element={<ProtectedRoute roles={['super_admin', 'school_admin', 'teacher']}><MarksEntry /></ProtectedRoute>}
        />
      </Route>

      {/* Super Administrator pages (super_admin role only) */}
      <Route element={<ProtectedRoute roles={['super_admin']}><Outlet /></ProtectedRoute>}>
        <Route path={superAdminRoute.path} element={superAdminRoute.element}>
          {superAdminRoute.children.map((child) => (
            <Route
              key={child.path ?? 'index'}
              path={child.path}
              index={child.index}
              element={child.element}
            />
          ))}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
