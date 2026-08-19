/* Abi's Study Buddy — picking a round back up.
 *
 * A test she has not finished survives closing the browser. Quiz hands over a
 * snapshot after every question and again as the tab goes away; this keeps it,
 * and draws the card that offers it back to her on the two home screens.
 *
 * DEVICE-LOCAL ON PURPOSE
 *
 *   Not in Store, which syncs to her account. Two reasons. It is a large thing
 *   to push — the whole paper, up to about 40KB — and pushing it after every
 *   answer would put the questions she is sitting through the sync on every
 *   question. And a half-finished test appearing on her phone because she
 *   started one on the laptop is more startling than useful: "carry on where I
 *   left off" means this browser, on this device.
 *
 * THE WHOLE PAPER IS KEPT, NOT A LIST OF IDS
 *
 *   Rebuilding from question ids would have been smaller, and wrong. Options
 *   are shuffled per sitting, generated questions have no id to look up, and a
 *   deploy between saving and resuming could change a question underneath her.
 *   Keeping what she was actually shown means resuming gives her exactly the
 *   paper she left, whatever has happened since.
 *
 * WHAT IS NOT KEPT
 *
 *   A half-typed answer. She resumes at the start of the question she was on,
 *   not partway into it. Saving a partly-filled match dropdown or a number she
 *   was still typing would mean restoring input state for five question types
 *   to save her twenty seconds of retyping.
 */

var Resume = (function () {

  var KEY = 'abi.pausedTest';
  var VERSION = 1;

  /* Longer and it stops being "where I left off" and starts being a surprise.
     She would not remember the round, and the points for it are already banked
     either way. */
  var KEEP_DAYS = 14;

  var MODE_NAME = { practise: 'Practise round', test: 'Test', exam: 'Exam paper' };

  function save(snapshot) {
    if (!snapshot) return;
    snapshot.v = VERSION;
    snapshot.at = new Date().getTime();
    try {
      localStorage.setItem(KEY, JSON.stringify(snapshot));
    } catch (e) {
      /* Out of quota, or private browsing. Nothing to tell her: she has lost
         nothing she had, and every point already earned is in Store. */
    }
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  /* Returns the snapshot, or null. Anything that fails a check is dropped
     rather than handed on — a resume that half-works is worse than none, and
     the only thing lost is a round she can start again. */
  function load() {
    var raw;
    try { raw = localStorage.getItem(KEY); } catch (e) { return null; }
    if (!raw) return null;

    var s;
    try { s = JSON.parse(raw); } catch (e) { clear(); return null; }

    if (!s || s.v !== VERSION) { clear(); return null; }
    if (!s.questions || !s.questions.length) { clear(); return null; }
    if (!(s.idx >= 0) || s.idx >= s.questions.length) { clear(); return null; }
    if (!Modules.get(s.moduleId)) { clear(); return null; }

    var age = new Date().getTime() - (s.at || 0);
    if (age > KEEP_DAYS * 24 * 60 * 60 * 1000) { clear(); return null; }

    return s;
  }

  function has() { return !!load(); }

  /* Only the paused round for one module, for the module home screen. */
  function forModule(moduleId) {
    var s = load();
    return s && s.moduleId === moduleId ? s : null;
  }

  function esc(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* "just now", "2 hours ago", "yesterday". Enough for her to recognise the
     round without a date she would have to decode. */
  function ago(then) {
    var mins = Math.floor((new Date().getTime() - then) / 60000);
    if (mins < 2) return 'just now';
    if (mins < 60) return mins + ' minutes ago';
    var hours = Math.floor(mins / 60);
    if (hours === 1) return 'an hour ago';
    if (hours < 24) return hours + ' hours ago';
    var days = Math.floor(hours / 24);
    return days === 1 ? 'yesterday' : days + ' days ago';
  }

  /* `scope` is a module id on a module home screen, or null on the picker
     where every module is in view. Returns '' when there is nothing paused,
     so a screen can concatenate it unconditionally. */
  function bannerHtml(scope) {
    var s = scope ? forModule(scope) : load();
    if (!s) return '';

    var mod = Modules.get(s.moduleId);
    var total = s.questions.length;
    var pct = Math.round((s.idx / total) * 100);

    /* The module is named only where it could be any of them. Inside a module
       it would be repeating the page she is already on. */
    var where = scope ? '' : '<span class="rsm-mod">' + esc(mod.code) + '</span>';

    /* Deliberately not wearing the module's accent. This card has to be found
       at a glance among a dashboard and a grid of tiles that are all in the
       module's colour, so it uses the site's attention colour instead of
       blending into the screen it is sitting on. */
    return '<div class="rsm">' +
      '<span class="rsm-emoji" aria-hidden="true">⏸️</span>' +
      '<div class="rsm-text">' +
        '<div class="rsm-title">' + where +
          esc(MODE_NAME[s.mode] || 'Round') + ' waiting for you' +
        '</div>' +
        '<div class="rsm-line">' +
          '<b>' + s.idx + ' of ' + total + '</b> answered · paused ' + ago(s.at || 0) +
        '</div>' +
        '<div class="rsm-track"><div class="rsm-fill" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="rsm-acts">' +
        '<button class="btn btn-primary" type="button" data-rsm="go">Carry on</button>' +
        '<button class="btn btn-ghost btn-sm" type="button" data-rsm="drop">Discard</button>' +
      '</div>' +
    '</div>';
  }

  /* `onResume` is handed the snapshot; `onChange` is called after a discard so
     the screen can redraw without the card. */
  function bind(el, onResume, onChange) {
    var go = el.querySelector('[data-rsm="go"]');
    var drop = el.querySelector('[data-rsm="drop"]');

    if (go) {
      go.addEventListener('click', function () {
        var s = load();
        /* Re-read rather than closing over the snapshot the card was drawn
           from: between drawing and clicking she may have started a different
           round in another tab, and resuming a stale one would put her back
           into a paper she has already finished. */
        if (s) onResume(s);
      });
    }

    if (drop) {
      drop.addEventListener('click', function () {
        clear();
        if (onChange) onChange();
      });
    }
  }

  return {
    save: save,
    load: load,
    clear: clear,
    has: has,
    forModule: forModule,
    bannerHtml: bannerHtml,
    bind: bind
  };
})();
