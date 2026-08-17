/* Abi's Study Buddy — the settings drawer.
 *
 * Reached by the cog in the top bar, from any screen. Holds the things that
 * are about the app rather than about her revision: sending Stephen a note,
 * the celebrations switch, where her progress is being kept, and starting
 * over. These used to be scattered down the Progress screen, which is meant
 * to be about how she is doing, not about the machinery.
 */

var Settings = (function () {

  var hosted = location.protocol === 'http:' || location.protocol === 'https:';
  var drawer = null;
  var open = false;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function whenText(iso) {
    if (!iso) return null;
    var d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    var mins = d.getMinutes();
    return d.getDate() + ' ' + months[d.getMonth()] + ' at ' +
           d.getHours() + ':' + (mins < 10 ? '0' + mins : mins);
  }

  /* ── where her progress is being kept ──────────────────────────── */

  function savingSection() {
    var health = Store.health();
    var line;

    if (!health.ok) {
      line = 'This browser is refusing to save anything, so nothing you do here will ' +
             'survive closing the window. Show this to Stephen — it is a browser ' +
             'setting, not anything you did.';
    } else if (hosted && window.Cloud && Cloud.enabled()) {
      var sync = Cloud.status();
      var when = whenText(sync.savedAt);
      line = sync.problem
        ? 'Working offline at the moment. Everything is being kept on this device and ' +
          'will go up to your account as soon as you are back online.'
        : when
          ? 'Saved to your account, last at <b>' + when + '</b>. Sign in on your phone ' +
            'or another laptop with the same password and it will all be there.'
          : 'Saving to your account automatically. Sign in anywhere else with the same ' +
            'password and your progress follows you.';
    } else {
      var seen = whenText(health.lastSaved);
      line = seen
        ? 'Saved in this browser. Your progress from <b>' + seen + '</b> was found when ' +
          'you opened it, so it is surviving properly.'
        : 'Saved in this browser only. Nothing was found when you opened it — normal on ' +
          'a brand new device.';
    }

    return '<section class="set-block">' +
      '<h3>💾 Your progress</h3>' +
      '<p>' + line + '</p>' +
    '</section>';
  }

  /* ── the drawer ────────────────────────────────────────────────── */

  function html() {
    var motionOn = Store.motionOn();

    return '<div class="set-veil" id="setVeil"></div>' +
      '<aside class="set-panel" role="dialog" aria-modal="true" aria-label="Settings">' +
        '<div class="set-head">' +
          '<h2>Settings</h2>' +
          '<button class="set-close" type="button" id="setClose" aria-label="Close">×</button>' +
        '</div>' +

        '<div class="set-body">' +

          '<section class="set-block">' +
            '<h3>💌 Tell Stephen something</h3>' +
            '<p>Anything at all — something broken, something confusing, something you ' +
            'wish it did. It goes straight to him.</p>' +
            '<textarea class="set-text" id="setFeedback" rows="4" ' +
              'placeholder="What is on your mind?"></textarea>' +
            '<button class="btn btn-primary" type="button" id="setSend">Send it</button>' +
            '<p class="set-note" id="setNote"></p>' +
          '</section>' +

          '<section class="set-block">' +
            '<h3>✨ Celebrations</h3>' +
            '<p>The confetti, sparkles and little messages when you get one right.</p>' +
            '<div class="pillrow">' +
              '<button class="pill' + (motionOn ? ' is-on' : '') + '" type="button" data-motion="on">On ✨</button>' +
              '<button class="pill' + (motionOn ? '' : ' is-on') + '" type="button" data-motion="off">Off</button>' +
            '</div>' +
          '</section>' +

          savingSection() +

          '<section class="set-block set-danger">' +
            '<h3>Start completely fresh</h3>' +
            '<p>Permanently deletes your points, badges, streaks and every answer you ' +
            'have recorded. It cannot be undone.</p>' +
            '<button class="btn btn-danger" type="button" id="setWipe">Delete all my progress</button>' +
          '</section>' +

        '</div>' +
      '</aside>';
  }

  function toggle(force) {
    open = typeof force === 'boolean' ? force : !open;

    if (!open) {
      if (drawer) { drawer.parentNode.removeChild(drawer); drawer = null; }
      document.body.classList.remove('set-shown');
      return;
    }

    /* Rebuilt each time it opens rather than kept around, so the saving
       section always reflects the state now instead of whenever it was
       last drawn. */
    drawer = document.createElement('div');
    drawer.className = 'set-root';
    drawer.innerHTML = html();
    document.body.appendChild(drawer);
    document.body.classList.add('set-shown');

    document.getElementById('setVeil').addEventListener('click', function () { toggle(false); });
    document.getElementById('setClose').addEventListener('click', function () { toggle(false); });
    document.getElementById('setSend').addEventListener('click', sendFeedback);
    document.getElementById('setWipe').addEventListener('click', confirmWipe);

    Array.prototype.forEach.call(drawer.querySelectorAll('[data-motion]'), function (b) {
      b.addEventListener('click', function () {
        var on = b.getAttribute('data-motion') === 'on';
        Store.setMotion(on);
        document.body.classList.toggle('reduce-motion', !on);
        Array.prototype.forEach.call(drawer.querySelectorAll('[data-motion]'), function (o) {
          o.classList.toggle('is-on', o === b);
        });
        if (on) Celebrate.correct(1, b);        // instant proof it works again
      });
    });
  }

  function sendFeedback() {
    var box = document.getElementById('setFeedback');
    var note = document.getElementById('setNote');
    var button = document.getElementById('setSend');
    var message = box.value.trim();

    if (!message) {
      note.className = 'set-note is-bad';
      note.textContent = 'Write something first.';
      return;
    }

    if (!hosted) {
      note.className = 'set-note is-bad';
      note.textContent = 'This only works on the website, not the folder version.';
      return;
    }

    button.disabled = true;
    note.className = 'set-note';
    note.textContent = 'Sending…';

    Notify.send('feedback', message, 'Settings', function (ok) {
      note.className = 'set-note ' + (ok ? 'is-good' : 'is-bad');
      note.textContent = ok
        ? 'Sent — thank you. He will see it.'
        : 'Could not send just now. Check your internet and try again.';
      if (ok) box.value = '';
      button.disabled = false;
    });
  }

  function confirmWipe() {
    toggle(false);
    App.modal({
      title: '⚠️ Delete everything?',
      body: '<p>This will wipe your <b>' + Store.points() + ' points</b>, <b>' +
            Store.badgeCount() + ' badges</b> and all your answer history. There is no ' +
            'way to get it back.</p>' +
            '<p style="font-size:.9rem;color:var(--ink-soft)">To confirm, type ' +
            '<b style="color:var(--pink-600)">qwerty asdf</b> below.</p>',
      requireText: 'qwerty asdf',
      confirmLabel: 'Delete everything',
      confirmClass: 'btn-danger',
      onConfirm: function () {
        Store.wipe();
        /* Clears the account copy too — without it the next sync would pull
           everything straight back down and the delete would look as though
           it had silently failed. */
        if (window.Cloud && Cloud.enabled()) Cloud.wipe();
        document.body.classList.toggle('reduce-motion', !Store.motionOn());
        App.refreshPoints();
        App.go('home');
      }
    });
  }

  return {
    toggle: toggle,
    open: function () { toggle(true); }
  };
})();
