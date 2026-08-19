// Checks the per-module colour themes.
//
// Two things here can go wrong quietly. A theme can be missing a variable, so
// one part of the page keeps the old lilac and the rest turns green — which
// looks like a rendering bug rather than a missing line. And the little
// swatch she picks from can drift away from the theme it claims to show, so
// she chooses "Dark green" and gets something else.
//
// Both are checked by reading the generated CSS and the catalogue and
// comparing them to each other, so neither can move without the other.

var REPO = (function () {
    var f = new ActiveXObject("Scripting.FileSystemObject");
    return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName));
})();

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
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
function fail(m) { problems.push(m); }
function ok(c, m) { if (!c) fail(m); }

// ── the catalogue ────────────────────────────────────────────────
// themes.js is loaded for real, against a stubbed Store, so the list checked
// here is the list the app actually offers.

var savedThemes = {};
var Store = {
    get: function () { return { moduleThemes: savedThemes }; },
    setModuleTheme: function (m, t) { if (t) savedThemes[m] = t; else delete savedThemes[m]; }
};
var document = { body: { className: '' } };

eval(read(REPO + "\\public\\js\\themes.js"));

var LIST = Themes.all();
ok(LIST.length >= 10, "catalogue: expected a dozen or so colours, got " + LIST.length);
ok(LIST[0].id === '', "catalogue: the default must be first and carry an empty id");

