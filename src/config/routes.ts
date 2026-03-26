import React from 'react';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import UsersPage from '../pages/users/UsersPage';
import RolesPage from '../pages/roles/RolesPage';
import PermissionsPage from '../pages/permissions/PermissionsPage';

export type UserRole = 'admin' | 'user';

export const USER_ROLES = {
  ADMIN: 'admin' as const,
  USER: 'user' as const,
};

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  label: string;
  requiredRoles?: UserRole[];
  isPublic?: boolean;
  isAuthRequired?: boolean;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
}

/**
 * Global routes configuration
 * - Public routes: accessible to everyone
 * - Auth required routes: accessible only to authenticated users with specific roles
 */
export const ROUTES_CONFIG: RouteConfig[] = [
  // Public Routes
  {
    path: '/',
    component: HomePage,
    label: 'Home',
    isPublic: true,
  },
  {
    path: '/login',
    component: LoginPage,
    label: 'Login',
    isPublic: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    label: 'Register',
    isPublic: true,
  },

  // Admin Routes (only admin users)
  {
    path: '/dashboard',
    component: DashboardPage,
    label: 'Dashboard',
    isAuthRequired: true,
    requiredRoles: ['admin'],
  },
  {
    path: '/users',
    component: UsersPage,
    label: 'Users',
    isAuthRequired: true,
    requiredRoles: ['admin'],
  },
  {
    path: '/roles',
    component: RolesPage,
    label: 'Roles',
    isAuthRequired: true,
    requiredRoles: ['admin'],
  },
  {
    path: '/permissions',
    component: PermissionsPage,
    label: 'Permissions',
    isAuthRequired: true,
    requiredRoles: ['admin'],
  },
];

/**
 * Get routes by role
 */
export const getRoutesByRole = (role?: UserRole): RouteConfig[] => {
  return ROUTES_CONFIG.filter((route) => {
    if (route.isPublic) return true;
    if (!route.requiredRoles) return role !== undefined;
    return route.requiredRoles.includes(role!);
  });
};

/**
 * Get route config by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return ROUTES_CONFIG.find((route) => route.path === path);
};

/**
 * Check if route requires authentication
 */
export const isRoutePublic = (path: string): boolean => {
  const route = getRouteByPath(path);
  return route?.isPublic ?? false;
};
