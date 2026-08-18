var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Checks the shuffle in quiz.js keeps every question's correct answer correct.
//
// Options are reordered on every sitting so the right answer is never twice in
// the same place. For a single choice that means moving one index. For a
// multiple select it means moving a whole set of them, and for a matching
// question it means the rows move while the pairings must not. Get any of that
// wrong and the failure is silent and intermittent: she answers correctly and
// is marked down, but only on the sittings where the shuffle happened to move
// the thing she picked.
//
// The function is a closure inside the Quiz module, so rather than reimplement
// it here - which would test this file's copy and not the site's - the real
// source is pulled out of quiz.js and run.

if (!Array.prototype.forEach) { Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); }; }
if (!Array.prototype.map) { Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; }; }
if (!Array.prototype.indexOf) { Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; }; }

function read(p) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(p); var s = st.ReadText(); st.Close(); return s;
}

var SEP = String.fromCharCode(92);
var src = read(REPO + SEP + "public" + SEP + "js" + SEP + "quiz.js");
var fails = [];
function check(cond, msg) { if (!cond) fails.push(msg); }

// Lift one named function out of the module source by matching its braces.
function lift(name) {
    var head = "function " + name + "(";
    var at = src.indexOf(head);
    if (at < 0) return null;
    var open = src.indexOf("{", at), depth = 0, i = open;
    for (; i < src.length; i++) {
        if (src.charAt(i) === "{") depth++;
        else if (src.charAt(i) === "}") { depth--; if (!depth) break; }
    }
    return src.substring(at, i + 1);
}

var shuffleOptionsSrc = lift("shuffleOptions");
check(!!shuffleOptionsSrc, "could not find shuffleOptions in quiz.js");
if (!shuffleOptionsSrc) { report(); }

// A stand-in for the real shuffle, so each permutation can be forced.
var MODE = "reverse";
function shuffle(arr) {
    var a = [];
    for (var i = 0; i < arr.length; i++) a.push(arr[i]);
    if (MODE === "reverse") a.reverse();
    else if (MODE === "rotate") a.push(a.shift());
    else if (MODE === "swapends" && a.length > 1) { var t = a[0]; a[0] = a[a.length - 1]; a[a.length - 1] = t; }
    return a;
}

eval(shuffleOptionsSrc);

var MODES = ["identity", "reverse", "rotate", "swapends"];
var runs = 0;

for (var m = 0; m < MODES.length; m++) {
    MODE = MODES[m];

    // -- single choice: the correct text must survive the move ----------
    var mcq = { type: "mcq", options: ["alpha", "beta", "gamma", "delta"], answer: 2 };
    shuffleOptions(mcq); runs++;
    check(mcq.options[mcq.answer] === "gamma",
          MODE + ": mcq answer index no longer points at the correct option");
    check(mcq.options.length === 4, MODE + ": mcq lost or gained an option");

    // -- multiple select: the whole correct SET must survive ------------
    var multi = { type: "multi", options: ["one", "two", "three", "four", "five"], answers: [1, 3] };
    shuffleOptions(multi); runs++;
    var got = multi.answers.map(function (i) { return multi.options[i]; }).sort().join(",");
    check(got === "four,two", MODE + ": multi answers point at the wrong options (" + got + ")");
    check(multi.options.length === 5, MODE + ": multi lost or gained an option");

    // The marking compares two sorted lists element by element, so unsorted
    // answers would fail against a correctly sorted selection.
    var sorted = true;
    for (var k = 1; k < multi.answers.length; k++) if (multi.answers[k] <= multi.answers[k - 1]) sorted = false;
    check(sorted, MODE + ": multi answers came back unsorted");

    // -- matching: rows may move, pairings may not ---------------------
    var match = { type: "match", pairs: [
        { left: "Planning", right: "Deciding what to do" },
        { left: "Organising", right: "Arranging the resources" },
        { left: "Leading", right: "Getting people to do it" },
        { left: "Control", right: "Checking it was done" }
    ] };
    shuffleOptions(match); runs++;
    check(match.pairs.length === 4, MODE + ": match lost or gained a pair");
    var linked = [];
    for (var p = 0; p < match.pairs.length; p++) linked.push(match.pairs[p].left + ">" + match.pairs[p].right);
    linked.sort();
    check(linked.join("|") === [
        "Control>Checking it was done",
        "Leading>Getting people to do it",
        "Organising>Arranging the resources",
        "Planning>Deciding what to do"
    ].join("|"), MODE + ": match pairings were broken by the shuffle");
}

// The guard has to be able to fail. If shuffleOptions silently ignored the new
// types, the multi check above would still pass under "identity" - so prove a
// wrong remap is actually caught.
(function selfCheck() {
    var broken = { type: "multi", options: ["one", "two", "three", "four", "five"], answers: [1, 3] };
    // Rotate, not reverse: reversing five items maps index 1 to 3 and 3 to 1, so the
    // set {1,3} survives untouched and the guard could never fail.
    MODE = "rotate";
    broken.options = shuffle(broken.options);      // options moved, answers left alone
    var wrong = broken.answers.map(function (i) { return broken.options[i]; }).sort().join(",");
    check(wrong !== "four,two",
          "GUARD BROKEN: leaving the answers unmapped still looks correct");
})();

function report() {
    WScript.Echo("");
    WScript.Echo("Shuffle checks run: " + runs + " across " + MODES.length + " orderings");
    if (fails.length) {
        WScript.Echo("");
        WScript.Echo(fails.length + " FAILURE(S):");
        for (var i = 0; i < fails.length; i++) WScript.Echo("  - " + fails[i]);
        WScript.Quit(1);
    }
    WScript.Echo("");
    WScript.Echo("Every question type keeps its correct answer through a shuffle.");
    WScript.Quit(0);
}
report();
