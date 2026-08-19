// Checks the study schedule engine.
//
// The engine is the part of the calendar that can be wrong without looking
// wrong. A session in the wrong slot, a ticked topic that keeps its place, a
// module that quietly loses its last three sessions before an exam — none of
// those announce themselves on screen. So the engine is driven here directly,
// against a stubbed Store and Modules, with the clock held still.

var REPO = (function () {
    var f = new ActiveXObject("Scripting.FileSystemObject");
    return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName));
})();

// -- ES5 shims, since JScript is ES3 ---------------------------
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) if (fn.call(t, this[i], i, this)) o.push(this[i]); return o; };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; };
}
if (!Object.keys) {
    Object.keys = function (o) { var k = [], n; for (n in o) if (Object.prototype.hasOwnProperty.call(o, n)) k.push(n); return k; };
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var problems = [];

function read(p) {
    var f = fso.OpenTextFile(p, 1);
    var s = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
    return s;
}

function fail(msg) { problems.push(msg); }
function ok(cond, msg) { if (!cond) fail(msg); }

// ── stubs ────────────────────────────────────────────────────────
// Store and Modules are the engine's only two dependencies. Both are replaced
// with the smallest thing that behaves correctly, so a failure here is always
// the engine's fault and never the app's.

var savedSchedule = null;
var badges = {};

var Store = {
    get: function () { return { schedule: savedSchedule, badges: badges }; },
    setSchedule: function (cfg) { savedSchedule = cfg; },
    hasBadge: function (id) { return !!badges[id]; }
};

/* Ten topics, filed into lessons of 2, 3 and 5.
 *
 * Deliberately uneven, because a session measured in lessons holds however
 * many topics that lesson happens to contain, and equal lessons would hide any
 * mistake about that.
 *
 * And deliberately OUT OF ORDER: topic 9 belongs to Lesson 2 but is written
 * after the Lesson 3 topics, exactly as the real Week 5 has a Lesson 3 topic
 * sitting after three Lesson 4 ones. A week's topic array is the order things
 * were written in, not the order they are taught in, and following the file
 * gave a day that ran Lesson 3, Lesson 4, Lesson 3, Lesson 4. */
var LESSON_OF = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 3, 8: 3, 9: 2, 10: 3 };

function makeTopics(prefix, n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
        out.push({
            id: prefix + '-t' + i,
            title: 'Topic ' + i,
            emoji: 'T',
            lesson: LESSON_OF[i]
        });
    }
    return out;
}

/* The lesson map the app builds from lessons.js, which is what decides the
   taught order. Listed here in lesson order, as the real one is. */
function lessonsFor(prefix) {
    return [
        { number: 1, title: 'Lesson one', emoji: 'L',
          topicIds: [prefix + '-t1', prefix + '-t2'], wanted: 2 },
        { number: 2, title: 'Lesson two', emoji: 'L',
          topicIds: [prefix + '-t3', prefix + '-t4', prefix + '-t9'], wanted: 3 },
        { number: 3, title: 'Lesson three', emoji: 'L',
          topicIds: [prefix + '-t5', prefix + '-t6', prefix + '-t7',
                     prefix + '-t8', prefix + '-t10'], wanted: 5 }
    ];
}

var CONTENT = {
    aaa: { weeks: [{ number: 1, title: 'W1', topics: makeTopics('aaa', 10),
                     lessons: lessonsFor('aaa') }] },
    bbb: { weeks: [{ number: 1, title: 'W1', topics: makeTopics('bbb', 10),
                     lessons: lessonsFor('bbb') }] }
};

var Modules = {
    ready: function () {
        return [
            { id: 'aaa', code: 'AAA01', title: 'Module A', accent: 1 },
            { id: 'bbb', code: 'BBB01', title: 'Module B', accent: 2 }
        ];
    },
    contentFor: function (id) { return CONTENT[id] || { weeks: [] }; }
};

// JSON is not available in JScript, and Schedule uses it to deep-copy. A tiny
// stand-in is enough: everything it copies is plain data.
if (typeof JSON === 'undefined') {
    JSON = {
        parse: function (s) { return eval('(' + s + ')'); },
        stringify: function (v) {
            if (v === null || v === undefined) return 'null';
            var t = typeof v;
            if (t === 'number' || t === 'boolean') return String(v);
            if (t === 'string') {
                return '"' + v.replace(new RegExp('\\\\', 'g'), '\\\\')
                              .replace(new RegExp('"', 'g'), '\\"') + '"';
            }
            if (Object.prototype.toString.call(v) === '[object Array]') {
                var a = [];
                for (var i = 0; i < v.length; i++) a.push(JSON.stringify(v[i]));
                return '[' + a.join(',') + ']';
            }
            var o = [], k;
            for (k in v) {
                if (!Object.prototype.hasOwnProperty.call(v, k)) continue;
                if (typeof v[k] === 'function') continue;
                o.push(JSON.stringify(String(k)) + ':' + JSON.stringify(v[k]));
            }
            return '{' + o.join(',') + '}';
        }
    };
}

eval(read(REPO + "\\public\\js\\schedule.js"));

// ── helpers ──────────────────────────────────────────────────────

function reset() { savedSchedule = null; badges = {}; }
function set(cfg) { reset(); savedSchedule = cfg; }

// A session can now hold several topics, so nearly every assertion below is
// really about the topics inside them. This flattens a plan back out to one
// entry per topic, carrying the slot it landed in.
function flat(sessions) {
    var out = [];
    for (var i = 0; i < sessions.length; i++) {
        var s = sessions[i];
        for (var j = 0; j < s.items.length; j++) {
            var it = s.items[j];
            out.push({
                date: s.date, time: s.time, moduleId: s.moduleId, moduleCode: s.moduleCode,
                late: s.late, key: it.key, topicId: it.topicId, pass: it.pass, passName: it.passName
            });
        }
    }
    return out;
}

/* Everything the plan schedules, first pass and revision alike. */
function requiredCount(sessions, moduleId) {
    var f = flat(sessions), n = 0;
    for (var i = 0; i < f.length; i++) {
        if (f[i].pass > 3) continue;
        if (moduleId && f[i].moduleId !== moduleId) continue;
        n++;
    }
    return n;
}

/* The first pass alone — the only work the plan treats as required. */
function firstPassCount(sessions, moduleId) {
    var f = flat(sessions), n = 0;
    for (var i = 0; i < f.length; i++) {
        if (f[i].pass !== 1) continue;
        if (moduleId && f[i].moduleId !== moduleId) continue;
        n++;
    }
    return n;
}

function countFor(sessions, moduleId) {
    var n = 0;
    for (var i = 0; i < sessions.length; i++) if (sessions[i].moduleId === moduleId) n++;
    return n;
}

function firstFor(sessions, moduleId, pass) {
    var f = flat(sessions);
    for (var i = 0; i < f.length; i++) {
        if (f[i].moduleId === moduleId && f[i].pass === pass) return f[i];
    }
    return null;
}

function doneItemCount(doneBlocks) {
    var n = 0;
    for (var i = 0; i < doneBlocks.length; i++) n += doneBlocks[i].items.length;
    return n;
}

// A date far enough ahead that "today" never overtakes it while the check runs.
function daysFromToday(n) {
    return Schedule.ymd(Schedule.addDays(new Date(), n));
}

// Every day of the week, three one-topic sessions a day, both exams 60 days out.
function baseline(extra) {
    var cfg = {
        days: [0, 1, 2, 3, 4, 5, 6],
        weekday: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
        weekend: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
        exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) }
    };
    if (extra) { for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) cfg[k] = extra[k]; }
    set(cfg);
    return cfg;
}

// ── 1. dates ─────────────────────────────────────────────────────
// The whole engine compares dates as strings, which only works if they are
// always produced the same way.

reset();
ok(Schedule.parseYmd('2025-02-31') === null, "date: 31 February should be rejected, not rolled into March");
ok(Schedule.parseYmd('nonsense') === null, "date: junk should be rejected");
ok(Schedule.ymd(Schedule.parseYmd('2025-12-01')) === '2025-12-01', "date: round trip changed the date");
ok(Schedule.ymd(Schedule.addDays(Schedule.parseYmd('2025-12-31'), 1)) === '2026-01-01',
   "date: adding a day across new year failed");
