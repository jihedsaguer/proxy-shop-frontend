import React from 'react';
import { usePermissions } from './hooks';

const PermissionsPage: React.FC = () => {
  const { data, loading, error } = usePermissions();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          New
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 && <p>No permissions found.</p>}

      {data.length > 0 && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.action}</td>
                <td className="px-4 py-2">{p.description || ''}</td>
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

export default PermissionsPage;
