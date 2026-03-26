import React from 'react';
import type { User } from '../../../types';
import { Button, Card } from '../../../components/ui';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onDelete: (userId: string) => void;
  onEdit?: (user: User) => void;
}

/**
 * UserTable Component
 * Displays users in a clean table format
 * Shows: email, name, phone, role, status, actions
 */

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  onDelete,
  onEdit,
}) => {
  if (loading && users.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading users...</div>
        </div>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">No users found</div>
        </div>
      </Card>
    );
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.phone || '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    {user.role.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