ok(Schedule.ymd(Schedule.addDays(Schedule.parseYmd('2024-02-28'), 1)) === '2024-02-29',
   "date: leap day missed");
ok(Schedule.ymd(Schedule.parseYmd('2025-03-30')) === '2025-03-30', "date: a spring-forward date shifted");

// ── 2. slots respect the days and counts she chose ───────────────

set({
    days: [1, 3],                                   // Mondays and Wednesdays only
    weekday: { count: 2, minutes: 60, topics: 1, times: ['17:00', '19:00'] },
    weekend: { count: 4, minutes: 60, topics: 1, times: ['09:00', '11:00', '13:00', '15:00'] }
});

var slots = Schedule.buildSlots('2025-12-01', '2025-12-14');   // Mon 1 Dec .. Sun 14 Dec
var dows = {};
for (var i = 0; i < slots.length; i++) dows[Schedule.parseYmd(slots[i].date).getDay()] = 1;
ok(!dows[0] && !dows[2] && !dows[4] && !dows[5] && !dows[6],
   "slots: generated a session on a day she did not select");
ok(dows[1] && dows[3], "slots: missed a day she did select");
ok(slots.length === 8, "slots: expected 4 selected days x 2 sessions = 8, got " + slots.length);

// Weekend days use the weekend block, not the weekday one. This also covers
// the migration: a save from before per-session lengths carries `minutes` for
// the whole block, and every session must inherit it rather than snapping
// back to an hour.
set({
    days: [0, 6],
    weekday: { count: 1, minutes: 60, topics: 1, times: ['17:00'] },
    weekend: { count: 3, minutes: 45, topics: 1, times: ['09:00', '11:00', '13:00'] }
});
var wk = Schedule.buildSlots('2025-12-06', '2025-12-07');       // Sat + Sun
ok(wk.length === 6, "slots: weekend should use the weekend count, got " + wk.length);
for (i = 0; i < wk.length; i++) {
    if (wk[i].minutes !== 45) {
        fail("slots: an old block-wide length of 45 did not carry to every session, got " + wk[i].minutes);
        break;
    }
}

// Sessions can now be different lengths on the same day.
set({
    days: [1],
    weekday: { count: 3, topics: 1,
               times: ['17:00', '19:00', '21:00'], mins: [45, 120, 30], mods: ['', '', ''] },
    weekend: { count: 1, topics: 1, times: ['09:00'], mins: [60], mods: [''] }
});
var mixed = Schedule.buildSlots('2025-12-01', '2025-12-01');
ok(mixed.length === 3, "per-session length: expected 3 slots, got " + mixed.length);
ok(mixed[0].minutes === 45 && mixed[1].minutes === 120 && mixed[2].minutes === 30,
   "per-session length: lengths did not follow their own sessions, got " +
   mixed[0].minutes + '/' + mixed[1].minutes + '/' + mixed[2].minutes);

// Editing a time re-sorts the day. The length and the pinned module have to
// travel with it, or a session would keep someone else's length.
set({
    days: [1],
    weekday: { count: 3, topics: 1,
               times: ['21:00', '17:00', '19:00'], mins: [30, 45, 120], mods: ['aaa', 'bbb', ''] },
    weekend: { count: 1, topics: 1, times: ['09:00'], mins: [60], mods: [''] }
});
var sorted = Schedule.buildSlots('2025-12-01', '2025-12-01');
ok(sorted[0].time === '17:00' && sorted[0].minutes === 45 && sorted[0].mod === 'bbb',
   "per-session length: the 17:00 session lost its own length or module after sorting");
ok(sorted[1].time === '19:00' && sorted[1].minutes === 120 && sorted[1].mod === '',
   "per-session length: the 19:00 session lost its own length after sorting");
ok(sorted[2].time === '21:00' && sorted[2].minutes === 30 && sorted[2].mod === 'aaa',
   "per-session length: the 21:00 session lost its own length or module after sorting");

