/* Abi's Study Buddy — the calendar screen.
 *
 * Draws what Schedule.plan() works out. All the thinking is in schedule.js;
 * this file is markup, events, and three ideas worth stating:
 *
 * EVERY CONTROL REBUILDS THE WHOLE PLAN.
 *
 *   There is no "apply" button anywhere on this screen. Changing a study day,
 *   a session count, a time or an exam date saves and immediately redraws the
 *   calendar underneath the panel she is still standing in. A scheduler whose
 *   changes need confirming is a scheduler she has to think about, and the
 *   point of this one is that she does not.
 *
 * WHICH MEANS THE PANEL HAS TO SURVIVE THE REDRAW.
 *
 *   Redrawing throws away the DOM, and with it every <details open> and the
 *   scroll position. Changing one setting would slam the options panel shut
 *   and throw her back to the top of the page. So the open state and the
 *   scroll offset are held here and put back after every draw.
 *
 * A SESSION CAN HOLD MORE THAN ONE TOPIC.
 *
 *   Cards are laid out as a header row and then one row per topic, each with
 *   its own tick. That is also what fixes the week view: with the tick button
 *   above the title rather than beside it, the title gets the full width of
 *   the column instead of whatever is left after a 40px button.
 */

var Calendar = (function () {

  var DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DAY_LETTER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  /* Session lengths offered as buttons. Anything else she can reach by
     changing the number of sessions instead — these are the ones people
     actually pick. */
  var LENGTHS = [30, 45, 60, 90, 120];

  /* How many topic labels fit in a month cell before it turns into "+3". */
  var MONTH_LABELS = 3;

  /* View state lives here rather than in Store: which month she was looking
     at is not worth persisting, and restoring it would be surprising. */
  var view = 'month';
  var anchor = null;        // a 'YYYY-MM-DD' inside the month/week being shown
  var openDay = null;       // the day whose sessions are expanded under the grid
  var redraw = function () {};

  /* Kept across redraws — see the header. */
  var optsOpen = false;
  var focusOpen = {};
  var focusWeekOpen = {};
  var keepScroll = -1;

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function init(onRedraw) { redraw = onRedraw; }

  /* ───────────────────────── module colours ─────────────────────────
     Deliberately not the tile accents. Those are pastel washes behind a big
     emoji; here the colour has to carry meaning on a chip a few millimetres
     tall, so each module gets a strong hue and a matching tint. */
  var PALETTE = [
    { name: 'lilac', ink: '#6E52B8', tint: '#EFE7FF', edge: '#D9C7FA' },
    { name: 'pink',  ink: '#C43D77', tint: '#FFE7F1', edge: '#FFC7DE' },
    { name: 'teal',  ink: '#1F7F66', tint: '#DDF7EF', edge: '#8FE3C8' },
    { name: 'sky',   ink: '#2F6FAF', tint: '#E7F2FF', edge: '#93C4F5' },
    { name: 'amber', ink: '#8A6000', tint: '#FFF4D6', edge: '#FFD667' }
  ];

  var colourOf = {};
  function assignColours(mods) {
    colourOf = {};
    for (var i = 0; i < mods.length; i++) colourOf[mods[i].id] = PALETTE[i % PALETTE.length];
  }
  function hue(moduleId) { return colourOf[moduleId] || PALETTE[0]; }

  function vars(c) {
    return '--card-ink:' + c.ink + ';--card-tint:' + c.tint + ';--card-edge:' + c.edge;
  }

  /* ───────────────────────── the screen ───────────────────────── */

  function render(el) {
    /* Consumed on the way in, so a render always leaves it cleared. Leaving a
       value behind would mean the next unrelated draw jumped her somewhere. */
    var restore = keepScroll;
    keepScroll = -1;

    var plan = Schedule.plan();
    var s = Schedule.settings();
    assignColours(plan.modules);

    if (!anchor) anchor = Schedule.todayYmd();

    var byDate = groupByDate(plan);

    el.innerHTML =
      warningsHtml(plan) +
      promptHtml(plan) +
      '<div class="cal">' +
        headerHtml() +
        (view === 'month' ? monthHtml(byDate) : weekHtml(byDate)) +
        dayPanelHtml(byDate) +
      '</div>' +
      summaryHtml(plan) +
      optionsHtml(s, plan);

    bind(el, plan);

    if (restore > 0) window.scrollTo(0, restore);
  }

  /* Planned sessions, completed ones and exam days all share the calendar.
     A completed session sits on the day she finished it, which is usually not
     the day it had been planned for — that is the honest picture of how the
     term actually went. */
  function groupByDate(plan) {
    var map = {}, i;

    function push(item) {
      if (!map[item.date]) map[item.date] = [];
      map[item.date].push(item);
    }

    for (i = 0; i < plan.exams.length; i++) {
      push({ kind: 'exam', date: plan.exams[i].date, time: '', exam: plan.exams[i],
             moduleId: plan.exams[i].moduleId });
    }
    for (i = 0; i < plan.done.length; i++) {
      plan.done[i].kind = 'session';
      push(plan.done[i]);
    }
    for (i = 0; i < plan.sessions.length; i++) {
      plan.sessions[i].kind = 'session';
      push(plan.sessions[i]);
    }

    for (var k in map) {
      if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
      map[k].sort(function (a, b) {
        /* The exam is the fixed point of its day, so it leads. Completed
           sessions have no time of day and follow it. */
        if (a.kind !== b.kind) return a.kind === 'exam' ? -1 : 1;
        var at = String(a.time || ''), bt = String(b.time || '');
        return at < bt ? -1 : (at > bt ? 1 : 0);
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
    return start.getDate() + ' ' + Schedule.months[start.getMonth()].slice(0, 3) + ' – ' +
           end.getDate() + ' ' + Schedule.months[end.getMonth()].slice(0, 3);
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
    var cur = startOfWeek(first);
    var today = Schedule.todayYmd();
    var month = d.getMonth();

    var heads = '';
    for (var h = 0; h < 7; h++) {
      var dow = (h + 1) % 7;      // Monday first
      heads += '<div class="cal-dow"><span class="cal-dow-full">' + DAY_SHORT[dow] + '</span>' +
               '<span class="cal-dow-tiny">' + DAY_LETTER[dow] + '</span></div>';
    }

    var cells = '';
    for (var i = 0; i < 42; i++) {
      var key = Schedule.ymd(cur);
      var items = byDate[key] || [];
      var isExam = items.length && items[0].kind === 'exam';

      cells += '<button class="cal-day' +
        (cur.getMonth() !== month ? ' is-outside' : '') +
        (key === today ? ' is-today' : '') +
        (key === openDay ? ' is-open' : '') +
        (isExam ? ' is-examday' : '') +
        '" type="button" data-day="' + key + '">' +
        '<span class="cal-date">' + cur.getDate() + '</span>' +
        labelsHtml(items) +
        dotsHtml(items) +
      '</button>';

      cur = Schedule.addDays(cur, 1);
      /* Stop once a whole ROW is finished and the next day has left the month,
         so a short month does not carry a blank sixth row. The row test is what
         matters: breaking mid-week would leave a number of cells that is not a
         multiple of seven, and every column below would shift. */
      if ((i + 1) % 7 === 0 && cur.getMonth() !== month) break;
    }

    return '<div class="cal-grid">' + heads + cells + '</div>';
  }

  /* One entry per topic, so she can read what a day holds without opening it.
     Shown wherever the cells are wide enough; below that CSS hides these and
     shows the dots instead, because a truncated label three characters wide
     tells her less than a coloured dot does. */
  function labelsHtml(items) {
    if (!items.length) return '';
    var flat = flatten(items), out = '', shown = Math.min(flat.length, MONTH_LABELS);

    for (var i = 0; i < shown; i++) {
      var f = flat[i];
      if (f.kind === 'exam') {
        out += '<span class="cal-lab is-exam" style="' + vars(hue(f.moduleId)) + '">' +
               esc(f.text) + '</span>';
      } else {
        out += '<span class="cal-lab' + (f.done ? ' is-done' : '') + '" style="' +
               vars(hue(f.moduleId)) + '">' + esc(f.text) + '</span>';
      }
    }
    if (flat.length > shown) {
      out += '<span class="cal-lab-more">+' + (flat.length - shown) + ' more</span>';
    }
    return '<span class="cal-labels">' + out + '</span>';
  }

  /* The same day, reduced to one entry per topic. */
  function flatten(items) {
    var out = [], i, j;
    for (i = 0; i < items.length; i++) {
      if (items[i].kind === 'exam') {
        out.push({ kind: 'exam', moduleId: items[i].moduleId, text: items[i].exam.label, done: false });
        continue;
      }
      for (j = 0; j < items[i].items.length; j++) {
        var it = items[i].items[j];
        out.push({
          kind: 'topic',
          moduleId: items[i].moduleId,
          text: (it.emoji ? it.emoji + ' ' : '') + it.title,
          done: !!it.done
        });
      }
    }
    return out;
  }

  /* Up to five dots, then a count. This is what a phone-sized cell gets. */
  function dotsHtml(items) {
    var flat = flatten(items);
    if (!flat.length) return '<span class="cal-dots"></span>';
    var out = '', shown = Math.min(flat.length, 5);
    for (var i = 0; i < shown; i++) {
      var c = hue(flat[i].moduleId);
      if (flat[i].kind === 'exam') {
        out += '<span class="cal-dot is-exam" style="background:' + c.ink + '"></span>';
      } else if (flat[i].done) {
        /* A finished session is drawn as a ring rather than a filled dot, so a
           glance separates what is left from what is behind her. The colour
           has to move to the border for that, or every completed dot would
           come out the same grey whatever module it was. */
        out += '<span class="cal-dot is-done" style="border-color:' + c.ink + '"></span>';
      } else {
        out += '<span class="cal-dot" style="background:' + c.ink + '"></span>';
      }
    }
    if (flat.length > shown) out += '<span class="cal-more">+' + (flat.length - shown) + '</span>';
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
      for (var j = 0; j < items.length; j++) cards += blockHtmlFor(items[j]);
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

  /* ───────────────────────── one block ─────────────────────────
     A header row, then one row per topic. Putting the tick above the title
     rather than beside it is what lets a title use the full width of a narrow
     column — the old layout gave it whatever was left after a 40px button and
     a 130px column, which came to about four characters. */

  function blockHtmlFor(block) {
    return block.kind === 'exam' ? examHtml(block) : cardHtml(block);
  }

  function examHtml(block) {
    var c = hue(block.moduleId);
    return '<div class="cal-exam" style="' + vars(c) + '">' +
      '<span class="cal-exam-flag">EXAM</span>' +
      '<span class="cal-exam-body">' +
        '<b>' + esc(block.exam.moduleCode) + '</b>' +
        '<span class="cal-exam-title">' + esc(block.exam.moduleTitle || '') + '</span>' +
      '</span>' +
    '</div>';
  }

  function cardHtml(block) {
    var c = hue(block.moduleId);
    var rows = '', i;

    for (i = 0; i < block.items.length; i++) {
      var it = block.items[i];
      rows += '<div class="cal-item' + (it.done ? ' is-done' : '') + '">' +
        '<button class="cal-tick" type="button" data-tick="' + esc(it.key) + '"' +
          ' aria-pressed="' + (it.done ? 'true' : 'false') + '"' +
          ' title="' + (it.done ? 'Mark as not done' : 'Mark as studied') + '">' +
          (it.done ? '✓' : '') +
        '</button>' +
        '<button class="cal-item-body" type="button" data-topic="' + esc(it.topicId) +
          '" data-mod="' + esc(block.moduleId) + '">' +
          '<span class="cal-item-title">' + esc(it.emoji || '') + ' ' + esc(it.title) + '</span>' +
          '<span class="cal-item-pass">' + esc(it.passName) + '</span>' +
        '</button>' +
      '</div>';
    }

    return '<div class="cal-card' + (block.done ? ' is-done' : '') +
      (block.late ? ' is-late' : '') + '" style="' + vars(c) + '">' +
      '<div class="cal-card-head">' +
        (block.time
          ? '<span class="cal-time">' + esc(block.time) + '</span>'
          : '<span class="cal-time cal-time-done">Done</span>') +
        '<span class="cal-mod">' + esc(block.moduleCode) + '</span>' +
      '</div>' +
      rows +
    '</div>';
  }

  /* The list under the month grid for whichever day she tapped. */
  function dayPanelHtml(byDate) {
    if (view !== 'month' || !openDay) return '';
    var items = byDate[openDay] || [];
    var d = Schedule.parseYmd(openDay);
    var title = DAY_SHORT[d.getDay()] + ' ' + d.getDate() + ' ' + Schedule.months[d.getMonth()];

    var cards = '';
    for (var i = 0; i < items.length; i++) cards += blockHtmlFor(items[i]);
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
    for (var i = 0; i < plan.warnings.length; i++) rows += '<li>' + esc(plan.warnings[i].text) + '</li>';
    return '<div class="cal-warn">' +
      '<h3>⚠️ This will not all fit</h3>' +
      '<ul>' + rows + '</ul>' +
      '<p>Add a study day, add a session per day, fit more topics into a session, ' +
      'or move the exam date if it is wrong.</p>' +
    '</div>';
  }

  function summaryHtml(plan) {
    var s = Schedule.settings();
    var mods = plan.modules, rows = '', i;

    for (i = 0; i < mods.length; i++) {
      var m = mods[i];
      var topics = Schedule.topicsFor(m.id);
      var doneFirst = 0;
      for (var t = 0; t < topics.length; t++) if (Schedule.isDone(topics[t].id, 1)) doneFirst++;
      var pct = topics.length ? Math.round((doneFirst / topics.length) * 100) : 0;
      var exam = s.exams[m.id];

      rows += '<div class="cal-sum" style="' + vars(hue(m.id)) + '">' +
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
    return '<details class="cal-opts"' + (optsOpen ? ' open' : '') + ' data-opts="1">' +
      '<summary class="cal-opts-head">' +
        '<span class="cal-opts-emoji">⚙️</span>' +
        '<span>Change when I study</span>' +
        '<span class="cal-opts-caret">▾</span>' +
      '</summary>' +
      '<div class="cal-opts-body">' +
        examsHtml(s, plan) +
        daysHtml(s) +
        dayBlockHtml('weekday', 'Weekdays', s.weekday, plan.modules) +
        dayBlockHtml('weekend', 'Weekends', s.weekend, plan.modules) +
        focusHtml(plan) +
      '</div>' +
    '</details>';
  }

  /* Every setting lives in one of these. The panel used to be a single run of
     headings and controls, which read as one long list of unrelated things —
     giving each group a card, an icon and its own white background turns it
     into five small decisions instead of one big one. */
  function sectionHtml(emoji, title, hint, body, wide) {
    return '<section class="cal-sec' + (wide ? ' cal-sec-wide' : '') + '">' +
      '<h4 class="cal-sec-head"><span class="cal-sec-emoji">' + emoji + '</span>' +
        esc(title) + '</h4>' +
      (hint ? '<p class="cal-hint">' + hint + '</p>' : '') +
      body +
    '</section>';
  }

  /* A label sitting directly above its own control. The date pickers used to
     be pushed to the far right of a wide row with their label stranded on the
     left, so on a laptop you were reading one thing and clicking another a
     hand-span away. */
  function fieldHtml(label, control) {
    return '<label class="cal-field">' +
      '<span class="cal-field-label">' + esc(label) + '</span>' +
      control +
    '</label>';
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
    return sectionHtml('🗓️', 'Study days', 'Tap a day to switch it on or off.',
      '<div class="cal-chips">' + chips + '</div>', true);
  }

  function dayBlockHtml(which, label, cfg, mods) {
    var lens = '';
    for (var i = 0; i < LENGTHS.length; i++) {
      lens += '<button class="cal-chip' + (cfg.minutes === LENGTHS[i] ? ' is-on' : '') + '" type="button"' +
        ' data-len="' + which + ':' + LENGTHS[i] + '">' + LENGTHS[i] + 'm</button>';
    }

    var times = '';
    for (var t = 0; t < cfg.count; t++) {
      times += '<div class="cal-sessrow">' +
        '<div class="cal-sessrow-top">' +
          '<span class="cal-sessno">Session ' + (t + 1) + '</span>' +
          '<input class="cal-time-in" type="time" value="' + esc(cfg.times[t]) + '"' +
            ' data-time="' + which + ':' + t + '" aria-label="Session ' + (t + 1) + ' start time">' +
        '</div>' +
        '<span class="cal-sesslabel">Subject</span>' +
        modPickHtml(which, t, (cfg.mods && cfg.mods[t]) || '', mods) +
      '</div>';
    }

    return sectionHtml('⏰', label, '',
      stepperHtml('Sessions a day', which, 'count', cfg.count) +
      stepperHtml('Topics per session', which, 'topics', cfg.topics) +
      '<p class="cal-hint cal-hint-tight">Some topics are short — two or three can share one session.</p>' +
      '<div class="cal-subrow">' +
        '<span class="cal-row-label">How long is each session?</span>' +
        '<div class="cal-chips">' + lens + '</div>' +
      '</div>' +
      '<div class="cal-times">' + times + '</div>');
  }

  /* Which subject a given session is for. "Any" is the default and hands the
     slot to whichever module is furthest behind; picking one pins it, so she
     can put business at five and maths at seven and have it stay that way. */
  function modPickHtml(which, index, current, mods) {
    var out = '<button class="cal-modchip' + (!current ? ' is-on' : '') + '" type="button"' +
      ' data-mod-set="' + which + ':' + index + ':">Any</button>';

    for (var i = 0; i < mods.length; i++) {
      var m = mods[i], c = hue(m.id), on = current === m.id;
      out += '<button class="cal-modchip' + (on ? ' is-on' : '') + '" type="button"' +
        ' style="' + vars(c) + '" data-mod-set="' + which + ':' + index + ':' + esc(m.id) + '">' +
        esc(m.code) + '</button>';
    }
    return '<div class="cal-modpick">' + out + '</div>';
  }

  function stepperHtml(label, which, field, value) {
    return '<div class="cal-row">' +
      '<span class="cal-row-label">' + esc(label) + '</span>' +
      '<div class="cal-stepper">' +
        '<button type="button" data-step-set="' + which + ':' + field + ':-1" aria-label="Fewer">−</button>' +
        '<b>' + value + '</b>' +
        '<button type="button" data-step-set="' + which + ':' + field + ':1" aria-label="More">+</button>' +
      '</div>' +
    '</div>';
  }

  function examsHtml(s, plan) {
    /* A start date in the past is ignored by the engine, which always begins
       at today. Showing it back to her anyway is the honest thing: it is what
       she typed, and clearing it is one tap. */
    var fields = fieldHtml('Start studying on',
      '<input class="cal-time-in" type="date" value="' + esc(s.start || '') + '"' +
        ' data-start="1" min="' + esc(Schedule.todayYmd()) + '">' +
      '<span class="cal-field-note">Leave blank to begin today.</span>');

    for (var i = 0; i < plan.modules.length; i++) {
      var m = plan.modules[i];
      var set = !!s.exams[m.id];
      fields += fieldHtml(m.code + ' exam',
        '<input class="cal-time-in' + (set ? '' : ' is-empty') + '" type="date" value="' +
          esc(s.exams[m.id] || '') + '" data-exam="' + esc(m.id) + '">' +
        (set ? '' : '<span class="cal-field-note is-warn">Not set — nothing is scheduled for this module.</span>'));
    }

    return sectionHtml('📅', 'Dates',
      'Nothing is scheduled for a module until you say when its exam is. Sessions are packed ' +
      'in before that date, and the exam day itself is left clear.',
      '<div class="cal-fields">' + fields + '</div>', true);
  }

  /* Shown when there is nothing on the calendar because she has not said when
     the papers are. An empty calendar with no explanation is the one state
     that makes a scheduler look broken rather than unfilled. */
  function promptHtml(plan) {
    if (!plan.needsDates.length) return '';

    var names = [];
    for (var i = 0; i < plan.needsDates.length; i++) names.push(plan.needsDates[i].code);
    var list = names.join(' and ');

    if (!plan.sessions.length) {
      return '<div class="cal-prompt">' +
        '<span class="cal-prompt-emoji">🗓️</span>' +
        '<h3>Tell me when your exams are</h3>' +
        '<p>Nothing is planned yet. Add an exam date for <b>' + esc(list) + '</b> and the ' +
        'whole run-up fills itself in — first pass, revision and second revision, ' +
        'laid out around the days and times you study.</p>' +
        '<button class="btn btn-pink" type="button" data-openopts="1">Add exam dates</button>' +
      '</div>';
    }

    /* Some modules dated, some not. Quieter, because the calendar is doing its
       job — but she still needs to know why one subject is missing from it. */
    return '<div class="cal-note">' +
      '<b>' + esc(list) + '</b> ' + (names.length === 1 ? 'has' : 'have') +
      ' no exam date yet, so ' + (names.length === 1 ? 'it is' : 'they are') +
      ' not on the calendar. ' +
      '<button class="cal-linkbtn" type="button" data-openopts="1">Add ' +
      (names.length === 1 ? 'it' : 'them') + '</button>' +
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

      /* Grouped by week rather than listed flat. Sixty-one business topics in
         one column is not a list anybody reads — and she thinks about her
         course a week at a time, which is how the notes are organised too. */
      var weeks = [], byWeek = {};
      for (var t = 0; t < topics.length; t++) {
        var wn = topics[t].weekNumber;
        if (!byWeek[wn]) {
          byWeek[wn] = { number: wn, title: topics[t].weekTitle || '', topics: [] };
          weeks.push(byWeek[wn]);
        }
        byWeek[wn].topics.push(topics[t]);
      }

      var weekHtml2 = '', modOn = 0;
      for (var w = 0; w < weeks.length; w++) {
        var wk = weeks[w], chips = '', weekOn = 0;
        for (var k = 0; k < wk.topics.length; k++) {
          var tp = wk.topics[k], isOn = Schedule.isFocus(tp.id);
          if (isOn) { weekOn++; modOn++; }
          chips += '<button class="cal-chip cal-chip-wide' + (isOn ? ' is-on' : '') + '" type="button"' +
            ' data-focus="' + esc(tp.id) + '" aria-pressed="' + (isOn ? 'true' : 'false') + '">' +
            esc(tp.emoji || '') + ' ' + esc(tp.title) + '</button>';
        }

        var wkKey = m.id + ':' + wk.number;
        weekHtml2 += '<details class="cal-focusweek"' + (focusWeekOpen[wkKey] ? ' open' : '') +
          ' data-focusweek="' + esc(wkKey) + '">' +
          '<summary>' +
            '<span class="cal-focusweek-no">Week ' + wk.number + '</span>' +
            '<span class="cal-focusweek-title">' + esc(wk.title) + '</span>' +
            (weekOn ? '<span class="chip chip-pink">' + weekOn + '</span>' : '') +
          '</summary>' +
          '<div class="cal-chips cal-chips-col">' + chips + '</div>' +
        '</details>';
      }

      groups += '<details class="cal-focusmod"' + (focusOpen[m.id] ? ' open' : '') +
        ' data-focusmod="' + esc(m.id) + '">' +
        '<summary>' +
          '<span class="cal-focusmod-dot" style="background:' + hue(m.id).ink + '"></span>' +
          esc(m.code) +
          '<span class="chip">' + modOn + ' picked</span>' +
        '</summary>' +
        '<div class="cal-focusweeks">' + weekHtml2 + '</div>' +
      '</details>';
    }

    return sectionHtml('⭐', 'Revise these first',
      'Anything you pick here comes first in every revision round, so if time runs short ' +
      'they are already behind you.',
      groups, true);
  }

  /* ───────────────────────── events ─────────────────────────
     Every handler ends in redraw(), because every one of them changes the
     plan. Before it does, the scroll offset is captured so the redraw does not
     throw her back to the top of the page. */

  function bind(el, plan) {
    function each(sel, fn) { Array.prototype.forEach.call(el.querySelectorAll(sel), fn); }

    function again() {
      keepScroll = window.pageYOffset || 0;
      redraw();
    }

    /* <details> reports its own state, which is the only reliable way to know
       it — she can open it with a click, with the keyboard, or with a find. */
    each('[data-opts]', function (d) {
      d.addEventListener('toggle', function () { optsOpen = d.open; });
    });
    each('[data-focusmod]', function (d) {
      d.addEventListener('toggle', function () { focusOpen[d.getAttribute('data-focusmod')] = d.open; });
    });
    each('[data-focusweek]', function (d) {
      d.addEventListener('toggle', function () { focusWeekOpen[d.getAttribute('data-focusweek')] = d.open; });
    });

    each('[data-step]', function (b) {
      b.addEventListener('click', function () {
        var step = Number(b.getAttribute('data-step'));
        var d = Schedule.parseYmd(anchor);
        anchor = view === 'month'
          ? Schedule.ymd(new Date(d.getFullYear(), d.getMonth() + step, 1))
          : Schedule.ymd(Schedule.addDays(d, step * 7));
        openDay = null;
        again();
      });
    });

    each('[data-today]', function (b) {
      b.addEventListener('click', function () {
        anchor = Schedule.todayYmd();
        openDay = null;
        again();
      });
    });

    each('[data-view]', function (b) {
      b.addEventListener('click', function () {
        view = b.getAttribute('data-view');
        openDay = null;
        again();
      });
    });

    each('[data-day]', function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-day');
        openDay = (openDay === key) ? null : key;
        again();
      });
    });

    each('[data-closeday]', function (b) {
      b.addEventListener('click', function () { openDay = null; again(); });
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
        again();
      });
    });

    /* Tapping the topic itself opens its notes, in its own module. */
    each('[data-topic]', function (b) {
      b.addEventListener('click', function () {
        if (window.App && App.openTopic) {
          App.openTopic(b.getAttribute('data-mod'), b.getAttribute('data-topic'), 'schedule');
        }
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
        again();
      });
    });

    /* One handler for both steppers — sessions a day and topics per session. */
    each('[data-step-set]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-step-set').split(':');
        var which = bits[0], field = bits[1], delta = Number(bits[2]);
        var s = Schedule.settings(), blk = s[which];
        var max = field === 'count' ? 8 : 4;
        var next = blk[field] + delta;
        if (next < 1 || next > max) return;
        blk[field] = next;
        var patch = {};
        patch[which] = blk;
        Schedule.update(patch);
        again();
      });
    });

    /* "weekday:1:inba" — pin the second weekday session to business. An empty
       third part means Any, which hands the slot back to the scheduler. */
    each('[data-mod-set]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-mod-set').split(':');
        var s = Schedule.settings(), blk = s[bits[0]];
        if (!blk.mods) blk.mods = [];
        while (blk.mods.length < blk.count) blk.mods.push('');
        blk.mods[Number(bits[1])] = bits[2] || '';
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        again();
      });
    });

    each('[data-len]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-len').split(':');
        var s = Schedule.settings(), blk = s[bits[0]];
        blk.minutes = Number(bits[1]);
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        again();
      });
    });

    each('[data-time]', function (inp) {
      inp.addEventListener('change', function () {
        var bits = inp.getAttribute('data-time').split(':');
        var s = Schedule.settings(), blk = s[bits[0]];
        blk.times[Number(bits[1])] = inp.value || blk.times[Number(bits[1])];
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        again();
      });
    });

    each('[data-exam]', function (inp) {
      inp.addEventListener('change', function () {
        var s = Schedule.settings(), id = inp.getAttribute('data-exam');
        if (inp.value) s.exams[id] = inp.value; else delete s.exams[id];
        Schedule.update({ exams: s.exams });
        again();
      });
    });

    each('[data-start]', function (inp) {
      inp.addEventListener('change', function () {
        Schedule.update({ start: inp.value || null });
        again();
      });
    });

    /* Opens the options panel and takes her to it, because the button that
       says "add exam dates" has to actually put the fields in front of her. */
    each('[data-openopts]', function (b) {
      b.addEventListener('click', function () {
        optsOpen = true;
        keepScroll = 0;
        redraw();
        var panel = document.querySelector('.cal-opts');
        if (panel && panel.scrollIntoView) panel.scrollIntoView({ block: 'start' });
      });
    });

    each('[data-focus]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-focus');
        Schedule.setFocus(id, !Schedule.isFocus(id));
        again();
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
