/* Abi's Study Buddy — events and to-dos.
 *
 * The things that have a date but are not study sessions: an assignment due
 * on the fourth, a class test, a lecture she has to be at. And a plain to-do
 * list for everything else.
 *
 * WHY THESE ARE NOT SCHEDULE ITEMS
 *
 *   The scheduler owns topics: it decides when each one is studied and moves
 *   them about as she gets ahead or falls behind. An assignment deadline is
 *   the opposite — it is fixed, it came from the university, and nothing the
 *   scheduler does can move it. So events live here, appear on the calendar
 *   beside the sessions, and the scheduler never looks at them.
 *
 *   They do not block study time either. An assignment due at two o'clock
 *   does not stop her studying that evening.
 *
 * SCOPE
 *
 *   Every event and note either belongs to a module or belongs to none.
 *   Reading them takes a `scope`:
 *
 *     null        everything, for the home dashboard
 *     'inba'      only that module's, for a module dashboard
 *
 *   An event's own moduleId of '' means "not about a subject" — paying fees,
 *   buying a textbook. That is not the same as null, which is a question
 *   rather than an answer, and the two must not be confused.
 */

var Planner = (function () {

  var TYPES = [
    { id: 'assignment', name: 'Assignment', emoji: '📝' },
    { id: 'test',       name: 'Test',       emoji: '✏️' },
    { id: 'activity',   name: 'Activity',   emoji: '🎯' },
    { id: 'class',      name: 'Class',      emoji: '🏫' },
    { id: 'deadline',   name: 'Deadline',   emoji: '⏰' },
    { id: 'other',      name: 'Other',      emoji: '📌' }
  ];

  /* "Current day up to two weeks ahead", counted inclusively — today plus the
     next thirteen days. */
  var WINDOW_DAYS = 14;

  /* Ids only have to be unique within one person's saved data. Date.now can
     hand out the same millisecond twice when two are added in a loop, so a
     counter goes on the end. */
  var seq = 0;
  function newId(prefix) {
    seq++;
    return prefix + Date.now().toString(36) + '-' + seq.toString(36);
  }

  function state() { return Store.get(); }

  function list(key) {
    var s = state();
    if (Object.prototype.toString.call(s[key]) !== '[object Array]') s[key] = [];
    return s[key];
  }

  function typeOf(id) {
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return TYPES[i];
    return TYPES[TYPES.length - 1];      // Other
  }

  function inScope(item, scope) {
    if (scope === null || scope === undefined) return true;
    return (item.moduleId || '') === scope;
  }

  /* ───────────────────────── events ───────────────────────── */

  /* An event may have no time — "hand this in on Tuesday" is about the whole
     day. So a time that cannot be read is dropped rather than refused, and the
     event becomes an all-day one. The shape has to be checked as well as the
     values: "99:99" looks like a time and is not one. */
  function cleanTime(v) {
    var s = String(v || '');
    if (!/^\d{1,2}:\d{2}$/.test(s)) return '';
    var bits = s.split(':');
    var h = Number(bits[0]), m = Number(bits[1]);
    if (h < 0 || h > 23 || m < 0 || m > 59) return '';
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function cleanEvent(raw) {
    var name = String(raw.name || '').replace(/^\s+|\s+$/g, '');
    if (!name) return null;
    if (!Schedule.parseYmd(raw.date)) return null;
    return {
      id: raw.id || newId('e'),
      name: name.slice(0, 120),
      date: raw.date,
      time: cleanTime(raw.time),
      type: typeOf(raw.type).id,
      moduleId: String(raw.moduleId || ''),
      done: typeof raw.done === 'string' ? raw.done : ''
    };
  }

  function addEvent(raw) {
    var ev = cleanEvent(raw);
    if (!ev) return null;
    list('events').push(ev);
    Store.saveNow();
    return ev;
  }

  function findEvent(id) {
    var all = list('events');
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function updateEvent(id, patch) {
    var ev = findEvent(id);
    if (!ev) return false;
    var merged = cleanEvent({
      id: ev.id,
      name: patch.name !== undefined ? patch.name : ev.name,
      date: patch.date !== undefined ? patch.date : ev.date,
      time: patch.time !== undefined ? patch.time : ev.time,
      type: patch.type !== undefined ? patch.type : ev.type,
      moduleId: patch.moduleId !== undefined ? patch.moduleId : ev.moduleId,
      done: patch.done !== undefined ? patch.done : ev.done
    });
    if (!merged) return false;
    for (var k in merged) {
      if (Object.prototype.hasOwnProperty.call(merged, k)) ev[k] = merged[k];
    }
    Store.saveNow();
    return true;
  }

  function removeEvent(id) {
    var all = list('events');
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) { all.splice(i, 1); Store.saveNow(); return true; }
    }
    return false;
  }

  function setEventDone(id, on) {
    return updateEvent(id, { done: on ? Schedule.todayYmd() : '' });
  }

  function byWhen(a, b) {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    /* An event with no time given leads its day: "hand this in on Tuesday"
       is a thing about the whole day, not about midnight. */
    var at = a.time || '', bt = b.time || '';
    return at < bt ? -1 : (at > bt ? 1 : 0);
  }

  /* opts: { includeDone, from, to } — `from` and `to` are inclusive dates. */
  function events(scope, opts) {
    opts = opts || {};
    var all = list('events'), out = [];
    for (var i = 0; i < all.length; i++) {
      var ev = all[i];
      if (!inScope(ev, scope)) continue;
      if (ev.done && !opts.includeDone) continue;
      if (opts.from && ev.date < opts.from) continue;
      if (opts.to && ev.date > opts.to) continue;
      out.push(ev);
    }
    out.sort(byWhen);
    return out;
  }

  /* ───────────────────────── the numbers ─────────────────────────
     Events only. Study sessions have their own progress bars on the schedule
     screen, and counting them here would put the two or three things with
     real deadlines behind a hundred topics. */
  function kpis(scope) {
    var today = Schedule.todayYmd();
    var until = Schedule.ymd(Schedule.addDays(Schedule.parseYmd(today), WINDOW_DAYS - 1));
    var all = list('events');
    var out = { upcoming: 0, overdue: 0, completed: 0, from: today, to: until };

    for (var i = 0; i < all.length; i++) {
      var ev = all[i];
      if (!inScope(ev, scope)) continue;
      if (ev.done) { out.completed++; continue; }
      if (ev.date < today) out.overdue++;
      else if (ev.date <= until) out.upcoming++;
    }
    return out;
  }

  /* ───────────────────────── to-dos ───────────────────────── */

  function addTodo(text, moduleId) {
    var t = String(text || '').replace(/^\s+|\s+$/g, '');
    if (!t) return null;
    var item = {
      id: newId('t'),
      text: t.slice(0, 200),
      moduleId: String(moduleId || ''),
      done: '',
      /* Only ever used to sort, and kept as a plain millisecond count rather
         than an ISO string: a restored snapshot turns every field into text,
         and comparing dates as text is a trap waiting for a format change. */
      at: String(new Date().getTime())
    };
    list('todos').push(item);
    Store.saveNow();
    return item;
  }

  function findTodo(id) {
    var all = list('todos');
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function setTodoDone(id, on) {
    var t = findTodo(id);
    if (!t) return false;
    t.done = on ? Schedule.todayYmd() : '';
    Store.saveNow();
    return true;
  }

  function removeTodo(id) {
    var all = list('todos');
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) { all.splice(i, 1); Store.saveNow(); return true; }
    }
    return false;
  }

  function todos(scope, includeDone) {
    var all = list('todos'), out = [];
    for (var i = 0; i < all.length; i++) {
      if (!inScope(all[i], scope)) continue;
      if (all[i].done && !includeDone) continue;
      out.push(all[i]);
    }
    /* Oldest first among the outstanding ones, so the thing she has been
       putting off longest is at the top rather than buried. Completed ones
       sink. */
    out.sort(function (a, b) {
      if (!a.done !== !b.done) return a.done ? 1 : -1;
      return (Number(a.at) || 0) - (Number(b.at) || 0);
    });
    return out;
  }

  function doneCount(scope) {
    var all = list('todos'), n = 0;
    for (var i = 0; i < all.length; i++) {
      if (inScope(all[i], scope) && all[i].done) n++;
    }
    return n;
  }

  return {
    TYPES: TYPES,
    WINDOW_DAYS: WINDOW_DAYS,
    typeOf: typeOf,

    events: events,
    addEvent: addEvent,
    findEvent: findEvent,
    updateEvent: updateEvent,
    removeEvent: removeEvent,
    setEventDone: setEventDone,
    kpis: kpis,

    todos: todos,
    addTodo: addTodo,
    setTodoDone: setTodoDone,
    removeTodo: removeTodo,
    todoDoneCount: doneCount
  };
})();
