/* Abi's Study Buddy — the Worker.
 *
 * Every request to the site lands here first, including requests for plain
 * files like /css/theme.css. That is what makes the password gate real: the
 * site's assets are handed out by env.ASSETS.fetch() only after a valid
 * session has been proved, never by the platform on its own.
 *
 * The `run_worker_first` setting in wrangler.jsonc is what routes asset
 * requests through here. Without it the platform answers them directly and
 * the gate is bypassed silently — see the comment on that setting.
 */

import {
  COOKIE, readCookie, tokenIsValid, missingConfig, json,
} from './auth.js';
import { login, logout } from './login.js';
import { progress } from './progress.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* A deploy that forgot a secret must lock the site, not publish it. */
    const unconfigured = missingConfig(env);
    if (unconfigured) return unconfigured;

    /* ── reachable without a session ───────────────────────────── */

    if (url.pathname === '/api/login') {
      return request.method === 'POST'
        ? login(request, env)
        : json({ error: 'method_not_allowed' }, 405);
    }

    /* The password page itself, and nothing else. It is deliberately
       self-contained so it needs no stylesheet from behind the gate. */
    if (url.pathname === '/login.html') return env.ASSETS.fetch(request);

    /* ── everything below needs a valid session ────────────────── */

    const signedIn = await tokenIsValid(readCookie(request, COOKIE), env.SESSION_SECRET);

    if (!signedIn) {
      /* A fetch() caller wants a status code it can react to. Answering it
         with the login page would have the app parse an HTML form as data. */
      if (url.pathname.startsWith('/api/')) {
        return json({ error: 'not_signed_in' }, 401);
      }
      const loginUrl = new URL('/login.html', url);
      if (url.pathname !== '/') {
        loginUrl.searchParams.set('next', url.pathname + url.search);
      }
      return Response.redirect(loginUrl.toString(), 302);
    }

    if (url.pathname === '/api/logout') {
      return request.method === 'POST'
        ? logout()
        : json({ error: 'method_not_allowed' }, 405);
    }

    if (url.pathname === '/api/progress') return progress(request, env);

    /* An unknown /api/ path is a bug in the app, not a page she asked for —
       say so rather than quietly serving the site's index. */
    if (url.pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);

    return env.ASSETS.fetch(request);
  },
};
