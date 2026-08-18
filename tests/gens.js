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

/* The numeric value an option represents, or null if that cannot be told for
   certain. Rand.value does the same job for the live site; this is written out
   separately on purpose, so a bug in that one cannot hide behind itself here.
   Mixed numbers ("11 3/16 litres") are a whole plus a fraction and must not be
   read as the fraction alone. */
function optionValue(opt) {
    var s = String(opt).replace(/&nbsp;/g, " ");
    var part = null;

    var f = /<span class="frac"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/.exec(s);
    if (f) {
        var n = parseFloat(String(f[1]).replace(/[\s,]/g, ""));
        var d = parseFloat(String(f[2]).replace(/[\s,]/g, ""));
        if (!isFinite(n) || !isFinite(d) || d === 0) return null;
        part = n / d;
        s = s.replace(f[0], " ");
        if (/<span class="frac">/.test(s)) return null;
    }

    s = s.replace(/<[^>]*>/g, " ").replace(MINUS_RE, "-");
    var prev;
    do { prev = s; s = s.replace(/(\d)\s+(\d{3})(?!\d)/g, "$1$2"); } while (s !== prev);

    var found = s.match(/-?\d+(?:\.\d+)?/g) || [];
    if (found.length > 1) return null;

    if (part !== null) {
        if (!found.length) return part;
        var whole = parseFloat(found[0]);
        if (!isFinite(whole)) return null;
        return whole < 0 ? whole - part : whole + part;
    }
    if (found.length !== 1) return null;
    var only = parseFloat(found[0]);
    return isFinite(only) ? only : null;
}

/* The two halves of a fraction option, or null if it is not a plain fraction.
   Mixed numbers are skipped: the whole part changes what "simplified" means. */
function fractionParts(opt) {
    var s = String(opt).replace(/&nbsp;/g, " ");
    var f = /<span class="frac"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/.exec(s);
    if (!f) return null;
    var before = s.substring(0, s.indexOf(f[0])).replace(/<[^>]*>/g, " ");
    if (/\d/.test(before)) return null;
    var n = parseFloat(String(f[1]).replace(/[\s,]/g, ""));
    var d = parseFloat(String(f[2]).replace(/[\s,]/g, ""));
    if (!isFinite(n) || !isFinite(d) || d === 0 || n !== Math.floor(n) || d !== Math.floor(d)) return null;
    return { n: Math.abs(n), d: Math.abs(d) };
}

function gcdOf(a, b) { while (b) { var t = b; b = a % b; a = t; } return a || 1; }

/* The option with every number blanked out, so two options are only ever
   compared as numbers when they are the same kind of answer. */
function optionWords(opt) {
    return String(opt).replace(/&nbsp;/g, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/-?\d+(?:\.\d+)?/g, "#")
        .replace(/\s+/g, " ")
        .replace(/^ | $/g, "")
        .toLowerCase();
}

/* Same discipline as the degenerate-operand guard above: prove it fires before
   trusting it, because a guard that silently returns null for everything would
   pass every check forever. */
