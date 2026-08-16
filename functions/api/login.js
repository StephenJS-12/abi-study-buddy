/* POST /api/login — exchange the shared password for a session cookie.
 *
 * A single password on a public URL will eventually be found by a scanner, so
 * attempts are counted per IP and throttled. The counter lives in KV with a
 * short expiry, which is enough to make guessing impractical without needing
 * any state of our own to clean up.
 */

import {
  issueToken, cookieHeader, json, missingConfig,
} from '../lib/auth.js';

const MAX_ATTEMPTS = 8;
const WINDOW_SECONDS = 15 * 60;

function sameSecret(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost({ request, env }) {
  const unconfigured = missingConfig(env);
  if (unconfigured) return unconfigured;

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const attemptKey = `login-attempts:${ip}`;

  let attempts = 0;
  if (env.PROGRESS) {
    attempts = Number(await env.PROGRESS.get(attemptKey)) || 0;
    if (attempts >= MAX_ATTEMPTS) {
      return json({ error: 'too_many_attempts' }, 429);
    }
  }

  let password = '';
  try {
    const body = await request.json();
    password = typeof body.password === 'string' ? body.password : '';
  } catch (e) {
    return json({ error: 'bad_request' }, 400);
  }

  if (!sameSecret(password, env.SITE_PASSWORD)) {
    if (env.PROGRESS) {
      await env.PROGRESS.put(attemptKey, String(attempts + 1), {
        expirationTtl: WINDOW_SECONDS,
      });
    }
    /* Deliberately vague, and deliberately the same shape for every wrong
       password — nothing here should help someone narrow down the real one. */
    return json({ error: 'wrong_password' }, 401);
  }

  if (env.PROGRESS) await env.PROGRESS.delete(attemptKey);

  const token = await issueToken(env.SESSION_SECRET);
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader(token) });
}
