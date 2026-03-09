import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-slate-50 px-4 py-12">
      <Card className="w-full max-w-2xl p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Proxy Shop</h1>
          <p className="text-gray-600 mb-6">
            Admin portal for managing users, roles and permissions. Log in to continue.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/login">
              <Button className="w-full sm:w-auto">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="w-full sm:w-auto">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
