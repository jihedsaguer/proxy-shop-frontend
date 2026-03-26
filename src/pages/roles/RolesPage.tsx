import React, { useEffect, useState } from 'react';
import { useRoles } from '../../hooks/useRoles';
import type { CreateRoleDto } from '../../types';
import { Button, Card, Input } from '../../components/ui';

/**
 * RolesPage
 * Main page for role management
 * - Display list of roles
 * - Create new role
 */

const RolesPage: React.FC = () => {
  const {
    roles,
    loading,
    error,
    fetchRoles,
    createRole,
    deleteRole,
  } = useRoles();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateRoleDto>({
    name: '',
    description: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Role name is required');
      return;
    }

    try {
      await createRole(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create role';
      setFormError(message);
    }
  };

  const handleDelete = async (roleId: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(roleId);
      } catch (err) {
        console.error('Failed to delete role:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : '+ New Role'}
        </Button>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Create Role Form */}
      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Role</h3>
          
          {formError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Role Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Manager, Moderator"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Role description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Role'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Roles List */}
      {loading && roles.length === 0 ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading roles...</div>
          </div>
        </Card>
      ) : roles.length === 0 ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">No roles found</div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  {role.description && (
                    <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                  )}
                </div>
              </div>

              {/* Permissions Count */}
              <div className="mb-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    {role.permissions.length}
                  </span>{' '}
                  permission{role.permissions.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => console.log('Edit role:', role.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RolesPage;
