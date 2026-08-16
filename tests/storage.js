var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Does the app notice when the browser refuses to save?
//
// This is the failure that cost a transfer: everything is held in memory, so a
// refused write looks completely healthy right up until the window is closed and
// the evening's points are gone. The app must detect it and say so at the time.

if (!Object.keys) {
    Object.keys = function (o) { var a = []; for (var k in o) if (o.hasOwnProperty(k)) a.push(k); return a; };
}
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () { return "2026-08-16T14:32:00.000Z"; };
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
var SRC = (function () {
    var p = REPO + "\\public\\js\\storage.js";
    var f = fso.OpenTextFile(p, 1);
    var s = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
    return s;
})();

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

/* Each scenario gets its own freshly evaluated copy of the module, because the
   health state is decided once at load time - exactly as it is in the browser. */
function withStorage(impl, body) {
    var localStorage = impl;
    var Store;
    eval(SRC);
    body(Store);
}

// ── a browser that works normally ──────────────────────────────
function workingStore(seed) {
    var store = seed || {};
    return {
        getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
        setItem: function (k, v) { store[k] = String(v); },
        removeItem: function (k) { delete store[k]; },
        _raw: store
    };
}

var live = workingStore();
withStorage(live, function (Store) {
    check(Store.health().ok, "a normal browser should report saving as working");
    check(Store.health().everSaved === false, "a brand new laptop should report nothing saved yet");
    Store.addPoints("test");
    check(Store.health().ok, "saving should still be reported as working after a write");
});

// reopening on that same browser must find the previous session
withStorage(workingStore(live._raw), function (Store) {
    check(Store.points() === 1, "the previous session's point should be found on reopening");
    check(Store.health().everSaved === true,
          "reopening should report that a previous save was found - this is the line that " +
          "tells her progress is surviving");
    check(!!Store.health().lastSaved, "a timestamp for the previous save should be reported");
});

// ── a browser that refuses to store anything ───────────────────
// This is what "it forgets everything when I close it" actually looks like.
var refusing = {
    getItem: function () { return null; },
    setItem: function () { var e = new Error("access denied"); e.name = "SecurityError"; throw e; },
    removeItem: function () {}
};

withStorage(refusing, function (Store) {
    check(!Store.health().ok, "a browser that refuses writes must be reported as NOT saving");
    check(Store.health().why === "SecurityError",
          "the reason should be passed through, got " + Store.health().why);

    // the app must stay usable - she can still work, she just gets warned
    var granted = Store.addPoints("test");
    check(granted === 1, "points should still be awarded in memory so the session is usable");
    check(Store.points() === 1, "the running total should still work with storage refused");
    check(!Store.health().ok, "saving must still be reported as broken after a failed write");

    Store.recordAnswer("w1-bodmas", true);
    check(Store.topicCorrect("w1-bodmas") === 1, "answers should still record in memory");
});

// ── a browser that accepts writes and quietly drops them ───────
// Rarer, but it is the same disaster and a plain try/catch would never see it.
var pretending = {
    getItem: function () { return null; },
    setItem: function () { /* accepted, stored nowhere */ },
    removeItem: function () {}
};

withStorage(pretending, function (Store) {
    check(!Store.health().ok,
          "a browser that accepts writes but stores nothing must also be reported as NOT saving");
    check(Store.health().why === "silent", "the silent-drop case should be named as such");
});

// ── a restore onto a broken browser must not claim success ─────
withStorage(refusing, function (Store) {
    check(Store.restore({ points: 120, totalCorrect: 60, totalAnswered: 60 }) === true,
          "a restore should still apply in memory");
    check(Store.points() === 120, "restored points should show");
    check(!Store.health().ok,
          "but health must still say nothing is being saved, so the app can warn her " +
          "instead of letting her close the window and lose it");
});

// ── the timestamp must only count SUCCESSFUL saves ─────────────
var oneShot = (function () {
    var store = {}, allow = true;
    return {
        getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
        setItem: function (k, v) {
            if (!allow && k.indexOf("probe") < 0) throw new Error("nope");
            store[k] = String(v);
        },
        removeItem: function (k) { delete store[k]; },
        stop: function () { allow = false; },
        _raw: store
    };
})();

withStorage(oneShot, function (Store) {
    Store.addPoints("test");
    oneShot.stop();
    Store.addPoints("test");
    check(!Store.health().ok, "health must flip to broken as soon as a save is refused");
});

WScript.Echo("Storage health checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("A browser that will not save is detected and reported, not swallowed.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
