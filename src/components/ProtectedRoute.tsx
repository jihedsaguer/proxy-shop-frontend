import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface ProtectedRouteProps {
  requiredRole?: string;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  requiredPermission,
}) => {
  const { isAuthenticated, user } = useAuthStore((s) => ({
    isAuthenticated: s.isAuthenticated,
    user: s.user,
  }));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role.name !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  if (
    requiredPermission &&
    !user?.role.permissions.some((p) => p.action === requiredPermission)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