// Sessions inside a day come out in time order even if she entered them jumbled.
set({
    days: [1],
    weekday: { count: 3, minutes: 60, topics: 1, times: ['19:00', '07:00', '13:00'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'] }
});
var day = Schedule.buildSlots('2025-12-01', '2025-12-01');
ok(day.length === 3 && day[0].time === '07:00' && day[1].time === '13:00' && day[2].time === '19:00',
   "slots: sessions in a day are not in time order");

// ── 2b. sessions are stored in time order and never overlap ──────
// The settings panel lists sessions in stored order while the calendar sorted
// them, so a day could read 14:00, 19:30, 14:00, 15:30 in the settings and
// come out sorted on screen. Ordering is now guaranteed in one place.

set({
    days: [1],
    weekday: { count: 4, topics: 1,
               times: ['14:00', '19:30', '14:00', '15:30'],
               mins: [60, 60, 60, 60], mods: ['', '', '', ''] },
    weekend: { count: 1, topics: 1, times: ['09:00'], mins: [60], mods: [''] }
});

var ord = Schedule.settings().weekday;
for (i = 1; i < ord.times.length; i++) {
    if (ord.times[i] < ord.times[i - 1]) {
        fail("order: stored sessions are not in time order (" + ord.times.join(', ') + ")");
        break;
    }
}

// Two sessions at 14:00, each an hour: the second must be pushed to 15:00,
// and the 15:30 one out of its way in turn.
function endsAt(t, m) {
    var b = String(t).split(':');
    return Number(b[0]) * 60 + Number(b[1]) + m;
}
function startsAt(t) {
    var b = String(t).split(':');
    return Number(b[0]) * 60 + Number(b[1]);
}
for (i = 1; i < ord.times.length; i++) {
    if (startsAt(ord.times[i]) < endsAt(ord.times[i - 1], ord.mins[i - 1])) {
        fail("order: sessions overlap — " + ord.times[i - 1] + " (" + ord.mins[i - 1] +
             "m) runs into " + ord.times[i]);
        break;
    }
}
ok(ord.times.length === 4, "order: a session was lost while resolving the clash");

// Lengthening a session pushes the ones after it, rather than swallowing them.
set({
    days: [1],
    weekday: { count: 3, topics: 1,
               times: ['09:00', '10:00', '11:00'],
               mins: [180, 60, 60], mods: ['', '', ''] },
    weekend: { count: 1, topics: 1, times: ['09:00'], mins: [60], mods: [''] }
});
var pushed = Schedule.settings().weekday;
ok(pushed.times[0] === '09:00', "order: the session she lengthened should not move");
ok(pushed.times[1] === '12:00',
   "order: a three-hour first session should push the second to 12:00, got " + pushed.times[1]);
ok(pushed.times[2] === '13:00',
   "order: the third session should follow the second, got " + pushed.times[2]);

// Weekday and weekend are sanitised separately and must not disturb each other.
set({
    days: [0, 1],
    weekday: { count: 2, topics: 1, times: ['22:00', '22:30'], mins: [60, 60], mods: ['', ''] },
    weekend: { count: 2, topics: 1, times: ['09:00', '11:00'], mins: [60, 60], mods: ['', ''] }
});
var sep = Schedule.settings();
ok(sep.weekend.times[0] === '09:00' && sep.weekend.times[1] === '11:00',
   "order: resolving a weekday clash moved the weekend sessions (" + sep.weekend.times.join(', ') + ")");
ok(sep.weekday.times[1] === '23:00',
   "order: the weekday clash was not resolved, got " + sep.weekday.times[1]);

// The length and pinned module travel with their own session through the sort.
set({
    days: [1],
    weekday: { count: 3, topics: 1,
               times: ['20:00', '08:00', '12:00'],
               mins: [30, 45, 120], mods: ['aaa', 'bbb', ''] },
    weekend: { count: 1, topics: 1, times: ['09:00'], mins: [60], mods: [''] }
});
var carried = Schedule.settings().weekday;
ok(carried.times[0] === '08:00' && carried.mins[0] === 45 && carried.mods[0] === 'bbb',
   "order: the earliest session lost its own length or module");
ok(carried.times[2] === '20:00' && carried.mins[2] === 30 && carried.mods[2] === 'aaa',
   "order: the latest session lost its own length or module");

// A blocked date produces no slots at all.
var blockedOut = Schedule.buildSlots('2025-12-01', '2025-12-08', { '2025-12-01': true });
for (i = 0; i < blockedOut.length; i++) {
    if (blockedOut[i].date === '2025-12-01') { fail("slots: a blocked date still produced sessions"); break; }
}

// ── 3. bad settings degrade to something usable ──────────────────

set({ days: [], weekday: { count: 0, minutes: 0, topics: 0, times: [] } });
var s = Schedule.settings();
ok(s.days.length > 0, "settings: no study days at all should fall back, not produce an empty plan");
ok(s.weekday.count >= 1, "settings: a session count of zero should fall back");
ok(s.weekday.topics >= 1, "settings: zero topics per session should fall back");
/* The UI renders one row per session and reads times[t], mins[t] and mods[t]
   without checking for holes, so all three must always match the count. */
ok(s.weekday.times.length === s.weekday.count,
   "settings: there must be exactly one time per session, got " +
   s.weekday.times.length + " for " + s.weekday.count);
ok(s.weekday.mins.length === s.weekday.count,
   "settings: there must be exactly one length per session, got " +
   s.weekday.mins.length + " for " + s.weekday.count);
ok(s.weekday.mods.length === s.weekday.count,
   "settings: there must be exactly one module choice per session, got " +
   s.weekday.mods.length + " for " + s.weekday.count);

/* Growing the session count must not leave the new rows without a length. */
set({ weekday: { count: 5, topics: 1, times: ['09:00'], mins: [90], mods: [''] } });
var grown = Schedule.settings().weekday;
ok(grown.times.length === 5 && grown.mins.length === 5 && grown.mods.length === 5,
   "settings: adding sessions left one of the per-session arrays short");
for (i = 0; i < grown.mins.length; i++) {
    if (!isFinite(grown.mins[i]) || grown.mins[i] < 10) {
        fail("settings: a session was added with no usable length (" + grown.mins[i] + ")");
        break;
    }
}
ok(grown.mins[0] === 90, "settings: adding sessions changed the length of an existing one");

set({ weekday: { count: 4, minutes: 60, topics: 1, times: ['09:00'] } });
ok(Schedule.settings().weekday.times.length === 4,
   "settings: missing session times should be filled in, not left short");

set({ weekday: { count: 2, minutes: 60, topics: 99, times: ['09:00', '11:00'] } });
ok(Schedule.settings().weekday.topics <= 4, "settings: an absurd topics-per-session should be capped");

set({ days: [9, -2, 3, 3] });
var days = Schedule.settings().days;
ok(days.length === 1 && days[0] === 3, "settings: out-of-range and duplicate days should be dropped");

// ── 4. every required session is planned ─────────────────────────
// 20 topics across two modules, three passes each = 60 required sessions.

baseline();
var p = Schedule.plan();
ok(p.warnings.length === 0,
   "plan: 60 required topics in ~180 slots should fit, but got " + p.warnings.length + " warning(s)");
ok(requiredCount(p.sessions) === 60,
   "plan: expected 60 required topics, got " + requiredCount(p.sessions));
ok(countFor(p.sessions, 'aaa') > 0 && countFor(p.sessions, 'bbb') > 0,
   "plan: one module got no sessions at all");

// One topic per session by default, so no session may carry two.
for (i = 0; i < p.sessions.length; i++) {
    if (p.sessions[i].items.length !== 1) {
        fail("plan: a session holds " + p.sessions[i].items.length + " topics when the setting says 1");
        break;
    }
}

// ── 5. sessions come out in date and time order ──────────────────

var lastKey = '';
for (i = 0; i < p.sessions.length; i++) {
    var key = p.sessions[i].date + ' ' + p.sessions[i].time;
    if (key < lastKey) { fail("plan: sessions are out of order at " + key + " after " + lastKey); break; }
    lastKey = key;
}

var seenSlot = {};
for (i = 0; i < p.sessions.length; i++) {
    var sk = p.sessions[i].date + ' ' + p.sessions[i].time;
    if (seenSlot[sk]) { fail("plan: two sessions booked into the same slot at " + sk); break; }
    seenSlot[sk] = 1;
}

// A session must never mix modules: switching subject halfway through an hour
// is not what "two topics in a session" means.
for (i = 0; i < p.sessions.length; i++) {
    var ss = p.sessions[i];
    for (var q2 = 0; q2 < ss.items.length; q2++) {
        if (String(ss.items[q2].topicId).indexOf(ss.moduleId) !== 0) {
            fail("plan: a session mixes topics from more than one module");
            q2 = ss.items.length; i = p.sessions.length;
        }
    }
}

// ── 6. passes run in order for a given topic ─────────────────────

var when = {}, fp = flat(p.sessions);
for (i = 0; i < fp.length; i++) when[fp[i].topicId + '|' + fp[i].pass] = fp[i].date + ' ' + fp[i].time;
for (i = 1; i <= 10; i++) {
    var t1 = when['aaa-t' + i + '|1'], t2 = when['aaa-t' + i + '|2'], t3 = when['aaa-t' + i + '|3'];
    if (t1 && t2 && !(t1 < t2)) { fail("plan: revision of aaa-t" + i + " is scheduled before its first pass"); break; }
    if (t2 && t3 && !(t2 < t3)) { fail("plan: second revision of aaa-t" + i + " comes before the first"); break; }
}

// ── 7. ticking a topic frees its slot ────────────────────────────
// The behaviour the whole feature rests on: getting ahead must buy her time.

var firstAaa = firstFor(p.sessions, 'aaa', 1);
ok(firstAaa !== null, "plan: no first-pass session found for module aaa");

if (firstAaa) {
    Schedule.setDone(firstAaa.topicId, 1, true);
    var p2 = Schedule.plan();

    var stillThere = false, f2 = flat(p2.sessions);
    for (i = 0; i < f2.length; i++) if (f2[i].key === firstAaa.key) { stillThere = true; break; }
    ok(!stillThere, "tick: a completed session is still holding a future slot");

    ok(requiredCount(p2.sessions) === 59,
       "tick: expected 59 required topics after ticking one, got " + requiredCount(p2.sessions));
    ok(doneItemCount(p2.done) === 1, "tick: the completed session is missing from the done list");
    ok(p2.done.length && p2.done[0].items[0].topicId === firstAaa.topicId,
       "tick: the wrong session was recorded as done");

    Schedule.setDone(firstAaa.topicId, 1, false);
    var p3 = Schedule.plan();
    ok(requiredCount(p3.sessions) === 60,
       "untick: the session did not come back, got " + requiredCount(p3.sessions));
}

// ── 8. a badge completes the first pass by itself ────────────────

baseline();
badges['aaa-t1'] = '2025-11-01T00:00:00.000Z';

ok(Schedule.isDone('aaa-t1', 1), "badge: earning a badge should complete the first pass");
ok(!Schedule.isDone('aaa-t1', 2), "badge: a badge must not complete the revision pass too");

var pb = Schedule.plan(), fb = flat(pb.sessions);
var foundBadged = false;
for (i = 0; i < fb.length; i++) if (fb[i].key === 'aaa-t1|1') { foundBadged = true; break; }
ok(!foundBadged, "badge: a badged topic still has a first-pass session in the future");

// Revision sessions must STILL be created for a topic she has finished.
var revs = 0;
for (i = 0; i < fb.length; i++) if (fb[i].topicId === 'aaa-t1' && fb[i].pass >= 2) revs++;
ok(revs >= 2, "badge: a completed topic lost its revision sessions, got " + revs);

Schedule.setDone('aaa-t1', 1, false);
ok(!Schedule.isDone('aaa-t1', 1), "override: unticking a badged topic did not take effect");

Schedule.setDone('bbb-t5', 1, true);
ok(Schedule.isDone('bbb-t5', 1), "override: a manual tick without a badge did not take effect");

// ── 9. focus topics are revised first ────────────────────────────

baseline({ focus: { 'aaa-t9': true } });

var pf = Schedule.plan(), ff = flat(pf.sessions);
var firstRev = null;
for (i = 0; i < ff.length; i++) {
    if (ff[i].moduleId === 'aaa' && ff[i].pass === 2) { firstRev = ff[i]; break; }
}
ok(firstRev !== null && firstRev.topicId === 'aaa-t9',
   "focus: a flagged topic should be the first thing revised, got " +
   (firstRev ? firstRev.topicId : 'nothing'));

var firstPass = firstFor(pf.sessions, 'aaa', 1);
ok(firstPass !== null && firstPass.topicId === 'aaa-t1',
   "focus: flagging a topic changed the order of the first pass");

// ── 10. not enough time produces a warning ───────────────────────

set({
    days: [1],
    weekday: { count: 1, minutes: 60, topics: 1, times: ['17:00'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'] },
    exams: { aaa: daysFromToday(21), bbb: daysFromToday(21) }
});

var pw = Schedule.plan();
ok(pw.warnings.length === 2, "warning: both modules should report a shortfall, got " + pw.warnings.length);
if (pw.warnings.length) {
    ok(pw.warnings[0].short > 0, "warning: shortfall reported as zero sessions");
    ok(String(pw.warnings[0].text).length > 10, "warning: no readable message");
}

for (i = 0; i < pw.sessions.length; i++) {
    var ex = Schedule.settings().exams[pw.sessions[i].moduleId];
    if (ex && pw.sessions[i].date > ex) {
        fail("warning: a session was scheduled after the " + pw.sessions[i].moduleCode + " exam");
        break;
    }
}

// ── 11. spare time is filled with extra revision ─────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 4, minutes: 60, topics: 1, times: ['09:00', '11:00', '13:00', '15:00'] },
    weekend: { count: 4, minutes: 60, topics: 1, times: ['09:00', '11:00', '13:00', '15:00'] },
    exams: { aaa: daysFromToday(120), bbb: daysFromToday(120) }
});

var pe = Schedule.plan(), fe = flat(pe.sessions);
ok(pe.warnings.length === 0, "spare: everything fits, so there should be no warning");

var extra = 0;
for (i = 0; i < fe.length; i++) if (fe[i].pass > 3) extra++;
ok(extra > 0, "spare: leftover slots before the exam were left empty instead of becoming revision");
ok(pe.sessions[pe.sessions.length - 1].date <= daysFromToday(120),
   "spare: extra revision ran past the exam date");

// ── 12. the nearer exam gets priority ────────────────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(20), bbb: daysFromToday(120) }
});

