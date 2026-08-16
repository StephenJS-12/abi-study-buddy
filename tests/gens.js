var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Stress-tests every question generator: runs each one many times and checks that
// what comes out is valid, self-consistent, and free of NaN/undefined leaks.

// -- ES5 shims, since JScript is ES3 ---------------------------
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) if (fn.call(t, this[i], i, this)) o.push(this[i]); return o; };
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; };
}
if (!Array.prototype.every) {
    Array.prototype.every = function (fn, t) { for (var i = 0; i < this.length; i++) if (!fn.call(t, this[i], i, this)) return false; return true; };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
}

var JS = REPO + "\\public\\js\\";

/* Must read as UTF-8. FileSystemObject reads ANSI, which turns every ÷, × and ≈ in the
   generators into mojibake — that silently broke the degenerate-operand guard below. */
function read(p) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(p);
    var s = st.ReadText();
    st.Close();
    return s;
}

var Rand, GEN;
eval(read(JS + "rng.js"));
eval(read(JS + "generators.js"));
eval(read(JS + "examgen.js"));    // exam-paper generators register into the same GEN registry
eval(read(JS + "examgen2.js"));
eval(read(JS + "examgen3.js"));
eval(read(JS + "examgen4.js"));

var RUNS = 400;
var problems = [], stats = {}, totalProduced = 0, totalNull = 0;

/* Built at runtime from char codes: a literal [÷×] in this file gets mangled by the
   reading encoding, and \u escapes in a JScript regex literal did not match either.
   Verified separately against known-good and known-bad prompts. */
var OPS_RE = new RegExp("[" + String.fromCharCode(0x00F7) + String.fromCharCode(0x00D7) + "]", "g");

/* Same trap: a literal [−–—] in this file is mangled by cscript's ANSI reading, so the
   typographic-minus normalisation below has to be built from char codes as well. */
var MINUS_RE = new RegExp("[" + String.fromCharCode(0x2212) + String.fromCharCode(0x2013) +
                          String.fromCharCode(0x2014) + "]", "g");

/* "1.87 / 1.87" is degenerate - it teaches nothing and reads as a bug.
   NB the operand pattern must NOT be [\d.]* : that greedily swallows the sentence's
   full stop, so "1.87." never equals "1.87" and the check silently never fires. */
function isDegenerate(prompt) {
    var bare = String(prompt).replace(/<[^>]*>/g, " ").replace(OPS_RE, "@");
    var m = /(\d+(?:\.\d+)?)\s*@\s*(\d+(?:\.\d+)?)/.exec(bare);
    return !!(m && m[1] === m[2]);
}

/* This guard has silently no-opped twice already (once from file encoding mangling the
   operator class, once from the greedy full stop). Prove it works before trusting it. */
(function selfCheck() {
    var D = String.fromCharCode(0x00F7), M = String.fromCharCode(0x00D7);
    if (!isDegenerate("closest approximation of 1.87 " + D + " 1.87."))
        problems.push("GUARD BROKEN: degenerate check fails to fire on 1.87 / 1.87");
    if (!isDegenerate("closest approximation of 0.05 " + M + " 0.05."))
        problems.push("GUARD BROKEN: degenerate check fails to fire on 0.05 x 0.05");
    if (isDegenerate("closest approximation of 5.65 " + D + " 2.14."))
        problems.push("GUARD BROKEN: degenerate check false-positives on 5.65 / 2.14");
    if (isDegenerate("closest approximation of 0.026 " + M + " 0.002."))
        problems.push("GUARD BROKEN: degenerate check false-positives on 0.026 x 0.002");
})();

function textOf(q) {
    var bits = [q.prompt || "", q.scenario || "", q.note || "", q.why || ""];
    for (var i = 0; i < (q.options || []).length; i++) bits.push(String(q.options[i]));
    for (var j = 0; j < (q.solution || []).length; j++) {
        bits.push(String(q.solution[j].lab)); bits.push(String(q.solution[j].val));
    }
    for (var k = 0; k < (q.steps || []).length; k++) {
        bits.push(String(q.steps[k].q)); bits.push(String(q.steps[k].explain));
    }
    return bits.join(" || ");
}

// Numbers appearing in the final solution row, used to confirm the stated working
// actually arrives at the stored answer.
function finalRowNumbers(q) {
    var rows = q.solution || [], out = [];
    for (var i = 0; i < rows.length; i++) {
        if (!rows[i].final) continue;
        var t = String(rows[i].val).replace(/<[^>]*>/g, " ");
        t = t.replace(MINUS_RE, "-");   // typographic minus/dashes -> ASCII
        var prev;
        do { prev = t; t = t.replace(/(\d)\s+(\d{3})(?!\d)/g, "$1$2"); } while (t !== prev);
        var m, re = /-?\d+(?:\.\d+)?/g;
        while ((m = re.exec(t)) !== null) out.push(parseFloat(m[0]));
    }
    return out;
}

