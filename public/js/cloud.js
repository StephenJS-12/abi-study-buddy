/* Abi's Study Buddy — keeping her progress on the server.
 *
 * The app still writes to browser storage exactly as it always did; this
 * mirrors that same blob up to her account so it follows her between the
 * laptop and her phone, and survives clearing browser data.
 *
 * Browser storage stays the immediate source of truth. Every point lands
 * locally the instant she earns it, and the upload happens a moment later in
 * the background — so a slow connection never makes the site feel slow, and
 * losing the connection entirely costs her nothing until she switches device.
 *
 * When opened from a folder rather than a URL there is no server to talk to,
 * so all of this switches itself off and the app behaves as it used to.
 */

var Cloud = (function () {

  var ENDPOINT = '/api/progress';

  /* Long enough that a burst of answers becomes one upload, short enough that
     closing the laptop straight after a question does not lose it. */
  var PUSH_DELAY = 1500;

  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  var timer = null;
  var queued = null;
  var sending = false;
  var lastSavedAt = null;
  var lastProblem = null;

  function enabled() { return hosted; }

  /* Session expiry is the one failure worth interrupting her for: everything
     else can retry quietly, but a dead session means nothing will ever save
     again until she signs back in. */
  function signedOut() {
    location.replace('/login?next=' + encodeURIComponent(location.pathname));
  }

  /* ── reconciling ───────────────────────────────────────────────── */

  /* Which copy wins. Pulled out as a plain function with no I/O in it because
     getting this wrong loses her work silently — it is the one piece here
     worth testing directly rather than inferring from behaviour.

     Both timestamps are ISO-8601 UTC, which sorts chronologically as plain
     text, so comparing them as strings is exact rather than convenient. */
  function decide(mine, theirs, foundRemote, haveLocalProgress) {
    if (!foundRemote) return haveLocalProgress ? 'send-local' : 'nothing';
    if (!theirs) return haveLocalProgress ? 'send-local' : 'nothing';

    /* A device that has never saved has no timestamp to compare, and must not
       be allowed to argue with one that has. */
    if (!mine) return 'take-remote';

    if (theirs > mine) return 'take-remote';
    if (mine > theirs) return 'send-local';
    return 'in-sync';
  }

  /* ── reading ───────────────────────────────────────────────────── */

  /* Loads the server's copy and reconciles it with what is already in this
     browser, newest wins. Always calls `done` — a server that is unreachable
     must leave her working offline, never staring at a blank page. */
  function pull(done) {
    if (!hosted) { done(); return; }

    fetch(ENDPOINT, { credentials: 'same-origin', cache: 'no-store' })
      .then(function (response) {
        if (response.status === 401) { signedOut(); return null; }
        if (!response.ok) throw new Error('http ' + response.status);
        return response.json();
      })
      .then(function (body) {
        if (!body) return;

        var mine = Store.snapshot().lastSaved || '';
        var haveLocal = !!(Store.points() || Store.get().totalAnswered);

        switch (decide(mine, body.savedAt, body.found, haveLocal)) {
          case 'take-remote':
            Store.restore(body.data);
            lastSavedAt = body.savedAt;
            break;
          case 'send-local':
            flush(Store.snapshot());
            break;
          case 'in-sync':
            lastSavedAt = body.savedAt;
            break;
        }
        lastProblem = null;
      })
      /* .then(null, fn) rather than .catch(fn): `catch` is a reserved word in
         ES3, and every file under public/js has to stay parseable by the
         JScript engine the test suite runs on. */
      .then(null, function (error) {
        lastProblem = String(error && error.message ? error.message : error);
      })
      .then(function () { done(); });
  }

  /* ── writing ───────────────────────────────────────────────────── */

  /* Called on every save. Coalesces a flurry of them into one upload. */
  function push(state) {
    if (!hosted) return;
    queued = state;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { timer = null; flush(queued); }, PUSH_DELAY);
  }

  function flush(state, useKeepalive) {
    if (!hosted || !state) return;

    /* One upload at a time. A second would race the first and could land the
       older of the two last. The queued state is not cleared, so whatever
       arrived while this was in flight goes up on the next save. */
    if (sending && !useKeepalive) return;
    sending = true;

    var options = {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: state })
    };

    /* keepalive lets the request outlive the page being closed, which is the
       only way the last answer of a session reaches the server. */
    if (useKeepalive) options.keepalive = true;

    return fetch(ENDPOINT, options)
      .then(function (response) {
        if (response.status === 401) { signedOut(); return null; }
        if (!response.ok) throw new Error('http ' + response.status);
        return response.json();
      })
      .then(function (body) {
        if (!body) return;
        if (body.savedAt) lastSavedAt = body.savedAt;
        /* The server refuses to let an empty save flatten a real one. That is
           a guard working, not an error — but it does mean this browser is
           behind, so pull the good copy back down. */
        if (body.skipped === 'would_erase_progress') pull(function () {});
        lastProblem = null;
      })
      /* .then(null, fn) rather than .catch(fn): `catch` is a reserved word in
         ES3, and every file under public/js has to stay parseable by the
         JScript engine the test suite runs on. */
      .then(null, function (error) {
        lastProblem = String(error && error.message ? error.message : error);
      })
      .then(function () { sending = false; });
  }

  /* Belt and braces for the end of a session: send whatever is still waiting
     before the page goes away. */
  function flushNow() {
    if (!hosted || !timer) return;
    clearTimeout(timer);
    timer = null;
    flush(queued, true);
  }

  function wipe(done) {
    if (!hosted) { if (done) done(); return; }
    if (timer) { clearTimeout(timer); timer = null; }
    queued = null;

    fetch(ENDPOINT, { method: 'DELETE', credentials: 'same-origin' })
      .then(null, function () {})
      .then(function () {
        lastSavedAt = null;
        if (done) done();
      });
  }

  function status() {
    return {
      hosted: hosted,
      savedAt: lastSavedAt,
      problem: lastProblem,
      waiting: !!timer
    };
  }

  if (hosted) {
    /* pagehide is the reliable one on mobile Safari, where a backgrounded tab
       may never fire unload at all. */
    window.addEventListener('pagehide', flushNow);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flushNow();
    });
  }

  return {
    enabled: enabled,
    decide: decide,
    pull: pull,
    push: push,
    wipe: wipe,
    flushNow: flushNow,
    status: status
  };
})();
