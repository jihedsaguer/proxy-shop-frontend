import { request } from '../lib/api-client';
import type { Permission, CreatePermissionDto, UpdatePermissionDto } from '../types';

/**
 * Permissions Service
 * Handles all permission-related API calls
 * Backend: permissions endpoints
 */

export const PermissionsService = {
  /**
   * Get all permissions
   * GET /permissions
   */
  async getAll(): Promise<Permission[]> {
    return request('/permissions', { method: 'GET' });
  },

  /**
   * Get a single permission by ID
   * GET /permissions/:id
   */
  async getById(id: string): Promise<Permission> {
    return request(`/permissions/${id}`, { method: 'GET' });
  },

  /**
   * Create a new permission
   * POST /permissions/create
   */
  async create(data: CreatePermissionDto): Promise<Permission> {
    return request('/permissions/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a permission
   * PATCH /permissions/:id
   */
  async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
    return request(`/permissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a permission
   * DELETE /permissions/:id
   */
  async delete(id: string): Promise<void> {
    return request(`/permissions/${id}`, { method: 'DELETE' });
  },
};
