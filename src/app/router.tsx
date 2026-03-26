import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import { ROUTES_CONFIG } from '../config/routes';

/**
 * Main Router Component
 * Routes are divided into:
 * - Public routes (home, login, register)
 * - Protected routes (require authentication and specific roles)
 */
const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      {ROUTES_CONFIG.filter((r) => r.isPublic).map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      {/* Protected Routes - requires authentication and role validation */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {ROUTES_CONFIG.filter((r) => r.isAuthRequired && !r.isPublic).map(
            (route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            )
          )}
        </Route>
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
