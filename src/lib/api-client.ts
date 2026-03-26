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

async function getAuthStore() {
  try {
    const mod = await import('../zud/auth/auth.store');
    return mod.useAuthStore;
  } catch {
    return null;
  }
}

async function ensureLogout() {
  const store = await getAuthStore();
  if (store) {
    store.getState().logout();
  }
}

async function updateTokens(accessToken: string, refreshToken: string) {
  const store = await getAuthStore();
  if (store) {
    store.setState({ accessToken, refreshToken });
  }
}

function getValidToken(key: string): string | null {
  const val = localStorage.getItem(key);
  return val && val !== 'null' && val !== 'undefined' ? val : null;
}

export async function request(input: string, init: RequestInit = {}) {
  const url = input.startsWith('http') ? input : `${baseUrl}${input}`;
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');

  const accessToken = getValidToken('accessToken');
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(url, { ...init, headers });

  if (response.status === 401) {
    const isRefreshCall = url.endsWith('/auth/refresh');
    if (isRefreshCall) {
      // don't try to refresh when the refresh request itself failed
      throw await parseError(response);
    }

    const refreshToken = getValidToken('refreshToken');
    if (!refreshToken) {
      await ensureLogout();
      throw await parseError(response);
    }

    try {
      const refreshUrl = `${baseUrl}/auth/refresh`;
      const refreshResp = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
body: JSON.stringify({ refreshToken: refreshToken }),
      });

      if (!refreshResp.ok) {
        const errorText = await refreshResp.text();
        throw new Error(`Refresh failed with status ${refreshResp.status}: ${errorText}`);
      }

      const refreshData = (await refreshResp.json()) as { accessToken: string; refreshToken: string };
      localStorage.setItem('accessToken', refreshData.accessToken);
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      await updateTokens(refreshData.accessToken, refreshData.refreshToken);
    } catch {
      await ensureLogout();
      throw await parseError(response);
    }

    // retry original request
    const retryHeaders = new Headers(init.headers || {});
    retryHeaders.set('Content-Type', 'application/json');
    const newAccessToken = getValidToken('accessToken');
    if (newAccessToken) {
      retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);
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
