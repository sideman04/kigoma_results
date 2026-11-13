import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleHome } from '../roles/shared/config/roles';

export default function ProtectedRoute({
  children,
  roles,
  redirectTo,
}: {
  children?: React.ReactNode;
  roles?: string[];
  redirectTo?: string;
}) {
  const auth = useAuth() as any;
  const user = auth.user;
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) {
    // Send the user to the dashboard that belongs to their role, never to a
    // page they are not authorised to access.
    return <Navigate to={redirectTo || getRoleHome(user.role)} replace />;
  }
  return children;
}
