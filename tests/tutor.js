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

// ── what Pip has been told about the site ──────────────────────
//
// Pip's knowledge of the modules lives in src/tutor.js as prose, deliberately
// server-side so the page cannot talk her into describing a module it is not
// showing. The cost of that is drift: the business module was written, six
// weeks of it, while her prompt still said Stephen had not built it yet — so
// she told Abi she knew nothing about business, which is exactly what she had
// been told to say.
//
// These checks compare the prose against the data files. They cannot verify the
// wording is good, only that it has not gone stale in the ways it actually went
// stale: a module missing, a week count behind, a threshold changed.

var worker = read(REPO + "\\src\\tutor.js");
var catalogue = read(REPO + "\\public\\js\\modules.js");

function guideFor(id) {
    // Each guide is a template literal opening `id: \`` and closing at the
    // backtick before the next comma-newline. Crude, and fine: the shape is
    // right there in the same repo and a change to it fails loudly here.
    var at = worker.indexOf("\n  " + id + ": `");
    if (at === -1) return "";
    var from = worker.indexOf("`", at) + 1;
    var to = worker.indexOf("`", from);
    return to === -1 ? "" : worker.substring(from, to);
}

// Every module on the home screen must be one Pip can talk about.
var ids = [], m, idRe = /id: '([a-z]+)',\s*\n\s*code:/g;
while ((m = idRe.exec(catalogue)) !== null) ids.push(m[1]);
check(ids.length >= 2, "found the module catalogue (" + ids.length + " modules)");

for (var g = 0; g < ids.length; g++) {
    check(guideFor(ids[g]).length > 0,
          "src/tutor.js has a MODULE_GUIDES entry for '" + ids[g] + "'");
}

// The week count in the prose must match the week files on disk. Counted from
// the numbered list Pip is given, so adding week 6 without telling her fails.
function weekFilesFor(id) {
    var dir = REPO + "\\public\\js\\data" + (id === "mabu" ? "" : "\\" + id);
    var folder = fso.GetFolder(dir), count = 0;
    for (var e = new Enumerator(folder.Files); !e.atEnd(); e.moveNext()) {
        if (/^week\d+\.js$/i.test(e.item().Name)) count++;
    }
    return count;
}

for (var w2 = 0; w2 < ids.length; w2++) {
    var id = ids[w2], guide = guideFor(id), have = weekFilesFor(id);
    var listed = 0;
    while (guide.indexOf("\n" + (listed + 1) + ". ") !== -1) listed++;
    check(listed === have,
          id + ": Pip is told about " + listed + " weeks, but " + have +
          " week files exist — update MODULE_GUIDES in src/tutor.js");
}

// The badge threshold is quoted to her in prose and lives in storage.js.
var badgeAt = /BADGE_AT\s*=\s*(\d+)/.exec(read(REPO + "\\public\\js\\storage.js"));
check(!!badgeAt, "found BADGE_AT in storage.js");
if (badgeAt) {
    check(worker.indexOf("at " + badgeAt[1] + " correct answers") !== -1,
          "Pip is told badges unlock at " + badgeAt[1] +
          " correct answers, matching storage.js");
}

// The bug itself: naming one module in the rules that apply everywhere is what
// made her deny knowing the other one.
var baseFrom = worker.indexOf("const BASE_RULES");
var baseTo = worker.indexOf("const MODE_RULES");
var base = worker.substring(baseFrom, baseTo);
check(base.indexOf("MABU") === -1 && base.indexOf("INBA") === -1,
      "BASE_RULES names no single module — which module she is in comes from MODULE_GUIDES");

WScript.Echo("Tutor payload checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("The answer never reaches the tutor, and only the intended fields travel.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
