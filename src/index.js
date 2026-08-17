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
import { tutor } from './tutor.js';
import { notify, inbox } from './notify.js';

/* The login page, by both the name it has on disk and the name Cloudflare
   rewrites it to. The asset server normalises away the .html extension, so a
   browser sent to /login.html is bounced to /login — and if the Worker only
   recognised the first spelling it would send it straight back, forever. */
const LOGIN_PATHS = new Set(['/login', '/login.html']);

/* Serves a file from public/, absorbing any redirect the asset server issues
   on the way rather than passing it back to the browser.

   Those redirects are what caused an infinite loop: the platform rewrites
   /login.html to /login for tidiness, the browser follows it, and the Worker
   sees a path it was not expecting. Resolving them in here means the Worker's
   idea of a path is the only one the browser ever acts on. */
async function serveAsset(env, request, pathname) {
  let target = new URL(pathname || new URL(request.url).pathname, request.url);

  for (let hop = 0; hop < 3; hop++) {
    const response = await env.ASSETS.fetch(new Request(target, request));
    if (response.status < 300 || response.status >= 400) return response;

    const location = response.headers.get('Location');
    if (!location) return response;
    target = new URL(location, target);
  }

  return new Response('The site could not resolve that file.', { status: 508 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* Deliberately ahead of the config check, and deliberately open: when the
       site is locked because a secret is missing, this is the one thing that
       can still say WHICH one. It reports only whether each binding arrived —
       never a value, never a length, so it gives away nothing worth having.
       This is also the only endpoint a stranger can read, so it says as little
       as it can while still being able to answer that question.

       `seen` used to list every key on env. That named the services behind the
       site to anyone who asked, which is free reconnaissance for no benefit —
       the named checks below already cover everything a deploy can get wrong. */
    if (url.pathname === '/api/health') {
      return json({
        ok: true,
        sitePassword: Boolean(env.SITE_PASSWORD),
        sessionSecret: Boolean(env.SESSION_SECRET),
        progressStore: Boolean(env.PROGRESS),
        tutorKey: Boolean(env.ANTHROPIC_API_KEY),
        emailKey: Boolean(env.RESEND_API_KEY),
        emailTo: Boolean(env.NOTIFY_EMAIL),
        assets: Boolean(env.ASSETS),
      });
    }

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
    if (LOGIN_PATHS.has(url.pathname)) return serveAsset(env, request, '/login.html');

    /* ── everything below needs a valid session ────────────────── */

    const signedIn = await tokenIsValid(readCookie(request, COOKIE), env.SESSION_SECRET);

    if (!signedIn) {
      /* A fetch() caller wants a status code it can react to. Answering it
         with the login page would have the app parse an HTML form as data. */
      if (url.pathname.startsWith('/api/')) {
        return json({ error: 'not_signed_in' }, 401);
      }
      /* Sent to the extensionless spelling, which is the one the asset server
         considers canonical — so nothing further rewrites it. */
      const loginUrl = new URL('/login', url);
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
    if (url.pathname === '/api/tutor') return tutor(request, env);
    if (url.pathname === '/api/notify') return notify(request, env);
    if (url.pathname === '/api/inbox') return inbox(env);

    /* An unknown /api/ path is a bug in the app, not a page she asked for —
       say so rather than quietly serving the site's index. */
    if (url.pathname.startsWith('/api/')) return json({ error: 'not_found' }, 404);

    return serveAsset(env, request);
  },
};
