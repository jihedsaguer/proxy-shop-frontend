import { get, post, put, del } from '../../lib/api-client';
import type { Role } from '../../types';

export const fetchRoles = (): Promise<Role[]> => get('/roles');
export const createRole = (data: Partial<Role>): Promise<Role> =>
  post('/roles', data);
export const updateRole = (
  id: string,
  data: Partial<Role>,
): Promise<Role> => put(`/roles/${id}`, data);
export const deleteRole = (id: string): Promise<void> => del(`/roles/${id}`);
