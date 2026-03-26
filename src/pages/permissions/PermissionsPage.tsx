import React, { useEffect, useState } from 'react';
import { PermissionsService } from '../../services/permissions.service';
import type { Permission, CreatePermissionDto } from '../../types';
import { Button, Card, Input } from '../../components/ui';

/**
 * PermissionsPage
 * Main page for permission management
 * - Display list of permissions
 * - Create new permission
 * - Delete permissions
 */

const PermissionsPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreatePermissionDto>({
    action: '',
    description: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch permissions on mount
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PermissionsService.getAll();
      setPermissions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch permissions';
      setError(message);
      console.error('Error fetching permissions:', err);
    } finally {
      setLoading(false);
    }
  };

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

    if (!formData.action.trim()) {
      setFormError('Permission action is required');
      return;
    }

    try {
      setLoading(true);
      const newPermission = await PermissionsService.create(formData);
      setPermissions((prev) => [...prev, newPermission]);
      setFormData({ action: '', description: '' });
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create permission';
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (permissionId: string) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      try {
        setLoading(true);
        await PermissionsService.delete(permissionId);
        setPermissions((prev) => prev.filter((p) => p.id !== permissionId));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete permission';
        setError(message);
        console.error('Error deleting permission:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Permissions</h1>
          <p className="text-gray-600 mt-1">Manage system permissions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : '+ New Permission'}
        </Button>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Create Permission Form */}
      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create New Permission</h3>
          
          {formError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                Action *
              </label>
              <Input
                type="text"
                id="action"
                name="action"
                value={formData.action}
                onChange={handleInputChange}
                placeholder="e.g., users.read, users.write"
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
                placeholder="Permission description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Permission'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Permissions List */}
      {loading && permissions.length === 0 ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading permissions...</div>
          </div>
        </Card>
      ) : permissions.length === 0 ? (
        <Card className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">No permissions found</div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr
                    key={permission.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">
                      {permission.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {permission.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(permission.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PermissionsPage;
