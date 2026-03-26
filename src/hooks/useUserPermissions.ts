import { useAuthStore } from '../zud/auth/auth.store';
import type { UserRole } from '../config/routes';

/**
 * Hook to check user permissions and roles
 * Provides utilities to check if user has required roles/permissions
 */
export const useUserPermissions = () => {
  const { user } = useAuthStore();

  const getUserRole = (): UserRole | null => {
    if (!user) return null;

    // Check if user role name indicates admin
    if (user.role?.name?.toLowerCase() === 'admin') {
      return 'admin';
    }

    return 'user';
  };

  const hasRole = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    const userRole = getUserRole();
    return userRole !== null && requiredRoles.includes(userRole);
  };

  const isAdmin = (): boolean => {
    return getUserRole() === 'admin';
  };

  const canAccess = (requiredRoles?: UserRole[]): boolean => {
    if (!requiredRoles || requiredRoles.length === 0) return !!user;
    return hasRole(requiredRoles);
  };

  return {
    user,
    userRole: getUserRole(),
    hasRole,
    isAdmin,
    canAccess,
  };
};
