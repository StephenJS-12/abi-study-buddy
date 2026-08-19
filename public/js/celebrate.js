/* Abi's Study Buddy — celebration effects
   Confetti, sparkle bursts, hype words, badge toasts. Pure DOM, no libraries. */

var Celebrate = (function () {
  var layer = null;
  var COLOURS = ['#FF9EC4', '#B79CED', '#8FE3C8', '#FFD667', '#93C4F5', '#F0669F'];
  var SHAPES  = ['50%', '3px', '50% 0 50% 50%'];

  var HYPE = [
    'Yesss!', 'Nailed it!', 'Perfect!', 'Clever girl!', 'Spot on!',
    'Genius!', 'Brilliant!', 'Too easy!', 'Smashed it!', 'Look at you!'
  ];
  var HYPE_BIG = [
    'ON FIRE!', 'UNSTOPPABLE!', 'QUEEN!', 'INCREDIBLE!', 'LEGEND!'
  ];

  function L() {
    if (!layer) layer = document.getElementById('fxLayer');
    return layer;
  }

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  /* Deliberately NOT tied to prefers-reduced-motion. This machine has Windows
     animations disabled system-wide, which would otherwise silence every
     celebration — and the celebrations are the reason the site exists.
     The in-app toggle (Progress & badges) is the control that matters here. */
  function reduced() {
    return !Store.motionOn();
  }

  /* Confetti fountain from a point (defaults to just above centre) */
  function confetti(count, originX, originY) {
    var host = L();
    if (!host || reduced()) return;
    var w = window.innerWidth, h = window.innerHeight;
    var ox = originX == null ? w / 2 : originX;
    var oy = originY == null ? h * 0.42 : originY;

    for (var i = 0; i < count; i++) {
      var bit = document.createElement('div');
      bit.className = 'confetti';
      var size = rand(7, 14);
      bit.style.left = ox + 'px';
      bit.style.top = oy + 'px';
      bit.style.width = size + 'px';
      bit.style.height = size * rand(.6, 1.4) + 'px';
      bit.style.background = pick(COLOURS);
      bit.style.borderRadius = pick(SHAPES);
      bit.style.setProperty('--dx', rand(-w * .42, w * .42) + 'px');
      bit.style.setProperty('--dy', rand(h * .35, h * .8) + 'px');
      bit.style.setProperty('--rot', rand(-720, 720) + 'deg');
      bit.style.setProperty('--dur', rand(3100, 4000) + 'ms');
      host.appendChild(bit);
      (function (el) { setTimeout(function () { el.remove(); }, 4200); })(bit);
    }
  }

  /* Little sparkle stars bursting outward from a point */
  function sparkles(count, x, y) {
    var host = L();
    if (!host || reduced()) return;
    var glyphs = ['✦', '✧', '★', '✨', '·'];
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'sparkle';
      s.textContent = pick(glyphs);
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.color = pick(COLOURS);
      s.style.setProperty('--size', rand(14, 34) + 'px');
      var ang = rand(0, Math.PI * 2), dist = rand(50, 150);
      s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
      s.style.setProperty('--dur', rand(2700, 3200) + 'ms');
      host.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 3400); })(s);
    }
  }

  function hypeword(text) {
    var host = L();
    if (!host || reduced()) return;
    var el = document.createElement('div');
    el.className = 'hypeword';
    el.textContent = text;
    host.appendChild(el);
    setTimeout(function () { el.remove(); }, 3400);
  }

  return {
    /* Main hit: called on every correct answer. Scales with streak. */
    correct: function (streak, anchorEl) {
      var box = anchorEl && anchorEl.getBoundingClientRect
        ? anchorEl.getBoundingClientRect()
        : null;
      var cx = box ? box.left + box.width / 2 : window.innerWidth / 2;
      var cy = box ? box.top + box.height / 2 : window.innerHeight / 2;

      sparkles(streak >= 3 ? 16 : 10, cx, cy);

      if (streak >= 5) {
        confetti(90);
        hypeword(pick(HYPE_BIG));
      } else if (streak >= 3) {
        confetti(45);
        hypeword(pick(HYPE));
      } else {
        confetti(22);
        hypeword(pick(HYPE));
      }
    },

    /* Ticking a study session off the calendar. Deliberately the quietest
       celebration in here: no confetti and no hype word, because she may tick
       four sessions in a row and being shouted at four times is not a reward.
       A few sparkles where her thumb landed is enough to feel like something. */
    tick: function (anchorEl) {
      var box = anchorEl && anchorEl.getBoundingClientRect
        ? anchorEl.getBoundingClientRect()
        : null;
      var cx = box ? box.left + box.width / 2 : window.innerWidth / 2;
      var cy = box ? box.top + box.height / 2 : window.innerHeight / 2;
      sparkles(8, cx, cy);
    },

    /* Big finish for a completed quiz */
    finish: function (scorePct) {
      if (scorePct >= 80) {
        confetti(140);
        setTimeout(function () { confetti(80, window.innerWidth * .25, window.innerHeight * .35); }, 220);
        setTimeout(function () { confetti(80, window.innerWidth * .75, window.innerHeight * .35); }, 400);
      } else if (scorePct >= 50) {
        confetti(70);
      } else {
        confetti(30);
      }
    },

    /* Points bar reaching 50 */
    maxedOut: function () {
      confetti(200);
      hypeword('50/50!!');
      setTimeout(function () { confetti(120); }, 350);
    },

    /* A reward threshold has been crossed — louder than a badge, because this one
       is something Stephen actually has to do. */
    reward: function (emoji, title) {
      var t = document.createElement('div');
      t.className = 'toast toast-reward';
      t.innerHTML =
        '<span class="tf">' + emoji + '</span>' +
        '<span><span class="tt">Reward unlocked</span><br>' + title + '</span>';
      document.body.appendChild(t);
      confetti(110);
      hypeword('REWARD!');
      setTimeout(function () { t.remove(); }, 5200);
    },

    badge: function (emoji, name) {
      var t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML =
        '<span class="tf">' + emoji + '</span>' +
        '<span><span class="tt">Badge unlocked</span><br>' + name + '</span>';
      document.body.appendChild(t);
      confetti(60);
      setTimeout(function () { t.remove(); }, 4000);
    },

    confetti: confetti,
    sparkles: sparkles
  };
})();
