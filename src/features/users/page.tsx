import React from 'react';
import { useUsers } from './hooks';

const UsersPage: React.FC = () => {
  const { data, loading, error } = useUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* TODO: open create dialog */}
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          New
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 && <p>No users found.</p>}

      {data.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.firstName || ''} {u.lastName || ''}</td>
                <td className="px-4 py-2">{u.role.name}</td>
                <td className="px-4 py-2">{u.isActive ? '✔' : '✖'}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 mr-2">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPage;
