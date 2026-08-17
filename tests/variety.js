// Guards against the thing Abi actually noticed: two questions in the same round
// that are the same sum wearing different words.
//
//   "In a deck of cards, 2 queens are pulled, what's the probability"
//   ... three questions later ...
//   "In a deck of cards, 2 jacks are pulled, what's the probability"
//
// Both were 4/52 x 3/51. The generator randomised the rank and nothing else, and
// the de-duplication in make() compared the rendered sentence, which of course
// differed. So this check ignores wording entirely: a question is reduced to the
// numbers it contains plus the answer it wants, and two questions in one round
// may not reduce to the same thing.

if (!Array.prototype.forEach) { Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); }; }
if (!Array.prototype.map) { Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; }; }
if (!Array.prototype.filter) { Array.prototype.filter = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) if (fn.call(t, this[i], i, this)) o.push(this[i]); return o; }; }
if (!Array.prototype.indexOf) { Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; }; }
if (!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); }; }

var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
var JS = REPO + "\\public\\js\\";

function read(p) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(p); var s = st.ReadText(); st.Close(); return s;
}

var Rand, GEN;
eval(read(JS + "rng.js"));
eval(read(JS + "generators.js"));
eval(read(JS + "examgen.js"));
eval(read(JS + "examgen2.js"));
eval(read(JS + "examgen3.js"));
eval(read(JS + "examgen4.js"));

var problems = [];

function strip(s) { return String(s == null ? "" : s).replace(/<[^>]*>/g, " "); }

// A question boiled down to its maths: every number it mentions, plus what it
// wants back. Deliberately blind to wording, because wording is exactly what was
// hiding the duplicates.
function mathsOf(q) {
    var text = strip(q.prompt) + " " + strip(q.scenario || "");
    var nums = text.match(/\d+(?:[.,]\d+)?/g) || [];
    var tidy = [];
    for (var i = 0; i < nums.length; i++) tidy.push(nums[i].replace(",", ""));
    tidy.sort();

    // A multi-step question keeps its answers on the steps; q.answer is undefined.
    // Reading it anyway collapsed every stepped question in a topic onto the single
    // signature "undefined", which then reported them all as duplicates of each other.
    var want;
    if (q.type === "mcq") {
        want = strip((q.options || [])[q.answer]);
    } else if (q.type === "steps") {
        want = "";
        for (var s = 0; s < (q.steps || []).length; s++) want += "~" + q.steps[s].answer;
    } else {
        want = String(q.answer);
    }
    want = want.replace(/\s+/g, "");

    // With no numbers in it, the question is about the ideas rather than a sum, and
    // the wording is the only thing distinguishing one from another.
    if (!tidy.length) {
        return "txt:" + text.replace(/\s+/g, " ").trim().toLowerCase() + " => " + want;
    }
    return tidy.join("|") + " => " + want;
}

// -- no round may contain the same sum twice ------------------------------
// 8 is above what one topic contributes to a real round, so passing here means
// passing in practice too.
var ROUND = 8, ROUNDS = 300, roundsChecked = 0;
var reg = GEN.registered();

for (var topicId in reg) {
    if (!reg.hasOwnProperty(topicId)) continue;

    var worst = null;
    for (var r = 0; r < ROUNDS; r++) {
        var batch = GEN.make(topicId, ROUND);
        if (batch.length < 2) continue;
        roundsChecked++;

        var seen = {};
        for (var b = 0; b < batch.length; b++) {
            var key = mathsOf(batch[b]);
            if (seen[key] && !worst) {
                worst = { a: seen[key], b: strip(batch[b].prompt), key: key };
            }
            seen[key] = strip(batch[b].prompt);
        }
    }
    if (worst) {
        problems.push(topicId + ": one round contains the same sum twice\n" +
                      "        A: " + worst.a.replace(/\s+/g, " ").substring(0, 100) + "\n" +
                      "        B: " + worst.b.replace(/\s+/g, " ").substring(0, 100));
    }
}

// -- every topic must hold enough genuinely different problems ------------
// w4-calc once had four in total: it asked which value goes in P/YR, and the only
// thing that changed was the compounding word. A whole revision session on that
// topic was four questions on a loop.
var FLOOR = 60;
var thin = [];

for (topicId in reg) {
    if (!reg.hasOwnProperty(topicId)) continue;
    var distinct = {}, count = 0;
    for (r = 0; r < 400; r++) {
        var made = GEN.make(topicId, 6);
        for (b = 0; b < made.length; b++) {
            var sig = mathsOf(made[b]);
            if (!distinct[sig]) { distinct[sig] = true; count++; }
        }
    }
    if (count < FLOOR) thin.push({ id: topicId, n: count });
}

thin.sort(function (a, b) { return a.n - b.n; });
for (var t = 0; t < thin.length; t++) {
    problems.push(thin[t].id + ": only " + thin[t].n + " genuinely different questions exist " +
                  "(floor is " + FLOOR + ") - revising this topic would repeat itself");
}

// -- the guard has to be able to fire ------------------------------------
// A signature that never collides would make this file pass for ever without
// checking anything, which is how the old prompt-based de-duplication behaved.
(function selfCheck() {
    var queens = { type: "mcq", prompt: "two cards drawn from 52, both queens?", options: ["1/221"], answer: 0 };
    var jacks = { type: "mcq", prompt: "two cards drawn from 52, both jacks?", options: ["1/221"], answer: 0 };
    var hearts = { type: "mcq", prompt: "two cards drawn from 52, both hearts?", options: ["1/17"], answer: 0 };
    if (mathsOf(queens) !== mathsOf(jacks)) {
        problems.push("GUARD BROKEN: the queens/jacks pair is not recognised as the same sum");
    }
    if (mathsOf(queens) === mathsOf(hearts)) {
        problems.push("GUARD BROKEN: two genuinely different answers are treated as the same sum");
    }
    // Stepped questions must be told apart by their step answers, or they all
    // reduce to the same thing and the whole topic reads as one repeated question.
    var decayA = { type: "steps", prompt: "charge remaining", scenario: "100% at 6% for 5 months",
                   steps: [{ answer: 0.94 }, { answer: 5 }, { answer: 73.39 }] };
    var decayB = { type: "steps", prompt: "charge remaining", scenario: "100% at 5% for 6 months",
                   steps: [{ answer: 0.95 }, { answer: 6 }, { answer: 73.51 }] };
    if (mathsOf(decayA) === mathsOf(decayB)) {
        problems.push("GUARD BROKEN: two different stepped questions look identical");
    }
})();

WScript.Echo("");
WScript.Echo("Rounds checked for repeated sums: " + roundsChecked);
if (problems.length) {
    WScript.Echo("");
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var p = 0; p < problems.length && p < 20; p++) WScript.Echo("  - " + problems[p]);
    WScript.Quit(1);
}
WScript.Echo("");
WScript.Echo("No round repeats a sum, and every topic holds at least " + FLOOR + " different questions.");
WScript.Quit(0);
