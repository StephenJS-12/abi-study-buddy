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

function makeTopics(prefix, n) {
    var out = [];
    for (var i = 1; i <= n; i++) {
        out.push({ id: prefix + '-t' + i, title: 'Topic ' + i, emoji: 'T' });
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

function requiredCount(sessions, moduleId) {
    var f = flat(sessions), n = 0;
    for (var i = 0; i < f.length; i++) {
        if (f[i].pass > 3) continue;
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

// Weekend days use the weekend block, not the weekday one.
set({
    days: [0, 6],
    weekday: { count: 1, minutes: 60, topics: 1, times: ['17:00'] },
    weekend: { count: 3, minutes: 45, topics: 1, times: ['09:00', '11:00', '13:00'] }
});
var wk = Schedule.buildSlots('2025-12-06', '2025-12-07');       // Sat + Sun
ok(wk.length === 6, "slots: weekend should use the weekend count, got " + wk.length);
ok(wk[0].minutes === 45, "slots: weekend session length not applied");

// Sessions inside a day come out in time order even if she entered them jumbled.
set({
    days: [1],
    weekday: { count: 3, minutes: 60, topics: 1, times: ['19:00', '07:00', '13:00'] },
    weekend: { count: 1, minutes: 60, topics: 1, times: ['09:00'] }
});
var day = Schedule.buildSlots('2025-12-01', '2025-12-01');
ok(day.length === 3 && day[0].time === '07:00' && day[1].time === '13:00' && day[2].time === '19:00',
   "slots: sessions in a day are not in time order");

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
ok(s.weekday.times.length === s.weekday.count,
   "settings: there must be exactly one time per session, got " +
   s.weekday.times.length + " for " + s.weekday.count);

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
ok(requiredCount(pu.sessions, 'aaa') === 30,
   "urgency: expected all 30 aaa topics before its exam, got " + requiredCount(pu.sessions, 'aaa'));

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

// ── 19. pass names ───────────────────────────────────────────────

ok(Schedule.passName(1) === 'First pass', "names: pass 1");
ok(Schedule.passName(2) === 'Revision', "names: pass 2");
ok(Schedule.passName(3) === 'Second revision', "names: pass 3");
ok(Schedule.passName(4) === 'Revision 3', "names: pass 4");

// ── report ───────────────────────────────────────────────────────

WScript.Echo("Schedule engine checked:");
WScript.Echo("  dates, slots, settings, ordering, ticking, badges, focus, shortfall");
WScript.Echo("  warnings, spare-time revision, exam urgency, blocked exam days,");
WScript.Echo("  multiple topics per session, and capacity counted in topics.");
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var q = 0; q < problems.length; q++) WScript.Echo("  - " + problems[q]);
}
WScript.Quit(problems.length);
