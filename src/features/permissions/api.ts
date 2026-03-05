import { get, post, put, del } from '../../lib/api-client';
import type { Permission } from '../../types';

export const fetchPermissions = (): Promise<Permission[]> =>
  get('/permissions');
export const createPermission = (
  data: Partial<Permission>,
): Promise<Permission> => post('/permissions', data);
export const updatePermission = (
  id: string,
  data: Partial<Permission>,
): Promise<Permission> => put(`/permissions/${id}`, data);
export const deletePermission = (id: string): Promise<void> =>
  del(`/permissions/${id}`);
