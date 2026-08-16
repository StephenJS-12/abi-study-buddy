/* Abi's Study Buddy — moving progress between computers.

   Everything the site remembers lives in this browser's localStorage, which is tied
   to this browser on this machine. Copying the folder to another laptop copies the
   site but not a single point. This turns the saved progress into one line of text
   that can be sent by any means at all — message, email, notepad — and read back in
   on the other side.

   Why a text code and not a downloaded file: the site runs from file:// with no
   server, where downloads and file pickers are the parts browsers restrict hardest.
   Selecting text and pasting it always works, on any browser, with no permissions. */

var Transfer = (function () {

  var TAG = 'ABISTUDY1';        // bumped only if the payload shape ever changes
  var SEP = '.';

  /* ── base64 that survives any character ──
     The saved data is plain ASCII today, but a future note or topic title could
     easily carry an accent or an emoji, and btoa throws outright on those. Routing
     through percent-encoding converts to bytes first, which btoa can always take. */

  function toBase64(str) {
    var bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (m, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
    return btoa(bytes);
  }

  function fromBase64(b64) {
    var bytes = atob(b64), pct = '';
    /* Every byte is percent-encoded, not just the high ones: a literal '%' in the
       original data would otherwise be read back as the start of an escape. */
    for (var i = 0; i < bytes.length; i++) {
      var hex = bytes.charCodeAt(i).toString(16).toUpperCase();
      pct += '%' + (hex.length < 2 ? '0' + hex : hex);
    }
    return decodeURIComponent(pct);
  }

  /* djb2. Not security — this only has to catch a code that was copied short,
     which is by far the likeliest way a paste goes wrong. */
  function checksum(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) {
      h = ((h * 33) ^ str.charCodeAt(i)) >>> 0;
    }
    return h.toString(36);
  }

  /* Turns the current progress into the code to carry across. */
  function makeCode() {
    var payload = {
      app: TAG,
      saved: new Date().toISOString(),
      data: Store.snapshot()
    };
    var body = toBase64(JSON.stringify(payload));
    return TAG + SEP + body + SEP + checksum(body);
  }

  /* Reads a code without applying it, so the UI can say what is in there before
     anything is overwritten. Returns { ok, points, badges, saved } or { ok:false, why }. */
  function inspect(code) {
    var raw = String(code || '').replace(/\s+/g, '');       // paste often wraps lines
    if (!raw) return bad('There is nothing pasted in yet.');

    var parts = raw.split(SEP);
    if (parts.length !== 3 || parts[0] !== TAG) {
      return bad('That does not look like a progress code. It should be one long line starting with ' + TAG + '.');
    }
    if (checksum(parts[1]) !== parts[2]) {
      return bad('That code is incomplete — it looks like only part of it was copied. Go back and copy the whole thing.');
    }

    var payload;
    try {
      payload = JSON.parse(fromBase64(parts[1]));
    } catch (e) {
      return bad('That code could not be read. Copy a fresh one and try again.');
    }
    if (!payload || !payload.data) return bad('That code has no progress in it.');

    var d = payload.data;
    return {
      ok: true,
      data: d,
      points: Number(d.points) || 0,
      badges: d.badges ? countKeys(d.badges) : 0,
      correct: Number(d.totalCorrect) || 0,
      saved: payload.saved || null
    };
  }

  /* Applies an already-inspected code. Kept separate from inspect so nothing is
     overwritten until the confirm step has actually happened. */
  function apply(reading) {
    if (!reading || !reading.ok) return false;
    return Store.restore(reading.data);
  }

  function countKeys(obj) {
    var n = 0;
    for (var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) n++; }
    return n;
  }

  function bad(why) { return { ok: false, why: why }; }

  /* "8 August 2026", or null if the code predates saved dates. */
  function savedOn(iso) {
    if (!iso) return null;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  return {
    TAG: TAG,
    makeCode: makeCode,
    inspect: inspect,
    apply: apply,
    savedOn: savedOn,
    checksum: checksum,
    toBase64: toBase64,
    fromBase64: fromBase64
  };
})();
