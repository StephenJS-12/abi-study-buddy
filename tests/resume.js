var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// A test she did not finish must come back exactly as she left it.
//
// The risky part is not the storing, it is the bookkeeping either side of it.
// Results are kept without their question objects and re-paired by position on
// the way back in, which is only correct because a result is pushed the instant
// a question is finished and nothing else ever pushes one. If that ever stops
// being true the pairing goes silently wrong: she resumes to a review screen
// showing her answers against the wrong questions, and every one of them looks
// plausible.
//
// The other trap is the pause point. If she has answered but not pressed Next
// she is looking at a solution, and resuming into that view would mean
// rebuilding it. So the pause point moves on by one and her answer is kept —
// which must not run off the end of the paper when the question she answered
// was the last one.
//
// Both functions are closures inside their modules, so the real source is
// pulled out and run rather than reimplemented here.

if (!Array.prototype.forEach) { Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); }; }
if (!Array.prototype.map) { Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; }; }

function read(p) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(p); var s = st.ReadText(); st.Close(); return s;
}

var SEP = String.fromCharCode(92);
var JS = REPO + SEP + "public" + SEP + "js" + SEP;

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

// JScript is ES3 and has no JSON. Stringify is written out; parse is eval,
// which is safe here because the only thing it ever sees is what stringify
// just produced.
var JSON = {
    stringify: function (v) {
        if (v === null || v === undefined) return "null";
        var t = typeof v;
        if (t === "number" || t === "boolean") return String(v);
        if (t === "string") {
            return '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n") + '"';
        }
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

// ── a browser, near enough ──────────────────────────────────────
var store = {};
var localStorage = {
    getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; }
};

var Modules = {
    get: function (id) {
        if (id === "mabu") return { id: "mabu", code: "MABU01-5", accent: 1 };
        if (id === "inba") return { id: "inba", code: "INBA01-5", accent: 2 };
        return null;
    }
};

var Resume;
eval(read(JS + "resume.js"));

// ── a paused round to work with ─────────────────────────────────
function paused(over) {
    var s = {
        moduleId: "mabu",
        mode: "test",
        weekIds: ["week4"],
        topicIds: ["w4-compound"],
        origin: { name: "week", params: { weekIds: ["week4"], mode: "test" }, label: null },
        questions: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
        idx: 2,
        streak: 1,
        correct: 2,
        pointsWon: 2,
        results: [{ right: true, given: "12" }, { right: false, given: "9" }]
    };
    for (var k in over) if (over.hasOwnProperty(k)) s[k] = over[k];
    return s;
}

// ── it comes back the way it went in ────────────────────────────
store = {};
Resume.save(paused());
var back = Resume.load();
check(!!back, "a saved round loads again");
check(back && back.idx === 2, "the pause point survives");
check(back && back.questions.length === 4, "the whole paper is kept, not a list of ids");
check(back && back.results.length === 2, "answers already given survive");
check(back && back.results[1].given === "9", "the answer itself survives, not just whether it was right");
check(back && back.origin.name === "week", "where to return to survives");
check(back && back.at > 0, "the save is stamped with a time");

// ── and goes away when told ─────────────────────────────────────
Resume.clear();
check(Resume.load() === null, "clear really clears");
check(!Resume.has(), "has() agrees");

// ── anything doubtful is dropped rather than half-restored ──────
// A resume that half-works is worse than none: the round is cheap to start
// again, and a paper rebuilt from a snapshot it does not understand is not.

store = {}; Resume.save(paused()); store["abi.pausedTest"] = "{not json";
check(Resume.load() === null, "corrupt JSON is dropped");
check(!store.hasOwnProperty("abi.pausedTest"), "and the bad value is removed, not left to fail again");

store = {}; Resume.save(paused()); store["abi.pausedTest"] =
    store["abi.pausedTest"].replace('"v":1', '"v":99');
check(Resume.load() === null, "a snapshot from a future version is dropped");

store = {}; Resume.save(paused({ idx: 4 }));
check(Resume.load() === null, "a pause point past the end of the paper is dropped");

store = {}; Resume.save(paused({ questions: [] }));
check(Resume.load() === null, "a paper with no questions is dropped");

store = {}; Resume.save(paused({ moduleId: "gone" }));
check(Resume.load() === null, "a round in a module that no longer exists is dropped");

store = {}; Resume.save(paused());
var aged = JSON.parse(store["abi.pausedTest"]);
aged.at = new Date().getTime() - 15 * 24 * 60 * 60 * 1000;
store["abi.pausedTest"] = JSON.stringify(aged);
check(Resume.load() === null, "a round paused a fortnight ago is dropped");

aged.at = new Date().getTime() - 3 * 24 * 60 * 60 * 1000;
store["abi.pausedTest"] = JSON.stringify(aged);
check(Resume.load() !== null, "a round paused three days ago is still offered");

// ── scoping to one module ───────────────────────────────────────
store = {}; Resume.save(paused());
check(!!Resume.forModule("mabu"), "a module home screen sees its own paused round");
check(Resume.forModule("inba") === null,
      "and not another module's - resuming it would switch her subject without asking");

// ── the card says where she got to ──────────────────────────────
var card = Resume.bannerHtml(null);
check(card.indexOf("2 of 4") !== -1, "the card says how far in she is");
check(card.indexOf("MABU01-5") !== -1, "on the picker the card names the module");
check(Resume.bannerHtml("mabu").indexOf("MABU01-5") === -1,
      "inside a module it does not, since that is the page she is on");
check(Resume.bannerHtml("inba") === "",
      "and nothing is drawn where there is nothing paused");

store = {};
check(Resume.bannerHtml(null) === "", "no paused round means no card at all");

// ── quiz.js: building the snapshot ──────────────────────────────
// Pulled out of the module rather than reimplemented, so this tests the site's
// version and not a copy of it that could drift.
var quizSrc = read(JS + "quiz.js");
var from = quizSrc.indexOf("  function snapshot() {");
var to = quizSrc.indexOf("  function keep()");
check(from !== -1 && to > from, "found snapshot() in quiz.js");

var S = null;
var Content = { moduleId: function () { return "mabu"; } };
var snapshot;
eval(quizSrc.substring(from, to));

function live(over) {
    var s = {
        weekIds: ["week4"], topicIds: ["w4-compound"], mode: "test",
        origin: { name: "week", params: {}, label: null },
        questions: [{ id: "a" }, { id: "b" }, { id: "c" }],
        idx: 1, streak: 0, correct: 1, pointsWon: 1,
        answered: false, finished: false,
        results: [{ q: { id: "a" }, right: true, given: "1" }]
    };
    for (var k in over) if (over.hasOwnProperty(k)) s[k] = over[k];
    return s;
}

S = live();
var snap = snapshot();
check(snap.idx === 1, "mid-question, the pause point is the question she is on");
check(snap.results.length === 1, "answers given so far are carried");
check(typeof snap.results[0].q === "undefined",
      "results drop their question object - it is recovered by position, not stored twice");

// Answered but not yet moved on: she is reading a solution, so the pause point
// steps past it and the answer she just gave is kept.
S = live({ idx: 1, answered: true, results: [
    { q: { id: "a" }, right: true, given: "1" },
    { q: { id: "b" }, right: false, given: "2" }
] });
snap = snapshot();
check(snap.idx === 2, "answered but not advanced, the pause point moves on by one");
check(snap.results.length === 2, "and the answer she just gave is kept");
check(snap.results.length === snap.idx,
      "results and the pause point stay in step - this is what makes pairing by position safe");

// The last question, answered. There is nothing left to come back to.
S = live({ idx: 2, answered: true, results: [{}, {}, {}] });
check(snapshot() === null, "answering the last question leaves nothing to resume");

S = live({ finished: true });
check(snapshot() === null, "a round she has seen the results of is not offered back");

S = null;
check(snapshot() === null, "no round at all, nothing to save");

// ── quiz.js: putting it back ────────────────────────────────────
var rFrom = quizSrc.indexOf("  function resume(saved) {");
var rTo = quizSrc.indexOf("  function current() { return S.questions[S.idx]; }");
check(rFrom !== -1, "found resume() in quiz.js");

var used = null;
Content.use = function (id) { used = id; };
var Store = { rememberModule: function () {} };
function render() {}
var resume;
eval(quizSrc.substring(rFrom, quizSrc.indexOf("\n  }\n", rFrom) + 4));

S = null;
resume(paused());
check(S !== null && S.idx === 2, "resuming restores the pause point");
check(S.results.length === 2, "and the answers already given");
check(S.results[0].q === S.questions[0] && S.results[1].q === S.questions[1],
      "each answer is paired back with the question it was given for");
check(S.answered === false && S.stepState === null,
      "she lands at the start of the question, not partway into it");
check(used === null, "already in that module, so no switch");

Content.moduleId = function () { return "inba"; };
used = null;
resume(paused());
check(used === "mabu", "resuming a round from another module switches to it first");

WScript.Echo("Resume checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("A paused round survives, comes back paired correctly, and is dropped when doubtful.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var x = 0; x < fails.length; x++) WScript.Echo("  - " + fails[x]);
}
WScript.Quit(fails.length);
