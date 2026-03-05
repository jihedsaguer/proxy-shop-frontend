import { create } from 'zustand';
import type { AuthResponse, User } from '../types';
import { request } from '../lib/api-client';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<AuthResponse>;
  initializeFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((
  set: (partial: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)) => void,
  get: () => AuthState,
) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const res: AuthResponse = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
      isAuthenticated: true,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  },

  register: async (data: { email: string; password: string }) => {
    const res: AuthResponse = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
      user: res.user,
      isAuthenticated: true,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refresh: async () => {
    const state = get();
    if (!state.refreshToken) {
      throw new Error('no refresh token');
    }
    // perform fetch directly to avoid recursion in request helper
    const url = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '') + '/auth/refresh';
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: state.refreshToken }),
    });
    if (!resp.ok) {
      throw new Error('refresh failed');
    }
    const res: AuthResponse = await resp.json();
    set({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  },

  initializeFromStorage: async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
      try {
        await get().refresh();
        const me = await request('/auth/me');
        set({ user: me as User });
      } catch {
        get().logout();
      }
    }
  },
}));
