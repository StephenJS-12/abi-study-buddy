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

  /* Session lengths offered in the dropdown. Quarter-hour steps up to two
     hours, then coarser, because nobody plans a 155-minute study session. */
  var LENGTHS = [15, 30, 45, 60, 75, 90, 105, 120, 150, 180];

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

  /* Which folded week-view sessions she has opened or shut by hand, keyed by
     date|time|module. Absent means "however the day decides" — today open, the
     rest of the week shut. Held here rather than in Store because it is where
     she is looking right now, not a preference worth keeping between sessions.

     It exists because ticking a topic rebuilds the whole calendar: without it,
     opening a future session and ticking one topic would snap it shut again
     before she could reach the second. */
  var openCards = {};

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

  var colourOf = null;
  function assignColours(mods) {
    colourOf = {};
    for (var i = 0; i < mods.length; i++) colourOf[mods[i].id] = PALETTE[i % PALETTE.length];
  }

  /* A module's colour on the calendar.
   *
   * If she has picked a colour for the module, that is the answer — a chip for
   * business should be the colour business is, on the calendar and on the
   * dashboard alike, or the two screens are telling her different things.
   *
   * The palette below is only the fallback for a module still on the default,
   * and it exists so that two undecided modules are still told apart.
   *
   * Assigned on demand as well as during a render, because the dashboard asks
   * for a module's colour on screens the calendar has never drawn on. Left to
   * the render alone, every module on the home screen came out the same. */
  function hue(moduleId) {
    if (moduleId && typeof Themes !== 'undefined') {
      var chosen = Themes.get(moduleId);
      if (chosen) {
        var s = Themes.swatch(chosen);
        return { name: chosen, ink: s.ink, tint: s.tint, edge: s.edge };
      }
    }
    if (!colourOf) assignColours(typeof Modules !== 'undefined' ? Modules.ready() : []);
    return colourOf[moduleId] || PALETTE[0];
  }

  function vars(c) {
    return '--card-ink:' + c.ink + ';--card-tint:' + c.tint + ';--card-edge:' + c.edge;
  }

  /* Which subject a thing belongs to, said in the one character that reads at
     any size. Colour alone was not enough: a month cell of lesson names all
     carrying the same book emoji told her nothing about which subject each
     one was, and the tints are close together by design. */
  function modEmoji(moduleId) {
    if (!moduleId || typeof Modules === 'undefined') return '📘';
    var m = Modules.get(moduleId);
    return (m && m.emoji) || '📘';
  }

  function modCode(moduleId) {
    if (!moduleId || typeof Modules === 'undefined') return '';
    var m = Modules.get(moduleId);
    return (m && m.code) || '';
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

    /* Assignments, tests and the like. They sit beside the study sessions and
       take nothing from them — the scheduler has never heard of them. */
    var evs = Planner.events(null, { includeDone: true });
    for (i = 0; i < evs.length; i++) {
      push({ kind: 'event', date: evs[i].date, time: evs[i].time || '',
             moduleId: evs[i].moduleId, event: evs[i] });
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
        /* The exam is the fixed point of its day, so it leads, then anything
           else with a deadline, then the study sessions that fill the gaps. */
        var rank = { exam: 0, event: 1, session: 2 };
        if (rank[a.kind] !== rank[b.kind]) return rank[a.kind] - rank[b.kind];
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
        '<button class="cal-addev" type="button" data-addevent="1">+ Add</button>' +
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
        /* Events carry a class of their own so they can be picked out of a cell
           full of study sessions. A session is the rhythm of her week; an
           assignment due on Thursday is a thing with a deadline attached, and
           the two were drawn identically. */
        out += '<span class="cal-lab' + (f.kind === 'event' ? ' is-event' : '') +
               (f.done ? ' is-done' : '') + '" style="' +
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
      if (items[i].kind === 'event') {
        var ev = items[i].event;
        out.push({
          kind: 'event',
          moduleId: items[i].moduleId,
          text: Planner.typeOf(ev.type).emoji + ' ' + ev.name,
          done: !!ev.done
        });
        continue;
      }
      /* A session she chose to study as a whole lesson shows as that lesson,
         not as a list of the topics inside it. Listing five topic names on a
         month cell is exactly what picking "whole lessons" was meant to stop. */
      if (items[i].lessons && items[i].lessons.length) {
        for (j = 0; j < items[i].lessons.length; j++) {
          var L = items[i].lessons[j];
          out.push({
            kind: 'lesson',
            moduleId: items[i].moduleId,
            text: modEmoji(items[i].moduleId) + ' W' + L.weekNumber + 'L' + L.number +
                  ' · ' + L.title,
            /* Carried from the session. Completed sessions used to have no
               lessons array at all and fell through to the topic branch below,
               so this was always false and could be hardcoded. Now that a
               finished session keeps the slot it occupied — and with it the
               lessons it covered — hardcoding it would draw a lesson she has
               finished as one she still has to do. */
            done: !!items[i].done
          });
        }
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
      } else if (flat[i].kind === 'event') {
        /* Drawn as an upright bar rather than a dot. At six pixels there is no
           room for a subtler difference, and a bar among circles is the one
           shape that reads instantly at that size without colliding with the
           exam's square or the finished session's ring. */
        out += '<span class="cal-dot is-event" style="background:' + c.ink + '"></span>';
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

      /* Today's sessions are open; the rest of the week folds away. A week of
         seven columns each listing five topics with tick boxes is more than
         she can read at a glance, and the day she is actually working is the
         one she needs open.

         An open card stays open across a redraw — see openCards — so ticking
         one topic does not shut the session she is halfway through. */
      var cards = '';
      for (var j = 0; j < items.length; j++) {
        var b = items[j];
        cards += blockHtmlFor(b, {
          fold: true,
          open: b.kind === 'session'
            ? (openCards[cardKey(b)] !== undefined ? openCards[cardKey(b)] : key === today)
            : false
        });
      }
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

  /* Only study sessions fold. An exam is one line already, and an event is the
     thing on the day she most needs to see without opening anything. */
  function blockHtmlFor(block, opts) {
    if (block.kind === 'exam') return examHtml(block);
    if (block.kind === 'event') return eventBlockHtml(block);
    return cardHtml(block, opts);
  }

  /* An assignment, test or class. Same shape as a study session so a day reads
     as one list, but with the type in place of the pass name and no module
     colour at all when it belongs to no subject. */
  function eventBlockHtml(block) {
    var ev = block.event;
    var t = Planner.typeOf(ev.type);
    var c = block.moduleId ? hue(block.moduleId) : null;
    var mod = block.moduleId && typeof Modules !== 'undefined' && Modules.get(block.moduleId)
      ? Modules.get(block.moduleId).code : 'No module';

    return '<div class="cal-card cal-card-event' + (ev.done ? ' is-done' : '') + '"' +
      (c ? ' style="' + vars(c) + '"' : '') + '>' +
      '<div class="cal-card-head">' +
        '<span class="cal-time">' + (ev.time ? esc(ev.time) : 'All day') + '</span>' +
        '<span class="cal-mod">' +
          (block.moduleId ? '<span class="cal-mod-emoji">' + modEmoji(block.moduleId) + '</span>' : '') +
          esc(mod) + '</span>' +
      '</div>' +
      '<div class="cal-item' + (ev.done ? ' is-done' : '') + '">' +
        '<button class="cal-tick" type="button" data-evtick="' + esc(ev.id) + '"' +
          ' aria-pressed="' + (ev.done ? 'true' : 'false') + '"' +
          ' title="' + (ev.done ? 'Mark as not done' : 'Mark as done') + '">' +
          (ev.done ? '✓' : '') + '</button>' +
        '<button class="cal-item-body" type="button" data-evedit="' + esc(ev.id) + '">' +
          '<span class="cal-item-title">' + t.emoji + ' ' + esc(ev.name) + '</span>' +
          '<span class="cal-item-pass">' + esc(t.name) + '</span>' +
        '</button>' +
      '</div>' +
    '</div>';
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

  /* The one line a folded session shows. Deliberately the lesson TAG and not
     its title: folded is meant to be scannable, and seven columns of "The
     nature and role of business" is the clutter this exists to remove.

     A session measured in topics rather than lessons has no lesson to name, so
     the week and a count is as close to the rule as it gets. */
  function gistFor(block) {
    var i, out = [];

    if (block.lessons && block.lessons.length) {
      for (i = 0; i < block.lessons.length; i++) {
        out.push('Wk ' + block.lessons[i].weekNumber + ' · Lesson ' + block.lessons[i].number);
      }
      return out.join('  ·  ');
    }

    var seen = {}, weeks = [];
    for (i = 0; i < block.items.length; i++) {
      var w = block.items[i].weekNumber;
      if (w && !seen[w]) { seen[w] = 1; weeks.push(w); }
    }
    var n = block.items.length;
    return (weeks.length ? 'Wk ' + weeks.join(', ') + ' · ' : '') +
           n + (n === 1 ? ' topic' : ' topics');
  }

  /* Identifies a card across a redraw, so one she has opened stays open when
     ticking something rebuilds the screen. Date, time and module are what make
     a session unique within a week. */
  function cardKey(block) {
    return block.date + '|' + (block.time || '') + '|' + block.moduleId;
  }

  function cardHtml(block, opts) {
    opts = opts || {};
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
          /* Only when it says something. Nearly every row is a first pass, so
             "FIRST PASS" under every topic was a caption repeating the default
             — three lines of it under a lesson, in a column that has to fit
             seven of them across. "Revision" is worth the line, because it
             tells her she has seen this before. */
          (it.pass > 1 ? '<span class="cal-item-pass">' + esc(it.passName) + '</span>' : '') +
        '</button>' +
      '</div>';
    }

    /* Studying by lesson: name the lesson, then list its topics underneath so
       she can still tick them off one at a time. */
    var lessonBar = '';
    if (block.lessons && block.lessons.length) {
      for (i = 0; i < block.lessons.length; i++) {
        var L = block.lessons[i];
        lessonBar += '<div class="cal-lesson">' +
          '<span class="cal-lesson-tag">Wk ' + L.weekNumber + ' · Lesson ' + L.number + '</span>' +
          '<span class="cal-lesson-title">' + esc(L.title) + '</span>' +
        '</div>';
      }
    }

    var klass = 'cal-card' + (block.done ? ' is-done' : '') +
      (block.late ? ' is-late' : '');

    /* A finished session now keeps the time of the slot it filled, so the head
       has to say both — "09:00" alone would look like work still to do, and
       "Done" alone would throw away which sitting it was. Only work finished on
       a day the calendar has no slot for falls back to the bare word. */
    var head =
      '<span class="cal-time' + (block.done ? ' cal-time-done' : '') + '">' +
        (block.done ? '✓ ' : '') + esc(block.time || 'Done') +
      '</span>' +
      '<span class="cal-mod"><span class="cal-mod-emoji">' +
        modEmoji(block.moduleId) + '</span>' + esc(block.moduleCode) + '</span>';

    if (!opts.fold) {
      return '<div class="' + klass + '" style="' + vars(c) + '">' +
        '<div class="cal-card-head">' + head + '</div>' +
        lessonBar + rows +
      '</div>';
    }

    /* Folded, for the week view. A <details> rather than a class and a click
       handler: it opens on tap, on Enter and on find-in-page, and it reports
       its own state, which is the only reliable way to know it.

       The gist is hidden by CSS once open, because the lesson bar underneath
       says the same thing with the title attached. */
    return '<details class="' + klass + ' is-fold" style="' + vars(c) + '"' +
      (opts.open ? ' open' : '') + ' data-card="' + esc(cardKey(block)) + '">' +
      '<summary class="cal-card-sum">' +
        '<span class="cal-card-head">' + head + '</span>' +
        '<span class="cal-gist">' +
          '<span class="cal-caret">▸</span>' +
          '<span class="cal-gist-text">' + esc(gistFor(block)) + '</span>' +
        '</span>' +
      '</summary>' +
      lessonBar + rows +
    '</details>';
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
    var times = '';
    for (var t = 0; t < cfg.count; t++) {
      var c = hue((cfg.mods && cfg.mods[t]) || '');
      var pinned = !!(cfg.mods && cfg.mods[t]);

      times += '<div class="cal-sessrow' + (pinned ? ' is-pinned' : '') + '"' +
        (pinned ? ' style="' + vars(c) + '"' : '') + '>' +
        '<div class="cal-sessno">Session ' + (t + 1) + '</div>' +
        '<div class="cal-sessgrid">' +
          fieldHtml('Starts at',
            '<input class="cal-time-in" type="time" value="' + esc(cfg.times[t]) + '"' +
              ' data-time="' + which + ':' + t + '">') +
          fieldHtml('Length', lengthSelectHtml(which, t, cfg.mins[t])) +
          fieldHtml('Module', modSelectHtml(which, t, (cfg.mods && cfg.mods[t]) || '', mods)) +
        '</div>' +
      '</div>';
    }

    /* Sessions are kept in order and never allowed to overlap, so a clash is
       resolved by pushing the later one back. Enough of them and the day runs
       out — worth saying, because the times she typed will have moved. */
    var last = cfg.count - 1;
    var endsPast = startMinutes(cfg.times[last]) + cfg.mins[last] > 24 * 60;
    var full = endsPast
      ? '<p class="cal-note cal-note-tight">These sessions do not all fit in one day — ' +
        'the last one runs past midnight. Shorten one, or drop a session.</p>'
      : '';

    /* A session can be measured in topics or in whole lessons. Only one of the
       two steppers is shown, because showing both invites her to set a number
       that is quietly being ignored. */
    var byLesson = cfg.unit === 'lessons';
    var unitPick =
      '<div class="cal-subrow">' +
        '<span class="cal-row-label">Each session covers</span>' +
        '<div class="cal-chips">' +
          '<button class="cal-chip' + (byLesson ? '' : ' is-on') + '" type="button"' +
            ' data-unit="' + which + ':topics">Topics</button>' +
          '<button class="cal-chip' + (byLesson ? ' is-on' : '') + '" type="button"' +
            ' data-unit="' + which + ':lessons">Whole lessons</button>' +
        '</div>' +
      '</div>';

    var amount = byLesson
      ? stepperHtml('Lessons per session', which, 'lessons', cfg.lessons) +
        '<p class="cal-hint cal-hint-tight">A session covers a whole lesson, however many topics that ' +
        'lesson holds — so some sessions will be longer than others.</p>'
      : stepperHtml('Topics per session', which, 'topics', cfg.topics) +
        '<p class="cal-hint cal-hint-tight">Some topics are short — two or three can share one session.</p>';

    return sectionHtml('⏰', label, '',
      stepperHtml('Sessions a day', which, 'count', cfg.count) +
      unitPick +
      amount +
      '<p class="cal-hint cal-hint-tight">Sessions are kept in order, and a clash pushes the later one ' +
      'back.</p>' +
      full +
      '<div class="cal-times">' + times + '</div>');
  }

  function startMinutes(hhmm) {
    var bits = String(hhmm || '').split(':');
    return (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
  }

  /* Length is set per session, not per day. Three quarters of an hour after
     work and two hours later on is a normal evening, and one figure for the
     whole day cannot describe it. */
  function lengthSelectHtml(which, index, current) {
    var out = '';
    for (var i = 0; i < LENGTHS.length; i++) {
      out += '<option value="' + LENGTHS[i] + '"' +
        (Number(current) === LENGTHS[i] ? ' selected' : '') + '>' +
        esc(lengthLabel(LENGTHS[i])) + '</option>';
    }
    return '<select class="cal-select" data-mins="' + which + ':' + index + '">' + out + '</select>';
  }

  function lengthLabel(m) {
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    if (!r) return h + (h === 1 ? ' hour' : ' hours');
    return h + 'h ' + r + 'm';
  }

  /* Which subject a given session is for. "Any" is the default and hands the
     slot to whichever module is furthest behind; picking one pins it, so she
     can put business at five and maths at seven and have it stay that way. */
  function modSelectHtml(which, index, current, mods) {
    var out = '<option value=""' + (!current ? ' selected' : '') + '>Any subject</option>';
    for (var i = 0; i < mods.length; i++) {
      var m = mods[i];
      out += '<option value="' + esc(m.id) + '"' + (current === m.id ? ' selected' : '') + '>' +
        esc(m.code) + '</option>';
    }
    return '<select class="cal-select" data-mod-set="' + which + ':' + index + '">' + out + '</select>';
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

    /* REDRAWING WHILE A PICKER IS OPEN CLOSES IT.
     *
     * On an iPad, a time or date input fires `change` on every notch of the
     * wheel, not only when Done is tapped. Every one of those was rebuilding
     * the screen, which destroyed the focused input mid-scroll — so the picker
     * vanished and kept whatever value it happened to be passing. It looked
     * random; it was simply however long she took to scroll past a value.
     *
     * The setting is still saved on every change, so nothing is lost. Only the
     * redraw waits, until nothing is being typed into or scrolled. */
    var pending = null;

    function stillEditing() {
      var a = document.activeElement;
      if (!a) return false;
      var tag = (a.tagName || '').toUpperCase();
      return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
    }

    function softAgain() {
      if (pending) clearTimeout(pending);
      pending = setTimeout(function () {
        pending = null;
        if (stillEditing()) { softAgain(); return; }
        again();
      }, 400);
    }

    /* Leaving a field is the clearest signal that she has finished with it.
       Without this the redraw waits on the timer noticing focus has gone,
       which it eventually does — but a field she tabbed away from and left
       alone would sit showing a stale plan for as long as she ignored it. */
    each('.cal-opts input, .cal-opts select', function (inp) {
      inp.addEventListener('blur', softAgain);
    });

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

    /* A folded session remembering whether she opened it. <details> reports its
       own state, which is the only reliable way to know it — she can open one
       by tap, by keyboard, or by find-in-page. No redraw: opening a card is not
       a change to the plan. */
    each('[data-card]', function (d) {
      d.addEventListener('toggle', function () {
        openCards[d.getAttribute('data-card')] = d.open;
      });
    });

    /* Adding and ticking events. The same box the dashboard uses, so the two
       screens cannot drift apart about what an event is. */
    each('[data-addevent]', function (b) {
      b.addEventListener('click', function () {
        Dashboard.openAdd(null, function () { keepScroll = window.pageYOffset || 0; redraw(); });
      });
    });

    each('[data-evtick]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-evtick');
        var ev = Planner.findEvent(id);
        var was = !!(ev && ev.done);
        Planner.setEventDone(id, !was);
        if (!was && window.Celebrate && Store.motionOn()) Celebrate.tick(b);
        again();
      });
    });

    each('[data-evedit]', function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-evedit');
        Dashboard.openEdit(id, function () { keepScroll = window.pageYOffset || 0; redraw(); });
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

    /* One handler for all three steppers — sessions a day, topics per session
       and lessons per session. */
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

    each('[data-unit]', function (b) {
      b.addEventListener('click', function () {
        var bits = b.getAttribute('data-unit').split(':');
        var s = Schedule.settings(), blk = s[bits[0]];
        blk.unit = bits[1];
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        again();
      });
    });

    /* One writer for every per-session field: which block, which session,
       which array. The three of them are kept the same length by the engine,
       so nothing here has to think about holes. */
    function setSession(attr, field, cast) {
      each('[' + attr + ']', function (inp) {
        inp.addEventListener('change', function () {
          var bits = inp.getAttribute(attr).split(':');
          var s = Schedule.settings(), blk = s[bits[0]];
          if (!blk[field]) blk[field] = [];
          blk[field][Number(bits[1])] = cast(inp.value);
          var patch = {};
          patch[bits[0]] = blk;
          Schedule.update(patch);
          softAgain();
        });
      });
    }

    setSession('data-mins', 'mins', function (v) { return Number(v); });
    setSession('data-mod-set', 'mods', function (v) { return v || ''; });

    each('[data-time]', function (inp) {
      inp.addEventListener('change', function () {
        var bits = inp.getAttribute('data-time').split(':');
        var s = Schedule.settings(), blk = s[bits[0]];
        blk.times[Number(bits[1])] = inp.value || blk.times[Number(bits[1])];
        var patch = {};
        patch[bits[0]] = blk;
        Schedule.update(patch);
        softAgain();
      });
    });

    each('[data-exam]', function (inp) {
      inp.addEventListener('change', function () {
        var s = Schedule.settings(), id = inp.getAttribute('data-exam');
        if (inp.value) s.exams[id] = inp.value; else delete s.exams[id];
        Schedule.update({ exams: s.exams });
        softAgain();
      });
    });

    each('[data-start]', function (inp) {
      inp.addEventListener('change', function () {
        Schedule.update({ start: inp.value || null });
        softAgain();
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
    /* The dashboard draws event chips in their module's calendar colour, so
       the two screens agree about which subject is which. */
    hueFor: hue,
    /* So the rest of the app can drop her straight onto today. */
    goToday: function () { anchor = Schedule.todayYmd(); openDay = null; }
  };
})();
