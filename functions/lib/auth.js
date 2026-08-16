/* Abi's Study Buddy — session cookie signing.
 *
 * One shared password guards the site. On success we hand back a cookie holding
 * nothing but an expiry, signed with a server-side secret. There is no session
 * store to keep in sync and nothing sensitive in the cookie itself — if the
 * signature checks out and the expiry has not passed, the visitor is in.
 *
 * Everything here uses WebCrypto, which the Workers runtime provides natively.
 */

export const COOKIE = 'asb_session';
const DAYS = 90;

const encoder = new TextEncoder();

function b64url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(secret, payload) {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return b64url(new Uint8Array(signature));
}

/* Constant-time string comparison.
   A plain === leaks how much of the value matched through how long it took to
   fail, which is enough to reconstruct a signature one character at a time. */
function sameSecret(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function issueToken(secret) {
  const expiry = String(Date.now() + DAYS * 24 * 60 * 60 * 1000);
  return `${expiry}.${await sign(secret, expiry)}`;
}

export async function tokenIsValid(token, secret) {
  if (!token) return false;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return false;

  const expiry = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  /* Check the signature before trusting the expiry for anything — an unsigned
     token could otherwise claim any expiry it liked. */
  if (!sameSecret(signature, await sign(secret, expiry))) return false;

  const expiresAt = Number(expiry);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function readCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
}

export function cookieHeader(token) {
  const maxAge = DAYS * 24 * 60 * 60;
  /* HttpOnly keeps it away from page scripts, so an XSS bug cannot read it.
     SameSite=Lax stops another site from riding the session in a form post. */
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearedCookieHeader() {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  });
}

/* A missing secret must lock the site, never open it. Both values are set as
   Cloudflare environment variables; if a deploy forgets one, every request
   should fail shut rather than silently letting the world in. */
export function missingConfig(env) {
  if (!env.SITE_PASSWORD || !env.SESSION_SECRET) {
    return json(
      { error: 'not_configured', detail: 'SITE_PASSWORD and SESSION_SECRET must be set.' },
      503,
    );
  }
  return null;
}
