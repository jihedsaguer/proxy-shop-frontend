import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../zud/auth/auth.store';
import { useUserPermissions } from '../hooks/useUserPermissions';
import { getRouteByPath } from '../config/routes';

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
  const { canAccess } = useUserPermissions();
  const location = useLocation();

  if (!isInitialized) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check route-specific permissions from routes config
  const currentRoute = getRouteByPath(location.pathname);
  if (currentRoute?.requiredRoles && !canAccess(currentRoute.requiredRoles)) {
    return <Navigate to="/" replace />;
  }

  // Legacy role check support
  if (requiredRole && user?.role.name !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Legacy permission check support
  if (
    requiredPermission &&
    !user?.role.permissions.some((p) => p.action === requiredPermission)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
