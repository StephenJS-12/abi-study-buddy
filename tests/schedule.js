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
if (!JSON) { var JSON = null; }

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

function makeTopics(prefix, n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
        out.push({ id: prefix + '-t' + i, title: 'Topic ' + i, emoji: '📘' });
    }
    return out;
}

var CONTENT = {
    aaa: { weeks: [{ number: 1, title: 'W1', topics: makeTopics('aaa', 10) }] },
    bbb: { weeks: [{ number: 1, title: 'W1', topics: makeTopics('bbb', 10) }] }
};

var Modules = {
    ready: function () {
        return [
            { id: 'aaa', code: 'AAA01', accent: 1 },
            { id: 'bbb', code: 'BBB01', accent: 2 }
        ];
    },
    contentFor: function (id) { return CONTENT[id] || { weeks: [] }; }
};

// ── load the engine ──────────────────────────────────────────────
// JSON is not available in JScript, and Schedule uses it to deep-copy. A tiny
// stand-in is enough: everything it copies is plain data.
if (typeof JSON === 'undefined' || !JSON) {
    JSON = {
        parse: function (s) { return eval('(' + s + ')'); },
        stringify: function (v) {
            if (v === null || v === undefined) return 'null';
            var t = typeof v;
            if (t === 'number' || t === 'boolean') return String(v);
            if (t === 'string') return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
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

function reset() {
    savedSchedule = null;
    badges = {};
}

function set(cfg) {
    reset();
    savedSchedule = cfg;
}

function countFor(sessions, moduleId) {
    var n = 0;
    for (var i = 0; i < sessions.length; i++) if (sessions[i].moduleId === moduleId) n++;
    return n;
}

function firstFor(sessions, moduleId, pass) {
    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].moduleId === moduleId && sessions[i].pass === pass) return sessions[i];
    }
    return null;
}

// A date far enough ahead that "today" never overtakes it while the check runs.
function daysFromToday(n) {
    return Schedule.ymd(Schedule.addDays(new Date(), n));
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

// A local-midnight Date must never shift a day when formatted back, which is
// exactly what new Date('2025-12-12') would do west of Greenwich.
var mar = Schedule.parseYmd('2025-03-30');
ok(Schedule.ymd(mar) === '2025-03-30', "date: a spring-forward date shifted");

// ── 2. slots respect the days and counts she chose ───────────────

set({
    days: [1, 3],                                   // Mondays and Wednesdays only
    weekday: { count: 2, minutes: 60, times: ['17:00', '19:00'] },
    weekend: { count: 4, minutes: 60, times: ['09:00', '11:00', '13:00', '15:00'] }
});

var slots = Schedule.buildSlots('2025-12-01', '2025-12-14');   // Mon 1 Dec .. Sun 14 Dec
var dows = {};
for (var i = 0; i < slots.length; i++) {
    dows[Schedule.parseYmd(slots[i].date).getDay()] = 1;
}
ok(!dows[0] && !dows[2] && !dows[4] && !dows[5] && !dows[6],
   "slots: generated a session on a day she did not select");
ok(dows[1] && dows[3], "slots: missed a day she did select");
ok(slots.length === 8, "slots: expected 4 selected days x 2 sessions = 8, got " + slots.length);

// Weekend days use the weekend block, not the weekday one.
set({
    days: [0, 6],
    weekday: { count: 1, minutes: 60, times: ['17:00'] },
    weekend: { count: 3, minutes: 45, times: ['09:00', '11:00', '13:00'] }
});
var wk = Schedule.buildSlots('2025-12-06', '2025-12-07');       // Sat + Sun
ok(wk.length === 6, "slots: weekend should use the weekend count, got " + wk.length);
ok(wk[0].minutes === 45, "slots: weekend session length not applied");

// Sessions inside a day come out in time order even if she entered them jumbled.
set({
    days: [1],
    weekday: { count: 3, minutes: 60, times: ['19:00', '07:00', '13:00'] },
    weekend: { count: 1, minutes: 60, times: ['09:00'] }
});
var day = Schedule.buildSlots('2025-12-01', '2025-12-01');
ok(day.length === 3 && day[0].time === '07:00' && day[1].time === '13:00' && day[2].time === '19:00',
   "slots: sessions in a day are not in time order");

// ── 3. bad settings degrade to something usable ──────────────────

set({ days: [], weekday: { count: 0, minutes: 0, times: [] } });
var s = Schedule.settings();
ok(s.days.length > 0, "settings: no study days at all should fall back, not produce an empty plan");
ok(s.weekday.count >= 1, "settings: a session count of zero should fall back");
ok(s.weekday.times.length === s.weekday.count,
   "settings: there must be exactly one time per session, got " +
   s.weekday.times.length + " for " + s.weekday.count);

set({ weekday: { count: 4, minutes: 60, times: ['09:00'] } });
ok(Schedule.settings().weekday.times.length === 4,
   "settings: missing session times should be filled in, not left short");

set({ days: [9, -2, 3, 3] });
var days = Schedule.settings().days;
ok(days.length === 1 && days[0] === 3, "settings: out-of-range and duplicate days should be dropped");

// ── 4. every required session is planned ─────────────────────────
// 20 topics across two modules, three passes each = 60 required sessions.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) }
});

