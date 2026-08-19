/* Abi's Study Buddy — the study schedule engine.
 *
 * This file does no drawing. It answers one question: given what Abi has told
 * us about when she can study, and what she has already covered, which topic
 * belongs in which slot between now and each exam? calendar.js renders what
 * comes back.
 *
 * THE MODEL
 *
 *   One session covers one topic. Not a week, not a chapter — a topic, because
 *   an hour is not enough for more and a schedule that quietly expects three
 *   topics in one sitting is a schedule she will fall behind on in week one.
 *
 *   Every topic is studied three times: a first pass, a revision, and a second
 *   revision. Those are laid END TO END and generated up front, so the whole
 *   run to the exam is visible on day one rather than appearing a fortnight at
 *   a time.
 *
 *   If she starts early enough that all three passes fit with room left over,
 *   further revision rounds are generated to fill the space rather than
 *   leaving the calendar empty in the run-up to the exam.
 *
 * WHY DONE TOPICS VANISH FROM THE FUTURE
 *
 *   A completed session does not hold its slot. The moment a topic is ticked
 *   its future session disappears and everything behind it moves one slot
 *   earlier. That is the whole point of the thing: getting ahead has to
 *   visibly buy her time, or the calendar is just a list.
 *
 *   Completed sessions are remembered against the date she completed them, so
 *   the past fills in as she goes instead of showing empty days.
 *
 * WHAT COUNTS AS DONE
 *
 *   Earning a topic's badge (30 correct answers) completes its FIRST pass by
 *   itself. Revision passes are ticked by hand, because there is no second
 *   badge to earn and she may well revise from her own notes.
 *
 *   A manual mark always beats the automatic one, in both directions. If she
 *   ticks a topic she has not badged, it is done. If she unticks one she has
 *   badged, it comes back. She knows whether she knows it; the badge is a
 *   guess.
 *
 *   Ticking a topic off does NOT stop revision sessions being created for it.
 *   Completing the first pass is what makes revision worth scheduling.
 */

