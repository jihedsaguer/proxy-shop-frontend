import React from 'react';
import { useUsers } from '../../features/users/hooks';
import { Button, Card, Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui';

const UsersPage: React.FC = () => {
  const { data, loading, error } = useUsers();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button>New User</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && data.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableHeader>
          <TableBody>
            {data.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.email}</TableCell>
                <TableCell>{`${u.firstName || ''} ${u.lastName || ''}`}</TableCell>
                <TableCell>{u.role.name}</TableCell>
                <TableCell>{u.isActive ? '✔' : '✖'}</TableCell>
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

export default UsersPage;
