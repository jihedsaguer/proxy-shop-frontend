import { request } from '../lib/api-client';
import type { User, CreateUserDto, UpdateUserDto } from '../types';

/**
 * Users Service
 * Handles all user-related API calls
 * Backend: auth, users endpoints
 */

export const UsersService = {
  /**
   * Get all users
   * GET /users
   */
  async getAll(): Promise<User[]> {
    return request('/users', { method: 'GET' });
  },

  /**
   * Get a single user by ID
   * GET /users/:id
   */
  async getById(id: string): Promise<User> {
    return request(`/users/${id}`, { method: 'GET' });
  },

  /**
   * Create a new user
   * POST /users/create
   */
  async create(data: CreateUserDto): Promise<User> {
    return request('/users/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a user
   * DELETE /users/:id
   */
  async delete(id: string): Promise<void> {
    return request(`/users/${id}`, { method: 'DELETE' });
  },

  /**
   * Update a user (optional - not in current backend but useful)
   * PATCH /users/:id (if implemented in backend)
   */
  async update(id: string, data: UpdateUserDto): Promise<User> {
    return request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};
