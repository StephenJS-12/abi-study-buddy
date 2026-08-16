var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Loads the week data files and validates every topic/question structurally.
var fso = new ActiveXObject("Scripting.FileSystemObject");
var base = REPO + "\\public\\js\\data\\";
var files = ["week1.js", "week2.js", "week3.js", "week4.js"];

var window = {};                 // the data files attach to window.WEEK_DATA
var problems = [];
var topicIds = {}, questionIds = {};
var totals = { topics: 0, questions: 0, mcq: 0, numeric: 0, steps: 0, marks: 0 };

function read(p) {
    var f = fso.OpenTextFile(p, 1);
    var s = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
    return s;
}

for (var i = 0; i < files.length; i++) {
    var src = read(base + files[i]);
    try {
        var fn = new Function("window", src);
        fn(window);
    } catch (e) {
        problems.push("LOAD " + files[i] + " :: " + e.message);
    }
}

var weeks = window.WEEK_DATA || [];

for (var w = 0; w < weeks.length; w++) {
    var wk = weeks[w];
    var wtag = "week" + wk.number;

    if (!wk.id || !wk.title || !wk.emoji) problems.push(wtag + ": missing id/title/emoji");
    if (wk.comingSoon) continue;

    var topics = wk.topics || [];
    if (!topics.length) problems.push(wtag + ": no topics");

    for (var t = 0; t < topics.length; t++) {
        var tp = topics[t];
        var ttag = wtag + "/" + tp.id;
        totals.topics++;

        if (topicIds[tp.id]) problems.push("DUPLICATE topic id: " + tp.id);
        topicIds[tp.id] = 1;

        if (!tp.title)   problems.push(ttag + ": no title");
        if (!tp.emoji)   problems.push(ttag + ": no emoji");
        if (!tp.summary) problems.push(ttag + ": no summary");
        if (!tp.notes || !tp.notes.length) problems.push(ttag + ": no notes blocks");

        for (var n = 0; n < (tp.notes || []).length; n++) {
            var nb = tp.notes[n];
            if (!nb.heading) problems.push(ttag + ": note block " + n + " has no heading");
            if (!nb.html)    problems.push(ttag + ": note block " + n + " has no html");
        }

        var qs = tp.questions || [];
        if (qs.length < 5) problems.push(ttag + ": only " + qs.length + " questions (want 5+)");

        for (var q = 0; q < qs.length; q++) {
            var Q = qs[q];
            var qtag = ttag + "/" + (Q.id || ("#" + q));
            totals.questions++;

            if (!Q.id) problems.push(qtag + ": no id");
            if (questionIds[Q.id]) problems.push("DUPLICATE question id: " + Q.id);
            questionIds[Q.id] = 1;

            if (!Q.prompt) problems.push(qtag + ": no prompt");
            if (typeof Q.marks !== "number" || Q.marks < 1) problems.push(qtag + ": bad marks");
            else totals.marks += Q.marks;

            if (!Q.solution || !Q.solution.length) problems.push(qtag + ": no solution rows");
            else {
                var hasFinal = false;
                for (var s = 0; s < Q.solution.length; s++) {
                    var row = Q.solution[s];
                    if (!row.lab || !row.val) problems.push(qtag + ": solution row " + s + " missing lab/val");
                    if (row.final) hasFinal = true;
                }
                if (!hasFinal) problems.push(qtag + ": no row marked final");
            }
            if (!Q.why) problems.push(qtag + ": no 'why' explanation");

            if (Q.type === "mcq") {
                totals.mcq++;
                if (!Q.options || Q.options.length < 2) problems.push(qtag + ": mcq needs 2+ options");
                else if (typeof Q.answer !== "number" || Q.answer < 0 || Q.answer >= Q.options.length ||
                         Q.answer !== Math.floor(Q.answer)) {
                    problems.push(qtag + ": mcq answer index out of range (" + Q.answer + ")");
                }
                var seen = {};
                for (var o = 0; o < (Q.options || []).length; o++) {
                    if (seen[Q.options[o]]) problems.push(qtag + ": duplicate option text");
                    seen[Q.options[o]] = 1;
                }
            } else if (Q.type === "numeric") {
                totals.numeric++;
                if (typeof Q.answer !== "number" || isNaN(Q.answer)) problems.push(qtag + ": numeric answer not a number");
                if (typeof Q.tol !== "number" || Q.tol <= 0) problems.push(qtag + ": missing/invalid tolerance");
            } else if (Q.type === "steps") {
                totals.steps++;
                if (!Q.steps || Q.steps.length < 2) problems.push(qtag + ": steps needs 2+ steps");
                for (var st = 0; st < (Q.steps || []).length; st++) {
                    var S = Q.steps[st];
                    if (!S.q) problems.push(qtag + ": step " + st + " has no question");
                    if (typeof S.answer !== "number" || isNaN(S.answer)) problems.push(qtag + ": step " + st + " answer not a number");
                    if (typeof S.tol !== "number" || S.tol <= 0) problems.push(qtag + ": step " + st + " bad tolerance");
                    if (!S.explain) problems.push(qtag + ": step " + st + " has no explanation");
                }
            } else {
                problems.push(qtag + ": unknown type '" + Q.type + "'");
            }
        }
    }
}

WScript.Echo("Topics:    " + totals.topics);
WScript.Echo("Questions: " + totals.questions +
             "  (mcq " + totals.mcq + ", numeric " + totals.numeric + ", steps " + totals.steps + ")");
WScript.Echo("Total marks available: " + totals.marks);
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No structural problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var p = 0; p < problems.length; p++) WScript.Echo("  - " + problems[p]);
}
WScript.Quit(problems.length);
