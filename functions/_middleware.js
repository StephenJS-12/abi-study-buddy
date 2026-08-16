/* Abi's Study Buddy — the gate.
 *
 * This runs ahead of every request, including plain static files, so the site
 * cannot be read by anyone who has not entered the password. `_routes.json`
 * deliberately does NOT exclude the site's assets, because an excluded path
 * skips Functions entirely and would be served to anybody who guessed its URL.
 */

import { COOKIE, readCookie, tokenIsValid, missingConfig, json } from './lib/auth.js';

/* Reachable without a session. Kept to the bare minimum needed to render the
   password page and post the password back. */
const OPEN_PATHS = new Set(['/login.html', '/api/login', '/favicon.ico']);

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  const unconfigured = missingConfig(env);
  if (unconfigured) return unconfigured;

  if (OPEN_PATHS.has(url.pathname)) return next();

  const token = readCookie(request, COOKIE);
  if (await tokenIsValid(token, env.SESSION_SECRET)) return next();

  /* An API caller wants a status code it can act on; a browser wants the
     password page. Answering a fetch() with an HTML redirect would have the
     page silently parse the login form as if it were data. */
  if (url.pathname.startsWith('/api/')) {
    return json({ error: 'not_signed_in' }, 401);
  }

  const login = new URL('/login.html', url);
  if (url.pathname !== '/') login.searchParams.set('next', url.pathname + url.search);
  return Response.redirect(login.toString(), 302);
}
