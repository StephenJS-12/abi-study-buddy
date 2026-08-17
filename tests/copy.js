var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// The things the site says to her.
//
// Two things can go wrong here and neither would show up in a code review.
// A pool trimmed down to one entry would send the never-repeat loop spinning
// forever — the page would simply hang on load. And an empty pool would greet
// her with a blank space where a hello should be.

var fso = new ActiveXObject("Scripting.FileSystemObject");
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

var Copy;
eval(read(REPO + "\\public\\js\\copy.js"));

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

// ── every pool must be usable ──────────────────────────────────
var pools = Copy.pools();
var poolNames = [];
for (var name in pools) { if (pools.hasOwnProperty(name)) poolNames.push(name); }

check(poolNames.length > 0, "there should be some pools");

for (var i = 0; i < poolNames.length; i++) {
    var key = poolNames[i], list = pools[key];

    check(list.length >= 2,
          "pool '" + key + "' has " + list.length + " entr" + (list.length === 1 ? "y" : "ies") +
          " — fewer than two makes the never-repeat loop spin forever and hangs the page");

    var blank = 0, seen = {}, dupes = 0;
    for (var j = 0; j < list.length; j++) {
        if (typeof list[j] !== "string" || !list[j].length) blank++;
        if (seen[list[j]]) dupes++;
        seen[list[j]] = true;
    }
    check(blank === 0, "pool '" + key + "' has " + blank + " empty entr(y/ies)");
    check(dupes === 0, "pool '" + key + "' repeats itself " + dupes + " time(s)");
}

// ── a greeting for every hour of the day ───────────────────────
// She revises late; an hour that fell between the buckets would greet her with
// "undefined".
var missing = [];
for (var h = 0; h < 24; h++) {
    // Stand in for the clock so every hour can be checked, not just this one.
    var fixed = h;
    Date.prototype.getHours = (function (v) { return function () { return v; }; })(fixed);
    var line = Copy.greeting();
    if (typeof line !== "string" || !line.length) missing.push(h);
}
n++;
if (missing.length) fails.push("no greeting for hour(s): " + missing.join(", "));

// ── it must not repeat itself back to back ─────────────────────
Date.prototype.getHours = function () { return 19; };
var previous = null, repeats = 0;
for (var k = 0; k < 200; k++) {
    var next = Copy.greeting();
    if (next === previous) repeats++;
    previous = next;
}
check(repeats === 0, "the same greeting came up twice running " + repeats + " time(s)");

// and it must actually vary, rather than alternating between two
Date.prototype.getHours = function () { return 19; };
var distinct = {}, count = 0;
for (var q = 0; q < 200; q++) {
    var g = Copy.greeting();
    if (!distinct[g]) { distinct[g] = true; count++; }
}
check(count >= 3, "only " + count + " distinct evening greetings appeared in 200 draws");

WScript.Echo("Copy checks run: " + n);
WScript.Echo("Pools: " + poolNames.join(", "));
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Every pool is usable, every hour has a greeting, and it does not repeat.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
