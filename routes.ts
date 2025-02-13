/**
 * Array of routes that are publicly accessible without authentication.
 * These routes can be accessed by any user regardless of their authentication status.
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * Array of routes specific to authentication flows like login and registration.
 * These routes will redirect authenticated users to DEFAULT_LOGIN_REDIRECT.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * API route prefix used for authentication endpoints.
 * All authentication-related API routes will be prefixed with this value.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default path to redirect users after successful login.
 * Users will be automatically redirected to this route upon authentication.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
