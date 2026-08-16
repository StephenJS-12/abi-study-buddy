var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Flags any question that reuses the numbers from its own topic's notes,
// which would let Abi read the answer straight out of the practise-mode panel.
if (!String.prototype.trim) {
    String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var base = REPO + "\\public\\js\\data\\";
var window = {};
var files = ["week1.js", "week2.js", "week3.js", "week4.js"];
for (var i = 0; i < files.length; i++) {
    var fh = fso.OpenTextFile(base + files[i], 1);
    var s = fh.AtEndOfStream ? "" : fh.ReadAll();
    fh.Close();
    (new Function("window", s))(window);
}

function plain(html) {
    if (!html) return "";
    var t = String(html).replace(/<[^>]*>/g, " ");
    t = t.replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, " ");
    // join South African thousands groups: "1 700 000" -> "1700000"
    var prev;
    do { prev = t; t = t.replace(/(\d)\s+(\d{3})(?!\d)/g, "$1$2"); } while (t !== prev);
    return t;
}

function numsIn(text) {
    var out = {}, m, re = /\d+(?:\.\d+)?/g;
    while ((m = re.exec(text)) !== null) {
        var v = parseFloat(m[0]);
        // ignore trivia that appears everywhere (indices, small counts, years)
        if (v <= 12) continue;
        if (v === 52 || v === 100) continue;   // deck size / percent base
        out[v] = true;
    }
    return out;
}

function keys(o) { var a = []; for (var k in o) if (o.hasOwnProperty(k)) a.push(k); return a; }

// Reviewed and deliberately accepted. 52 -> 51 -> 50 is the structure of every
// without-replacement card problem, not a copied worked example: the notes are
// SUPPOSED to teach that the deck shrinks. Suppressing this one specific step.
var ACCEPTED = { "w3mu4:step2:51": "deck-shrink constant, not a reused example" };

var flags = [], scanned = 0, suppressed = 0;
var weeks = window.WEEK_DATA;

for (var w = 0; w < weeks.length; w++) {
    var tps = weeks[w].topics || [];
    for (var t = 0; t < tps.length; t++) {
        var tp = tps[t];

        var notesText = "";
        for (var n = 0; n < (tp.notes || []).length; n++) notesText += " " + plain(tp.notes[n].html);
        var notesNums = numsIn(notesText);

        for (var qi = 0; qi < tp.questions.length; qi++) {
            var q = tp.questions[qi];
            scanned++;

            var qText = plain(q.scenario || "") + " " + plain(q.prompt || "");
            var qNums = numsIn(qText);
            var qk = keys(qNums);

            var shared = [];
            for (var a = 0; a < qk.length; a++) if (notesNums[qk[a]]) shared.push(qk[a]);

            // 1. whole question appears to be lifted from a notes example
            if (qk.length >= 2 && shared.length === qk.length) {
                flags.push("[REUSED SCENARIO] " + q.id + " (" + tp.id + "): every number in the question " +
                           "(" + qk.join(", ") + ") also appears in the notes");
            }

            // 2. the answer itself is readable from the notes
            if (typeof q.answer === "number" && notesNums[q.answer] && q.type !== "mcq") {
                flags.push("[ANSWER IN NOTES] " + q.id + " (" + tp.id + "): answer " + q.answer +
                           " appears in the topic notes");
            }
            for (var st = 0; st < (q.steps || []).length; st++) {
                var sa = q.steps[st].answer;
                if (typeof sa === "number" && notesNums[sa]) {
                    var key = q.id + ":step" + (st + 1) + ":" + sa;
                    if (ACCEPTED[key]) { suppressed++; continue; }
                    flags.push("[ANSWER IN NOTES] " + q.id + " step " + (st + 1) + " (" + tp.id +
                               "): answer " + sa + " appears in the topic notes");
                }
            }
        }
    }
}

WScript.Echo("Questions scanned against their own topic notes: " + scanned);
WScript.Echo("Reviewed and accepted (suppressed): " + suppressed);
WScript.Echo("");
if (!flags.length) {
    WScript.Echo("No question reuses its topic's notes values.");
} else {
    WScript.Echo(flags.length + " OVERLAP(S) TO FIX:");
    for (var f = 0; f < flags.length; f++) WScript.Echo("  - " + flags[f]);
}
WScript.Quit(flags.length);
