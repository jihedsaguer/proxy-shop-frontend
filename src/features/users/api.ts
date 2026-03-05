import { get, post, put, del } from '../../lib/api-client';
import type { User } from '../../types';

export const fetchUsers = (): Promise<User[]> => get('/users');
export const createUser = (data: Partial<User>): Promise<User> =>
  post('/users', data);
export const updateUser = (
  id: string,
  data: Partial<User>,
): Promise<User> => put(`/users/${id}`, data);
export const deleteUser = (id: string): Promise<void> => del(`/users/${id}`);
