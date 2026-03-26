import React, { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useRoles } from '../../hooks/useRoles';
import { UserTable } from '../../features/users/components/UserTable';
import { CreateUserForm } from '../../features/users/components/CreateUserForm';
import { Button } from '../../components/ui';

/**
 * UsersPage
 * Main page for user management
 * - Display list of users in table
 * - Create new user form
 * - Delete users
 */

const UsersPage: React.FC = () => {
  const {
    users,
    loading: usersLoading,
    error: usersError,
    fetchUsers,
    createUser,
    deleteUser,
  } = useUsers();

  const {
    roles,
    loading: rolesLoading,
    fetchRoles,
  } = useRoles();

  const [showForm, setShowForm] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const handleCreateUser = async (formData: Parameters<typeof createUser>[0]) => {
    try {
      await createUser(formData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage users and their roles</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          disabled={rolesLoading}
        >
          {showForm ? 'Close Form' : '+ New User'}
        </Button>
      </div>

      {/* Error Messages */}
      {usersError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {usersError}
        </div>
      )}

      {/* Create User Form */}
      {showForm && !rolesLoading && (
        <CreateUserForm
          roles={roles}
          onSubmit={handleCreateUser}
          loading={usersLoading}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Users Table */}
      <UserTable
        users={users}
        loading={usersLoading}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default UsersPage;
