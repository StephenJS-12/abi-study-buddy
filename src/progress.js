/* Her save, held server-side.
 *
 * One key, one JSON blob, exactly like the browser storage it replaces. The
 * site is single-user by design (one shared password), so there is no
 * per-user partitioning to get wrong.
 *
 * Conflicts are settled by the client, not here: it compares the stored
 * `savedAt` against its own and keeps whichever is newer. The server's job is
 * to hold the blob honestly and refuse anything malformed, so that a broken
 * client cannot overwrite a good save with rubbish.
 */

import { json } from './auth.js';

const KEY = 'progress:v1';

/* Her whole save is a few kilobytes. Anything near this is not a save. */
const MAX_BYTES = 256 * 1024;

export async function progress(request, env) {
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);

  switch (request.method) {
    case 'GET': return read(env);
    case 'PUT': return write(request, env);
    case 'DELETE': return wipe(env);
    default: return json({ error: 'method_not_allowed' }, 405);
  }
}

async function read(env) {
  const raw = await env.PROGRESS.get(KEY);
  if (!raw) return json({ found: false });

  try {
    return json({ found: true, ...JSON.parse(raw) });
  } catch (e) {
    /* Corrupt stored value. Report it as absent so the app falls back to its
       local copy rather than refusing to load at all. */
    return json({ found: false, corrupt: true });
  }
}

async function write(request, env) {
  const text = await request.text();
  if (text.length > MAX_BYTES) return json({ error: 'too_large' }, 413);

  let incoming;
  try {
    incoming = JSON.parse(text);
  } catch (e) {
    return json({ error: 'bad_json' }, 400);
  }

  const data = incoming && incoming.data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return json({ error: 'bad_shape' }, 400);
  }

  /* A save with no points, no answers and no badges is what a freshly wiped
     browser looks like. Refusing to let that land on top of real progress
     means a second device that has not synced yet cannot erase her work.
     A deliberate wipe uses DELETE, which sits behind the typed confirmation. */
  const looksEmpty =
    !Number(data.points) &&
    !Number(data.totalAnswered) &&
    !Object.keys(data.badges || {}).length;

  if (looksEmpty && (await env.PROGRESS.get(KEY))) {
    return json({ ok: false, skipped: 'would_erase_progress' });
  }

  const record = { data, savedAt: new Date().toISOString() };
  await env.PROGRESS.put(KEY, JSON.stringify(record));
  return json({ ok: true, savedAt: record.savedAt });
}

async function wipe(env) {
  await env.PROGRESS.delete(KEY);
  return json({ ok: true });
}
