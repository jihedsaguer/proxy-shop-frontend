import { useState, useCallback } from 'react';
import type { Role, CreateRoleDto, UpdateRoleDto, AssignPermissionsDto } from '../types';
import { RolesService } from '../services/roles.service';

/**
 * Custom hook for managing roles
 * Provides: fetch, create, update, delete with loading and error states
 */

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RolesService.getAll();
      setRoles(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch roles';
      setError(message);
      console.error('Error fetching roles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = useCallback(async (roleData: CreateRoleDto) => {
    try {
      setLoading(true);
      setError(null);
      const newRole = await RolesService.create(roleData);
      setRoles((prev) => [...prev, newRole]);
      return newRole;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create role';
      setError(message);
      console.error('Error creating role:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (id: string, roleData: UpdateRoleDto) => {
    try {
      setLoading(true);
      setError(null);
      const updatedRole = await RolesService.update(id, roleData);
      setRoles((prev) =>
        prev.map((r) => (r.id === id ? updatedRole : r))
      );
      return updatedRole;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update role';
      setError(message);
      console.error('Error updating role:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRole = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await RolesService.delete(id);
      setRoles((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete role';
      setError(message);
      console.error('Error deleting role:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const assignPermissions = useCallback(
    async (roleId: string, data: AssignPermissionsDto) => {
      try {
        setLoading(true);
        setError(null);
        const updatedRole = await RolesService.assignPermissions(roleId, data);
        setRoles((prev) =>
          prev.map((r) => (r.id === roleId ? updatedRole : r))
        );
        return updatedRole;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to assign permissions';
        setError(message);
        console.error('Error assigning permissions:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    assignPermissions,
  };
};
