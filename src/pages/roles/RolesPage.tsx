import React from 'react';
import { useRoles } from '../../features/roles/hooks';
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui';

const RolesPage: React.FC = () => {
  const { data, loading, error } = useRoles();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Button>New Role</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 ? (
        <p>No roles found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.description || ''}</TableCell>
                <TableCell>{r.permissions.map((p) => p.action).join(', ')}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RolesPage;
