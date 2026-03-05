export interface Permission {
  id: string;
  action: string;
  description?: string | null;
}

export interface Role {
  id: string;
  name: string;
  description?: string | null;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
