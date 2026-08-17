/* POST /api/notify — things Stephen should hear about.
 * GET  /api/inbox  — the same things, if the email did not arrive.
 *
 * Two kinds so far: feedback Abi writes, and rewards she claims.
 *
 * Every item is written to storage first and emailed second. That order is
 * deliberate: email delivery depends on a third party, a valid key and a
 * working network, and none of those should be able to lose a message she
 * took the trouble to write. If the email fails the record is still there,
 * and /api/inbox will show it.
 */

import { json } from './auth.js';

const KIND_LABEL = { feedback: 'Feedback', claim: 'Reward claimed' };

const MAX_MESSAGE = 4000;
const KEEP = 60;            // most recent items retained
const INDEX_KEY = 'notify:index';

function text(value, limit) {
  return typeof value === 'string' ? value.slice(0, limit) : '';
}

function whenText(iso) {
  const d = new Date(iso);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  const mins = d.getUTCMinutes();
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} ` +
         `at ${d.getUTCHours()}:${mins < 10 ? '0' + mins : mins} UTC`;
}

/* Resend is the only provider wired up, but nothing outside this function
   knows that — swapping it later is a change in one place. Returns a reason
   string on failure rather than throwing, because a failed email must never
   fail the request that triggered it. */
async function sendEmail(env, subject, body) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return 'not_configured';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        /* Resend's shared sender works without owning a domain, but will only
           deliver to the address the Resend account was opened with. */
        from: env.NOTIFY_FROM || 'Abi\'s Study Buddy <onboarding@resend.dev>',
        to: [env.NOTIFY_EMAIL],
        subject,
        text: body,
      }),
    });

    if (response.ok) return null;
    const detail = await response.text().catch(() => '');
    return `http ${response.status}: ${detail.slice(0, 200)}`;
  } catch (e) {
    return String((e && e.message) || e);
  }
}

export async function notify(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'bad_json' }, 400);
  }

  const kind = KIND_LABEL[body.kind] ? body.kind : 'feedback';
  const message = text(body.message, MAX_MESSAGE).trim();
  if (!message) return json({ error: 'empty' }, 400);

  const item = {
    kind,
    message,
    context: text(body.context, 300),
    at: new Date().toISOString(),
  };

  /* Stored first. Whatever happens to the email, the message survives. */
  const index = JSON.parse((await env.PROGRESS.get(INDEX_KEY)) || '[]');
  index.unshift(item);
  await env.PROGRESS.put(INDEX_KEY, JSON.stringify(index.slice(0, KEEP)));

  const subject = kind === 'claim'
    ? `Abi claimed a reward: ${message}`
    : 'Feedback from Abi on her study site';

  const lines = [
    `${KIND_LABEL[kind]} — ${whenText(item.at)}`,
    '',
    message,
  ];
  if (item.context) lines.push('', `(from: ${item.context})`);

  const problem = await sendEmail(env, subject, lines.join('\n'));

  /* `ok` reports that the message is safely kept, which is what the page
     should tell her. Whether the email got out is Stephen's problem, and is
     reported separately rather than being dressed up as her failure. */
  return json({ ok: true, emailed: !problem, emailProblem: problem || undefined });
}

export async function inbox(env) {
  if (!env.PROGRESS) return json({ error: 'no_storage_bound' }, 503);
  const index = JSON.parse((await env.PROGRESS.get(INDEX_KEY)) || '[]');
  return json({ count: index.length, items: index });
}
