var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Simulates the exact points path quiz.js runs when an answer is marked correct, for every
// mode, and checks what the header bar would actually render.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Object.keys) {
    Object.keys = function (o) { var a = []; for (var k in o) if (o.hasOwnProperty(k)) a.push(k); return a; };
}
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () { return "2026-01-01T00:00:00Z"; };
}
var JSON = {
    stringify: function (v) {
        if (v === null) return "null";
        var t = typeof v;
        if (t === "number" || t === "boolean") return String(v);
        if (t === "string") return '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
        if (v instanceof Array) {
            var a = []; for (var i = 0; i < v.length; i++) a.push(JSON.stringify(v[i]));
            return "[" + a.join(",") + "]";
        }
        var parts = [];
        for (var k in v) {
            if (!v.hasOwnProperty(k)) continue;
            if (typeof v[k] === "undefined" || typeof v[k] === "function") continue;
            parts.push(JSON.stringify(String(k)) + ":" + JSON.stringify(v[k]));
        }
        return "{" + parts.join(",") + "}";
    },
    parse: function (s) { return eval("(" + s + ")"); }
};

var fso = new ActiveXObject("Scripting.FileSystemObject");
var JS = REPO + "\\public\\js\\";
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

var store = {};
var localStorage = {
    getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; }
};

var Store, REWARDS, Rewards;
eval(read(JS + "storage.js"));
eval(read(JS + "rewards.js"));

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

/* Mirrors what quiz.js does on a correct answer. */
function answerCorrectly(mode) {
    var before = Store.points();
    var granted = Store.addPoints(mode);
    var after = Store.points();
    var unlocked = Rewards.newlyUnlocked(before, after);
    return { granted: granted, before: before, after: after, unlocked: unlocked };
}

// ── points must land for the scoring modes ────────────────────
var r1 = answerCorrectly("test");
check(r1.granted === 1, "a correct TEST answer should grant 1 point, granted " + r1.granted);
check(r1.after === r1.before + 1, "test: the stored total should rise by 1");

var r2 = answerCorrectly("exam");
check(r2.granted === 2, "a correct EXAM answer should grant 2 points, granted " + r2.granted);
check(r2.after === r2.before + 2, "exam: the stored total should rise by 2");

// ── practise must never score ─────────────────────────────────
var beforeP = Store.points();
var r3 = answerCorrectly("practise");
check(r3.granted === 0, "a correct PRACTISE answer must grant 0 points, granted " + r3.granted);
check(Store.points() === beforeP, "practise must not change the stored total");
check(r3.unlocked.length === 0, "practise must never unlock a reward");

// anything unrecognised must also score nothing, rather than defaulting to some value
check(Store.addPoints("nonsense") === 0, "an unknown mode must grant 0 points");
check(Store.addPoints(undefined) === 0, "an undefined mode must grant 0 points");
check(Store.points() === beforeP, "unknown modes must not change the stored total");

// ── the header bar must actually move ─────────────────────────
// This is what looked broken: against a 500 cap, one point is 0.2% of the bar, so
// Math.round() renders it as 0% and nothing appears to happen.
function oldBarPct(points) { return Math.round((points / Store.POINT_CAP) * 100); }

check(oldBarPct(1) === 0 && oldBarPct(2) === 0,
      "the old whole-bar percentage should indeed render as 0% for the first points " +
      "(this is the bug being fixed)");

// The bar now tracks progress toward the NEXT reward instead.
var seenMovement = true, firstBandStalls = 0;
for (var p = 0; p <= REWARDS[0].at; p++) {
    var prog = Rewards.progress(p);
    if (prog.pct < 0 || prog.pct > 100) {
        fails.push("progress out of range at " + p + " points: " + prog.pct + "%");
        break;
    }
    if (p > 0 && prog.pct === Rewards.progress(p - 1).pct) firstBandStalls++;
}
n++;
if (firstBandStalls > 0) {
    fails.push("the bar should move on EVERY point in the first band, stalled " + firstBandStalls + " times");
}

check(Rewards.progress(0).pct === 0, "an empty bar at 0 points");
check(Rewards.progress(REWARDS[0].at).pct === 0,
      "landing exactly on a reward should reset the bar for the next one");
check(Rewards.progress(Store.POINT_CAP).pct === 100, "a full bar once everything is earned");

// progress must never run backwards as points rise
var prev = -1, backwards = 0, lastAt = 0;
for (var q = 0; q <= Store.POINT_CAP; q++) {
    var pr = Rewards.progress(q);
    if (pr.next && pr.next.at !== lastAt) { prev = -1; lastAt = pr.next.at; }   // new band, reset
    if (pr.pct < prev) backwards++;
    prev = pr.pct;
}
n++;
if (backwards > 0) fails.push("progress ran backwards " + backwards + " times within a band");

// the next reward must always be a real one until the cap
check(Rewards.progress(0).next.at === REWARDS[0].at, "the first reward should be next at 0 points");
check(Rewards.progress(Store.POINT_CAP).next === null, "no next reward once capped");

WScript.Echo("Points and bar checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Points score correctly, practise never scores, and the bar always moves.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