var p = Schedule.plan();
ok(p.warnings.length === 0,
   "plan: 60 required sessions in ~180 slots should fit, but got " + p.warnings.length + " warning(s)");

var required = 0;
for (i = 0; i < p.sessions.length; i++) if (p.sessions[i].pass <= 3) required++;
ok(required === 60, "plan: expected 60 required sessions, got " + required);

// Both modules must actually appear. A scheduler that starves one until the
// other is finished is not what she asked for.
ok(countFor(p.sessions, 'aaa') > 0 && countFor(p.sessions, 'bbb') > 0,
   "plan: one module got no sessions at all");

// ── 5. sessions come out in date and time order ──────────────────

var lastKey = '';
for (i = 0; i < p.sessions.length; i++) {
    var key = p.sessions[i].date + ' ' + p.sessions[i].time;
    if (key < lastKey) { fail("plan: sessions are out of order at " + key + " after " + lastKey); break; }
    lastKey = key;
}

// No slot may hold two sessions.
var seenSlot = {};
for (i = 0; i < p.sessions.length; i++) {
    var sk = p.sessions[i].date + ' ' + p.sessions[i].time;
    if (seenSlot[sk]) { fail("plan: two sessions booked into the same slot at " + sk); break; }
    seenSlot[sk] = 1;
}

// ── 6. passes run in order for a given topic ─────────────────────
// Revising a topic before the first pass would be nonsense.

var when = {};
for (i = 0; i < p.sessions.length; i++) {
    var ss = p.sessions[i];
    var kk = ss.topicId + '|' + ss.pass;
    when[kk] = ss.date + ' ' + ss.time;
}
for (i = 1; i <= 10; i++) {
    var t1 = when['aaa-t' + i + '|1'], t2 = when['aaa-t' + i + '|2'], t3 = when['aaa-t' + i + '|3'];
    if (t1 && t2 && !(t1 < t2)) { fail("plan: revision of aaa-t" + i + " is scheduled before its first pass"); break; }
    if (t2 && t3 && !(t2 < t3)) { fail("plan: second revision of aaa-t" + i + " comes before the first"); break; }
}

// ── 7. ticking a topic frees its slot ────────────────────────────
// This is the behaviour the whole feature rests on: getting ahead has to buy
// her time, so a completed topic must not keep holding a future session.

var beforeCount = p.sessions.length;
var firstAaa = firstFor(p.sessions, 'aaa', 1);
ok(firstAaa !== null, "plan: no first-pass session found for module aaa");

if (firstAaa) {
    Schedule.setDone(firstAaa.topicId, 1, true);
    var p2 = Schedule.plan();

    var stillThere = false;
    for (i = 0; i < p2.sessions.length; i++) {
        if (p2.sessions[i].key === firstAaa.key) { stillThere = true; break; }
    }
    ok(!stillThere, "tick: a completed session is still holding a future slot");

    var req2 = 0;
    for (i = 0; i < p2.sessions.length; i++) if (p2.sessions[i].pass <= 3) req2++;
    ok(req2 === 59, "tick: expected 59 required sessions after ticking one, got " + req2);

    ok(p2.done.length === 1, "tick: the completed session is missing from the done list");
    ok(p2.done[0].topicId === firstAaa.topicId, "tick: the wrong session was recorded as done");

    // ...and unticking brings it back.
    Schedule.setDone(firstAaa.topicId, 1, false);
    var p3 = Schedule.plan();
    var back = 0;
    for (i = 0; i < p3.sessions.length; i++) if (p3.sessions[i].pass <= 3) back++;
    ok(back === 60, "untick: the session did not come back, got " + back);
}

// ── 8. a badge completes the first pass by itself ────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) }
});
badges['aaa-t1'] = '2025-11-01T00:00:00.000Z';

ok(Schedule.isDone('aaa-t1', 1), "badge: earning a badge should complete the first pass");
ok(!Schedule.isDone('aaa-t1', 2), "badge: a badge must not complete the revision pass too");

var pb = Schedule.plan();
var foundBadged = false;
for (i = 0; i < pb.sessions.length; i++) {
    if (pb.sessions[i].key === 'aaa-t1|1') { foundBadged = true; break; }
}
ok(!foundBadged, "badge: a badged topic still has a first-pass session in the future");

