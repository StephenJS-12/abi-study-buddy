/* GET / PUT /api/progress — her save, held server-side.
 *
 * One key, one JSON blob, exactly like the browser storage it replaces. The
 * site is single-user by design (one shared password), so there is no per-user
 * partitioning to get wrong.
 *
 * Conflicts are resolved by the client, not here: it compares the stored
 * `savedAt` against its own and keeps whichever is newer. The server's job is
 * only to hold the blob honestly and to refuse anything malformed, so a broken
 * client cannot overwrite a good save with rubbish.
 */

import { json } from '../lib/auth.js';

const KEY = 'progress:v1';

/* Her whole save is a few kilobytes. Anything approaching this is not a save. */
const MAX_BYTES = 256 * 1024;

export async function onRequestGet({ env }) {
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);

  const raw = await env.PROGRESS.get(KEY);
  if (!raw) return json({ found: false });

  try {
    return json({ found: true, ...JSON.parse(raw) });
  } catch (e) {
    /* Stored value is corrupt. Report it as absent rather than throwing, so the
       app falls back to local storage instead of refusing to load. */
    return json({ found: false, corrupt: true });
  }
}

export async function onRequestPut({ request, env }) {
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);

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
     browser looks like. Refusing to let that overwrite real progress means a
     confused second device cannot silently erase her work — a deliberate wipe
     goes through /api/progress DELETE instead. */
  const looksEmpty =
    !Number(data.points) &&
    !Number(data.totalAnswered) &&
    !Object.keys(data.badges || {}).length;

  if (looksEmpty) {
    const existing = await env.PROGRESS.get(KEY);
    if (existing) return json({ ok: false, skipped: 'would_erase_progress' });
  }

  const record = { data, savedAt: new Date().toISOString() };
  await env.PROGRESS.put(KEY, JSON.stringify(record));
  return json({ ok: true, savedAt: record.savedAt });
}

/* Only reached by the deliberate "delete everything" flow, which already makes
   her type the confirmation phrase before it is called. */
export async function onRequestDelete({ env }) {
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);
  await env.PROGRESS.delete(KEY);
  return json({ ok: true });
}
