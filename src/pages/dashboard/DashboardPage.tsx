import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../components/ui';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-gray-700">
            Welcome to the admin dashboard. Use the links below to manage users, roles and permissions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/users">
              <Button>View Users</Button>
            </Link>
            <Link to="/roles">
              <Button>View Roles</Button>
            </Link>
            <Link to="/permissions">
              <Button>View Permissions</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
