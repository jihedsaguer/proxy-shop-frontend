import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../zud/auth/auth.store';

interface ProtectedRouteProps {
  requiredRole?: string;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  requiredPermission,
}) => {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  if (!isInitialized) {
    return null;
  }

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