var reg = GEN.registered();
for (var topicId in reg) {
    if (!reg.hasOwnProperty(topicId)) continue;
    var fns = reg[topicId];

    for (var gi = 0; gi < fns.length; gi++) {
        var tag = topicId + " #" + (gi + 1);
        stats[tag] = { made: 0, nulled: 0 };

        for (var run = 0; run < RUNS; run++) {
            var q;
            try {
                q = fns[gi]();
            } catch (e) {
                problems.push(tag + ": THREW " + e.message);
                break;
            }
            if (q === null || q === undefined) { stats[tag].nulled++; totalNull++; continue; }
            stats[tag].made++; totalProduced++;

            var txt = textOf(q);
            if (/undefined|NaN|\[object|null/.test(txt)) {
                problems.push(tag + ": text contains undefined/NaN/null -> " + txt.substring(0, 160));
                break;
            }
            if (!q.prompt) { problems.push(tag + ": no prompt"); break; }

            // "1.87 / 1.87" is degenerate - it teaches nothing and looks broken.
            // ÷ and × are written as escapes so file encoding cannot break this.
            var bare = String(q.prompt).replace(/<[^>]*>/g, " ");
            // Scoped to the approximation questions only. Elsewhere a repeated operand is
            // perfectly legitimate - 2 x 2 x 2 is how a power is written out, and stripped
            // fraction markup leaves loose digits that would look like a false pair.
            if (/closest approximation/.test(bare) && isDegenerate(q.prompt)) {
                problems.push(tag + ": degenerate operands -> " + bare.substring(0, 120));
                break;
            }
            if (typeof q.marks !== "number" || q.marks < 1) { problems.push(tag + ": bad marks"); break; }
            if (!q.why) { problems.push(tag + ": no why"); break; }

            var sol = q.solution || [];
            if (!sol.length) { problems.push(tag + ": no solution rows"); break; }
            var hasFinal = false;
            for (var s = 0; s < sol.length; s++) {
                if (!sol[s].lab || sol[s].val === undefined || sol[s].val === "") {
                    problems.push(tag + ": solution row " + s + " incomplete"); break;
                }
                if (sol[s].final) hasFinal = true;
            }
            if (!hasFinal) { problems.push(tag + ": no final solution row"); break; }

            if (q.type === "mcq") {
                if (!q.options || q.options.length < 2) { problems.push(tag + ": <2 options"); break; }
                if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) {
                    problems.push(tag + ": answer index out of range"); break;
                }
                var seen = {}, dup = false;
                for (var o = 0; o < q.options.length; o++) {
                    var key = String(q.options[o]);
                    if (seen[key]) dup = true;
                    seen[key] = true;
                }
                if (dup) { problems.push(tag + ": duplicate options -> " + q.options.join(" | ")); break; }

            } else if (q.type === "numeric") {
                if (typeof q.answer !== "number" || !isFinite(q.answer)) {
                    problems.push(tag + ": answer not a finite number (" + q.answer + ")"); break;
                }
                if (typeof q.tol !== "number" || q.tol <= 0) { problems.push(tag + ": bad tolerance"); break; }
                // the working must actually land on the stored answer
                var nums = finalRowNumbers(q), matched = false;
                for (var z = 0; z < nums.length; z++) {
                    if (Math.abs(nums[z] - q.answer) <= Math.max(q.tol, Math.abs(q.answer) * 1e-9)) matched = true;
                }
                if (nums.length && !matched) {
                    problems.push(tag + ": final working " + nums.join("/") + " does not match answer " + q.answer);
                    break;
                }

            } else if (q.type === "steps") {
                if (!q.steps || q.steps.length < 2) { problems.push(tag + ": <2 steps"); break; }

                // Two steps asking the identical question reads as a bug to the user
                var stepSeen = {}, dupStep = false;
                for (var ds = 0; ds < q.steps.length; ds++) {
                    var sq = String(q.steps[ds].q);
                    if (stepSeen[sq]) dupStep = true;
                    stepSeen[sq] = true;
                }
                if (dupStep) { problems.push(tag + ": two steps ask the same question"); break; }

                var bad = false;
                for (var st = 0; st < q.steps.length; st++) {
                    var S = q.steps[st];
                    if (!S.q || !S.explain) { problems.push(tag + ": step " + st + " incomplete"); bad = true; break; }
                    if (typeof S.answer !== "number" || !isFinite(S.answer)) {
                        problems.push(tag + ": step " + st + " answer not finite (" + S.answer + ")"); bad = true; break;
                    }
                    if (typeof S.tol !== "number" || S.tol <= 0) {
                        problems.push(tag + ": step " + st + " bad tolerance"); bad = true; break;
                    }
                }
                if (bad) break;

            } else {
                problems.push(tag + ": unknown type '" + q.type + "'"); break;
            }
        }
    }
}

// Generators that almost always bail out would starve the pool.
var starved = [];
for (var t2 in stats) {
    if (!stats.hasOwnProperty(t2)) continue;
    var made = stats[t2].made, tried = made + stats[t2].nulled;
    if (tried > 0 && made / tried < 0.25) {
        starved.push(t2 + " produced only " + made + " of " + tried + " attempts");
    }
}

var genCount = 0;
for (var t3 in stats) if (stats.hasOwnProperty(t3)) genCount++;

WScript.Echo("Generators tested : " + genCount);
WScript.Echo("Questions produced: " + totalProduced + "  (skipped rolls: " + totalNull + ")");
WScript.Echo("");

if (starved.length) {
    WScript.Echo("LOW YIELD (would slow the pool down):");
    for (var y = 0; y < starved.length; y++) WScript.Echo("  - " + starved[y]);
    WScript.Echo("");
}

if (!problems.length) {
    WScript.Echo("No generator problems found.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var p = 0; p < problems.length; p++) WScript.Echo("  - " + problems[p]);
}
WScript.Quit(problems.length);