var seenId = {}, seenName = {};
for (var i = 0; i < LIST.length; i++) {
    var t = LIST[i];
    if (seenId[t.id]) fail("catalogue: duplicate theme id '" + t.id + "'");
    if (seenName[t.name]) fail("catalogue: two colours are both called '" + t.name + "'");
    seenId[t.id] = 1;
    seenName[t.name] = 1;
    if (!/^#[0-9A-F]{6}$/.test(t.ink))    fail("catalogue: " + t.name + " has a bad ink swatch");
    if (!/^#[0-9A-F]{6}$/.test(t.tint))   fail("catalogue: " + t.name + " has a bad tint swatch");
    if (!/^#[0-9A-F]{6}$/.test(t.accent)) fail("catalogue: " + t.name + " has a bad accent swatch");
}

// ── the generated CSS ────────────────────────────────────────────

var css = read(REPO + "\\public\\css\\modthemes.css");
var themeCss = read(REPO + "\\public\\css\\theme.css");

/* Everything a theme has to redefine. Missing one leaves part of the page
   wearing the old colour. */
var REQUIRED = [
    '--lilac-50', '--lilac-100', '--lilac-200', '--lilac-400', '--lilac-600', '--lilac-700',
    '--pink-50', '--pink-100', '--pink-200', '--pink-400', '--pink-600',
    '--ink', '--ink-soft', '--muted', '--line', '--bg',
    '--shadow-rgb', '--wash-1', '--wash-2'
];

/* Every one of those must also exist as a default, or a theme would be
   overriding something nothing reads. */
for (i = 0; i < REQUIRED.length; i++) {
    if (themeCss.indexOf(REQUIRED[i] + ':') < 0) {
        fail("theme.css has no default for " + REQUIRED[i] + ", which modthemes.css overrides");
    }
}

function blockFor(id) {
    var start = css.indexOf('body.mtheme-' + id + ' {');
    if (start < 0) return null;
    var end = css.indexOf('}', start);
    return css.substring(start, end);
}

function varIn(block, name) {
    var m = block.match(new RegExp('\\' + name.replace('--', '--') + '\\s*:\\s*([^;]+);'));
    return m ? m[1].replace(/^\s+|\s+$/g, '') : null;
}

// ── colour maths, to check what the generator claimed ────────────

function parseHex(h) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(h)) return null;
    return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
}
function lin(c) {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function contrast(rgb) {
    var L = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
    return 1.05 / (L + 0.05);
}

/* Floors taken from the colours these replace, so no module can be harder to
   read than the lilac and pink the site ships with. A tenth of a point of
   slack absorbs rounding in the hex conversion. */
var FLOORS = { '--lilac-600': 3.85, '--lilac-700': 5.70, '--pink-600': 2.80 };

for (i = 1; i < LIST.length; i++) {         // 0 is the default, which has no block
    var th = LIST[i];
    var block = blockFor(th.id);

    if (!block) {
        fail("css: no body.mtheme-" + th.id + " block for '" + th.name + "'");
        continue;
    }

    for (var v = 0; v < REQUIRED.length; v++) {
        var val = varIn(block, REQUIRED[v]);
        if (val === null) {
            fail("css: " + th.name + " does not define " + REQUIRED[v]);
            continue;
        }
        if (REQUIRED[v] === '--shadow-rgb') {
            if (!/^\d{1,3},\d{1,3},\d{1,3}$/.test(val)) {
                fail("css: " + th.name + " has a bad --shadow-rgb (" + val + ")");
            }
            continue;
        }
        if (!/^#[0-9A-F]{6}$/.test(val)) {
            fail("css: " + th.name + " has a bad value for " + REQUIRED[v] + " (" + val + ")");
            continue;
        }
        if (FLOORS[REQUIRED[v]]) {
            var c = contrast(parseHex(val));
            if (c < FLOORS[REQUIRED[v]]) {
                fail("contrast: " + th.name + " " + REQUIRED[v] + " is " + val +
                     ", only " + (Math.round(c * 100) / 100) + ":1 against white — " +
                     "needs " + FLOORS[REQUIRED[v]] + " to read as well as the default");
            }
        }
    }

    /* The swatch she picks from must be made of the theme's own colours. If
       these drift she chooses one colour and the page turns another. */
    ok(varIn(block, '--lilac-600') === th.ink,
       "swatch: " + th.name + " shows " + th.ink + " but the theme's --lilac-600 is " +
       varIn(block, '--lilac-600'));
    ok(varIn(block, '--lilac-100') === th.tint,
       "swatch: " + th.name + " tint does not match the theme's --lilac-100");
    ok(varIn(block, '--pink-400') === th.accent,
       "swatch: " + th.name + " accent does not match the theme's --pink-400");
}

/* Nothing in the CSS may claim to be a theme the app does not offer. */
var declared = css.match(/body\.mtheme-[a-z0-9-]+/g) || [];
for (i = 0; i < declared.length; i++) {
    var id = declared[i].replace('body.mtheme-', '');
    if (!Themes.valid(id)) fail("css: modthemes.css defines '" + id + "', which is not in the catalogue");
}

// ── applying and remembering ─────────────────────────────────────

savedThemes = {};
ok(Themes.get('mabu') === '', "default: a module with no colour set should come back as the default");

Themes.set('mabu', 'forest');
ok(Themes.get('mabu') === 'forest', "set: the chosen colour was not remembered");
ok(Themes.get('inba') === '', "set: colouring one module changed another");

Themes.set('mabu', 'not-a-real-colour');
ok(Themes.get('mabu') === '', "set: an unknown colour should fall back to the default, not stick");

/* The class is swapped, never stacked. Switching module is the obvious place
   for two theme classes to end up on the body at once, and the second would
   silently win. */
savedThemes = { mabu: 'forest', inba: 'navy' };
document.body.className = 'reduce-motion at-home';

Themes.apply('mabu');
ok(document.body.className.indexOf('mtheme-forest') >= 0, "apply: the theme class was not added");
ok(document.body.className.indexOf('reduce-motion') >= 0, "apply: an unrelated body class was removed");

Themes.apply('inba');
ok(document.body.className.indexOf('mtheme-navy') >= 0, "apply: switching module did not apply the new theme");
ok(document.body.className.indexOf('mtheme-forest') < 0,
   "apply: two theme classes are on the body at once (" + document.body.className + ")");

Themes.apply('');
ok(document.body.className.indexOf('mtheme-') < 0,
   "apply: leaving a module did not clear its colour (" + document.body.className + ")");
ok(document.body.className.indexOf('at-home') >= 0, "apply: clearing the theme removed an unrelated class");

// ── report ───────────────────────────────────────────────────────

WScript.Echo("Module colours checked: " + (LIST.length - 1) + " themes x " +
             REQUIRED.length + " variables");
WScript.Echo("  every variable defined, contrast floors met, swatches match their");
WScript.Echo("  themes, and the body class is swapped rather than stacked.");
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var q = 0; q < problems.length; q++) WScript.Echo("  - " + problems[q]);
}
WScript.Quit(problems.length);
