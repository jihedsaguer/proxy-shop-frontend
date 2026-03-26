// ===== ENTITIES =====

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

// ===== DTOs - USERS =====

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  roleId?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  roleId?: string;
}

// ===== DTOs - ROLES =====

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export interface AssignPermissionsDto {
  permissionIds: string[];
}

// ===== DTOs - PERMISSIONS =====

export interface CreatePermissionDto {
  action: string;
  description?: string;
}

export interface UpdatePermissionDto {
  action?: string;
  description?: string;
}