var pu = Schedule.plan();

// The real test is not that aaa's sessions sit before its exam — nothing is
// ever placed after an exam, so that would pass by construction. It is whether
// aaa gets ENOUGH of the shared calendar to finish all 30 of its required
// topics in the 20 days it has, while bbb has four months to spare.
var aaaWarn = null;
for (i = 0; i < pu.warnings.length; i++) if (pu.warnings[i].moduleId === 'aaa') aaaWarn = pu.warnings[i];
ok(aaaWarn === null,
   "urgency: the urgent module ran out of sessions before its exam - it is being starved by the module " +
   "with four months to spare" + (aaaWarn ? " (" + aaaWarn.short + " short)" : ""));
/* The first pass is what has to fit. Revision for aaa may well lose slots to
   bbb's first pass, and should — everything gets covered once before anything
   gets covered twice. */
ok(firstPassCount(pu.sessions, 'aaa') === 10,
   "urgency: the urgent module's first pass is incomplete, got " +
   firstPassCount(pu.sessions, 'aaa') + " of 10");

var bbbEarly = 0;
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].moduleId === 'bbb' && pu.sessions[i].date <= daysFromToday(20)) bbbEarly++;
}
ok(bbbEarly > 0, "urgency: the non-urgent module got no sessions at all before the first exam");

var afterExamAaa = 0;
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].date > daysFromToday(20) && pu.sessions[i].moduleId === 'aaa') afterExamAaa++;
}
ok(afterExamAaa === 0, "urgency: the finished module is still taking slots after its exam");

// ── 13. no exam date means no sessions ───────────────────────────
// A schedule with no deadline is not a plan, it is a list of everything she
// has to do stretching into next year — the exact feeling the screen exists
// to remove. Nothing is planned until she says when the paper is.

set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['17:00', '19:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '11:00'] },
    exams: {}
});

var pn = Schedule.plan();
ok(pn.sessions.length === 0,
   "no exams: nothing should be scheduled without a deadline, got " + pn.sessions.length + " sessions");
ok(pn.warnings.length === 0, "no exams: there is no deadline to miss, so no warning");
ok(pn.exams.length === 0, "no exams: nothing should be marked as an exam day");
ok(pn.needsDates.length === 2,
   "no exams: both modules should be reported as waiting for a date, got " + pn.needsDates.length);

// One module dated and the other not: only the dated one appears.
set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60) }
});

var pmix = Schedule.plan();
ok(countFor(pmix.sessions, 'bbb') === 0,
   "half dated: the undated module is still being scheduled");
ok(requiredCount(pmix.sessions, 'aaa') === 30,
   "half dated: the dated module should still get all 30 of its topics, got " +
   requiredCount(pmix.sessions, 'aaa'));
ok(pmix.needsDates.length === 1 && pmix.needsDates[0].id === 'bbb',
   "half dated: the wrong module was reported as waiting for a date");
ok(pmix.warnings.length === 0, "half dated: the dated module fits, so there should be no warning");

// ── 14. an exam already gone ─────────────────────────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(-5), bbb: daysFromToday(90) }
});

var pp = Schedule.plan();
ok(countFor(pp.sessions, 'aaa') === 0, "past exam: a module whose exam has gone is still being scheduled");
ok(countFor(pp.sessions, 'bbb') > 0, "past exam: the remaining module lost its sessions too");
ok(requiredCount(pp.sessions) === 30,
   "past exam: the remaining module should still get all 30 topics, got " + requiredCount(pp.sessions));

// ── 15. nothing is ever planned in the past ──────────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(40), bbb: daysFromToday(40) },
    start: daysFromToday(-30)
});

var pz = Schedule.plan(), t0 = Schedule.todayYmd();
for (i = 0; i < pz.sessions.length; i++) {
    if (pz.sessions[i].date < t0) {
        fail("past: a session was planned on " + pz.sessions[i].date + ", before today");
        break;
    }
}

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) },
    start: daysFromToday(7)
});
var pl = Schedule.plan();
ok(pl.sessions.length > 0 && pl.sessions[0].date >= daysFromToday(7),
   "start: a future start date was ignored, first session is " +
   (pl.sessions.length ? pl.sessions[0].date : 'none'));

// ── 16. exam days are blocked out ────────────────────────────────
// She is sitting the paper. Nothing may be scheduled on top of it, and the
// day has to come back labelled so it shows on the calendar.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, minutes: 60, topics: 1, times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(30), bbb: daysFromToday(45) }
});

var px = Schedule.plan();
ok(px.exams.length === 2, "exam day: expected two exam markers, got " + px.exams.length);
ok(px.exams[0].date < px.exams[1].date, "exam day: markers are not in date order");
ok(String(px.exams[0].label).indexOf('AAA01') === 0, "exam day: the marker does not name its module");
ok(px.exams[0].moduleTitle === 'Module A', "exam day: the marker does not carry the module title");

for (i = 0; i < px.sessions.length; i++) {
    if (px.sessions[i].date === daysFromToday(30) || px.sessions[i].date === daysFromToday(45)) {
        fail("exam day: a study session was scheduled on an exam day");
        break;
    }
}

// The module's own work must still finish BEFORE its exam day, not on it.
var aaaLast = '';
var fx = flat(px.sessions);
for (i = 0; i < fx.length; i++) if (fx[i].moduleId === 'aaa') aaaLast = fx[i].date;
ok(aaaLast !== '' && aaaLast < daysFromToday(30),
   "exam day: aaa work does not finish before its exam day");

// ── 17. more than one topic per session ──────────────────────────
// Some topics are short. Two or three in an hour has to actually pack them in,
// and has to be counted as capacity when working out whether it all fits.

set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, minutes: 60, topics: 3, times: ['17:00', '19:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '11:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) }
});

var pm = Schedule.plan();
var maxItems = 0, weekdayFound = false;
for (i = 0; i < pm.sessions.length; i++) {
    if (pm.sessions[i].items.length > maxItems) maxItems = pm.sessions[i].items.length;
    var dw = Schedule.parseYmd(pm.sessions[i].date).getDay();
    if (dw !== 0 && dw !== 6 && pm.sessions[i].items.length === 3) weekdayFound = true;
}
ok(maxItems === 3, "multi: a weekday session should hold up to 3 topics, largest was " + maxItems);
ok(weekdayFound, "multi: no weekday session actually got three topics");

