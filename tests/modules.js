var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Modules must not tread on each other.
//
// Store keys badges and per-topic progress by topic id ALONE — there is no
// module in the key, because points and rewards are deliberately shared and
// splitting the key would have meant splitting those too. That works only for
// as long as topic ids are unique across every module.
//
// If a second module ever reuses an id like "w1-bodmas", its badge and its
// answer count would silently merge with the first module's. Nothing would
// error; her progress would just be quietly wrong. This is the guard.

// JScript is ES3; modules.js uses Array.filter the way every browser has for
// fifteen years.
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, t) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
            if (fn.call(t, this[i], i, this)) out.push(this[i]);
        }
        return out;
    };
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

var DATA = REPO + "\\public\\js\\data\\";
var JS = REPO + "\\public\\js\\";

// The data files attach to window; modules.js then adopts what they left.
var window = {};
var Store = { get: function () { return { lastModule: null }; } };

var dataFiles = ["week1.js", "week2.js", "week3.js", "week4.js",
                 "exam1.js", "exam2.js", "exam3.js", "exam4.js"];
for (var i = 0; i < dataFiles.length; i++) {
    eval(read(DATA + dataFiles[i]));
}

var Modules;
eval(read(JS + "modules.js"));

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

// ── the catalogue itself ───────────────────────────────────────
var all = Modules.all();
check(all.length >= 1, "there should be at least one module");

var seenModuleIds = {}, seenCodes = {};
for (var m = 0; m < all.length; m++) {
    var mod = all[m];
    check(!!mod.id && !!mod.code && !!mod.title,
          "every module needs an id, a code and a title (entry " + m + ")");
    check(!seenModuleIds[mod.id], "duplicate module id: " + mod.id);
    check(!seenCodes[mod.code], "duplicate module code: " + mod.code);
    seenModuleIds[mod.id] = true;
    seenCodes[mod.code] = true;

    check(mod.status === "ready" || mod.status === "soon",
          "module " + mod.id + " has an unknown status '" + mod.status + "'");
}

// ── THE guard: topic ids unique across every module ────────────
var owner = {};              // topicId -> module id that claimed it
var collisions = [];
var topicTotal = 0;

for (var a = 0; a < all.length; a++) {
    var content = Modules.contentFor(all[a].id);
    var buckets = [content.weeks || [], content.exams || []];

    for (var b = 0; b < buckets.length; b++) {
        for (var w = 0; w < buckets[b].length; w++) {
            var topics = buckets[b][w].topics || [];
            for (var t = 0; t < topics.length; t++) {
                var id = topics[t].id;
                topicTotal++;
                if (owner.hasOwnProperty(id)) {
                    collisions.push(id + " (in " + owner[id] + " and " + all[a].id + ")");
                } else {
                    owner[id] = all[a].id;
                }
            }
        }
    }
}

n++;
if (collisions.length) {
    fails.push(collisions.length + " topic id(s) used by more than one module — her badges " +
               "and progress would merge: " + collisions.join(", "));
}

// ── the original module's content was adopted, not lost ────────
var mabu = Modules.contentFor("mabu");
check(mabu.weeks.length === 4, "the original module should have 4 lesson weeks, has " + mabu.weeks.length);
check(mabu.exams.length === 4, "the original module should have 4 exam papers, has " + mabu.exams.length);
check(Modules.get("mabu") !== null, "the original module should be in the catalogue");
check(Modules.get("nonsense") === null, "an unknown module id should return null, not throw");

// ── ready() means ready: listed AND actually has content ───────
var ready = Modules.ready();
for (var r = 0; r < ready.length; r++) {
    check(Modules.contentFor(ready[r].id).weeks.length > 0,
          "module " + ready[r].id + " is offered as ready but has no weeks — she would " +
          "tap it and land on an empty screen");
    check(ready[r].status === "ready", "ready() returned a module marked '" + ready[r].status + "'");
}

// A module declared but not yet written must not be offered.
var soonOffered = 0;
for (var s = 0; s < all.length; s++) {
    if (all[s].status !== "soon") continue;
    for (var q = 0; q < ready.length; q++) {
        if (ready[q].id === all[s].id) soonOffered++;
    }
}
check(soonOffered === 0, "a module marked 'soon' must never appear as ready");

// ── contentFor is safe for a module with nothing yet ───────────
var empty = Modules.contentFor("not-written-yet");
check(!!empty && empty.weeks.length === 0 && empty.exams.length === 0,
      "asking for an unwritten module's content should give empty lists, not throw");

WScript.Echo("Module checks run: " + n);
WScript.Echo("Topics across all modules: " + topicTotal);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Modules are well formed and no two share a topic id.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
