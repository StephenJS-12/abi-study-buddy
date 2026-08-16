/* POST /api/logout — drop the session cookie. */

import { clearedCookieHeader, json } from '../lib/auth.js';

export async function onRequestPost() {
  return json({ ok: true }, 200, { 'Set-Cookie': clearedCookieHeader() });
}