// Weekends were left at one, and must stay at one.
for (i = 0; i < pm.sessions.length; i++) {
    var dw2 = Schedule.parseYmd(pm.sessions[i].date).getDay();
    if ((dw2 === 0 || dw2 === 6) && pm.sessions[i].items.length > 1) {
        fail("multi: a weekend session took more topics than the weekend setting allows");
        break;
    }
}

ok(requiredCount(pm.sessions) === 60,
   "multi: all 60 required topics should still be planned, got " + requiredCount(pm.sessions));

// Packing three topics into a session has to finish the work SOONER. That is
// the entire reason for the setting.
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, minutes: 60, topics: 1, times: ['17:00', '19:00'] },
    weekend: { count: 2, minutes: 60, topics: 1, times: ['09:00', '11:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) }
});
var pOne = Schedule.plan();
var lastOne = '', lastMany = '';
var fOne = flat(pOne.sessions);
for (i = 0; i < fOne.length; i++) if (fOne[i].pass <= 3) lastOne = fOne[i].date;
var fMany = flat(pm.sessions);
for (i = 0; i < fMany.length; i++) if (fMany[i].pass <= 3) lastMany = fMany[i].date;
ok(lastMany < lastOne,
   "multi: three topics a session did not finish the required work any sooner (" +
   lastMany + " vs " + lastOne + ")");

// ── 18. capacity counts topics, not slots ────────────────────────
// One slot a week holding three topics is three topics of capacity. A warning
// that counted slots would cry shortfall on a plan that actually fits.

set({
    days: [1],
    weekday: { count: 1, minutes: 60, topics: 4, times: ['17:00'] },
    weekend: { count: 1, minutes: 60, topics: 4, times: ['09:00'] },
    exams: { aaa: daysFromToday(140), bbb: daysFromToday(140) }
});
var pc = Schedule.plan();
ok(pc.warnings.length === 0,
   "capacity: 20 Mondays x 4 topics is 80 slots of room for 60 topics, but it reported a shortfall");

// ── 18b. sessions measured in whole lessons ──────────────────────
// A session can be one or more LESSONS instead of a fixed number of topics.
// The module is taught in lessons, so covering one end to end is a more
// natural sitting than three topics that happen to sit next to each other.
//
// The stub's lessons are 2, 3 and 5 topics long on purpose: a session holding
// "one lesson" must hold two topics sometimes and five at others.

set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 1, unit: 'lessons', lessons: 1, topics: 1,
               times: ['17:00'], mins: [60], mods: ['aaa'] },
    weekend: { count: 1, unit: 'topics', topics: 1,
               times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(200), bbb: daysFromToday(200) }
});

var pls = Schedule.plan();
var aaaSessions = [];
for (i = 0; i < pls.sessions.length; i++) {
    if (pls.sessions[i].moduleId === 'aaa' && pls.sessions[i].time === '17:00') {
        aaaSessions.push(pls.sessions[i]);
    }
}
ok(aaaSessions.length > 2, "lessons: too few sessions generated to check anything");

/* Every session must hold exactly one lesson's worth - and never topics from
   two different lessons. */
var sizes = {};
for (i = 0; i < aaaSessions.length; i++) {
    var ses = aaaSessions[i], firstLesson = null, mixed = false;
    for (var z = 0; z < ses.items.length; z++) {
        var lesson = LESSON_OF[Number(ses.items[z].topicId.replace('aaa-t', ''))];
        if (firstLesson === null) firstLesson = lesson;
        else if (lesson !== firstLesson) mixed = true;
    }
    if (mixed) { fail("lessons: a one-lesson session mixed topics from two lessons"); break; }
    sizes[ses.items.length] = 1;
}

/* Sessions of different sizes are the proof it is following the lessons and
   not just counting to a fixed number. */
ok(sizes[2] && sizes[3] && sizes[5],
   "lessons: expected sessions of 2, 3 and 5 topics to match the lesson sizes, got " +
   Object.keys(sizes).join('/'));

/* Two lessons per session should roughly halve the number of sessions the
   first pass needs. */
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 1, unit: 'lessons', lessons: 2, topics: 1,
               times: ['17:00'], mins: [60], mods: ['aaa'] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(200), bbb: daysFromToday(200) }
});
var pTwo = Schedule.plan();
var firstPassSessions = 0;
for (i = 0; i < pTwo.sessions.length; i++) {
    if (pTwo.sessions[i].moduleId !== 'aaa') continue;
    var anyFirst = false;
    for (z = 0; z < pTwo.sessions[i].items.length; z++) {
        if (pTwo.sessions[i].items[z].pass === 1) anyFirst = true;
    }
    if (anyFirst) firstPassSessions++;
}
/* Three lessons, two per session, so two sessions cover the first pass. */
ok(firstPassSessions === 2,
   "lessons: two lessons a session should cover three lessons in two sessions, got " +
   firstPassSessions);

/* All ten topics still get planned - nothing may be lost to the grouping. */
ok(requiredCount(pTwo.sessions, 'aaa') === 30,
   "lessons: expected all 30 aaa topics, got " + requiredCount(pTwo.sessions, 'aaa'));

/* A module with no lessons at all - which is maths - must still work, with
   each topic behaving as its own lesson rather than the whole module
   collapsing into one session. */
var savedLessons = [];
for (i = 0; i < CONTENT.bbb.weeks[0].topics.length; i++) {
    savedLessons.push(CONTENT.bbb.weeks[0].topics[i].lesson);
    delete CONTENT.bbb.weeks[0].topics[i].lesson;
}
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 1, unit: 'lessons', lessons: 1, topics: 1,
               times: ['17:00'], mins: [60], mods: ['bbb'] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { bbb: daysFromToday(200) }
});
var pNo = Schedule.plan();
var biggest = 0;
for (i = 0; i < pNo.sessions.length; i++) {
    if (pNo.sessions[i].items.length > biggest) biggest = pNo.sessions[i].items.length;
}
ok(biggest === 1,
   "lessons: a module with no lessons should give one topic per session, got a session of " + biggest);

/* And it must not ANNOUNCE itself as a lesson. Maths topics are given a lesson
   key so the grouping works, which is not the same as having a lesson — saying
   "Lesson 0" with no title told her nothing and hid the topic name. */
for (i = 0; i < pNo.sessions.length; i++) {
    if (pNo.sessions[i].lessons && pNo.sessions[i].lessons.length) {
        fail("lessons: a module with no lessons is claiming to cover one");
        break;
    }
}
for (i = 0; i < CONTENT.bbb.weeks[0].topics.length; i++) {
    CONTENT.bbb.weeks[0].topics[i].lesson = savedLessons[i];
}

/* A lesson-based session has to SAY which lesson it is. Without this the
   calendar lists the topics inside it, which is exactly what choosing "whole
   lessons" was meant to stop. */
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 1, unit: 'lessons', lessons: 1, topics: 1,
               times: ['17:00'], mins: [60], mods: ['aaa'] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(200) }
});
var pLab = Schedule.plan();
var firstAaaLesson = null;
for (i = 0; i < pLab.sessions.length; i++) {
    if (pLab.sessions[i].moduleId === 'aaa') { firstAaaLesson = pLab.sessions[i]; break; }
}
ok(firstAaaLesson !== null, "lessons: no aaa session to inspect");
if (firstAaaLesson) {
    ok(firstAaaLesson.unit === 'lessons', "lessons: the session does not record how it was measured");
    ok(firstAaaLesson.lessons && firstAaaLesson.lessons.length === 1,
       "lessons: a one-lesson session should name exactly one lesson, got " +
       (firstAaaLesson.lessons ? firstAaaLesson.lessons.length : 'none'));
    ok(firstAaaLesson.lessons[0].number > 0, "lessons: the named lesson has no number");
    ok(firstAaaLesson.lessons[0].weekNumber > 0,
       "lessons: the named lesson has no week, so two weeks' Lesson 1 would look alike");
}

