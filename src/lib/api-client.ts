import { useAuthStore } from '../store/auth.store.ts';

const baseUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

async function parseJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : undefined;
  } catch {
    return text;
  }
}

async function parseError(response: Response) {
  const data = await parseJson(response);
  const message = (data && (data.message || data.error)) || response.statusText;
  const error: any = new Error(message);
  error.status = response.status;
  error.data = data;
  return error;
}

export async function request(input: string, init: RequestInit = {}) {
  const store = useAuthStore.getState();
  const url = input.startsWith('http') ? input : `${baseUrl}${input}`;
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');

  if (store.accessToken) {
    headers.set('Authorization', `Bearer ${store.accessToken}`);
  }

  const response = await fetch(url, { ...init, headers });

  if (response.status === 401) {
    const isRefreshCall = url.endsWith('/auth/refresh');
    if (isRefreshCall) {
      // don't try to refresh when the refresh request itself failed
      throw await parseError(response);
    }

    // try refresh once
    try {
      await store.refresh();
    } catch (err) {
      store.logout();
      throw await parseError(response);
    }
    // retry original request
    const retryHeaders = new Headers(init.headers || {});
    retryHeaders.set('Content-Type', 'application/json');
    if (store.accessToken) {
      retryHeaders.set('Authorization', `Bearer ${store.accessToken}`);
    }
    const retry = await fetch(url, { ...init, headers: retryHeaders });
    if (!retry.ok) {
      throw await parseError(retry);
    }
    return parseJson(retry);
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return parseJson(response);
}

// convenience helpers
export const get = (url: string) => request(url, { method: 'GET' });
export const post = (url: string, body?: any) =>
  request(url, { method: 'POST', body: JSON.stringify(body) });
export const put = (url: string, body?: any) =>
  request(url, { method: 'PUT', body: JSON.stringify(body) });
export const del = (url: string) => request(url, { method: 'DELETE' });
