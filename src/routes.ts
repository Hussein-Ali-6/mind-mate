/**
 * An array of routes accessible to the public.
 * These routes do not require authentication.
 */
export const publicRoutes = ["/"];

/**
 * An array of routes used for authentication.
 * These routes will redirect logged in user to /settings.
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Prefix for API authentication routes.
 * Routes start with this prefix are user for API authentication purposes.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 */
// export const DEFAULT_LOGIN_REDIRECT = "/settings";
