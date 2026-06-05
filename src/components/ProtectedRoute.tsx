import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
