import { useState, useCallback } from 'react';
import type { User, CreateUserDto, UpdateUserDto } from '../types';
import { UsersService } from '../services/users.service';

/**
 * Custom hook for managing users
 * Provides: fetch, create, delete with loading and error states
 */

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await UsersService.getAll();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await UsersService.getById(id);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user';
      setError(message);
      console.error('Error fetching user:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: CreateUserDto) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await UsersService.create(userData);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setError(message);
      console.error('Error creating user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, userData: UpdateUserDto) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await UsersService.update(id, userData);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      console.error('Error updating user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await UsersService.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
