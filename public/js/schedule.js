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
 *   THE FIRST PASS IS THE WORK. REVISION IS A BONUS.
 *
 *   Covering every topic once, before the exam, is the only thing this plan
 *   treats as required. Revision rounds are added afterwards, one at a time,
 *   and only while there is still room before the exam — so a plan with three
 *   weeks in it revises everything twice, and a plan with three days in it
 *   simply does not, without ever telling her she is behind.
 *
 *   That also fixes the order across modules: a module still on its first
 *   pass always outranks one that has finished and would be revising.
 *   Everything is covered once before anything is covered twice.
 *
 *   The shortfall warning only ever counts first-pass topics. A calendar that
 *   announced she was three hundred sittings behind because it had silently
 *   demanded three passes of everything is not a guide, it is a reprimand.
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
       one is how a schedule starts feeling like a waste of an evening.

       `times`, `mins` and `mods` are per session and always the same length as
       `count`. A day is rarely made of equal blocks — three quarters of an hour
       after work and two hours later on is a normal evening, and a single
       length for the whole day cannot describe it.

       `mods` pins a session to a subject — mods[1] = 'inba' means the second
       session of a weekday is always business. An empty string leaves it to
       the scheduler, which is the default and gives whichever module is
       furthest behind. */
    /* `unit` is what a session is measured in — 'topics' or 'lessons' — and
       `topics` / `lessons` is how many of them fit. A confident hour can be a
       whole lesson rather than three loose topics, and the module is taught in
       lessons, so covering one end to end is a more natural sitting. */
    weekday: {
      count: 2, unit: 'topics', topics: 1, lessons: 1,
      times: ['17:00', '19:30'], mins: [60, 60], mods: ['', '']
    },
    weekend: {
      count: 3, unit: 'topics', topics: 1, lessons: 1,
      times: ['09:00', '11:30', '14:00'], mins: [60, 60, 60], mods: ['', '', '']
    },
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
    var i;

    var c = Math.floor(Number(b.count));
    if (isFinite(c) && c >= 1 && c <= 8) out.count = c;
    var tp = Math.floor(Number(b.topics));
    if (isFinite(tp) && tp >= 1 && tp <= 4) out.topics = tp;
    var ls = Math.floor(Number(b.lessons));
    if (isFinite(ls) && ls >= 1 && ls <= 4) out.lessons = ls;
    if (b.unit === 'lessons' || b.unit === 'topics') out.unit = b.unit;

    if (Object.prototype.toString.call(b.times) === '[object Array]') {
      out.times = [];
      for (i = 0; i < b.times.length; i++) out.times.push(cleanTime(b.times[i], i));
    }
    if (Object.prototype.toString.call(b.mods) === '[object Array]') {
      out.mods = [];
      for (i = 0; i < b.mods.length; i++) out.mods.push(String(b.mods[i] || ''));
    }

    /* Session length used to be one figure for the whole block. A save from
       before that changed carries `minutes` and no `mins`, so it seeds every
       session with what it used to mean — she keeps the lengths she set. */
    var seed = Math.floor(Number(b.minutes));
    if (!isFinite(seed) || seed < 10 || seed > 240) seed = 60;

    if (Object.prototype.toString.call(b.mins) === '[object Array]') {
      out.mins = [];
      for (i = 0; i < b.mins.length; i++) out.mins.push(cleanMinutes(b.mins[i], seed));
    } else if (b.minutes !== undefined) {
      out.mins = [];
      for (i = 0; i < out.count; i++) out.mins.push(seed);
    }

    /* Always exactly `count` of each, so the UI can render one row per session
       without checking for holes. Sorting the times has to carry the length and
       the pinned module along with it, or editing a time would silently
       reshuffle which subject and which length sat where. */
    if (!out.mods) out.mods = [];
    if (!out.mins) out.mins = [];
    while (out.times.length < out.count) {
      out.times.push(nextTime(out.times, out.mins[out.times.length - 1] || seed));
    }
    while (out.mins.length < out.times.length) {
      out.mins.push(out.mins.length ? out.mins[out.mins.length - 1] : seed);
    }
    while (out.mods.length < out.times.length) out.mods.push('');

    out.times.length = out.count;
    out.mins.length = out.count;
    out.mods.length = out.count;

    orderSessions(out);
    return out;
  }

  function cleanMinutes(v, fallback) {
    var n = Math.floor(Number(v));
    return (isFinite(n) && n >= 10 && n <= 240) ? n : fallback;
  }

  function toMins(hhmm) {
    var bits = String(hhmm || '').split(':');
    return (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
  }

  function fromMins(n) {
    if (n < 0) n = 0;
    if (n > LAST_MINUTE) n = LAST_MINUTE;
    return pad(Math.floor(n / 60)) + ':' + pad(n % 60);
  }

  var LAST_MINUTE = 23 * 60 + 59;

  /* SESSIONS ARE ALWAYS IN TIME ORDER AND NEVER OVERLAP.
   *
   * Both of those are guaranteed here rather than left to the screens, because
   * two screens were disagreeing about it: the calendar sorted a day before
   * drawing it while the settings panel listed the sessions in whatever order
   * they were stored, so a day could read 14:00, 19:30, 14:00, 15:30 in the
   * settings and come out sorted on the calendar.
   *
   * Overlaps were possible too — nothing stopped two sessions starting at the
   * same time, or a two-hour session swallowing the one after it.
   *
   * A session that starts before the previous one has finished is pushed to
   * when that one ends. She keeps the times she can keep, and only the clash
   * moves. Weekday and weekend blocks are sanitised separately and never see
   * each other, so a Saturday morning cannot be pushed about by a Tuesday
   * evening.
   */
  function orderSessions(b) {
    var trio = [], i;
    for (i = 0; i < b.count; i++) {
      trio.push({ t: toMins(b.times[i]), m: b.mins[i], mod: b.mods[i] });
    }
    trio.sort(function (x, y) { return x.t - y.t; });

    for (i = 1; i < trio.length; i++) {
      var endsAt = trio[i - 1].t + trio[i - 1].m;
      if (trio[i].t < endsAt) trio[i].t = Math.min(endsAt, LAST_MINUTE);
    }

    for (i = 0; i < trio.length; i++) {
      b.times[i] = fromMins(trio[i].t);
      b.mins[i] = trio[i].m;
      b.mods[i] = trio[i].mod;
    }
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
  /* A week's topics, in the order they are taught. Falls back to the order
     they were written in for a module with no lessons. */
  function orderByLesson(week) {
    var raw = week.topics || [];
    if (!week.lessons || !week.lessons.length) return raw;

    var byId = {}, i, j;
    for (i = 0; i < raw.length; i++) byId[raw[i].id] = raw[i];

    var out = [], placed = {};
    for (i = 0; i < week.lessons.length; i++) {
      var ids = week.lessons[i].topicIds || [];
      for (j = 0; j < ids.length; j++) {
        if (!byId[ids[j]] || placed[ids[j]]) continue;
        placed[ids[j]] = 1;
        out.push(byId[ids[j]]);
      }
    }
    /* A topic in no lesson would otherwise vanish from the schedule entirely,
       which is a far worse failure than being in the wrong place.
       validate.js reports it, but it must not be dropped here. */
    for (i = 0; i < raw.length; i++) if (!placed[raw[i].id]) out.push(raw[i]);
    return out;
  }

  function topicsFor(moduleId) {
    var out = [];
    if (typeof Modules === 'undefined') return out;
    var content = Modules.contentFor(moduleId);
    var weeks = (content && content.weeks) || [];
    for (var w = 0; w < weeks.length; w++) {
      if (weeks[w].comingSoon) continue;

      /* Lesson titles, so a session built out of whole lessons can say which
         lesson it is rather than listing the topics inside it. */
      var lessonTitles = {};
      for (var L = 0; L < (weeks[w].lessons || []).length; L++) {
        lessonTitles[weeks[w].lessons[L].number] = weeks[w].lessons[L].title;
      }

      /* IN LESSON ORDER, NOT FILE ORDER.
       *
       * A week's topics array is the order they happen to have been written
       * in, which is not always the order they are taught in — Week 5 has a
       * Lesson 3 topic sitting after three Lesson 4 topics. Following the file
       * gave her a Saturday that ran Lesson 3, Lesson 4, Lesson 3, Lesson 4,
       * and split a lesson across two sittings hours apart.
       *
       * The lesson map is the authority on the order, and it is the thing that
       * was checked against Milpark's own contents page. Anything not in a
       * lesson keeps its place at the end, which is how maths behaves. */
      var topics = orderByLesson(weeks[w]);
      for (var t = 0; t < topics.length; t++) {
        out.push({
          id: topics[t].id,
          title: topics[t].title,
          emoji: topics[t].emoji,
          weekNumber: weeks[w].number,
          weekTitle: weeks[w].title,
          lesson: topics[t].lesson || 0,
          lessonTitle: lessonTitles[topics[t].lesson] || '',
          /* Lesson numbers restart every week, so a session built out of whole
             lessons has to compare week AND lesson. A module with no lessons
             at all (maths) gives every topic its own key, which makes "one
             lesson per session" behave exactly like "one topic". */
          lessonKey: topics[t].lesson
            ? ('w' + weeks[w].number + 'l' + topics[t].lesson)
            : ('t' + topics[t].id)
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
        /* Times are sorted with their pinned module attached, not separately.
           Sorting the two apart would quietly move which subject sits in which
           session every time she edited a time. */
        /* Already in time order and free of overlaps — orderSessions() does
           that once, on the way into the settings, so the calendar and the
           settings panel can never disagree about a day's shape. */
        for (var i = 0; i < cfg.count; i++) {
          out.push({
            date: key,
            time: cfg.times[i],
            minutes: (cfg.mins && cfg.mins[i]) || 60,
            unit: cfg.unit || 'topics',
            /* How many of whatever `unit` says. Topic capacity for a
               lessons-based slot is not known until a module is chosen, since
               lessons differ in size — see capacityFor(). */
            room: cfg.unit === 'lessons' ? (cfg.lessons || 1) : (cfg.topics || 1),
            topics: cfg.topics,
            mod: (cfg.mods && cfg.mods[i]) || ''
          });
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
       against a slot count that may hold two or three topics each.

       Worked out per module, because a slot pinned to another subject is not
       capacity this one can use. Without that, pinning every weekday evening
       to business would leave maths thinking it had the whole calendar. */
    function capacityFor(moduleId, topicList) {
      /* A lessons-based slot holds however many topics those lessons contain,
         which varies — one lesson here is nine topics and another is one. For
         choosing WHICH module gets a slot, the module's own average is close
         enough; the shortfall warning does not rely on this at all, because it
         counts what is actually left in the queue afterwards. */
      var perLesson = 1, seen = {}, lessons = 0, i;
      for (i = 0; i < topicList.length; i++) {
        if (!seen[topicList[i].lessonKey]) { seen[topicList[i].lessonKey] = 1; lessons++; }
      }
      if (lessons > 0) perLesson = topicList.length / lessons;

      var arr = new Array(slots.length + 1);
      arr[slots.length] = 0;
      for (var k = slots.length - 1; k >= 0; k--) {
        var mine = !slots[k].mod || slots[k].mod === moduleId;
        var holds = slots[k].unit === 'lessons'
          ? Math.max(1, Math.round((slots[k].room || 1) * perLesson))
          : (slots[k].topics || 1);
        arr[k] = arr[k + 1] + (mine ? holds : 0);
      }
      return arr;
    }

    /* Per-module state.
     *
     * `queue` holds the REQUIRED work, and required means the first pass and
     * nothing else. Revision is a bonus: worth doing, scheduled whenever there
     * is room before the exam, and never counted against her when there is
     * not. A schedule that declares her three hundred sittings behind because
     * it silently demanded three passes of everything is not a guide, it is a
     * reprimand.
     *
     * That also decides the order of the whole calendar. A module still on its
     * first pass always outranks a module that has finished one and would be
     * revising — see choose(), where a finished queue drops to almost no
     * priority. Everything gets covered once before anything gets covered
     * twice.
     */
    var state = [];
    for (i = 0; i < mods.length; i++) {
      /* No exam date, no sessions. She can date one module and leave the other
         blank, and only the dated one appears on the calendar. */
      if (!s.exams[mods[i].id]) continue;

      var topics = topicsFor(mods[i].id);
      var first = passQueue(topics, 1, s.focus);
      var queue = [];
      for (j = 0; j < first.length; j++) queue.push({ topic: first[j], pass: 1 });

      /* Taught position of each topic, so a session rebuilt from two sources —
         what she ticked, and what is still in the queue — can be put back into
         the order she is meant to work it. */
      var order = {};
      for (j = 0; j < topics.length; j++) order[topics[j].id] = j;

      state.push({
        module: mods[i],
        topics: topics,
        order: order,
        exam: s.exams[mods[i].id],
        queue: queue,
        at: 0,
        /* Revision starts at pass 2 and is added a round at a time, only while
           the exam is still ahead. */
        nextPass: 2,
        placed: 0,
        overflow: 0,
        lastSlot: -1
      });
    }

    /* The index of the last slot that falls on or before each module's exam,
       and the capacity available to it. Precomputed so the urgency comparison
       below stays O(1) per slot. */
    for (i = 0; i < state.length; i++) {
      state[i].lastSlot = lastSlotOnOrBefore(slots, state[i].exam);
      state[i].cap = capacityFor(state[i].module.id, state[i].topics);
    }

    /* Pulls up to `room` topics off one module's queue for one slot. Kept
       separate so a slot pinned to a module that turns out to have nothing
       left can fall back to whoever does need it, rather than sitting empty. */
    function fill(st, slot, room) {
      var out = [], late = st.exam && slot.date > st.exam;
      var byLessons = slot.unit === 'lessons';
      var seenLesson = {}, lessonsTaken = 0;

      while (true) {
        if (!byLessons && out.length >= room) break;

        var item = st.queue[st.at];
        if (!item) {
          /* Required work is finished and the exam is still ahead: fill the
             gap with another revision round rather than leaving it blank. */
          if (!extendRevision(st, s.focus)) break;
          item = st.queue[st.at];
          if (!item) break;
        }

        /* Measured in lessons: keep taking topics while they belong to a
           lesson this session has already started, and stop at the point where
           one more would mean starting a lesson too many.

           A lesson part-finished still counts as a whole one — she has ticked
           some of it off, and the session is what remains. */
        if (byLessons) {
          var key = item.topic.lessonKey + '|' + item.pass;
          if (!seenLesson[key]) {
            if (lessonsTaken >= room) break;
            seenLesson[key] = 1;
            lessonsTaken++;
          }
        }
        st.at++;
        st.placed++;
        /* Only the first pass counts as work she has missed. Revision that
           falls past the exam is revision she was never owed. */
        if (late && item.pass === 1) st.overflow++;

        out.push({
          key: markKey(item.topic.id, item.pass),
          topicId: item.topic.id,
          title: item.topic.title,
          emoji: item.topic.emoji,
          weekNumber: item.topic.weekNumber,
          lesson: item.topic.lesson,
          lessonTitle: item.topic.lessonTitle,
          lessonKey: item.topic.lessonKey,
          pass: item.pass,
          passName: passName(item.pass),
          done: false
        });
      }
      return out;
    }

    /* Work she has already ticked off, waiting to be handed a slot. Keyed by
       the day she ticked it, so a slot only ever sees its own day's work. */
    var settled = {}, entries = completedEntries(mods);
    for (i = 0; i < entries.length; i++) {
      if (!settled[entries[i].date]) settled[entries[i].date] = [];
      settled[entries[i].date].push(entries[i]);
    }

    var sessions = [], doneSessions = [];
    for (i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var room = slot.room || slot.topics || 1;
      var items = [], pick = null, skip = null;

      /* A session she has already started takes its slot before anything is
         planned into it. Without this the slot is replanned every time she
         ticks something off, so the session she is sitting in front of keeps
         growing new work and can never be completed. */
      var settledHere = takeSettled(settled, slot);
      if (settledHere) {
        var host = stateFor(state, settledHere.moduleId);
        if (host) topUp(host, slot, settledHere);
        /* Finished ones are a record; part-finished ones are still work, and
           belong with the sessions so the home tile can offer her the one she
           is halfway through rather than the next untouched one. */
        if (settledHere.done) doneSessions.push(settledHere);
        else { settledHere.kind = 'session'; sessions.push(settledHere); }
        continue;
      }

      /* A session pinned to a subject goes to that subject. If it has nothing
         left to give — finished, or its exam already sat — the slot goes to
         whoever else needs it rather than being wasted. */
      if (slot.mod) {
        pick = pinned(state, i, slot.mod);
        if (pick) { items = fill(pick, slot, room); skip = pick; }
      }
      if (!items.length) {
        pick = choose(state, i, skip);
        if (pick) items = fill(pick, slot, room);
      }

      if (!items.length || !pick) continue;
      var late = pick.exam && slot.date > pick.exam;

      /* When a session is a whole lesson, the calendar should say so rather
         than listing the topics inside it — she chose to study by lesson, and
         seeing five topic names is not what she asked for. The topics are
         still carried, because she still ticks them off one at a time. */
      var lessonList = lessonsIn(items, slot.unit);

      sessions.push({
        date: slot.date,
        time: slot.time,
        minutes: slot.minutes,
        moduleId: pick.module.id,
        moduleCode: pick.module.code,
        accent: pick.module.accent,
        unit: slot.unit || 'topics',
        /* Empty unless the session is measured in lessons AND the module has
           them — maths has none, so its sessions stay topic-shaped. */
        lessons: lessonList,
        items: items,
        late: !!late
      });
    }

    /* Finished work the slots could not take — done before her start date, or
       more in one day than she had sessions for. */
    doneSessions = doneSessions.concat(sweepSettled(settled));
    doneSessions.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return String(a.time) < String(b.time) ? -1 : 1;
    });

    /* Anything still sitting in a queue never got a slot at all. */
    var warnings = [];
    for (i = 0; i < state.length; i++) {
      var st = state[i];
      var left = 0;
      for (j = st.at; j < st.queue.length; j++) if (st.queue[j].pass === 1) left++;
      var short = left + st.overflow;
      if (short > 0) {
        /* Only ever about the FIRST PASS. Missing revision is not a shortfall
           — it is simply revision she did not have room for, and warning about
           it would mean the calendar cried wolf from the day she set it up. */
        warnings.push({
          moduleId: st.module.id,
          moduleCode: st.module.code,
          exam: st.exam,
          short: short,
          text: short + ' ' + (short === 1 ? 'topic has' : 'topics have') +
                ' no room before the ' + st.module.code + ' exam' +
                (st.exam ? ' on ' + pretty(st.exam) : '') +
                ' — that is the first pass, before any revision.'
        });
      }
    }

    return {
      sessions: sessions,
      /* Completed sessions stay out of `sessions` deliberately: the home tile
         reads sessions[0] as "what is next", and a finished one appearing
         there would announce work she has already done. */
      done: doneSessions,
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
  function choose(state, slotIndex, skip) {
    var best = null, bestPressure = -1;
    for (var i = 0; i < state.length; i++) {
      var st = state[i];
      if (st === skip) continue;
      if (slotIndex > st.lastSlot) continue;

      var remaining = st.queue.length - st.at;
      /* Nothing required left, but the exam is still ahead: it can still take
         slots for extra revision, at the lowest possible priority. */
      var pressure;
      if (remaining <= 0) {
        pressure = 0.0001;
      } else {
        var room = st.cap[slotIndex] - st.cap[st.lastSlot + 1];
        pressure = room > 0 ? remaining / room : 1e9;
      }
      /* Ties are broken toward whichever module has had fewer sessions so far.
         Without that, two subjects with the same deadline and the same amount
         of work would compare exactly equal at every slot and the first one
         listed would take the lot — she would finish one subject entirely
         before touching the other. */
      var better = false;
      if (best === null) better = true;
      else if (pressure > bestPressure + 1e-9) better = true;
      else if (pressure > bestPressure - 1e-9 && st.placed < best.placed) better = true;

      if (better) { bestPressure = pressure; best = st; }
    }
    return best;
  }

  /* The module a slot is pinned to, if it is still able to use the slot. */
  function pinned(state, slotIndex, moduleId) {
    for (var i = 0; i < state.length; i++) {
      if (state[i].module.id !== moduleId) continue;
      return slotIndex > state[i].lastSlot ? null : state[i];
    }
    return null;
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
  /* ───────────────────── work already done ─────────────────────
   *
   * Everything she has ticked off, flat and in the order it should appear on
   * the calendar: by the day she ticked it, then by module, then in taught
   * order within the module.
   *
   * WHY THIS IS A LIST AND NOT A GROUPED ONE
   *
   *   It used to be grouped straight into one untimed block per day, which is
   *   all the calendar needed to draw it. But the planner needs to know that a
   *   finished session has USED UP a slot, and for that the finished work has
   *   to be handed out slot by slot the same way pending work is. See
   *   takeSettled, and the bug in plan() that this exists to fix.
   */
  function completedEntries(mods) {
    var out = [], i, j, pass;
    for (i = 0; i < mods.length; i++) {
      var topics = topicsFor(mods[i].id);
      for (j = 0; j < topics.length; j++) {
        for (pass = 1; pass <= MAX_PASS; pass++) {
          var on = doneOn(topics[j].id, pass);
          if (!on) continue;
          out.push({
            date: on,
            moduleId: mods[i].id,
            moduleCode: mods[i].code,
            accent: mods[i].accent,
            item: {
              key: markKey(topics[j].id, pass),
              topicId: topics[j].id,
              title: topics[j].title,
              emoji: topics[j].emoji,
              weekNumber: topics[j].weekNumber,
              lesson: topics[j].lesson,
              lessonTitle: topics[j].lessonTitle,
              lessonKey: topics[j].lessonKey,
              pass: pass,
              passName: passName(pass),
              done: true
            }
          });
        }
      }
    }
    return out;
  }

  /* The lessons a set of items covers, for a session measured in lessons.
     Shared by planned and completed sessions so a finished one is described
     exactly the way it was described before she ticked it. */
  function lessonsIn(items, unit) {
    if (unit !== 'lessons') return [];
    var out = [], seen = {}, i;
    for (i = 0; i < items.length; i++) {
      var key = items[i].lessonKey;
      if (!key || seen[key]) continue;
      /* A module with no lessons — maths — still gets a lesson key so the
         grouping works, but it is a topic wearing a lesson's clothes.
         Announcing it as "Lesson 0" with no title told her nothing and hid the
         topic name she actually needed. */
      if (!items[i].lesson) continue;
      seen[key] = 1;
      out.push({
        key: key,
        weekNumber: items[i].weekNumber,
        number: items[i].lesson,
        title: items[i].lessonTitle,
        passName: items[i].passName
      });
    }
    return out;
  }

  /* Fills one slot with work she has ALREADY finished on that day, or returns
     null if there is none left to place.
   *
   * This is the whole fix for the bug where a session could never be
   * completed. The calendar is rebuilt from scratch every time anything
   * changes, and a ticked-off topic drops out of the queue — so today's slot,
   * having lost the lesson she just finished, simply refilled itself with the
   * next one. Tick that off and it took the one after. The session was
   * unfinishable by construction.
   *
   * Finished work now occupies its slot exactly as pending work would: same
   * room, same lesson counting. Today's first session shows the lesson she
   * completed, and the NEXT lesson goes into the next session, which is what
   * she expected all along.
   */
  function takeSettled(pool, slot) {
    var bag = pool[slot.date];
    if (!bag || !bag.length) return null;

    /* A slot pinned to a subject takes that subject's finished work if there
       is any, so a session she completed lands in the slot she meant it for
       rather than displacing another module's. */
    var moduleId = bag[0].moduleId, k;
    if (slot.mod) {
      for (k = 0; k < bag.length; k++) {
        if (bag[k].moduleId === slot.mod) { moduleId = slot.mod; break; }
      }
    }

    var room = slot.room || slot.topics || 1;
    var byLessons = slot.unit === 'lessons';
    var items = [], seenLesson = {}, lessonsTaken = 0, head = null;

    k = 0;
    while (k < bag.length) {
      if (bag[k].moduleId !== moduleId) { k++; continue; }

      if (byLessons) {
        var lk = bag[k].item.lessonKey + '|' + bag[k].item.pass;
        if (!seenLesson[lk]) {
          if (lessonsTaken >= room) break;
          seenLesson[lk] = 1;
          lessonsTaken++;
        }
      } else if (items.length >= room) {
        break;
      }

      if (!head) head = bag[k];
      items.push(bag[k].item);
      /* Spliced rather than stepped over: what is left in the bag is what
         still needs a slot, and the next slot on this day reads the same bag. */
      bag.splice(k, 1);
    }

    if (!items.length) return null;

    return {
      date: slot.date,
      time: slot.time,
      minutes: slot.minutes,
      moduleId: head.moduleId,
      moduleCode: head.moduleCode,
      accent: head.accent,
      unit: slot.unit || 'topics',
      lessons: lessonsIn(items, slot.unit),
      items: items,
      /* Provisional. topUp decides it properly once the unticked half of the
         session is back in — a session with one topic ticked is in progress,
         not finished. */
      done: true
    };
  }

  /* Puts the rest of a part-finished session back into it.
   *
   * takeSettled only knows about what she has TICKED. Left at that, ticking one
   * topic of a five-topic lesson produced a session containing that one topic
   * and nothing else — the other four went back to the queue and turned up in
   * some later session, so there was no way to finish the one in front of her.
   * That is the same bug as the refilling session wearing the opposite face.
   *
   * So a session that has been started takes back the work it still owes:
   *   - measured in lessons, the remaining topics of the lessons it already
   *     holds, and NOTHING else. Pulling in a fresh lesson is precisely the
   *     bug this area exists to fix.
   *   - measured in topics, enough to fill the room it was given.
   */
  function topUp(st, slot, sess) {
    var room = slot.room || slot.topics || 1;
    var extra = [], k;

    function take(entry) {
      st.placed++;
      return {
        key: markKey(entry.topic.id, entry.pass),
        topicId: entry.topic.id,
        title: entry.topic.title,
        emoji: entry.topic.emoji,
        weekNumber: entry.topic.weekNumber,
        lesson: entry.topic.lesson,
        lessonTitle: entry.topic.lessonTitle,
        lessonKey: entry.topic.lessonKey,
        pass: entry.pass,
        passName: passName(entry.pass),
        done: false
      };
    }

    if (slot.unit === 'lessons') {
      var want = {};
      for (k = 0; k < sess.items.length; k++) {
        want[sess.items[k].lessonKey + '|' + sess.items[k].pass] = 1;
      }
      /* Spliced out of the queue wherever they sit rather than assumed to be
         next: st.at only marks how far the queue has been consumed, and a
         started lesson's leftovers are not guaranteed to be at that point. */
      for (k = st.at; k < st.queue.length; k++) {
        var q = st.queue[k];
        if (!want[q.topic.lessonKey + '|' + q.pass]) continue;
        extra.push(take(q));
        st.queue.splice(k, 1);
        k--;
      }
    } else {
      while (sess.items.length + extra.length < room && st.at < st.queue.length) {
        extra.push(take(st.queue[st.at]));
        st.at++;
      }
    }

    if (extra.length) {
      sess.items = sess.items.concat(extra);
      /* Back into taught order. The ticked half came from the marks and the
         rest from the queue, so concatenating leaves them interleaved wrongly
         — a lesson listing topic 3 above topic 1 reads as a mistake. */
      sess.items.sort(function (a, b) {
        if (a.pass !== b.pass) return a.pass - b.pass;
        return (st.order[a.topicId] || 0) - (st.order[b.topicId] || 0);
      });
      sess.lessons = lessonsIn(sess.items, slot.unit);
    }

    for (k = 0; k < sess.items.length; k++) {
      if (!sess.items[k].done) { sess.done = false; break; }
    }
    return sess;
  }

  function stateFor(state, moduleId) {
    for (var i = 0; i < state.length; i++) {
      if (state[i].module.id === moduleId) return state[i];
    }
    return null;
  }

  /* Whatever the slots could not take: work done before her start date, and
     days where she got through more than she had sessions for. Shown without
     a time, because there is no slot to borrow one from — but shown, which is
     the point. Dropping it would lose the record of an afternoon's work. */
  function sweepSettled(pool) {
    var out = [], key, i;
    for (key in pool) {
      if (!Object.prototype.hasOwnProperty.call(pool, key)) continue;
      var bag = pool[key];
      var groups = {}, order = [];
      for (i = 0; i < bag.length; i++) {
        var gk = bag[i].moduleId;
        if (!groups[gk]) {
          groups[gk] = {
            date: bag[i].date,
            time: '',
            moduleId: bag[i].moduleId,
            moduleCode: bag[i].moduleCode,
            accent: bag[i].accent,
            unit: 'topics',
            lessons: [],
            items: [],
            done: true
          };
          order.push(gk);
        }
        groups[gk].items.push(bag[i].item);
      }
      for (i = 0; i < order.length; i++) out.push(groups[order[i]]);
    }
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