/* A topics-based session must NOT claim to be a lesson. */
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 1, unit: 'topics', topics: 2,
               times: ['17:00'], mins: [60], mods: ['aaa'] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(200) }
});
var pTop = Schedule.plan();
for (i = 0; i < pTop.sessions.length; i++) {
    if (pTop.sessions[i].lessons && pTop.sessions[i].lessons.length) {
        fail("lessons: a topics-based session is claiming to be a whole lesson");
        break;
    }
}

/* The shortfall warning counts TOPIC SITTINGS, not sessions. It said
   "sessions" once, which was true only while a session was always one topic —
   and it badly overstated the problem as soon as a session held a lesson. */
set({
    days: [1],
    weekday: { count: 1, unit: 'topics', topics: 1, times: ['17:00'], mins: [60], mods: [''] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(14), bbb: daysFromToday(14) }
});
var pWord = Schedule.plan();
ok(pWord.warnings.length > 0, "warning: this really should not fit");
if (pWord.warnings.length) {
    ok(String(pWord.warnings[0].text).indexOf('session') < 0,
       "warning: still calls topic sittings 'sessions' — " + pWord.warnings[0].text);
    ok(String(pWord.warnings[0].text).indexOf('topic') >= 0,
       "warning: does not say what it is actually counting");
}

/* A nonsense unit falls back rather than producing an empty plan. */
set({ weekday: { count: 1, unit: 'chapters', topics: 2, times: ['09:00'], mins: [60], mods: [''] } });
ok(Schedule.settings().weekday.unit === 'topics',
   "lessons: an unknown unit should fall back to topics, got " + Schedule.settings().weekday.unit);
set({ weekday: { count: 1, unit: 'lessons', lessons: 99, times: ['09:00'], mins: [60], mods: [''] } });
ok(Schedule.settings().weekday.lessons <= 4, "lessons: an absurd lesson count should be capped");

// ── 18d. topics are scheduled in the order they are TAUGHT ───────
// A week's topic array is the order things were written in, which is not the
// order they are taught in - the real Week 5 has a Lesson 3 topic sitting
// after three Lesson 4 ones. Following the file gave a Saturday that ran
// Lesson 3, Lesson 4, Lesson 3, Lesson 4, and split one lesson across two
// sittings hours apart.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, unit: 'topics', topics: 1, times: ['09:00', '15:00'],
               mins: [60, 60], mods: ['aaa', 'aaa'] },
    weekend: { count: 2, unit: 'topics', topics: 1, times: ['09:00', '15:00'],
               mins: [60, 60], mods: ['aaa', 'aaa'] },
    exams: { aaa: daysFromToday(60) }
});

var pOrder = Schedule.plan(), fo = flat(pOrder.sessions);
var seq = [];
for (i = 0; i < fo.length; i++) {
    if (fo[i].moduleId !== 'aaa' || fo[i].pass !== 1) continue;
    seq.push(LESSON_OF[Number(fo[i].topicId.replace('aaa-t', ''))]);
}
ok(seq.length === 10, "taught order: expected all 10 first-pass topics, got " + seq.length);

/* Lesson numbers must never go backwards. Topic 9 belongs to Lesson 2 but is
   written after the Lesson 3 topics, so file order would give 1,1,2,2,3,3,3,3,2,3
   and this check would catch it at the ninth. */
for (i = 1; i < seq.length; i++) {
    if (seq[i] < seq[i - 1]) {
        fail("taught order: the first pass goes back to Lesson " + seq[i] +
             " after reaching Lesson " + seq[i - 1] + " — order was " + seq.join(','));
        break;
    }
}

/* And each lesson must be covered in one unbroken run, not returned to. */
var runsOf = {}, prev = null;
for (i = 0; i < seq.length; i++) {
    if (seq[i] !== prev) { runsOf[seq[i]] = (runsOf[seq[i]] || 0) + 1; prev = seq[i]; }
}
for (var lk2 in runsOf) {
    if (!Object.prototype.hasOwnProperty.call(runsOf, lk2)) continue;
    if (runsOf[lk2] > 1) {
        fail("taught order: Lesson " + lk2 + " is split into " + runsOf[lk2] +
             " separate runs — order was " + seq.join(','));
    }
}

// ── 18c. revision is optional; the first pass is not ─────────────
// The plan is a guide, not a law. Covering everything once before the exam is
// the only thing it treats as required; revision is added afterwards, only
// while there is room. A calendar that declared her hundreds of sittings
// behind because it had silently demanded three passes of everything would be
// a reprimand rather than a plan.

/* Barely enough room for one pass and nothing more: no warning, and no
   revision squeezed in ahead of first-pass work. */
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, unit: 'topics', topics: 1, times: ['17:00', '19:00'],
               mins: [60, 60], mods: ['', ''] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(15), bbb: daysFromToday(15) }
});

var pTight = Schedule.plan();
ok(pTight.warnings.length === 0,
   "optional: 20 first-pass topics fit in ~22 slots, so nothing should be reported short — got " +
   (pTight.warnings.length ? pTight.warnings[0].text : ''));
ok(firstPassCount(pTight.sessions) === 20,
   "optional: every topic should be covered once, got " + firstPassCount(pTight.sessions));

/* EVERYTHING once before ANYTHING twice. No revision may be scheduled before
   the last first-pass session of either module. */
var lastFirst = '', firstRevision = '';
var ft = flat(pTight.sessions);
for (i = 0; i < ft.length; i++) {
    var when = ft[i].date + ' ' + ft[i].time;
    if (ft[i].pass === 1) { if (when > lastFirst) lastFirst = when; }
    else if (!firstRevision || when < firstRevision) firstRevision = when;
}
ok(!firstRevision || firstRevision > lastFirst,
   "optional: revision was scheduled at " + firstRevision +
   " while first-pass work was still outstanding until " + lastFirst);

/* Plenty of room: revision appears, and it is not counted against her either
   way. */
set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, unit: 'topics', topics: 1, times: ['09:00', '12:00', '15:00'],
               mins: [60, 60, 60], mods: ['', '', ''] },
    weekend: { count: 3, unit: 'topics', topics: 1, times: ['09:00', '12:00', '15:00'],
               mins: [60, 60, 60], mods: ['', '', ''] },
    exams: { aaa: daysFromToday(90), bbb: daysFromToday(90) }
});
var pRoomy = Schedule.plan(), fr = flat(pRoomy.sessions);
var revisions = 0;
for (i = 0; i < fr.length; i++) if (fr[i].pass > 1) revisions++;
ok(revisions > 0, "optional: with three months of room, revision should be scheduled");
ok(pRoomy.warnings.length === 0, "optional: everything fits, so no warning");
ok(firstPassCount(pRoomy.sessions) === 20, "optional: the first pass should still be complete");

/* Nowhere near enough room: the warning counts FIRST-PASS topics only. Twenty
   topics, three Mondays, so ten are covered and ten are not. */
set({
    days: [1],
    weekday: { count: 1, unit: 'topics', topics: 1, times: ['17:00'], mins: [60], mods: [''] },
    weekend: { count: 1, unit: 'topics', topics: 1, times: ['09:00'], mins: [60], mods: [''] },
    exams: { aaa: daysFromToday(21), bbb: daysFromToday(21) }
});
var pShort = Schedule.plan();
var total = 0;
for (i = 0; i < pShort.warnings.length; i++) total += pShort.warnings[i].short;
ok(total === 20 - firstPassCount(pShort.sessions),
   "optional: the shortfall should be exactly the first-pass topics with no slot — reported " +
   total + ", actually " + (20 - firstPassCount(pShort.sessions)));
ok(total < 40, "optional: the shortfall is still counting revision she was never owed (" + total + ")");

/* And no revision at all should be scheduled while first-pass work is being
   dropped for want of room. */
var fs = flat(pShort.sessions);
for (i = 0; i < fs.length; i++) {
    if (fs[i].pass > 1) {
        fail("optional: revision was scheduled while first-pass topics were going uncovered");
        break;
    }
}

// ── 19. pinning a session to a module ────────────────────────────
// She wants business at 17:00 and maths at 19:00. Nothing else may take
// those slots while the pinned module still has work.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, topics: 1,
               times: ['17:00', '19:00'], mods: ['bbb', 'aaa'] },
    weekend: { count: 2, minutes: 60, topics: 1,
               times: ['09:00', '11:00'], mods: ['', ''] },
    exams: { aaa: daysFromToday(120), bbb: daysFromToday(120) }
});

