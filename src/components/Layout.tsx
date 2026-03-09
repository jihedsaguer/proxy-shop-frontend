import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../zud/auth/auth.store';

const Layout: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const perms = user?.role.permissions.map((p: any) => p.action) || [];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-8 text-lg font-bold">Admin</div>
        <nav className="flex-1">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="block py-2 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            {perms.includes('manage_users') && (
              <li>
                <Link
                  to="/users"
                  className="block py-2 hover:bg-gray-700"
                >
                  Users
                </Link>
              </li>
            )}
            {perms.includes('manage_roles') && (
              <li>
                <Link
                  to="/roles"
                  className="block py-2 hover:bg-gray-700"
                >
                  Roles
                </Link>
              </li>
            )}
            {perms.includes('manage_permissions') && (
              <li>
                <Link
                  to="/permissions"
                  className="block py-2 hover:bg-gray-700"
                >
                  Permissions
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