var Schedule = (function () {

  /* Sunday is 0, matching Date.getDay(), so no translation is ever needed. */
  var DEFAULTS = {
    days: [1, 2, 3, 4, 5],
    /* `topics` is how many topics fit in ONE session. Some topics are short
       enough to double up, and being forced to spend a whole hour on a small
       one is how a schedule starts feeling like a waste of an evening. */
    weekday: { count: 2, minutes: 60, topics: 1, times: ['17:00', '19:30'] },
    weekend: { count: 3, minutes: 60, topics: 1, times: ['09:00', '11:30', '14:00'] },
    exams: {},          // moduleId -> 'YYYY-MM-DD'
    marks: {},          // 'topicId|pass' -> 'YYYY-MM-DD' when done, false when explicitly not
    focus: {},          // topicId -> true, revised first
    start: null         // 'YYYY-MM-DD'; null means today
  };

  /* Two years. A cap exists only so a nonsense exam date far in the future
     cannot spin the slot loop forever — it is not a limit she can reach. */
  var MAX_DAYS = 730;

  /* Beyond a second revision the rounds are extra polish, and there has to be
     a stop or an exam three years out would generate thousands of sessions. */
  var MAX_PASS = 8;

  /* ───────────────────────── dates ─────────────────────────
     Everything is a local 'YYYY-MM-DD' string. Date objects are used only for
     arithmetic and never stored, because `new Date('2025-12-12')` parses as
     UTC and lands on the 11th for anyone west of Greenwich — the kind of
     off-by-one that shows up once a year and is never reproducible. */

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function ymd(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function parseYmd(s) {
    if (!s || typeof s !== 'string') return null;
    var bits = s.split('-');
    if (bits.length !== 3) return null;
    var y = Number(bits[0]), m = Number(bits[1]), d = Number(bits[2]);
    if (!isFinite(y) || !isFinite(m) || !isFinite(d)) return null;
    var out = new Date(y, m - 1, d);
    /* Rejects 2025-02-31, which Date would silently roll into March. */
    if (out.getFullYear() !== y || out.getMonth() !== m - 1 || out.getDate() !== d) return null;
    return out;
  }

  function addDays(d, n) {
    var out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    out.setDate(out.getDate() + n);
    return out;
  }

  function todayYmd() { return ymd(new Date()); }

  /* String compare is a correct date compare for zero-padded ISO dates. */
  function isWeekendDay(dow) { return dow === 0 || dow === 6; }

  /* ───────────────────────── settings ───────────────────────── */

  function copy(o) { return JSON.parse(JSON.stringify(o)); }

  /* Building a plan asks for the settings roughly a thousand times — once per
     topic per pass to see whether it is done, and again for every completed
     session. Rebuilding and re-validating them each time turned a plan into a
     few hundred milliseconds of deep-copying, which is long enough to feel on
     a phone every time she ticks a box.

     So the validated settings are cached. `live()` hands out the cache and is
     used everywhere inside this file, which only ever reads. `settings()`
     hands out a copy, because callers outside do modify what they are given
     before passing it back to update().

     The cache is keyed on the stored object itself rather than being cleared
     by hand at every write. Restoring a backup or wiping progress replaces
     that object without going anywhere near this file, and a cache that had
     to be told about those would eventually be handed a stale plan. */
  var cache = null;
  var cacheOf = false;      // the raw stored object the cache was built from

  function live() {
    var raw = (typeof Store !== 'undefined' && Store.get().schedule) || null;
    if (cache && cacheOf === raw) return cache;
    cache = build(raw);
    cacheOf = raw;
    return cache;
  }

  function settings() { return copy(live()); }

  /* Saving replaces the stored object, so the next live() sees a new reference
     and rebuilds by itself. */
  function persist(s) {
    Store.setSchedule(s);
    cache = s;
    cacheOf = s;
  }

  function build(saved) {
    saved = saved || {};
    var out = copy(DEFAULTS);
    var k;
    for (k in saved) {
      if (Object.prototype.hasOwnProperty.call(saved, k)) out[k] = saved[k];
    }
    /* An older save, or a hand-edited one, must not be able to produce a plan
       with no slots in it or a session count of nine hundred. */
    out.days = sanitiseDays(out.days);
    out.weekday = sanitiseBlock(out.weekday, DEFAULTS.weekday);
    out.weekend = sanitiseBlock(out.weekend, DEFAULTS.weekend);
    if (!out.exams || typeof out.exams !== 'object') out.exams = {};
    if (!out.marks || typeof out.marks !== 'object') out.marks = {};
    if (!out.focus || typeof out.focus !== 'object') out.focus = {};
    return out;
  }

  function sanitiseDays(list) {
    var out = [], seen = {}, i, n;
    if (Object.prototype.toString.call(list) !== '[object Array]') return copy(DEFAULTS.days);
    for (i = 0; i < list.length; i++) {
      n = Math.floor(Number(list[i]));
      if (isFinite(n) && n >= 0 && n <= 6 && !seen[n]) { seen[n] = 1; out.push(n); }
    }
    out.sort(function (a, b) { return a - b; });
    /* No study days at all would mean no plan and an empty screen with no
       explanation. The UI blocks it; this is the second line of defence. */
    return out.length ? out : copy(DEFAULTS.days);
  }

  function sanitiseBlock(b, fallback) {
    var out = copy(fallback);
    if (!b || typeof b !== 'object') return out;
    var c = Math.floor(Number(b.count));
    if (isFinite(c) && c >= 1 && c <= 8) out.count = c;
    var m = Math.floor(Number(b.minutes));
    if (isFinite(m) && m >= 10 && m <= 240) out.minutes = m;
    var tp = Math.floor(Number(b.topics));
    if (isFinite(tp) && tp >= 1 && tp <= 4) out.topics = tp;
    if (Object.prototype.toString.call(b.times) === '[object Array]') {
      out.times = [];
      for (var i = 0; i < b.times.length; i++) out.times.push(cleanTime(b.times[i], i));
    }
    /* Always exactly `count` times, so the UI can render one picker per
       session without checking for holes. */
    while (out.times.length < out.count) out.times.push(nextTime(out.times, out.minutes));
    out.times.length = out.count;
    return out;
  }

  function cleanTime(v, i) {
    var s = String(v || '');
    if (!/^\d{1,2}:\d{2}$/.test(s)) return DEFAULTS.weekday.times[i % 2];
    var bits = s.split(':');
    var h = Math.min(23, Math.max(0, Math.floor(Number(bits[0]))));
    var m = Math.min(59, Math.max(0, Math.floor(Number(bits[1]))));
    return pad(h) + ':' + pad(m);
  }

  /* A new session slot starts half an hour after the last one ends, which is
     nearly always what she wants and is trivial to change once it is there. */
  function nextTime(times, minutes) {
    if (!times.length) return '09:00';
    var last = times[times.length - 1].split(':');
    var mins = Number(last[0]) * 60 + Number(last[1]) + (minutes || 60) + 30;
    if (mins > 23 * 60 + 30) mins = 23 * 60 + 30;
    return pad(Math.floor(mins / 60)) + ':' + pad(mins % 60);
  }

  function update(patch) {
    var s = settings(), k;
    for (k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) s[k] = patch[k];
    }
    persist(s);
    return s;
  }

  /* ───────────────────────── done / focus ───────────────────────── */

  function markKey(topicId, pass) { return topicId + '|' + pass; }

  /* Returns the completion date, or '' when not done. A manual mark wins over
     the badge in both directions — see the header. */
  function doneOn(topicId, pass) {
    var m = live().marks[markKey(topicId, pass)];
    if (m === false) return '';
    if (typeof m === 'string' && m) return m;
    if (pass === 1 && typeof Store !== 'undefined' && Store.hasBadge(topicId)) {
      return String(Store.get().badges[topicId] || '').slice(0, 10) || todayYmd();
    }
    return '';
  }

  function isDone(topicId, pass) { return !!doneOn(topicId, pass); }

  function setDone(topicId, pass, on, when) {
    var s = settings();
    s.marks[markKey(topicId, pass)] = on ? (when || todayYmd()) : false;
    persist(s);
  }

  function isFocus(topicId) { return !!live().focus[topicId]; }

  function setFocus(topicId, on) {
    var s = settings();
    if (on) s.focus[topicId] = true; else delete s.focus[topicId];
    persist(s);
  }

  /* ───────────────────────── the work to be done ───────────────────────── */

  /* Every topic of every ready module, in the order she would meet them. */
  function topicsFor(moduleId) {
    var out = [];
    if (typeof Modules === 'undefined') return out;
    var content = Modules.contentFor(moduleId);
    var weeks = (content && content.weeks) || [];
    for (var w = 0; w < weeks.length; w++) {
      if (weeks[w].comingSoon) continue;
      var topics = weeks[w].topics || [];
      for (var t = 0; t < topics.length; t++) {
        out.push({
          id: topics[t].id,
          title: topics[t].title,
          emoji: topics[t].emoji,
          weekNumber: weeks[w].number,
          weekTitle: weeks[w].title
        });
      }
    }
    return out;
  }

  /* One pass over one module's topics, in the order they should be worked.
     Revision rounds put the topics she flagged first, so if she runs out of
     time before the exam the things she is worried about are already behind
     her rather than sitting in the sessions that got cut. */
  function passQueue(topics, pass, focus) {
    var first = [], rest = [], i;
    for (i = 0; i < topics.length; i++) {
      if (isDone(topics[i].id, pass)) continue;
      if (pass > 1 && focus[topics[i].id]) first.push(topics[i]);
      else rest.push(topics[i]);
    }
    return first.concat(rest);
  }

  /* ───────────────────────── slots ─────────────────────────
     Every moment she has told us she is willing to study, in order. */

  function buildSlots(startYmd, stopYmd, blocked) {
    var s = live();
    var cur = parseYmd(startYmd) || new Date();
    var out = [], guard = 0;

    while (guard++ < MAX_DAYS) {
      var key = ymd(cur);
      if (key > stopYmd) break;

      var dow = cur.getDay();
      /* Exam days are blocked out entirely. Nobody does a first pass on a
         topic the morning of the paper, and a schedule that suggests it is
         a schedule she stops trusting. */
      if (indexOfNum(s.days, dow) >= 0 && !(blocked && blocked[key])) {
        var cfg = isWeekendDay(dow) ? s.weekend : s.weekday;
        var times = cfg.times.slice(0, cfg.count).sort();
        for (var i = 0; i < times.length; i++) {
          out.push({ date: key, time: times[i], minutes: cfg.minutes, topics: cfg.topics });
        }
      }
      cur = addDays(cur, 1);
    }
    return out;
  }

  function indexOfNum(arr, n) {
    for (var i = 0; i < arr.length; i++) if (arr[i] === n) return i;
    return -1;
  }

  /* ───────────────────────── the plan ───────────────────────── */

  function moduleList() {
    if (typeof Modules === 'undefined') return [];
    return Modules.ready();
  }

  /* Builds the whole schedule.

     Returns { sessions, done, warnings, modules }, where `sessions` is every
     future session in date/time order and `done` is every completed one
     against the date it was completed. */
  function plan() {
    var s = live();
    var start = s.start && s.start > todayYmd() ? s.start : todayYmd();
    var mods = moduleList();
    var i, j;

    /* NOTHING IS PLANNED FOR A MODULE WITH NO EXAM DATE.

       A schedule with no deadline is not a plan, it is a list of everything
       she has to do stretching into next year — which is exactly the feeling
       this screen exists to remove. So a module contributes sessions only once
       she has told us when its paper is. The modules still waiting are handed
       back as `needsDates` so the screen can ask for them by name. */
    var stop = start, needsDates = [];
    for (i = 0; i < mods.length; i++) {
      var e = s.exams[mods[i].id];
      if (!e) { needsDates.push(mods[i]); continue; }
      if (e > stop) stop = e;
    }
    var anyExam = needsDates.length < mods.length;

    /* Exam days are blocked out of the slot list, so nothing is ever planned
       on top of a paper she is sitting. */
    var blocked = {}, examDays = [];
    for (i = 0; i < mods.length; i++) {
      var ed = s.exams[mods[i].id];
      if (!ed) continue;
      blocked[ed] = true;
      examDays.push({
        date: ed,
        moduleId: mods[i].id,
        moduleCode: mods[i].code,
        moduleTitle: mods[i].title,
        label: mods[i].code + ' exam'
      });
    }
    examDays.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

    var slots = anyExam ? buildSlots(start, stop, blocked) : [];

    /* Topic capacity from each slot to the end, so the urgency comparison
       below can weigh remaining work against remaining CAPACITY rather than
       against a slot count that may hold two or three topics each. */
    var capFrom = new Array(slots.length + 1);
    capFrom[slots.length] = 0;
    for (i = slots.length - 1; i >= 0; i--) capFrom[i] = capFrom[i + 1] + (slots[i].topics || 1);

    /* Per-module state. `queue` holds the required work — first pass, revision,
       second revision — with anything already ticked left out. */
    var state = [];
    for (i = 0; i < mods.length; i++) {
      /* No exam date, no sessions. She can date one module and leave the other
         blank, and only the dated one appears on the calendar. */
      if (!s.exams[mods[i].id]) continue;

      var topics = topicsFor(mods[i].id);
      var focus = s.focus;
      var queue = [];
      for (var pass = 1; pass <= 3; pass++) {
        var q = passQueue(topics, pass, focus);
        for (j = 0; j < q.length; j++) queue.push({ topic: q[j], pass: pass });
      }
      state.push({
        module: mods[i],
        topics: topics,
        exam: s.exams[mods[i].id],
        queue: queue,
        at: 0,
        nextPass: 4,
        placed: 0,
        overflow: 0,
        lastSlot: -1
      });
    }

    /* The index of the last slot that falls on or before each module's exam.
       Precomputed so the urgency comparison below stays O(1) per slot. */
    for (i = 0; i < state.length; i++) {
      state[i].lastSlot = lastSlotOnOrBefore(slots, state[i].exam);
    }

    var sessions = [];
    for (i = 0; i < slots.length; i++) {
      var pick = choose(state, i, capFrom);
      if (!pick) continue;

      var slot = slots[i];
      var room = slot.topics || 1;
      var late = pick.exam && slot.date > pick.exam;
      var items = [];

      /* One session can hold more than one topic. They all come from the same
         module: switching subject halfway through an hour is not what she
         meant by two topics in a session. */
      while (items.length < room) {
        var item = pick.queue[pick.at];
        if (!item) {
          /* Required work is finished and the exam is still ahead: fill the
             gap with another revision round rather than leaving it blank. */
          if (!extendRevision(pick, s.focus)) break;
          item = pick.queue[pick.at];
          if (!item) break;
        }
        pick.at++;
        pick.placed++;
        if (late && item.pass <= 3) pick.overflow++;

        items.push({
          key: markKey(item.topic.id, item.pass),
          topicId: item.topic.id,
          title: item.topic.title,
          emoji: item.topic.emoji,
          weekNumber: item.topic.weekNumber,
          pass: item.pass,
          passName: passName(item.pass),
          done: false
        });
      }

      if (!items.length) continue;

      sessions.push({
        date: slot.date,
        time: slot.time,
        minutes: slot.minutes,
        moduleId: pick.module.id,
        moduleCode: pick.module.code,
        accent: pick.module.accent,
        items: items,
        late: !!late
      });
    }

    /* Anything still sitting in a queue never got a slot at all. */
    var warnings = [];
    for (i = 0; i < state.length; i++) {
      var st = state[i];
      var left = 0;
      for (j = st.at; j < st.queue.length; j++) if (st.queue[j].pass <= 3) left++;
      var short = left + st.overflow;
      if (short > 0) {
        warnings.push({
          moduleId: st.module.id,
          moduleCode: st.module.code,
          exam: st.exam,
          short: short,
          text: short + ' ' + (short === 1 ? 'session' : 'sessions') +
                ' will not fit before the ' + st.module.code + ' exam' +
                (st.exam ? ' on ' + pretty(st.exam) : '') + '.'
        });
      }
    }

    return {
      sessions: sessions,
      done: completedList(mods),
      exams: examDays,
      warnings: warnings,
      modules: mods,
      /* Modules still waiting for an exam date, so the screen can name them
         rather than just showing an empty calendar. */
      needsDates: needsDates,
      start: start,
      stop: stop
    };
  }

  /* Which module should take this slot? Whichever is furthest behind relative
     to the room it has left — remaining topics divided by remaining CAPACITY,
     which is not the same as the number of slots once a slot can hold two or
     three topics. A module whose exam has passed is finished and takes
     nothing. */
  function choose(state, slotIndex, capFrom) {
    var best = null, bestPressure = -1;
    for (var i = 0; i < state.length; i++) {
      var st = state[i];
      if (st.lastSlot >= 0 && slotIndex > st.lastSlot && st.at >= st.queue.length) continue;
      if (st.exam && slotIndex > st.lastSlot) continue;

      var remaining = st.queue.length - st.at;
      /* Nothing required left, but the exam is still ahead: it can still take
         slots for extra revision, at the lowest possible priority. */
      var pressure;
      if (remaining <= 0) {
        pressure = st.exam ? 0.0001 : -1;
      } else {
        var room = capFrom[slotIndex] - capFrom[st.lastSlot + 1];
        pressure = room > 0 ? remaining / room : 1e9;
      }
      if (pressure < 0) continue;

      if (pressure > bestPressure) { bestPressure = pressure; best = st; }
    }
    return best;
  }

  /* Adds one more revision round for a module that has finished its required
     passes with exam time still to spare. */
  function extendRevision(st, focus) {
    if (st.nextPass > MAX_PASS) return false;
    var q = passQueue(st.topics, st.nextPass, focus);
    if (!q.length) { st.nextPass++; return false; }
    for (var i = 0; i < q.length; i++) st.queue.push({ topic: q[i], pass: st.nextPass });
    st.nextPass++;
    return true;
  }

  function lastSlotOnOrBefore(slots, dateYmd) {
    var last = -1;
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].date <= dateYmd) last = i; else break;
    }
    return last;
  }

  /* Every session she has already completed, against the day she completed it,
     so the calendar fills in behind her instead of showing empty days.

     Grouped by day and module into the same {..., items:[]} shape a planned
     session has, so the calendar can draw both without asking which it is
     holding. Several topics finished on one day become one block, which is
     also how the day actually went. */
  function completedList(mods) {
    var groups = {}, order = [], i, j, pass;
    for (i = 0; i < mods.length; i++) {
      var topics = topicsFor(mods[i].id);
      for (j = 0; j < topics.length; j++) {
        for (pass = 1; pass <= MAX_PASS; pass++) {
          var on = doneOn(topics[j].id, pass);
          if (!on) continue;

          var gk = on + '|' + mods[i].id;
          if (!groups[gk]) {
            groups[gk] = {
              date: on,
              time: '',
              moduleId: mods[i].id,
              moduleCode: mods[i].code,
              accent: mods[i].accent,
              items: [],
              done: true
            };
            order.push(gk);
          }
          groups[gk].items.push({
            key: markKey(topics[j].id, pass),
            topicId: topics[j].id,
            title: topics[j].title,
            emoji: topics[j].emoji,
            weekNumber: topics[j].weekNumber,
            pass: pass,
            passName: passName(pass),
            done: true
          });
        }
      }
    }

    var out = [];
    for (i = 0; i < order.length; i++) out.push(groups[order[i]]);
    out.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });
    return out;
  }

  function passName(n) {
    if (n === 1) return 'First pass';
    if (n === 2) return 'Revision';
    if (n === 3) return 'Second revision';
    return 'Revision ' + (n - 1);
  }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

  function pretty(dateYmd) {
    var d = parseYmd(dateYmd);
    if (!d) return dateYmd;
    return d.getDate() + ' ' + MONTHS[d.getMonth()];
  }

  return {
    DEFAULTS: DEFAULTS,
    settings: settings,
    update: update,

    isDone: isDone,
    doneOn: doneOn,
    setDone: setDone,
    isFocus: isFocus,
    setFocus: setFocus,

    plan: plan,
    topicsFor: topicsFor,
    passName: passName,

    /* Exposed for calendar.js and the checks. */
    ymd: ymd,
    parseYmd: parseYmd,
    addDays: addDays,
    todayYmd: todayYmd,
    pretty: pretty,
    months: MONTHS,
    buildSlots: buildSlots
  };
})();
