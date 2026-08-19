var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Verifies that celebrations actually fire by default, and that the in-app
// toggle genuinely silences and restores them. This exists because Windows has
// animations disabled system-wide on this machine, which previously suppressed
// every celebration through prefers-reduced-motion.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; };
}

// storage.js stamps every save with a timestamp, which ES3 has no method for.
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () { return "2026-08-16T14:32:00.000Z"; };
}

// JScript is ES3 and has no JSON object; storage.js needs one.
var JSON = {
    stringify: function (v) {
        if (v === null) return "null";
        var t = typeof v;
        if (t === "number" || t === "boolean") return String(v);
        if (t === "string") return '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
        if (v instanceof Array) {
            var a = [];
            for (var i = 0; i < v.length; i++) a.push(JSON.stringify(v[i]));
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

// ---- minimal browser stubs -----------------------------------
var store = {};
var localStorage = {
    getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; }
};

var appended = [];
function fakeEl() {
    return {
        className: "", textContent: "",
        style: { setProperty: function () {} },
        appendChild: function (c) { appended.push(c); },
        remove: function () {}
    };
}
var fxLayer = fakeEl();
var document = {
    getElementById: function (id) { return id === "fxLayer" ? fxLayer : null; },
    createElement: function () { return fakeEl(); },
    body: { appendChild: function (c) { appended.push(c); } }
};
var window = { innerWidth: 1280, innerHeight: 800 };
function setTimeout() {}

var Store, Celebrate;
eval(read(JS + "storage.js"));
eval(read(JS + "celebrate.js"));

var fails = [];
function check(cond, msg) { if (!cond) fails.push(msg); }

// 1. default state
check(Store.motionOn() === true,
      "celebrations should default to ON, got " + Store.motionOn());

// 2. confetti actually produces elements by default
appended = [];
Celebrate.confetti(30);
check(appended.length === 30,
      "expected 30 confetti pieces by default, got " + appended.length);

// 3. sparkles too
appended = [];
Celebrate.sparkles(12, 100, 100);
check(appended.length === 12,
      "expected 12 sparkles by default, got " + appended.length);

// 4. a correct answer fires something
appended = [];
Celebrate.correct(1, null);
check(appended.length > 0,
      "a correct answer should produce celebration elements, got " + appended.length);

// 5. a big streak should be louder than a small one
appended = []; Celebrate.correct(1, null); var small = appended.length;
appended = []; Celebrate.correct(6, null); var big = appended.length;
check(big > small, "streak of 6 (" + big + ") should out-celebrate streak of 1 (" + small + ")");

// 6. turning it off silences everything
Store.setMotion(false);
check(Store.motionOn() === false, "motion should read OFF after setMotion(false)");
appended = [];
Celebrate.confetti(30);
Celebrate.sparkles(10, 50, 50);
Celebrate.correct(5, null);
check(appended.length === 0,
      "nothing should be produced while celebrations are off, got " + appended.length);

// 7. and turning it back on restores them
Store.setMotion(true);
appended = [];
Celebrate.confetti(20);
check(appended.length === 20,
      "expected 20 confetti pieces after re-enabling, got " + appended.length);

// 8. the preference survives a reload
var reloadedStore = store;
check(/"motion":true/.test(reloadedStore["sparkleStudy.v1"] || ""),
      "motion preference should be persisted to storage");

// 9-11. Pip is drawn twice - on her button and in the panel header - and an id
// may only exist once on a page. When both copies named their gradients
// "pipSkin", "pipFlesh" and "pipStone", every fill resolved to whichever came
// first in the document: the copy inside the panel, which is hidden until she is
// opened. Her skin, flesh and stone painted with nothing, so she sat in the
// corner as a leaf and a floating face and only gained colour once clicked.
// Checked in the source because it is a rendering fault with no rendering here.
var buddySrc = read(JS + "buddy.js");

// Scoped to the three gradients. The panel's own ids - pipPanel, pipInput and
// the rest - are fixed on purpose: that markup is built once.
check(!/(id="|url\(#)(pipSkin|pipFlesh|pipStone)\b/.test(buddySrc),
      "gradient ids in buddy.js must be built per copy, not written as fixed strings");

check(!/\bface\(\s*\)/.test(buddySrc),
      "every face() call must pass a tag, or two copies of Pip share gradient ids");

var tags = [], seenTag = {}, dupTag = false, m;
var tagRe = /face\('([^']*)'\)/g;
while ((m = tagRe.exec(buddySrc)) !== null) {
    if (!m[1] || seenTag[m[1]]) dupTag = true;
    seenTag[m[1]] = true;
    tags.push(m[1]);
}
check(tags.length >= 2 && !dupTag,
      "each copy of Pip needs its own non-empty tag (found: " + tags.join(", ") + ")");

// 12. and the pattern above has to actually catch the fault it was written for.
var BROKEN = '<linearGradient id="pipSkin"><path fill="url(#pipStone)"/>';
check(/(id="|url\(#)(pipSkin|pipFlesh|pipStone)\b/.test(BROKEN),
      "GUARD BROKEN: the gradient-id check no longer recognises the original fault");
check(!/(id="|url\(#)(pipSkin|pipFlesh|pipStone)\b/.test('<span id="pipPanel">'),
      "GUARD BROKEN: the gradient-id check is flagging the panel's own element ids");

// 13. The chat panel can be resized.
//
// The panel is pinned to the bottom-right corner it grows out of, so only the
// top and left edges can enlarge it — dragging the bottom-right outwards would
// push it off screen. Three grips, and the drag must subtract the pointer delta
// rather than add it. Getting that sign wrong is the failure that looks like
// nothing happening, or like the panel fleeing the cursor.
var buddyCss = read(REPO + "\\public\\css\\buddy.css");

['pip-grip-corner', 'pip-grip-top', 'pip-grip-left'].forEach(function (cls) {
    check(buddySrc.indexOf(cls) !== -1, "buddy.js renders the " + cls + " handle");
    check(buddyCss.indexOf('.' + cls) !== -1, "buddy.css positions the " + cls + " handle");
});

check(/w0\s*-\s*\(ev\.clientX\s*-\s*fromX\)/.test(buddySrc) &&
      /h0\s*-\s*\(ev\.clientY\s*-\s*fromY\)/.test(buddySrc),
      "a resize drag must subtract the delta - the panel grows up and to the left");

// Touch. Without touch-action the browser claims the gesture for scrolling and
// the panel never moves on her iPad, which is where she actually reads.
check(/\.pip-grip\s*\{[^}]*touch-action:\s*none/.test(buddyCss),
      "the grips must set touch-action: none, or a drag on the iPad scrolls instead");
check(buddySrc.indexOf('pointerdown') !== -1 && buddySrc.indexOf('setPointerCapture') !== -1,
      "resizing uses pointer events with capture, so it works for touch and mouse alike");

// A remembered size must never be able to collapse the panel or overflow the
// screen, whatever is in localStorage.
check(/MIN_W\s*=\s*\d+/.test(buddySrc) && /MIN_H\s*=\s*\d+/.test(buddySrc),
      "buddy.js clamps a restored size to a minimum");
check(/max-width:\s*calc\(100vw/.test(buddyCss) && /max-height:\s*calc\(100vh/.test(buddyCss),
      "buddy.css clamps the panel to the viewport, inline pixel sizes included");

// The size is device-local on purpose: Store syncs to her account, and a width
// dragged out on a laptop has no business turning up on her phone.
check(buddySrc.indexOf('localStorage') !== -1 && !/Store\.[A-Za-z]*[Pp]ipSize/.test(buddySrc),
      "the panel size is kept device-local rather than synced through Store");

WScript.Echo("Celebration and Pip checks run: 13");
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Celebrations fire by default and the toggle works.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var i = 0; i < fails.length; i++) WScript.Echo("  - " + fails[i]);
}
WScript.Quit(fails.length);