var pp2 = Schedule.plan();
var wrong17 = 0, wrong19 = 0, seen17 = 0, seen19 = 0;
for (i = 0; i < pp2.sessions.length; i++) {
    var sn = pp2.sessions[i];
    var dow2 = Schedule.parseYmd(sn.date).getDay();
    if (dow2 === 0 || dow2 === 6) continue;
    if (sn.time === '17:00') { seen17++; if (sn.moduleId !== 'bbb') wrong17++; }
    if (sn.time === '19:00') { seen19++; if (sn.moduleId !== 'aaa') wrong19++; }
}
ok(seen17 > 0 && seen19 > 0, "pin: no weekday sessions were generated at all");
ok(wrong17 === 0, "pin: " + wrong17 + " of the 17:00 sessions went to the wrong module");
ok(wrong19 === 0, "pin: " + wrong19 + " of the 19:00 sessions went to the wrong module");

// Unpinned weekend slots stay automatic, so both modules can appear there.
var wkendMods = {};
for (i = 0; i < pp2.sessions.length; i++) {
    var dow3 = Schedule.parseYmd(pp2.sessions[i].date).getDay();
    if (dow3 === 0 || dow3 === 6) wkendMods[pp2.sessions[i].moduleId] = 1;
}
ok(wkendMods.aaa && wkendMods.bbb,
   "pin: unpinned weekend slots should still be shared between modules");

// Everything still gets planned.
ok(pp2.warnings.length === 0, "pin: pinning should not create a shortfall here");
ok(requiredCount(pp2.sessions) === 60,
   "pin: expected all 60 required topics, got " + requiredCount(pp2.sessions));

// Editing a time must not silently move which subject sits where. Times are
// sorted with their module attached; sorting them apart would swap the pins.
set({
    days: [1],
    weekday: { count: 2, minutes: 60, topics: 1,
               times: ['20:00', '08:00'], mods: ['bbb', 'aaa'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'], mods: [''] },
    exams: { aaa: daysFromToday(200), bbb: daysFromToday(200) }
});
var pj = Schedule.plan();
var early = null, later = null;
for (i = 0; i < pj.sessions.length && (!early || !later); i++) {
    if (pj.sessions[i].time === '08:00' && !early) early = pj.sessions[i];
    if (pj.sessions[i].time === '20:00' && !later) later = pj.sessions[i];
}
ok(early && early.moduleId === 'aaa',
   "pin: the 08:00 pin was lost when the times were sorted, got " + (early ? early.moduleId : 'nothing'));
ok(later && later.moduleId === 'bbb',
   "pin: the 20:00 pin was lost when the times were sorted, got " + (later ? later.moduleId : 'nothing'));

// A slot pinned to a module whose exam has already gone must not sit empty.
set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, minutes: 60, topics: 1,
               times: ['17:00', '19:00'], mods: ['aaa', ''] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'], mods: [''] },
    exams: { aaa: daysFromToday(-3), bbb: daysFromToday(90) }
});
var pfall = Schedule.plan();
var after17 = 0;
for (i = 0; i < pfall.sessions.length; i++) {
    if (pfall.sessions[i].time === '17:00') after17++;
}
ok(after17 > 0,
   "pin: slots pinned to a finished module were left empty instead of going to the other one");
for (i = 0; i < pfall.sessions.length; i++) {
    if (pfall.sessions[i].moduleId === 'aaa') { fail("pin: a module past its exam still took a slot"); break; }
}

// Pinning must be counted as capacity. If every weekday belongs to one module,
// the other only has weekends and should say so rather than pretending to fit.
set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 1, minutes: 60, topics: 1, times: ['17:00'], mods: ['bbb'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'], mods: ['bbb'] },
    exams: { aaa: daysFromToday(40), bbb: daysFromToday(40) }
});
var pcap = Schedule.plan();
var aaaW = null;
for (i = 0; i < pcap.warnings.length; i++) if (pcap.warnings[i].moduleId === 'aaa') aaaW = pcap.warnings[i];
/* Ten first-pass topics with nowhere to go. Not thirty: revision it never had
   room for is not a shortfall. */
ok(aaaW !== null && aaaW.short === 10,
   "pin: a module pinned out of every slot should report its 10 first-pass topics short, got " +
   (aaaW ? aaaW.short : 'no warning'));
ok(countFor(pcap.sessions, 'aaa') === 0, "pin: a module pinned out of every slot still got sessions");

// ── 20. a finished session cannot refill itself ──────────────────
//
// Abi's bug, and the nastiest one this engine has had, because everything it
// touched was working exactly as written.
//
// The calendar is rebuilt from scratch whenever anything changes, and a ticked
// topic drops out of the queue. So she finished the lesson in this morning's
// session, ticked its topics, and the plan was rebuilt — at which point this
// morning's slot, having lost the lesson it used to hold, took the next one.
// She ticked that off too. It took the one after. The session was unfinishable
// by construction, and a one-hour sitting appeared to contain the rest of the
// module.
//
// Finished work now occupies its slot the same way pending work does.

baseline({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60) }
});

var today = Schedule.todayYmd();

function sessionsOn(list, dateYmd, time) {
    var out = [];
    for (var z = 0; z < list.length; z++) {
        if (list[z].date === dateYmd && (!time || list[z].time === time)) out.push(list[z]);
    }
    return out;
}

var before = Schedule.plan();
var morning = sessionsOn(before.sessions, today, '09:00');
ok(morning.length === 1, "refill: expected one 09:00 session today, got " + morning.length);

if (morning.length === 1) {
    var lessonKeys = {}, keyCount = 0, z;
    for (z = 0; z < morning[0].items.length; z++) {
        if (!lessonKeys[morning[0].items[z].lessonKey]) {
            lessonKeys[morning[0].items[z].lessonKey] = 1;
            keyCount++;
        }
    }
    ok(keyCount === 1, "refill: a one-lesson session started with " + keyCount + " lessons");

    // She sits the session and ticks off everything in it.
    var didKeys = [];
    for (z = 0; z < morning[0].items.length; z++) {
        Schedule.setDone(morning[0].items[z].topicId, morning[0].items[z].pass, true, today);
        didKeys.push(morning[0].items[z].key);
    }

    var after = Schedule.plan();

    // The bug: this came back as a fresh session holding the NEXT lesson.
    var stillPending = sessionsOn(after.sessions, today, '09:00');
    ok(stillPending.length === 0,
       "refill: the session she just finished was replanned with new work — " +
       "it can never be completed");

    // It is on the calendar, at its own time, as the session she completed.
    var settledNow = sessionsOn(after.done, today, '09:00');
    ok(settledNow.length === 1,
       "refill: the finished session lost its slot, got " + settledNow.length);
    ok(settledNow.length === 1 && settledNow[0].items.length === didKeys.length,
       "refill: the finished session does not hold the work she actually ticked");
    ok(settledNow.length === 1 && settledNow[0].done === true,
       "refill: the finished session is not marked done");

    // And the next lesson went into the NEXT session, not this one.
    var noon = sessionsOn(after.sessions, today, '12:00');
    ok(noon.length === 1, "refill: today's second session vanished, got " + noon.length);
    for (z = 0; noon.length === 1 && z < noon[0].items.length; z++) {
        if (indexIn(didKeys, noon[0].items[z].key) !== -1) {
            fail("refill: work she already ticked reappeared in a later session");
            break;
        }
    }

    // Ticking must not have quietly cost her a session's worth of capacity.
    ok(after.warnings.length === 0,
       "refill: finishing work on time produced a shortfall warning");
}

function indexIn(arr, v) {
    for (var z = 0; z < arr.length; z++) if (arr[z] === v) return z;
    return -1;
}

// Two sessions' worth finished in one day, ticked in one go — which is what
// actually happens, because she ticks up at the end rather than after each
// sitting. A finished session has to respect the same room a pending one
// does, or the whole day collapses into a single session holding everything
// and the calendar tells her she did four hours in the one at nine.
baseline({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60) }
});

