const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const SESSION_KEY = 'auth_token';

/**
 * Login with username and password.
 * On success, stores the JWT token in sessionStorage.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{access_token: string, token_type: string, expires_in: number}>}
 */
export async function login(username, password) {
  const body = new URLSearchParams({ username, password });

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Credenciales incorrectas');
  }

  const data = await response.json();
  sessionStorage.setItem(SESSION_KEY, data.access_token);
  return data;
}

/**
 * Logout: removes the token from sessionStorage.
 */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Returns the stored JWT token, or null if not logged in.
 * @returns {string|null}
 */
export function getToken() {
  return sessionStorage.getItem(SESSION_KEY);
}

/**
 * Returns true if a token is stored in sessionStorage.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return Boolean(getToken());
}

/**
 * Decodes a JWT payload without verifying the signature.
 * @param {string} token
 * @returns {object|null}
 */
export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
