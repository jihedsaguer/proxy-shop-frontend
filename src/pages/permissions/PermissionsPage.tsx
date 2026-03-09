import React from 'react';
import { usePermissions } from '../../features/permissions/hooks';
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui';

const PermissionsPage: React.FC = () => {
  const { data, loading, error } = usePermissions();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <Button>New Permission</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 ? (
        <p>No permissions found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableCell>Action</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableHeader>
          <TableBody>
            {data.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.action}</TableCell>
                <TableCell>{p.description || ''}</TableCell>
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

export default PermissionsPage;