var twoUp = Schedule.plan();
var slot1 = sessionsOn(twoUp.sessions, today, '09:00')[0];
var slot2 = sessionsOn(twoUp.sessions, today, '12:00')[0];
ok(slot1 && slot2, "two-up: expected two planned sessions today");

if (slot1 && slot2) {
    var pair = slot1.items.concat(slot2.items);
    for (i = 0; i < pair.length; i++) {
        Schedule.setDone(pair[i].topicId, pair[i].pass, true, today);
    }

    var doneTwo = Schedule.plan();
    var settledDay = sessionsOn(doneTwo.done, today);
    ok(settledDay.length === 2,
       "two-up: two lessons finished in a day should fill two sessions, got " +
       settledDay.length);

    var lessonsPer = [], seen, z, y;
    for (z = 0; z < settledDay.length; z++) {
        seen = {};
        var howMany = 0;
        for (y = 0; y < settledDay[z].items.length; y++) {
            if (!seen[settledDay[z].items[y].lessonKey]) {
                seen[settledDay[z].items[y].lessonKey] = 1;
                howMany++;
            }
        }
        lessonsPer.push(howMany);
    }
    for (z = 0; z < lessonsPer.length; z++) {
        if (lessonsPer[z] > 1) {
            fail("two-up: a finished one-lesson session swallowed " + lessonsPer[z] +
                 " lessons — it must hold the same room a planned one does");
            break;
        }
    }

    ok(sessionsOn(doneTwo.sessions, today, '09:00').length === 0 &&
       sessionsOn(doneTwo.sessions, today, '12:00').length === 0,
       "two-up: a finished session was replanned with new work");
    ok(sessionsOn(doneTwo.sessions, today, '15:00').length === 1,
       "two-up: the session she has NOT done yet should still be planned");
}

// Work ticked on a day with no slots at all — before her start date, or more
// in one day than she had sessions for — must still be shown. Dropping it
// would lose the record of an afternoon's work.
baseline({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 1, minutes: 60, topics: 1, times: ['09:00'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'] },
    exams: { aaa: daysFromToday(60) }
});
Schedule.setDone('aaa-t1', 1, true, today);
Schedule.setDone('aaa-t2', 1, true, today);
Schedule.setDone('aaa-t3', 1, true, today);

var spill = Schedule.plan();
ok(doneItemCount(spill.done) === 3,
   "spill: three topics ticked on a one-session day, " + doneItemCount(spill.done) + " kept");

var timed = 0, untimed = 0;
for (i = 0; i < spill.done.length; i++) {
    if (spill.done[i].time) timed++; else untimed++;
}
ok(timed === 1, "spill: expected one finished session to take the day's only slot, got " + timed);
ok(untimed >= 1, "spill: the overflow was dropped instead of shown without a time");

// ── 21. a part-finished session keeps the rest of its lesson ─────
//
// The other face of the refilling bug, and it appeared the moment the first
// half was fixed. Making finished work occupy its slot meant the slot held
// only what she had TICKED — so ticking one topic of a five-topic lesson gave
// a session containing that one topic, with the other four pushed out into
// some later session. She could not finish the lesson in front of her.
//
// A started session takes back what it still owes, and only that: the rest of
// the lessons it already holds, never a new one.

baseline({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, unit: 'lessons', lessons: 1, minutes: 60,
               times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60) }
});

var whole = Schedule.plan();
var target = null;
for (i = 0; i < whole.sessions.length; i++) {
    /* A lesson with more than one topic in it, or there is nothing to be
       half-finished. */
    if (whole.sessions[i].date === today && whole.sessions[i].items.length > 2) {
        target = whole.sessions[i];
        break;
    }
}
ok(target !== null, "partial: found no multi-topic lesson session today to half-finish");

if (target) {
    var full = target.items.length;
    var lessonKey = target.items[0].lessonKey;

    /* The MIDDLE topic, not the first. Ticking the first hides an ordering
       fault: the rest of the lesson gets appended after it and happens to come
       out in taught order anyway. Ticking the middle one means the ticked half
       and the queued half have to be interleaved properly or the lesson lists
       topic 2, then topic 1, then topic 3. */
    var pick = Math.floor(target.items.length / 2);
    var tickedKey = target.items[pick].key;

    Schedule.setDone(target.items[pick].topicId, target.items[pick].pass, true, today);

    var half = Schedule.plan();

    /* Found by the topic she ticked, not by the time it used to sit at.
       Started work claims the earliest free slot of its day, because nothing
       records WHICH sitting she did — so a lesson she started at noon can come
       back at nine. That is a guess the engine is entitled to make. What it is
       not entitled to do is lose the rest of the lesson. */
    var host = null, z;
    for (i = 0; i < half.sessions.length; i++) {
        for (z = 0; z < half.sessions[i].items.length; z++) {
            if (half.sessions[i].items[z].key === tickedKey) { host = half.sessions[i]; break; }
        }
        if (host) break;
    }
    ok(host !== null, "partial: the half-finished session left the calendar entirely");

    if (host) {
        ok(host.items.length === full,
           "partial: session lost topics after one tick — had " + full +
           ", now " + host.items.length + ", so she cannot finish it");

        var ticked = 0, todo = 0;
        for (z = 0; z < host.items.length; z++) {
            if (host.items[z].done) ticked++; else todo++;
        }
        ok(ticked === 1, "partial: expected one ticked topic, got " + ticked);
        ok(todo === full - 1,
           "partial: the topics she still has to do are missing, got " + todo);

        ok(host.done !== true, "partial: a session with work left in it is marked finished");
        ok(host.date === today, "partial: the started session moved off today");

        // And it must not have grown a second lesson while topping back up.
        var keys = {}, howMany = 0;
        for (z = 0; z < host.items.length; z++) {
            if (!keys[host.items[z].lessonKey]) { keys[host.items[z].lessonKey] = 1; howMany++; }
        }
        ok(howMany === 1,
           "partial: topping a session back up pulled in " + howMany + " lessons");
        ok(keys[lessonKey], "partial: the session came back holding a different lesson");

        // Taught order, not ticked-first order.
        var outOfOrder = false;
        for (z = 1; z < host.items.length; z++) {
            if (orderIn(target.items, host.items[z - 1].topicId) >
                orderIn(target.items, host.items[z].topicId)) { outOfOrder = true; break; }
        }
        ok(!outOfOrder, "partial: the rebuilt session is not in taught order");
    }

    // Nothing counted twice: the ticked topic must not also be sitting in some
    // later session waiting to be done again.
    var dupes = 0, fl = flat(half.sessions);
    for (i = 0; i < fl.length; i++) if (fl[i].key === tickedKey) dupes++;
    ok(dupes === 1, "partial: the ticked topic appears " + dupes + " times across the plan");

    // Every topic of that lesson is somewhere exactly once, ticked or not.
    for (z = 0; z < target.items.length; z++) {
        var seenTimes = 0;
        for (i = 0; i < fl.length; i++) if (fl[i].key === target.items[z].key) seenTimes++;
        if (seenTimes !== 1) {
            fail("partial: " + target.items[z].topicId + " appears " + seenTimes +
                 " times — a topic was lost or duplicated");
            break;
        }
    }
}

function orderIn(list, topicId) {
    for (var z = 0; z < list.length; z++) if (list[z].topicId === topicId) return z;
    return 999;
}

// ── 22. pass names ───────────────────────────────────────────────

ok(Schedule.passName(1) === 'First pass', "names: pass 1");
ok(Schedule.passName(2) === 'Revision', "names: pass 2");
ok(Schedule.passName(3) === 'Second revision', "names: pass 3");
ok(Schedule.passName(4) === 'Revision 3', "names: pass 4");

// ── report ───────────────────────────────────────────────────────

WScript.Echo("Schedule engine checked:");
WScript.Echo("  dates, slots, settings, ordering, ticking, badges, focus, shortfall");
WScript.Echo("  warnings, spare-time revision, exam urgency, blocked exam days,");
WScript.Echo("  multiple topics per session, capacity counted in topics, a finished");
WScript.Echo("  session keeping its slot instead of refilling itself, and a");
WScript.Echo("  part-finished one keeping the rest of its lesson.");
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var q = 0; q < problems.length; q++) WScript.Echo("  - " + problems[q]);
}
WScript.Quit(problems.length);