// Revision sessions must STILL be created for a topic she has finished —
// finishing the first pass is exactly what makes revision worth scheduling.
var revs = 0;
for (i = 0; i < pb.sessions.length; i++) {
    if (pb.sessions[i].topicId === 'aaa-t1' && pb.sessions[i].pass >= 2) revs++;
}
ok(revs >= 2, "badge: a completed topic lost its revision sessions, got " + revs);

// A manual untick must beat the badge.
Schedule.setDone('aaa-t1', 1, false);
ok(!Schedule.isDone('aaa-t1', 1), "override: unticking a badged topic did not take effect");

// ...and a manual tick must work without any badge.
Schedule.setDone('bbb-t5', 1, true);
ok(Schedule.isDone('bbb-t5', 1), "override: a manual tick without a badge did not take effect");

// ── 9. focus topics are revised first ────────────────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    weekend: { count: 3, minutes: 60, times: ['09:00', '12:00', '15:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) },
    focus: { 'aaa-t9': true }
});

var pf = Schedule.plan();
var firstRev = null;
for (i = 0; i < pf.sessions.length; i++) {
    if (pf.sessions[i].moduleId === 'aaa' && pf.sessions[i].pass === 2) { firstRev = pf.sessions[i]; break; }
}
ok(firstRev !== null && firstRev.topicId === 'aaa-t9',
   "focus: a flagged topic should be the first thing revised, got " +
   (firstRev ? firstRev.topicId : 'nothing'));

// Flagging must not affect the first pass, which follows the module's own order.
var firstPass = firstFor(pf.sessions, 'aaa', 1);
ok(firstPass !== null && firstPass.topicId === 'aaa-t1',
   "focus: flagging a topic changed the order of the first pass");

// ── 10. not enough time produces a warning ───────────────────────
// One session a day, one study day a week, an exam in three weeks: 60 sessions
// of work and 3 slots to do it in.

set({
    days: [1],
    weekday: { count: 1, minutes: 60, times: ['17:00'] },
    weekend: { count: 1, minutes: 60, times: ['09:00'] },
    exams: { aaa: daysFromToday(21), bbb: daysFromToday(21) }
});

var pw = Schedule.plan();
ok(pw.warnings.length === 2, "warning: both modules should report a shortfall, got " + pw.warnings.length);
if (pw.warnings.length) {
    ok(pw.warnings[0].short > 0, "warning: shortfall reported as zero sessions");
    ok(String(pw.warnings[0].text).length > 10, "warning: no readable message");
}

// Nothing may be scheduled after an exam has passed.
for (i = 0; i < pw.sessions.length; i++) {
    var ex = Schedule.settings().exams[pw.sessions[i].moduleId];
    if (ex && pw.sessions[i].date > ex) {
        fail("warning: a session was scheduled after the " + pw.sessions[i].moduleCode + " exam");
        break;
    }
}

// ── 11. spare time is filled with extra revision ─────────────────
// Starting very early: 60 required sessions and far more slots than that.
// The gap before the exam should fill with more revision, not sit empty.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 4, minutes: 60, times: ['09:00', '11:00', '13:00', '15:00'] },
    weekend: { count: 4, minutes: 60, times: ['09:00', '11:00', '13:00', '15:00'] },
    exams: { aaa: daysFromToday(120), bbb: daysFromToday(120) }
});

var pe = Schedule.plan();
ok(pe.warnings.length === 0, "spare: everything fits, so there should be no warning");

var extra = 0;
for (i = 0; i < pe.sessions.length; i++) if (pe.sessions[i].pass > 3) extra++;
ok(extra > 0, "spare: leftover slots before the exam were left empty instead of becoming revision");

// The last session must still land on or before the exam.
var lastSession = pe.sessions[pe.sessions.length - 1];
ok(lastSession.date <= daysFromToday(120), "spare: extra revision ran past the exam date");

// ── 12. the nearer exam gets priority ────────────────────────────
// Two modules, one exam much sooner. The urgent one must be finished first,
// or she walks into that exam with topics she has never seen.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(20), bbb: daysFromToday(120) }
});

var pu = Schedule.plan();

// The real test is not that aaa's sessions sit before its exam - nothing is
// ever placed after an exam, so that would pass by construction. It is whether
// aaa gets ENOUGH of the shared calendar to finish all 30 of its required
// sessions in the 20 days it has, while bbb has 120 days to play with.
var aaaWarn = null;
for (i = 0; i < pu.warnings.length; i++) if (pu.warnings[i].moduleId === 'aaa') aaaWarn = pu.warnings[i];
ok(aaaWarn === null,
   "urgency: the urgent module ran out of sessions before its exam - it is being starved by the module " +
   "with four months to spare" + (aaaWarn ? " (" + aaaWarn.short + " short)" : ""));

