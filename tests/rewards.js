var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Checks the reward ladder and the points system that drives it.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Object.keys) {
    Object.keys = function (o) { var a = []; for (var k in o) if (o.hasOwnProperty(k)) a.push(k); return a; };
}
if (!Date.prototype.toISOString) {          // ES5, present in every browser
    Date.prototype.toISOString = function () {
        function p(x, w) { var s = String(x); while (s.length < (w || 2)) s = "0" + s; return s; }
        return this.getUTCFullYear() + "-" + p(this.getUTCMonth() + 1) + "-" + p(this.getUTCDate()) +
               "T" + p(this.getUTCHours()) + ":" + p(this.getUTCMinutes()) + ":" + p(this.getUTCSeconds()) + "Z";
    };
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

// ---- the ladder itself ---------------------------------------
check(REWARDS.length >= 10, "expected a decent number of rewards, got " + REWARDS.length);

var rising = true;
for (var i = 1; i < REWARDS.length; i++) {
    if (REWARDS[i].at <= REWARDS[i - 1].at) rising = false;
}
check(rising, "reward thresholds must strictly increase");

check(REWARDS[REWARDS.length - 1].at === Store.POINT_CAP,
      "the final reward should sit exactly on the cap (" + Store.POINT_CAP + "), got " +
      REWARDS[REWARDS.length - 1].at);

check(REWARDS[0].at <= 15, "the first reward should be reachable quickly, sits at " + REWARDS[0].at);

var wellFormed = true;
REWARDS.forEach(function (r) {
    if (!r.emoji || !r.title || !r.note || typeof r.at !== "number") wellFormed = false;
});
check(wellFormed, "every reward needs at, emoji, title and note");

// Every reward must declare which kind it is
var kindsOk = true;
REWARDS.forEach(function (r) {
    if (r.kind !== "milestone" && r.kind !== "booster") kindsOk = false;
});
check(kindsOk, "every reward needs kind 'milestone' or 'booster'");

// MILESTONE gaps should widen - that ladder is meant to get harder
var milestones = [];
REWARDS.forEach(function (r) { if (r.kind === "milestone") milestones.push(r); });
check(milestones.length >= 10, "expected a proper milestone ladder, got " + milestones.length);

var gapsGrow = true, prevGap = 0;
for (var g = 0; g < milestones.length; g++) {
    var gap = milestones[g].at - (g ? milestones[g - 1].at : 0);
    if (gap < prevGap - 5) gapsGrow = false;   // small wobble tolerated, big drops not
    prevGap = gap;
}
check(gapsGrow, "milestone gaps should widen as she climbs, not narrow");
check(milestones[milestones.length - 1].at === Store.POINT_CAP,
      "the last milestone should sit on the cap");

// BOOSTERS must sit strictly between milestones, never on one
var boosterPlacement = true;
REWARDS.forEach(function (r) {
    if (r.kind !== "booster") return;
    for (var m = 0; m < milestones.length; m++) if (milestones[m].at === r.at) boosterPlacement = false;
});
check(boosterPlacement, "no booster may share a threshold with a milestone");

// and the whole point of boosters: never a long stretch with nothing to aim for
var biggestGap = 0, prevAt = 0;
REWARDS.forEach(function (r) { biggestGap = Math.max(biggestGap, r.at - prevAt); prevAt = r.at; });
check(biggestGap <= 32,
      "with boosters in place no gap should exceed ~30 points, biggest is " + biggestGap);

// ---- state machine -------------------------------------------
check(Rewards.state(REWARDS[0], 0) === "locked", "reward should be locked at 0 points");
check(Rewards.state(REWARDS[0], REWARDS[0].at) === "ready",
      "reward should be ready exactly on its threshold");
check(Rewards.state(REWARDS[0], REWARDS[0].at + 50) === "ready",
      "reward should stay ready above its threshold");

check(Rewards.readyCount(0) === 0, "nothing ready at 0 points");
check(Rewards.readyCount(REWARDS[0].at) === 1, "exactly one ready on the first threshold");
check(Rewards.readyCount(Store.POINT_CAP) === REWARDS.length, "everything ready at the cap");

// ---- claiming -------------------------------------------------
check(Store.claim(REWARDS[0].at) === true, "first claim should succeed");
check(Store.claim(REWARDS[0].at) === false, "re-claiming the same reward should be refused");
check(Rewards.state(REWARDS[0], Store.POINT_CAP) === "claimed", "claimed reward should read as claimed");
check(Rewards.readyCount(REWARDS[0].at) === 0, "a claimed reward is no longer 'ready'");
check(Store.claimedCount() === 1, "claimed count should be 1, got " + Store.claimedCount());
check(/"claimed"/.test(store["sparkleStudy.v1"] || ""), "claims must persist to storage");

// ---- next reward ----------------------------------------------
check(Rewards.next(0).at === REWARDS[0].at, "next reward from 0 should be the first one");
check(Rewards.next(Store.POINT_CAP) === null, "no next reward once capped");

// ---- newly unlocked window ------------------------------------
var crossed = Rewards.newlyUnlocked(REWARDS[0].at - 1, REWARDS[0].at);
check(crossed.length === 1 && crossed[0].at === REWARDS[0].at,
      "crossing a threshold should report exactly that reward");
check(Rewards.newlyUnlocked(0, 0).length === 0, "no movement means nothing unlocked");
var spanned = Rewards.newlyUnlocked(0, REWARDS[2].at);
check(spanned.length === 3, "jumping past three thresholds should report three, got " + spanned.length);

// ---- points ---------------------------------------------------
check(Store.POINTS_PER.test === 1, "test mode should award 1 point");
check(Store.POINTS_PER.exam === 2, "exam mode should award 2 points");
check(Store.addPoints("practise") === 0, "practise mode must not award points");

var before = Store.points();
check(Store.addPoints("test") === 1, "test answer should grant 1 point");
check(Store.addPoints("exam") === 2, "exam answer should grant 2 points");
check(Store.points() === before + 3, "points should total correctly");

// the cap must never be exceeded, even by a 2-point exam answer landing on 499
while (Store.points() < Store.POINT_CAP - 1) { Store.addPoints("exam"); }
if (Store.points() !== Store.POINT_CAP - 1) { Store.addPoints("test"); }
var granted = Store.addPoints("exam");
check(Store.points() === Store.POINT_CAP,
      "points should stop exactly at the cap, landed on " + Store.points());
check(granted === 1, "only the point that fits should be granted at the cap, got " + granted);
check(Store.addPoints("exam") === 0, "no points once capped");

WScript.Echo("Reward and points checks run: " + n);
WScript.Echo("Rewards on the ladder: " + REWARDS.length +
             "  (" + REWARDS[0].at + " -> " + REWARDS[REWARDS.length - 1].at + " points)");
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Reward ladder and points system behave correctly.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
