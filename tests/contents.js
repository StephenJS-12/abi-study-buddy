// NOT A CHECK — a printout, and deliberately not in "Run all checks.bat".
//
// Prints the whole app, week > lesson > topic, for both modules, so it can be
// read side by side with Milpark's official contents pages. Those pages are
// screenshots, so no test can compare against them; a person has to. This makes
// the app's half of that comparison a single command instead of an afternoon of
// scrolling through data files.
//
//   cscript //Nologo //E:JScript contents.js
//
// A lesson with no topics prints (NO TOPICS) — a lesson the course has that the
// app has not been written for yet. A topic in no lesson prints (NO LESSON),
// which validate.js already fails on, so it should never appear here.

var fso = new ActiveXObject("Scripting.FileSystemObject");
var REPO = fso.GetParentFolderName(fso.GetParentFolderName(WScript.ScriptFullName));
var SEP = String.fromCharCode(92);

function read(p) {
    var f = fso.OpenTextFile(p, 1);
    var s = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
    return s;
}

function dump(label, weeks) {
    var topics = 0, lessons = 0, empty = 0, orphans = 0;
    WScript.Echo("################ " + label + " ################");

    for (var i = 0; i < weeks.length; i++) {
        var wk = weeks[i];
        WScript.Echo("");
        WScript.Echo("WEEK " + wk.number + ": " + wk.title +
                     "   [" + (wk.topics || []).length + " topics]");
        topics += (wk.topics || []).length;

        var placed = {}, L, t, u, q;
        if (wk.lessons) {
            for (L = 0; L < wk.lessons.length; L++) {
                var les = wk.lessons[L];
                lessons++;
                WScript.Echo("  L" + les.number + ": " + les.title);
                for (t = 0; t < les.topicIds.length; t++) {
                    placed[les.topicIds[t]] = 1;
                    var tp = null;
                    for (q = 0; q < wk.topics.length; q++) {
                        if (wk.topics[q].id === les.topicIds[t]) tp = wk.topics[q];
                    }
                    WScript.Echo("      - " + (tp ? tp.title : "MISSING " + les.topicIds[t]));
                }
                if (!les.topicIds.length) { empty++; WScript.Echo("      (NO TOPICS)"); }
            }
        }
        for (u = 0; u < (wk.topics || []).length; u++) {
            if (!placed[wk.topics[u].id]) {
                orphans++;
                WScript.Echo("  (NO LESSON) - " + wk.topics[u].title);
            }
        }
    }

    WScript.Echo("");
    WScript.Echo("  " + weeks.length + " weeks, " + lessons + " lessons (" + empty +
                 " with no topics), " + topics + " topics, " + orphans + " in no lesson.");
    WScript.Echo("");
}

var base = REPO + SEP + "public" + SEP + "js" + SEP + "data" + SEP;
var files = ["week1.js", "week2.js", "week3.js", "week4.js",
             "week5.js", "week6.js", "lessons.js"];
var i;

var m = {};
for (i = 0; i < files.length; i++) (new Function("window", read(base + files[i])))(m);
dump("MABU01-5  MATHS", m.WEEK_DATA);

/* Business registers into window.MODULE_CONTENT.inba rather than WEEK_DATA, and
   its lesson map reads the bucket back through Modules.contentFor. */
var b = { MODULE_CONTENT: { inba: { weeks: [], exams: [] } } };
b.Modules = { contentFor: function (id) { return b.MODULE_CONTENT[id]; } };
for (i = 0; i < files.length; i++) {
    (new Function("window", read(base + "inba" + SEP + files[i])))(b);
}
dump("INBA01-5  BUSINESS", b.MODULE_CONTENT.inba.weeks);

WScript.Quit(0);