var aaaRequired = 0;
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].moduleId === 'aaa' && pu.sessions[i].pass <= 3) aaaRequired++;
}
ok(aaaRequired === 30, "urgency: expected all 30 aaa sessions before its exam, got " + aaaRequired);

// And bbb must not be frozen out entirely while aaa is urgent - she should
// still be touching both subjects, not abandoning one for three weeks.
var bbbEarly = 0;
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].moduleId === 'bbb' && pu.sessions[i].date <= daysFromToday(20)) bbbEarly++;
}
ok(bbbEarly > 0, "urgency: the non-urgent module got no sessions at all before the first exam");

// No aaa session may fall after the aaa exam.
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].moduleId === 'aaa' && pu.sessions[i].date > daysFromToday(20)) {
        fail("urgency: an aaa session was placed after the aaa exam");
        break;
    }
}

// Once the near exam is past, the remaining module keeps the whole calendar.
var afterExam = 0, afterExamAaa = 0;
for (i = 0; i < pu.sessions.length; i++) {
    if (pu.sessions[i].date > daysFromToday(20)) {
        afterExam++;
        if (pu.sessions[i].moduleId === 'aaa') afterExamAaa++;
    }
}
ok(afterExam > 0, "urgency: nothing at all is scheduled after the first exam");
ok(afterExamAaa === 0, "urgency: the finished module is still taking slots after its exam");

// ── 13. no exam dates at all still produces a plan ───────────────

set({
    days: [1, 2, 3, 4, 5],
    weekday: { count: 2, minutes: 60, times: ['17:00', '19:00'] },
    weekend: { count: 2, minutes: 60, times: ['09:00', '11:00'] },
    exams: {}
});

var pn = Schedule.plan();
var reqn = 0;
for (i = 0; i < pn.sessions.length; i++) if (pn.sessions[i].pass <= 3) reqn++;
ok(reqn === 60, "no exams: all 60 required sessions should still be planned, got " + reqn);
ok(pn.warnings.length === 0, "no exams: there is no deadline to miss, so no warning");

var extraN = 0;
for (i = 0; i < pn.sessions.length; i++) if (pn.sessions[i].pass > 3) extraN++;
ok(extraN === 0, "no exams: without a deadline there is no gap to fill, so no extra revision");

// ── 14. an exam already gone ─────────────────────────────────────
// Nothing should be planned for a module whose exam is behind her, and the
// other module must take the whole calendar rather than the plan collapsing.

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(-5), bbb: daysFromToday(90) }
});

var pp = Schedule.plan();
ok(countFor(pp.sessions, 'aaa') === 0, "past exam: a module whose exam has gone is still being scheduled");
ok(countFor(pp.sessions, 'bbb') > 0, "past exam: the remaining module lost its sessions too");

var bbbReq = 0;
for (i = 0; i < pp.sessions.length; i++) if (pp.sessions[i].pass <= 3) bbbReq++;
ok(bbbReq === 30, "past exam: the remaining module should still get all 30 sessions, got " + bbbReq);

// ── 15. nothing is ever planned in the past ──────────────────────

set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(40), bbb: daysFromToday(40) },
    start: daysFromToday(-30)
});

var pz = Schedule.plan();
var t0 = Schedule.todayYmd();
for (i = 0; i < pz.sessions.length; i++) {
    if (pz.sessions[i].date < t0) {
        fail("past: a session was planned on " + pz.sessions[i].date + ", before today");
        break;
    }
}

// A start date in the future is honoured, though.
set({
    days: [0, 1, 2, 3, 4, 5, 6],
    weekday: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    weekend: { count: 2, minutes: 60, times: ['09:00', '15:00'] },
    exams: { aaa: daysFromToday(60), bbb: daysFromToday(60) },
    start: daysFromToday(7)
});
var pl = Schedule.plan();
ok(pl.sessions.length > 0 && pl.sessions[0].date >= daysFromToday(7),
   "start: a future start date was ignored, first session is " +
   (pl.sessions.length ? pl.sessions[0].date : 'none'));

// ── 16. pass names ───────────────────────────────────────────────

ok(Schedule.passName(1) === 'First pass', "names: pass 1");
ok(Schedule.passName(2) === 'Revision', "names: pass 2");
ok(Schedule.passName(3) === 'Second revision', "names: pass 3");
ok(Schedule.passName(4) === 'Revision 3', "names: pass 4");

// ── report ───────────────────────────────────────────────────────

WScript.Echo("Schedule engine checked:");
WScript.Echo("  dates, slots, settings, ordering, ticking, badges, focus,");
WScript.Echo("  shortfall warnings, spare-time revision, exam urgency.");
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var q = 0; q < problems.length; q++) WScript.Echo("  - " + problems[q]);
}
WScript.Quit(problems.length);
