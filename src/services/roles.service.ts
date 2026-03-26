import { request } from '../lib/api-client';
import type { Role, CreateRoleDto, UpdateRoleDto, AssignPermissionsDto } from '../types';

/**
 * Roles Service
 * Handles all role-related API calls
 * Backend: roles endpoints
 */

export const RolesService = {
  /**
   * Get all roles
   * GET /roles
   */
  async getAll(): Promise<Role[]> {
    return request('/roles', { method: 'GET' });
  },

  /**
   * Get a single role by ID
   * GET /roles/:id
   */
  async getById(id: string): Promise<Role> {
    return request(`/roles/${id}`, { method: 'GET' });
  },

  /**
   * Create a new role
   * POST /roles/create
   */
  async create(data: CreateRoleDto): Promise<Role> {
    return request('/roles/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a role
   * PATCH /roles/:id
   */
  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    return request(`/roles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a role
   * DELETE /roles/:id
   */
  async delete(id: string): Promise<void> {
    return request(`/roles/${id}`, { method: 'DELETE' });
  },

  /**
   * Assign permissions to a role
   * POST /roles/:id/permissions
   */
  async assignPermissions(roleId: string, data: AssignPermissionsDto): Promise<Role> {
    return request(`/roles/${roleId}/permissions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