(function optionValueSelfCheck() {
    function frac(n, d) { return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>'; }
    if (optionValue(frac(1, 221)) === null)
        problems.push("GUARD BROKEN: optionValue cannot read a fraction");
    if (Math.abs(optionValue(frac(12, "2 652")) - optionValue(frac(1, 221))) > 1e-12)
        problems.push("GUARD BROKEN: optionValue does not equate 12/2 652 with 1/221");
    if (Math.abs(optionValue(frac(1, 169)) - optionValue(frac(1, 221))) < 1e-12)
        problems.push("GUARD BROKEN: optionValue equates 1/169 with 1/221");
    if (optionValue("R12 800") !== 12800)
        problems.push("GUARD BROKEN: optionValue misreads spaced money");
    if (optionValue("not a number") !== null)
        problems.push("GUARD BROKEN: optionValue invents a value for text");
    // A mixed number is the whole plus the fraction. Reading only the fraction made
    // "11 3/16 litres" and "12 8/15 litres" look like the same quantity.
    if (Math.abs(optionValue("11&nbsp;" + frac(3, 16) + " litres") - 11.1875) > 1e-12)
        problems.push("GUARD BROKEN: optionValue drops the whole part of a mixed number");
    if (Math.abs(optionValue("7&nbsp;" + frac(3, 11) + " times") -
                 optionValue("8&nbsp;" + frac(3, 11) + " times")) < 1e-12)
        problems.push("GUARD BROKEN: optionValue equates two different mixed numbers");
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

                // Same VALUE in different notation is still two correct answers on the
                // screen, and comparing the strings alone never catches it: 12/2652 and
                // 1/221 are different text and the identical number. Offering the
                // unsimplified form of the answer as a distractor is an easy slip to make.
                // Only options phrased the same way are comparable: "5 thousands" and
                // "5 hundreds" both carry the number 5 and are not remotely the same answer.
                var vals = [], clash = "";
                for (var v = 0; v < q.options.length; v++) {
                    var val = optionValue(q.options[v]);
                    var shape = optionWords(q.options[v]);
                    for (var w = 0; w < vals.length; w++) {
                        if (val === null || vals[w].val === null || vals[w].words !== shape) continue;
                        var scale = Math.max(Math.abs(val), Math.abs(vals[w].val), 1e-9);
                        if (Math.abs(vals[w].val - val) <= scale * 1e-9) {
                            clash = q.options[w] + "  ==  " + q.options[v] + "  (both " + val + ")";
                        }
                    }
                    vals.push({ val: val, words: shape });
                }
                if (clash) {
                    problems.push(tag + ": two options are the same value -> " +
                                  String(clash).replace(/<[^>]*>/g, "/"));
                    break;
                }

                // Presentation must not give the answer away. A screen reading
                // 7/13, 30/52, 2/52, 26/52 can be answered correctly by anyone who
                // notices that only one option was reduced - no probability required.
                //
                // Counted as a rate rather than failed on sight: any generator will
                // occasionally land on a correct answer that happens to be coprime
                // while the distractors happen not to be, and that is luck, not a
                // tell. A generator that simplifies the answer and never simplifies
                // the distractors does it on most rolls, which is the real fault.
                var fracs = [], correctFrac = null;
                for (var fi = 0; fi < q.options.length; fi++) {
                    var fp = fractionParts(q.options[fi]);
                    if (!fp) continue;
                    fp.reduced = gcdOf(fp.n, fp.d) === 1;
                    if (fi === q.answer) correctFrac = fp;
                    else fracs.push(fp);
                }
                if (correctFrac && fracs.length >= 2) {
                    stats[tag].fracRounds = (stats[tag].fracRounds || 0) + 1;
                    var anyOtherReduced = false;
                    for (var fj = 0; fj < fracs.length; fj++) if (fracs[fj].reduced) anyOtherReduced = true;
                    if (correctFrac.reduced && !anyOtherReduced) {
                        stats[tag].giveaway = (stats[tag].giveaway || 0) + 1;
                        if (!stats[tag].giveawayEg) {
                            stats[tag].giveawayEg = q.options.join(" | ").replace(/<[^>]*>/g, "/");
                        }
                    }
                }

            } else if (q.type === "multi") {
                if (!q.options || q.options.length < 4) { problems.push(tag + ": multi needs 4+ options"); break; }
                if (!q.answers || q.answers.length < 2) { problems.push(tag + ": multi needs 2+ correct options"); break; }
                if (q.answers.length >= q.options.length) { problems.push(tag + ": multi marks every option correct"); break; }
                var badIdx = false, lastIdx = -1, dupIdx = false, seenIdx = {};
                for (var mi = 0; mi < q.answers.length; mi++) {
                    var ix = q.answers[mi];
                    if (typeof ix !== "number" || ix < 0 || ix >= q.options.length || ix !== Math.floor(ix)) badIdx = true;
                    if (seenIdx[ix]) dupIdx = true;
                    seenIdx[ix] = 1;
                    if (ix <= lastIdx) badIdx = true;      // must be sorted ascending
                    lastIdx = ix;
                }
                if (badIdx) { problems.push(tag + ": multi answers out of range or unsorted"); break; }
                if (dupIdx) { problems.push(tag + ": multi lists the same answer twice"); break; }
                var mdup = {}, mrepeat = false;
                for (var mo = 0; mo < q.options.length; mo++) {
                    if (mdup[q.options[mo]]) mrepeat = true;
                    mdup[q.options[mo]] = 1;
                }
                if (mrepeat) { problems.push(tag + ": duplicate option text -> " + q.options.join(" | ")); break; }

            } else if (q.type === "match") {
                if (!q.pairs || q.pairs.length < 3) { problems.push(tag + ": match needs 3+ pairs"); break; }
                var lDup = {}, rDup = {}, pairBad = "";
                for (var pi = 0; pi < q.pairs.length; pi++) {
                    var P = q.pairs[pi];
                    if (!P || !P.left || !P.right) { pairBad = "pair " + pi + " incomplete"; break; }
                    if (lDup[P.left]) pairBad = "duplicate left-hand item '" + P.left + "'";
                    // Two identical right-hand values make the dropdown unanswerable:
                    // she picks a label that reads exactly like the correct one and is
                    // still marked wrong.
                    if (rDup[P.right]) pairBad = "duplicate right-hand value '" + P.right + "'";
                    lDup[P.left] = 1; rDup[P.right] = 1;
                }
                if (pairBad) { problems.push(tag + ": " + pairBad); break; }

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

// A generator whose correct option is reliably the only one in lowest terms is
// answerable on presentation alone. Judged over all its rolls, so an occasional
// coincidence does not count against it.
for (var t3 in stats) {
    if (!stats.hasOwnProperty(t3)) continue;
    var rounds = stats[t3].fracRounds || 0, tells = stats[t3].giveaway || 0;
    if (rounds >= 20 && tells / rounds > 0.35) {
        problems.push(t3 + ": the correct option is the only one in lowest terms on " +
                      Math.round(tells / rounds * 100) + "% of rolls, which answers it without any working -> " +
                      stats[t3].giveawayEg);
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
