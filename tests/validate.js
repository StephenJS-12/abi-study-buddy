var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Loads the week data files and validates every topic/question structurally.
var fso = new ActiveXObject("Scripting.FileSystemObject");
var base = REPO + "\\public\\js\\data\\";
// Maths registers into window.WEEK_DATA; business registers into
// window.MODULE_CONTENT.inba.weeks. Both are validated by exactly the same
// rules below - a business question with a broken answer index should fail as
// loudly as a maths one.
var files = ["week1.js", "week2.js", "week3.js", "week4.js",
             "inba\\week1.js", "inba\\week2.js", "inba\\week3.js", "inba\\week4.js",
             "inba\\week5.js", "inba\\week6.js",
             // Derived from the example papers. Must load after the weeks: it
             // merges its questions into the pools they register, so the loop
             // below validates them exactly like any other question.
             "inba\\lessons.js", "inba\\paper-assign1.js", "inba\\paper-assign2.js",
             "inba\\paper-assign3.js", "inba\\paper-assign4.js",
             "inba\\paper-mock2.js", "inba\\paper-mock3.js"];

var window = {};                 // the data files attach to window.WEEK_DATA
var problems = [];
var topicIds = {}, questionIds = {};
var totals = { lessons: 0, topics: 0, questions: 0, mcq: 0, numeric: 0, steps: 0, multi: 0, match: 0, marks: 0 };

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

var weeks = (window.WEEK_DATA || []);
var byModule = window.MODULE_CONTENT || {};
for (var mk in byModule) {
    if (!byModule.hasOwnProperty(mk)) continue;
    weeks = weeks.concat(byModule[mk].weeks || []);
}
if (!weeks.length) problems.push("no weeks loaded at all - check the file list above");

for (var w = 0; w < weeks.length; w++) {
    var wk = weeks[w];
    var wtag = "week" + wk.number;

    if (!wk.id || !wk.title || !wk.emoji) problems.push(wtag + ": missing id/title/emoji");
    if (wk.comingSoon) continue;

    var topics = wk.topics || [];
    if (!topics.length) problems.push(wtag + ": no topics");

    /* Weeks that are taught as lessons carry a lesson map. Every topic must
       land in exactly one of them, or the notes screen would hide a topic
       behind a lesson she can never open — and it would look like the topic
       had simply never been written. Maths has no lessons and is skipped. */
    if (wk.lessons) {
      var inLesson = {}, lessonNums = {};
      for (var L = 0; L < wk.lessons.length; L++) {
        var les = wk.lessons[L];
        if (!les.title)  problems.push(wtag + ": lesson " + les.number + " has no title");
        if (!les.number) problems.push(wtag + ": a lesson has no number");
        if (lessonNums[les.number]) problems.push(wtag + ": two lessons numbered " + les.number);
        lessonNums[les.number] = 1;

        if (les.topicIds.length !== les.wanted) {
          problems.push(wtag + "/lesson " + les.number + ": names " + les.wanted +
                        " topics but only " + les.topicIds.length +
                        " exist - a topic id in lessons.js does not match the week data");
        }
        for (var q2 = 0; q2 < les.topicIds.length; q2++) {
          if (inLesson[les.topicIds[q2]]) {
            problems.push(wtag + ": topic " + les.topicIds[q2] + " is in two lessons");
          }
          inLesson[les.topicIds[q2]] = 1;
        }
      }
      for (var q3 = 0; q3 < topics.length; q3++) {
        if (!inLesson[topics[q3].id]) {
          problems.push(wtag + ": topic " + topics[q3].id +
                        " belongs to no lesson, so nothing on the notes screen can reach it");
        }
      }
      totals.lessons += wk.lessons.length;
    }

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
            } else if (Q.type === "multi") {
                totals.multi++;
                // Marked all or nothing, so the correct set has to be exactly right.
                // Two of anything, or all of them, is not a question - the first has
                // no wrong answer to avoid and the second cannot be got wrong.
                if (!Q.options || Q.options.length < 4) problems.push(qtag + ": multi needs 4+ options");
                if (!Q.answers || !Q.answers.length) problems.push(qtag + ": multi has no answers array");
                else {
                    if (Q.answers.length === (Q.options || []).length) {
                        problems.push(qtag + ": multi marks every option correct");
                    }
                    if (Q.answers.length < 2) problems.push(qtag + ": multi needs 2+ correct options, else it is an mcq");
                    var an = {}, prev = -1;
                    for (var ai = 0; ai < Q.answers.length; ai++) {
                        var idx = Q.answers[ai];
                        if (typeof idx !== "number" || idx !== Math.floor(idx) ||
                            idx < 0 || idx >= (Q.options || []).length) {
                            problems.push(qtag + ": multi answer index out of range (" + idx + ")");
                        }
                        if (an[idx]) problems.push(qtag + ": multi lists the same answer twice");
                        an[idx] = 1;
                        if (idx <= prev) problems.push(qtag + ": multi answers must be sorted ascending");
                        prev = idx;
                    }
                }
                var mseen = {};
                for (var mo = 0; mo < (Q.options || []).length; mo++) {
                    if (mseen[Q.options[mo]]) problems.push(qtag + ": duplicate option text");
                    mseen[Q.options[mo]] = 1;
                }
            } else if (Q.type === "match") {
                totals.match++;
                if (!Q.pairs || Q.pairs.length < 3) problems.push(qtag + ": match needs 3+ pairs");
                var lseen = {}, rseen = {};
                for (var pi = 0; pi < (Q.pairs || []).length; pi++) {
                    var P = Q.pairs[pi];
                    if (!P || !P.left || !P.right) { problems.push(qtag + ": pair " + pi + " incomplete"); continue; }
                    if (lseen[P.left]) problems.push(qtag + ": duplicate left-hand item '" + P.left + "'");
                    lseen[P.left] = 1;
                    // Two identical right-hand values make the dropdown ambiguous: she
                    // could pick the "wrong" one of two identical labels and be marked
                    // down for an answer that reads exactly the same.
                    if (rseen[P.right]) problems.push(qtag + ": duplicate right-hand value '" + P.right + "'");
                    rseen[P.right] = 1;
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

WScript.Echo("Lessons:   " + totals.lessons);
WScript.Echo("Topics:    " + totals.topics);
WScript.Echo("Questions: " + totals.questions +
             "  (mcq " + totals.mcq + ", numeric " + totals.numeric + ", steps " + totals.steps +
             ", multi " + totals.multi + ", match " + totals.match + ")");
WScript.Echo("Total marks available: " + totals.marks);
WScript.Echo("");

if (problems.length === 0) {
    WScript.Echo("No structural problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var p = 0; p < problems.length; p++) WScript.Echo("  - " + problems[p]);
}
WScript.Quit(problems.length);
