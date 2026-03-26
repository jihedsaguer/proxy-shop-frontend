# Proxy Shop Backend Documentation

This document describes the REST API of the `proxy-shop-backend` NestJS application and the underlying database schema. It is intended for frontend developers (e.g. building a Vite React client) and other backend contributors.

---

## Table of Contents

1. [General Information](#general-information)
2. [Authentication](#authentication)
   * [Login](#login)
   * [Register](#register)
   * [Refresh Token](#refresh-token)
   * [Logout](#logout)
3. [Users](#users)
   * [Create User](#create-user)
   * [List Users](#list-users)
   * [Get User](#get-user)
   * [Delete User](#delete-user)
4. [Roles](#roles)
   * [Create Role](#create-role)
   * [List Roles](#list-roles)
   * [Get Role](#get-role)
   * [Update Role](#update-role)
   * [Delete Role](#delete-role)
   * [Assign Permissions to Role](#assign-permissions-to-role)
5. [Permissions](#permissions)
   * [Create Permission](#create-permission)
   * [List Permissions](#list-permissions)
   * [Get Permission](#get-permission)
   * [Update Permission](#update-permission)
   * [Delete Permission](#delete-permission)
6. [Database Schema](#database-schema)
   * [Users Table](#users-table)
   * [Roles Table](#roles-table)
   * [Permissions Table](#permissions-table)
   * [Roles_Permissions Join Table](#roles_permissions-join-table)
   * [Relationships](#relationships)
7. [Notes & Conventions](#notes--conventions)

---

## General Information

The backend is built on [NestJS](https://nestjs.com/) with TypeORM for PostgreSQL (or another relational DB) as the ORM. Each module exposes a controller with standard REST methods. Authentication uses JWTs; after a successful login a token pair is returned. The `refreshToken` is stored on the user record and compared when requesting a new access token.

All endpoints that modify data or require users to be logged in should be protected with `JwtAuthGuard`. Role‑based guards are implemented but need to be applied where necessary (they exist under `common/guards`).

By default responses are JSON objects corresponding to the entity being handled. Errors conform to NestJS's standard exception filters.


## Authentication

### Login

- **URL:** `POST /auth/login`
- **Headers:** none
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "secret"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "accessToken": "<JWT>",
    "refreshToken": "<refresh-token>",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "...",
      "lastName": "...",
      "phone": "...",
      "role": { "id": "...", "name": "...", "permissions": [ ... ] },
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

### Register

- **URL:** `POST /auth/register`
- **Request Body:** same as `RegisterDto`:
  ```json
  {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890",        // optional
    "password": "secret123"
  }
  ```
- **Response:** Newly created user object (201 Created) with the same shape shown above (password excluded).

### Refresh Token

- **URL:** `POST /auth/refresh`
- **Request Body:**
  ```json
  { "refreshToken": "<token>" }
  ```
- **Response (200 OK):** new token pair and user info same as login.

### Logout

- **URL:** `POST /auth/logout`
- **Headers:** `Authorization: Bearer <access-token>`
- **Body:** none
- **Response:** 204 No Content. The server invalidates the stored refresh token for the user.


## Users

> **Note:** All user‑related endpoints currently are unprotected; add `JwtAuthGuard` or other guards as needed.

### Create User

- **URL:** `POST /users/create`
- **Body:** `CreateUserDto`:
  ```json
  {
    "email": "example@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "password": "password",
    "phone": "optional",
    "roleId": "uuid-of-role"           // optional; defaults may be applied
  }
  ```
- **Response:** newly created user (password not returned).

### List Users

- **URL:** `GET /users`
- **Response:** array of user objects.

### Get User

- **URL:** `GET /users/:id`
- **Response:** single user object.

### Delete User

- **URL:** `DELETE /users/:id`
- **Response:** deleted entity or confirmation.


## Roles

### Create Role

- **URL:** `POST /roles/create`
- **Body:** `CreateRoleDto`:
  ```json
  { "name": "admin", "description": "Administrator role" }
  ```
- **Response:** created role object.

### List Roles

- **URL:** `GET /roles`
- **Response:** array of roles w/ permissions.

### Get Role

- **URL:** `GET /roles/:id`
- **Response:** single role.

### Update Role

- **URL:** `PATCH /roles/:id`
- **Body:** `UpdateRoleDto` (fields optional)

### Delete Role

- **URL:** `DELETE /roles/:id`

### Assign Permissions to Role

- **URL:** `POST /roles/:id/permissions`
- **Body:**
  ```json
  { "permissionIds": [ "uuid1", "uuid2" ] }
  ```
- **Response:** updated role with new permissions.


## Permissions

### Create Permission

- **URL:** `POST /permissions/create`
- **Body:** `CreatePermissionDto`:
  ```json
  { "action": "users.read", "description": "Can read users" }
  ```

### List Permissions

- **URL:** `GET /permissions`
- **Response:** array of permission objects.

### Get Permission

- **URL:** `GET /permissions/:id`

### Update Permission

- **URL:** `PATCH /permissions/:id`
- **Body:** `UpdatePermissionDto` (optional fields).

### Delete Permission

- **URL:** `DELETE /permissions/:id`


## Database Schema

The application uses TypeORM entities which map to the following tables. Primary key type is `uuid`.

### Users table (`users`)

| Column       | Type     | Notes                                   |
|--------------|----------|-----------------------------------------|
| id           | uuid     | PK                                      |
| email        | varchar  | unique, not null                        |
| firstName    | varchar  | nullable                                |
| lastName     | varchar  | nullable                                |
| phone        | varchar  | nullable, unique                        |
| password     | varchar  | not selected by default (excluded)
| refreshToken | varchar  | nullable                                |
| role_id      | uuid     | FK → `roles.id`                         |
| isActive     | boolean  | default true                            |
| createdAt    | timestamp| auto-generated                          |
| updatedAt    | timestamp| auto-generated                          |

### Roles table (`roles`)

| Column      | Type     | Notes                        |
|-------------|----------|------------------------------|
| id          | uuid     | PK                           |
| name        | varchar  | unique                       |
| description | varchar  | nullable                     |

### Permissions table (`permissions`)

| Column      | Type     | Notes                        |
|-------------|----------|------------------------------|
| id          | uuid     | PK                           |
| action      | varchar  | unique                       |
| description | varchar  | nullable                     |

### Roles_Permissions join table (`roles_permissions`)

| Column        | Type | Notes                          |
|---------------|------|--------------------------------|
| role_id       | uuid | PK, FK → `roles.id`            |
| permission_id | uuid | PK, FK → `permissions.id`      |

### Relationships

- `User` has many-to-one relationship to `Role` (`role_id` foreign key). A role can have multiple users.
- `Role` and `Permission` are connected as many-to-many through the join table `roles_permissions`.
- `User` records include the `role` object eagerly by default.


## Notes & Conventions

* DTOs in the `dto` folders list the validation rules applied by `class-validator`.
* Passwords are hashed in the service layer; they are never returned in responses.
* Refresh token handling and expiry is managed in `AuthService` and configuration (`jwt` strategy).
* Guards such as `RolesGuard` and `PermissionsGuard` are available under `common/guards`; apply them to controllers or routes to protect endpoints based on role/permission metadata.
* When the frontend consumes the API:
  1. Call `/auth/login` to get tokens and user data.
  2. Store `accessToken` in memory (or secure storage) and use it as `Authorization: Bearer <token>` header.
  3. Use `refreshToken` to call `/auth/refresh` when the access token expires.
  4. Leverage user information (role, permissions) to show/hide UI elements.

---

This file should be kept up-to-date with any changes to endpoints or schema. The database schema above is derived from the TypeORM entity definitions in the `src/modules/*/entities` folder. See those files for exact TypeScript types and decorators.
