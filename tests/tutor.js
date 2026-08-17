var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// The answer must never reach the tutor.
//
// During a test or exam the page is holding the question, its answer and its
// worked solution in one object, and hands a slice of that to the helper. If a
// future change ever widened that slice, the tutor could be asked for the
// answer and would simply have it. Nothing on the server could prevent that —
// it cannot un-know something it was told.
//
// So the payload is built by naming each field, and this pins that down.

// JScript is ES3 and has no JSON object.
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
    }
};

var fso = new ActiveXObject("Scripting.FileSystemObject");
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

// tutor.js reaches for browser globals as it loads; only `payload` is under
// test and it touches none of them.
var location = { protocol: "https:", pathname: "/" };
var window = { addEventListener: function () {} };
var document = { addEventListener: function () {}, createElement: function () { return {}; } };
function fetch() {}
function TextDecoder() {}

var Tutor;
eval(read(REPO + "\\public\\js\\tutor.js"));

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

/* Everything a quiz question object actually carries. The secrets here are the
   ones the site must never hand over while she is still answering. */
var SECRET_ANSWER = "R27418.55";
var SECRET_WORKING = "FV = 21000(1.09)^3 = R27418.55";

var context = {
  id: "w4-compound",
  title: "Compound interest",
  mode: "test",
  questionText: "Ayanda invests R21 000 at 9% compounded annually for 3 years.",
  notes: "",

  // The fields a careless caller might pass straight through:
  answer: SECRET_ANSWER,
  solution: SECRET_WORKING,
  steps: [{ label: "Year 1", value: SECRET_ANSWER }],
  marks: 4,
  options: ["R27418.55", "R26670.00", "R25690.00"]
};

var sent = Tutor.payload(context, "Where do I start?", []);
var wire = JSON.stringify(sent);

// ── the answer must not be on the wire, by any route ───────────
check(wire.indexOf(SECRET_ANSWER) === -1,
      "the answer must not appear anywhere in the request body");
check(wire.indexOf(SECRET_WORKING) === -1,
      "the worked solution must not appear anywhere in the request body");
check(wire.indexOf("26670") === -1,
      "multiple-choice options must not be sent — they contain the answer");

check(typeof sent.answer === "undefined", "no answer field");
check(typeof sent.solution === "undefined", "no solution field");
check(typeof sent.steps === "undefined", "no steps field");
check(typeof sent.options === "undefined", "no options field");

// ── and the fields that SHOULD travel still do ─────────────────
check(sent.questionText === context.questionText, "the wording of the question is sent");
check(sent.mode === "test", "the mode is sent, since it decides what may be said");
check(sent.topicId === "w4-compound", "the topic id is sent");
check(sent.question === "Where do I start?", "her own question is sent");

// ── the payload shape is exactly what is expected, no more ─────
var allowed = {
  moduleId: 1,
  topicId: 1, topicTitle: 1, mode: 1, notes: 1,
  questionText: 1, question: 1, history: 1
};
for (var key in sent) {
  if (!sent.hasOwnProperty(key)) continue;
  n++;
  if (!allowed[key]) {
    fails.push("unexpected field '" + key + "' on the wire — was it meant to be sent?");
  }
}

// ── notes belong in practise, never in a test ──────────────────
// Enforced by the caller in quiz.js, but assert the payload carries whatever
// it is handed so the caller's decision is the only one that matters.
var withNotes = Tutor.payload(
  { id: "x", title: "X", mode: "practise", notes: "the standard deviation divides by n-1" },
  "why?", []
);
check(withNotes.notes.indexOf("n-1") !== -1, "notes are passed through when supplied");

var testMode = Tutor.payload({ id: "x", title: "X", mode: "test" }, "why?", []);
check(testMode.notes === "", "no notes supplied means none are invented");

// ── history is carried, so a conversation makes sense ──────────
var withHistory = Tutor.payload(
  { id: "x", title: "X", mode: "notes" },
  "and then?",
  [{ role: "user", content: "what is a mean" }, { role: "assistant", content: "an average" }]
);
check(withHistory.history.length === 2, "prior turns are carried");

WScript.Echo("Tutor payload checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("The answer never reaches the tutor, and only the intended fields travel.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
