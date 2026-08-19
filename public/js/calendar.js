/* Abi's Study Buddy — the calendar screen.
 *
 * Draws what Schedule.plan() works out. All the thinking is in schedule.js;
 * this file is markup, events, and one idea worth stating:
 *
 * EVERY CONTROL REBUILDS THE WHOLE PLAN.
 *
 *   There is no "apply" button anywhere on this screen. Changing a study day,
 *   a session count, a time or an exam date saves and immediately redraws the
 *   calendar underneath the panel she is still standing in. A scheduler whose
 *   changes need confirming is a scheduler she has to think about, and the
 *   point of this one is that she does not.
 *
 * Two views, because they answer different questions. The month grid answers
 * "am I going to be finished in time"; the week view answers "what am I doing
 * on Thursday". The month grid is a real seven-column calendar; the week view
 * stacks into rows on a phone and opens back out into columns on a laptop.
 */

var Calendar = (function () {

  var DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAY_LETTER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  /* Session lengths offered as buttons. Anything else she can reach by typing
     into the number of sessions instead — these are the ones people actually
     pick. */
  var LENGTHS = [30, 45, 60, 90, 120];

  /* View state lives here rather than in Store: which month she was looking at
     is not worth persisting, and restoring it would be surprising. */
  var view = 'month';
  var anchor = null;        // a 'YYYY-MM-DD' inside the month/week being shown
  var openDay = null;       // the day whose sessions are expanded under the grid
  var redraw = function () {};

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function init(onRedraw) { redraw = onRedraw; }

  /* ───────────────────────── module colours ─────────────────────────
     Deliberately not the tile accents. Those are pastel washes behind a big
     emoji; here the colour has to carry meaning on a chip five millimetres
     tall, so each module gets a strong hue and a matching tint. */
  var PALETTE = [
    { name: 'lilac',  ink: '#6E52B8', tint: '#EBE0FF', edge: '#D9C7FA' },
    { name: 'pink',   ink: '#C43D77', tint: '#FFE1EE', edge: '#FFC7DE' },
    { name: 'teal',   ink: '#1F7F66', tint: '#D7F6EB', edge: '#8FE3C8' },
    { name: 'sky',    ink: '#2F6FAF', tint: '#E4F1FF', edge: '#93C4F5' },
    { name: 'amber',  ink: '#9A6B00', tint: '#FFF3D1', edge: '#FFD667' }
  ];

  var colourOf = {};
  function assignColours(mods) {
    colourOf = {};
    for (var i = 0; i < mods.length; i++) {
      colourOf[mods[i].id] = PALETTE[i % PALETTE.length];
    }
  }
  function hue(moduleId) { return colourOf[moduleId] || PALETTE[0]; }

  /* ───────────────────────── the screen ───────────────────────── */

  function render(el) {
    var plan = Schedule.plan();
    var s = Schedule.settings();
    assignColours(plan.modules);

    if (!anchor) anchor = Schedule.todayYmd();

    var byDate = groupByDate(plan);

    el.innerHTML =
      warningsHtml(plan) +
      '<div class="cal">' +
        headerHtml() +
        (view === 'month' ? monthHtml(byDate) : weekHtml(byDate)) +
        dayPanelHtml(byDate) +
      '</div>' +
      summaryHtml(plan) +
      optionsHtml(s, plan);

    bind(el, plan);
  }

  /* Future sessions and completed ones share the calendar. A completed session
     sits on the day she finished it, which is usually not the day it had been
     planned for — that is the honest picture of how the term actually went. */
  function groupByDate(plan) {
    var map = {}, i;
    function push(item) {
      if (!map[item.date]) map[item.date] = [];
      map[item.date].push(item);
    }
    for (i = 0; i < plan.done.length; i++) push(plan.done[i]);
    for (i = 0; i < plan.sessions.length; i++) push(plan.sessions[i]);

    for (var k in map) {
      if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
      map[k].sort(function (a, b) {
        /* Completed sessions have no time of day, so they lead the day. */
        return String(a.time || '') < String(b.time || '') ? -1 : 1;
      });
    }
    return map;
  }

  /* ───────────────────────── header ───────────────────────── */

  function headerHtml() {
    var d = Schedule.parseYmd(anchor) || new Date();
    var label = view === 'month'
      ? Schedule.months[d.getMonth()] + ' ' + d.getFullYear()
      : weekLabel(d);

    return '<div class="cal-head">' +
      '<div class="cal-nav">' +
        '<button class="cal-arrow" type="button" data-step="-1" aria-label="Previous">‹</button>' +
        '<h2 class="cal-label">' + esc(label) + '</h2>' +
        '<button class="cal-arrow" type="button" data-step="1" aria-label="Next">›</button>' +
      '</div>' +
      '<div class="cal-tools">' +
        '<button class="cal-today" type="button" data-today="1">Today</button>' +
        '<div class="cal-views" role="group" aria-label="Calendar view">' +
          '<button class="cal-view' + (view === 'month' ? ' is-on' : '') + '" type="button" data-view="month">Month</button>' +
          '<button class="cal-view' + (view === 'week' ? ' is-on' : '') + '" type="button" data-view="week">Week</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function weekLabel(d) {
    var start = startOfWeek(d);
    var end = Schedule.addDays(start, 6);
    var a = start.getDate() + ' ' + Schedule.months[start.getMonth()].slice(0, 3);
    var b = end.getDate() + ' ' + Schedule.months[end.getMonth()].slice(0, 3);
    return a + ' – ' + b;
  }

  /* Weeks run Monday to Sunday, which is how a term is talked about even
     though Date.getDay() calls Sunday zero. */
  function startOfWeek(d) {
    var dow = d.getDay();
    return Schedule.addDays(d, dow === 0 ? -6 : 1 - dow);
  }

  /* ───────────────────────── month grid ───────────────────────── */

  function monthHtml(byDate) {
    var d = Schedule.parseYmd(anchor);
    var first = new Date(d.getFullYear(), d.getMonth(), 1);
    var gridStart = startOfWeek(first);
    var today = Schedule.todayYmd();
    var month = d.getMonth();

    var heads = '';
    for (var h = 0; h < 7; h++) {
      var dow = (h + 1) % 7;      // Monday first
      heads += '<div class="cal-dow"><span class="cal-dow-full">' + DAY_SHORT[dow] + '</span>' +
               '<span class="cal-dow-tiny">' + DAY_LETTER[dow] + '</span></div>';
    }

    var cells = '', cur = gridStart;
    for (var i = 0; i < 42; i++) {
      var key = Schedule.ymd(cur);
      var items = byDate[key] || [];
      var outside = cur.getMonth() !== month;

      cells += '<button class="cal-day' +
        (outside ? ' is-outside' : '') +
        (key === today ? ' is-today' : '') +
        (key === openDay ? ' is-open' : '') +
        '" type="button" data-day="' + key + '">' +
        '<span class="cal-date">' + cur.getDate() + '</span>' +
        dotsHtml(items) +
      '</button>';

      cur = Schedule.addDays(cur, 1);
      /* Stop once a whole ROW is finished and the next day has left the month,
         so a short month does not carry a blank sixth row. The row test is what
         matters: breaking mid-week would leave the grid with a number of cells
         that is not a multiple of seven, and every column below would shift. */
      if ((i + 1) % 7 === 0 && cur.getMonth() !== month) break;
    }

    return '<div class="cal-grid">' + heads + cells + '</div>';
  }

  /* Up to four dots, then a count. More than four on one day is possible but
     rare, and five dots on a phone-sized cell is a smudge. */
  function dotsHtml(items) {
    if (!items.length) return '<span class="cal-dots"></span>';
    var out = '', shown = Math.min(items.length, 4);
    for (var i = 0; i < shown; i++) {
      var c = hue(items[i].moduleId);
      /* A finished session is drawn as a ring rather than a filled dot, so a
         glance at the month separates what is left from what is behind her.
         The colour has to move from background to border for that, or every
         completed dot would come out the same grey whatever module it was. */
      out += items[i].done
        ? '<span class="cal-dot is-done" style="border-color:' + c.ink + '"></span>'
        : '<span class="cal-dot" style="background:' + c.ink + '"></span>';
    }
    if (items.length > shown) out += '<span class="cal-more">+' + (items.length - shown) + '</span>';
    return '<span class="cal-dots">' + out + '</span>';
  }

  /* ───────────────────────── week view ───────────────────────── */

  function weekHtml(byDate) {
    var start = startOfWeek(Schedule.parseYmd(anchor));
    var today = Schedule.todayYmd();
    var out = '';

    for (var i = 0; i < 7; i++) {
      var day = Schedule.addDays(start, i);
      var key = Schedule.ymd(day);
      var items = byDate[key] || [];

      var cards = '';
      for (var j = 0; j < items.length; j++) cards += cardHtml(items[j], true);
      if (!items.length) cards = '<p class="cal-empty">Nothing planned</p>';

      out += '<div class="cal-wday' + (key === today ? ' is-today' : '') + '">' +
        '<div class="cal-wday-head">' +
          '<span class="cal-wday-name">' + DAY_SHORT[day.getDay()] + '</span> ' +
          '<span class="cal-wday-num">' + day.getDate() + '</span>' +
        '</div>' +
        '<div class="cal-wday-body">' + cards + '</div>' +
      '</div>';
    }
    return '<div class="cal-week">' + out + '</div>';
  }

  /* ───────────────────────── one session ───────────────────────── */

  function cardHtml(item, compact) {
    var c = hue(item.moduleId);
    var done = !!item.done;

    return '<div class="cal-card' + (done ? ' is-done' : '') + (item.late ? ' is-late' : '') + '"' +
      ' style="--card-ink:' + c.ink + ';--card-tint:' + c.tint + ';--card-edge:' + c.edge + '">' +
      '<button class="cal-tick" type="button" data-tick="' + esc(item.key) + '"' +
        ' aria-pressed="' + (done ? 'true' : 'false') + '"' +
        ' title="' + (done ? 'Mark as not done' : 'Mark as studied') + '">' +
        (done ? '✓' : '') +
      '</button>' +
      '<button class="cal-card-body" type="button" data-topic="' + esc(item.topicId) +
        '" data-mod="' + esc(item.moduleId) + '">' +
        '<span class="cal-card-top">' +
          (item.time ? '<span class="cal-time">' + esc(item.time) + '</span>' : '') +
          '<span class="cal-pass">' + esc(item.passName) + '</span>' +
        '</span>' +
        '<span class="cal-card-title">' + esc(item.emoji || '') + ' ' + esc(item.title) + '</span>' +
        (compact ? '' : '<span class="cal-card-mod">' + esc(item.moduleCode) + '</span>') +
      '</button>' +
    '</div>';
  }

  /* The list under the month grid for whichever day she tapped. In week view
     the cards are already on screen, so this only appears for the month. */
  function dayPanelHtml(byDate) {
    if (view !== 'month' || !openDay) return '';
    var items = byDate[openDay] || [];
    var d = Schedule.parseYmd(openDay);
    var title = DAY_SHORT[d.getDay()] + ' ' + d.getDate() + ' ' + Schedule.months[d.getMonth()];

    var cards = '';
    for (var i = 0; i < items.length; i++) cards += cardHtml(items[i], false);
    if (!items.length) cards = '<p class="cal-empty">Nothing planned for this day.</p>';

    return '<div class="cal-daypanel">' +
      '<div class="cal-daypanel-head">' +
        '<h3>' + esc(title) + '</h3>' +
        '<button class="cal-daypanel-x" type="button" data-closeday="1" aria-label="Close">×</button>' +
      '</div>' + cards +
    '</div>';
  }

  /* ───────────────────────── warnings and summary ───────────────────────── */

  function warningsHtml(plan) {
    if (!plan.warnings.length) return '';
    var rows = '';
    for (var i = 0; i < plan.warnings.length; i++) {
      rows += '<li>' + esc(plan.warnings[i].text) + '</li>';
    }
    return '<div class="cal-warn">' +
      '<h3>⚠️ This will not all fit</h3>' +
      '<ul>' + rows + '</ul>' +
      '<p>Add a study day, add a session per day, or move the exam date if it is wrong.</p>' +
    '</div>';
  }

  function summaryHtml(plan) {
    var s = Schedule.settings();
    var mods = plan.modules, rows = '', i;

    for (i = 0; i < mods.length; i++) {
      var m = mods[i];
      var topics = Schedule.topicsFor(m.id);
      var doneFirst = 0;
      for (var t = 0; t < topics.length; t++) {
        if (Schedule.isDone(topics[t].id, 1)) doneFirst++;
      }
      var pct = topics.length ? Math.round((doneFirst / topics.length) * 100) : 0;
      var c = hue(m.id);
      var exam = s.exams[m.id];

      rows += '<div class="cal-sum" style="--card-ink:' + c.ink + ';--card-tint:' + c.tint + '">' +
        '<div class="cal-sum-top">' +
          '<span class="cal-sum-chip"></span>' +
          '<b>' + esc(m.code) + '</b>' +
          (exam ? '<span class="cal-sum-exam">exam ' + esc(Schedule.pretty(exam)) + '</span>' : '') +
        '</div>' +
        '<div class="cal-sum-track"><div class="cal-sum-fill" style="width:' + pct + '%"></div></div>' +
        '<p class="cal-sum-line">' + doneFirst + ' of ' + topics.length + ' topics covered once</p>' +
      '</div>';
    }

    return '<div class="cal-sums">' + rows + '</div>';
  }

  /* ───────────────────────── the options panel ───────────────────────── */

  function optionsHtml(s, plan) {
    return '<details class="cal-opts">' +
      '<summary class="cal-opts-head">' +
        '<span class="cal-opts-emoji">⚙️</span>' +
        '<span>Change when I study</span>' +
        '<span class="cal-opts-caret">▾</span>' +
      '</summary>' +
      '<div class="cal-opts-body">' +
        daysHtml(s) +
        blockHtml('weekday', 'Weekdays', s.weekday) +
        blockHtml('weekend', 'Weekends', s.weekend) +
        examsHtml(s, plan) +
        focusHtml(plan) +
      '</div>' +
    '</details>';
  }

  function daysHtml(s) {
    var chips = '';
    for (var i = 0; i < 7; i++) {
      var dow = (i + 1) % 7;
      var on = false;
      for (var j = 0; j < s.days.length; j++) if (s.days[j] === dow) on = true;
      chips += '<button class="cal-chip' + (on ? ' is-on' : '') + '" type="button"' +
        ' data-day-toggle="' + dow + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
        DAY_SHORT[dow] + '</button>';
    }
    return '<div class="cal-opt">' +
      '<h4>Which days do you study?</h4>' +
      '<div class="cal-chips">' + chips + '</div>' +
    '</div>';
  }

  function blockHtml(which, label, cfg) {
    var lens = '';
    for (var i = 0; i < LENGTHS.length; i++) {
      lens += '<button class="cal-chip' + (cfg.minutes === LENGTHS[i] ? ' is-on' : '') + '" type="button"' +
        ' data-len="' + which + ':' + LENGTHS[i] + '">' + LENGTHS[i] + 'm</button>';
    }

    var times = '';
    for (var t = 0; t < cfg.count; t++) {
      times += '<label class="cal-timerow">' +
        '<span>Session ' + (t + 1) + '</span>' +
        '<input class="cal-time-in" type="time" value="' + esc(cfg.times[t]) + '"' +
          ' data-time="' + which + ':' + t + '">' +
      '</label>';
    }

    return '<div class="cal-opt">' +
      '<h4>' + esc(label) + '</h4>' +
      '<div class="cal-row">' +
        '<span class="cal-row-label">Sessions a day</span>' +
        '<div class="cal-stepper">' +
          '<button type="button" data-count="' + which + ':-1" aria-label="Fewer sessions">−</button>' +
          '<b>' + cfg.count + '</b>' +
          '<button type="button" data-count="' + which + ':1" aria-label="More sessions">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="cal-row cal-row-wrap">' +
        '<span class="cal-row-label">How long each</span>' +
        '<div class="cal-chips">' + lens + '</div>' +
      '</div>' +
      '<div class="cal-times">' + times + '</div>' +
    '</div>';
  }

  function examsHtml(s, plan) {
    var rows = '';
    for (var i = 0; i < plan.modules.length; i++) {
      var m = plan.modules[i];
      rows += '<label class="cal-timerow">' +
        '<span>' + esc(m.code) + '</span>' +
        '<input class="cal-time-in" type="date" value="' + esc(s.exams[m.id] || '') + '"' +
          ' data-exam="' + esc(m.id) + '">' +
      '</label>';
    }
    return '<div class="cal-opt">' +
      '<h4>Exam dates</h4>' +
      '<p class="cal-hint">Sessions are packed in before these. Leave blank if you do not know yet.</p>' +
      rows +
    '</div>';
  }

  /* The revision picker. Anything flagged here is revised FIRST in every
     revision round, so if time runs short the topics she is worried about are
     already behind her rather than in the sessions that got cut. */
  function focusHtml(plan) {
    var groups = '';
    for (var i = 0; i < plan.modules.length; i++) {
      var m = plan.modules[i];
      var topics = Schedule.topicsFor(m.id);
      var chips = '', on = 0;
      for (var t = 0; t < topics.length; t++) {
        var isOn = Schedule.isFocus(topics[t].id);
        if (isOn) on++;
        chips += '<button class="cal-chip cal-chip-wide' + (isOn ? ' is-on' : '') + '" type="button"' +
          ' data-focus="' + esc(topics[t].id) + '" aria-pressed="' + (isOn ? 'true' : 'false') + '">' +
          esc(topics[t].emoji || '') + ' ' + esc(topics[t].title) + '</button>';
      }
      groups += '<details class="cal-focusmod">' +
        '<summary>' + esc(m.code) + ' <span class="chip">' + on + ' picked</span></summary>' +
        '<div class="cal-chips cal-chips-col">' + chips + '</div>' +
      '</details>';
    }

    return '<div class="cal-opt">' +
      '<h4>Revise these first</h4>' +
      '<p class="cal-hint">Anything you pick here comes first in every revision round.</p>' +
      groups +
    '</div>';
  }

  /* ───────────────────────── events ─────────────────────────
     Every handler ends in redraw(), because every one of them changes the plan.
     The options panel is a <details>, and its open state survives because the
     browser keeps it — nothing here has to remember it. */

  function bind(el, plan) {
    function each(sel, fn) {
      Array.prototype.forEach.call(el.querySelectorAll(sel), fn);
    }

    each('[data-step]', function (b) {
      b.addEventListener('click', function () {
        var step = Number(b.getAttribute('data-step'));
        var d = Schedule.parseYmd(anchor);
        if (view === 'month') {
          anchor = Schedule.ymd(new Date(d.getFullYear(), d.getMonth() + step, 1));
        } else {
          anchor = Schedule.ymd(Schedule.addDays(d, step * 7));
        }
        openDay = null;
        redraw();
      });
    });

    each('[data-today]', function (b) {
      b.addEventListener('click', function () {
        anchor = Schedule.todayYmd();
        openDay = null;
        redraw();
      });
    });

    each('[data-view]', function (b) {
      b.addEventListener('click', function () {
        view = b.getAttribute('data-view');
        openDay = null;
        redraw();
      });
    });

    each('[data-day]', function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-day');
        openDay = (openDay === key) ? null : key;
        redraw();
      });
    });

    each('[data-closeday]', function (b) {
      b.addEventListener('click', function () { openDay = null; redraw(); });
    });

    /* Ticking. The key carries the topic and the pass, so one handler covers
       first passes and every revision round alike. */
    each('[data-tick]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-tick').split('|');
        var topicId = bits[0], pass = Number(bits[1]);
        var now = Schedule.isDone(topicId, pass);
        Schedule.setDone(topicId, pass, !now);
        if (!now && window.Celebrate && Store.motionOn()) Celebrate.tick(b);
        redraw();
      });
    });

    /* Tapping the card itself opens that topic's notes, in its own module. */
    each('[data-topic]', function (b) {
      b.addEventListener('click', function () {
        var topicId = b.getAttribute('data-topic');
        var modId = b.getAttribute('data-mod');
        if (window.App && App.openTopic) App.openTopic(modId, topicId);
      });
    });

    each('[data-day-toggle]', function (b) {
      b.addEventListener('click', function () {
        var dow = Number(b.getAttribute('data-day-toggle'));
        var s = Schedule.settings(), out = [], found = false;
        for (var i = 0; i < s.days.length; i++) {
          if (s.days[i] === dow) { found = true; continue; }
          out.push(s.days[i]);
        }
        if (!found) out.push(dow);
        /* Refusing the last day is kinder than accepting it and drawing an
           empty calendar she then has to work out how to fix. */
        if (!out.length) return;
        out.sort(function (a, b2) { return a - b2; });
        Schedule.update({ days: out });
        redraw();
      });
    });

    each('[data-count]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-count').split(':');
        var s = Schedule.settings();
        var blk = s[bits[0]];
        var next = blk.count + Number(bits[1]);
        if (next < 1 || next > 8) return;
        blk.count = next;
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        redraw();
      });
    });

    each('[data-len]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-len').split(':');
        var s = Schedule.settings();
        var blk = s[bits[0]];
        blk.minutes = Number(bits[1]);
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        redraw();
      });
    });

    each('[data-time]', function (inp) {
      inp.addEventListener('change', function () {
        var bits = inp.getAttribute('data-time').split(':');
        var s = Schedule.settings();
        var blk = s[bits[0]];
        blk.times[Number(bits[1])] = inp.value || blk.times[Number(bits[1])];
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        redraw();
      });
    });

    each('[data-exam]', function (inp) {
      inp.addEventListener('change', function () {
        var s = Schedule.settings();
        var id = inp.getAttribute('data-exam');
        if (inp.value) s.exams[id] = inp.value; else delete s.exams[id];
        Schedule.update({ exams: s.exams });
        redraw();
      });
    });

    each('[data-focus]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-focus');
        Schedule.setFocus(id, !Schedule.isFocus(id));
        redraw();
      });
    });
  }

  return {
    init: init,
    render: render,
    /* So the rest of the app can drop her straight onto today. */
    goToday: function () { anchor = Schedule.todayYmd(); openDay = null; }
  };
})();
