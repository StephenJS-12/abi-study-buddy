var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Independent recomputation of the two Milpark papers in the maths exam bank.
//
// exam5.js and exam6.js reproduce "Additional exercises: Week 5" and "Week 6"
// verbatim. Neither paper ships with a memo, so every answer in them is one I
// worked out. That makes this file the only thing standing between a slip and a
// wrong answer marked as right during revision.
//
// Nothing here reads a figure from the exam files except the stored answer it
// is checking. The loans are also rolled forward payment by payment where that
// is a genuinely different route from the annuity factors — for the balloon
// questions it is the definition of the arrangement, so it is checked as a
// property rather than as a number.
//
// The paper files are validated structurally too: validate.js does not cover
// them, since it only loads the week data.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; };
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var SEP = String.fromCharCode(92);
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

var base = REPO + SEP + "public" + SEP + "js" + SEP + "data" + SEP;
var window = {};
(new Function("window", read(base + "exam5.js")))(window);
(new Function("window", read(base + "exam6.js")))(window);

/* Every question in the two papers, by id. */
var Q = {}, papers = window.EXAM_DATA, problems = [];
for (var p = 0; p < papers.length; p++) {
    var tps = papers[p].topics;
    for (var t = 0; t < tps.length; t++) {
        for (var q = 0; q < tps[t].questions.length; q++) {
            var item = tps[t].questions[q];
            if (Q[item.id]) problems.push("duplicate question id " + item.id);
            Q[item.id] = item;
        }
    }
}

// ── structure ────────────────────────────────────────────────────
// validate.js does not load the exam files, so the same rules are applied here.
for (var key in Q) {
    if (!Q.hasOwnProperty(key)) continue;
    var it = Q[key];
    if (!it.prompt) problems.push(key + ": no prompt");
    if (typeof it.marks !== "number" || it.marks < 1) problems.push(key + ": bad marks");
    if (!it.solution || !it.solution.length) problems.push(key + ": no solution rows");
    else {
        var final = false;
        for (var s = 0; s < it.solution.length; s++) {
            if (!it.solution[s].lab || !it.solution[s].val) problems.push(key + ": solution row " + s + " missing lab/val");
            if (it.solution[s].final) final = true;
        }
        if (!final) problems.push(key + ": no row marked final");
    }
    if (!it.why) problems.push(key + ": no 'why'");
    if (it.type === "numeric" && typeof it.answer !== "number") problems.push(key + ": numeric without an answer");
    if (it.type === "steps") {
        if (!it.steps || !it.steps.length) problems.push(key + ": steps question with no steps");
        else for (var k = 0; k < it.steps.length; k++) {
            if (typeof it.steps[k].answer !== "number") problems.push(key + " step " + k + ": no answer");
            if (!it.steps[k].explain) problems.push(key + " step " + k + ": no explain");
        }
    }
}

// ── the maths ────────────────────────────────────────────────────
function pow(x, n) { return Math.pow(x, n); }
function grow(rate, per, years) { return pow(1 + rate / per, per * years); }
function pvOf(fv, rate, per, years) { return fv / grow(rate, per, years); }
function fvf(i, n) { return (pow(1 + i, n) - 1) / i; }
function pvf(i, n) { return (1 - pow(1 + i, -n)) / i; }
function annPmt(pv, i, n) { return pv / pvf(i, n); }
function rollAfter(pv, i, pmt, times) {
    var bal = pv;
    for (var k = 0; k < times; k++) bal = bal * (1 + i) - pmt;
    return bal;
}
/* Both factors rise strictly with the rate, so bisection is safe. */
function bisect(f, target) {
    var lo = 1e-9, hi = 1, mid, k;
    for (k = 0; k < 200; k++) { mid = (lo + hi) / 2; if (f(mid) < target) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
}
function rateForFv(pmt, n, fv) { return bisect(function (x) { return pmt * fvf(x, n); }, fv); }
function termFor(pv, pmt, i) { return -Math.log(1 - pv * i / pmt) / Math.log(1 + i); }

var expect = [];
function chk(id, v, l) { expect.push({ id: id, val: v, label: l }); }
function step(id, ix, v, l) { expect.push({ id: id, step: ix, val: v, label: l }); }

// ── Week 5 paper ─────────────────────────────────────────────────
chk("x5q1", pvOf(33581, 0.10, 4, 5), "Q1 PV of R33 581");
chk("x5q2", pvOf(8080, 0.15, 12, 0.5), "Q2 PV of R8 080");
chk("x5q3", pvOf(62954, 0.08, 1, 12), "Q3 PV of R62 954");
chk("x5q4", 200000 * grow(0.12, 1, 8) * grow(0.10, 2, 12), "Q4 R200 000, 12% then 10%");
chk("x5q5", 10000 * grow(0.15, 1, 3) * grow(0.10, 2, 3), "Q5 R10 000, 15% then 10%");
chk("x5q6", 22000 * grow(0.11, 12, 5) * grow(0.12, 4, 7), "Q6 R22 000, 11% then 12%");
chk("x5q7", 100000 / (grow(0.12, 1, 3) * grow(0.14, 2, 7)), "Q7 PV of R100 000");
chk("x5q8", 55000 / (grow(0.13, 1, 2) * grow(0.12, 2, 4)), "Q8 PV of R55 000");
chk("x5q9", 23000 / (grow(0.11, 2, 3) * grow(0.12, 4, 2)), "Q9 PV of R23 000");
chk("x5q10", (200000 * grow(0.12, 1, 2) - 100000) * grow(0.12, 1, 6), "Q10 less R100 000 at yr 2");
chk("x5q11", (80000 * grow(0.15, 4, 3.5) - 80000) * grow(0.15, 4, 6.5), "Q11 less R80 000 at yr 3.5");
chk("x5q12", (120000 * grow(0.13, 2, 1) - 75000) * grow(0.13, 2, 3), "Q12 less R75 000 at yr 1");
chk("x5q13", 50000 + pvOf(100000, 0.14, 1, 3) + pvOf(150000, 0.14, 1, 6), "Q13 cash price, 14% yearly");
chk("x5q14", 80000 + pvOf(100000, 0.12, 4, 2) + pvOf(150000, 0.12, 4, 8), "Q14 cash price, 12% quarterly");
chk("x5q15", 10000 + pvOf(120000, 0.13, 2, 1) + pvOf(250000, 0.13, 2, 3), "Q15 cash price, 13% half-yearly");

// ── Week 6 paper ─────────────────────────────────────────────────
chk("x6q1", 2500 * fvf(0.0725 / 12, 60), "Q1 R2 500 monthly, 5 years");
chk("x6q2", 1800 * fvf(0.0725 / 2, 8), "Q2 R1 800 half-yearly, 4 years");
chk("x6q3", 3500 * fvf(0.085 / 4, 32), "Q3 R3 500 quarterly, 8 years");
chk("x6q4", 1500 * fvf(0.048 / 12, 36), "Q4 R1 500 monthly, 3 years");

chk("x6q5", rateForFv(1500, 36, 62403.85) * 12 * 100, "Q5 rate");
chk("x6q6", rateForFv(3000, 48, 169403.25) * 12 * 100, "Q6 rate");
chk("x6q7", rateForFv(2500, 16, 54301.00) * 4 * 100, "Q7 rate");
chk("x6q8", rateForFv(6500, 28, 236540.30) * 4 * 100, "Q8 rate");
chk("x6q9", rateForFv(7000, 12, 126570.40) * 2 * 100, "Q9 rate");
chk("x6q10", rateForFv(11500, 11, 203804.35) * 1 * 100, "Q10 rate");

chk("x6q11", annPmt(35000, 0.15 / 12, 8), "Q11 instalment");
chk("x6q12", annPmt(52500, 0.09 / 12, 12), "Q12 instalment");
chk("x6q13", annPmt(60000, 0.085 / 4, 9), "Q13 instalment");
chk("x6q14", annPmt(72000, 0.132 / 4, 14), "Q14 instalment");

chk("x6q15", termFor(250000, 7685.03, 0.067 / 12), "Q15 payments");
chk("x6q16", termFor(380000, 6887.48, 0.092 / 12), "Q16 payments");
chk("x6q17", termFor(2400000, 23961.12, 0.105 / 12), "Q17 payments");
chk("x6q18", termFor(120000, 22612.74, 0.145 / 4), "Q18 payments");
chk("x6q19", termFor(230000, 37848.58, 0.131 / 2), "Q19 payments");

step("x6q20", 0, 26459.71 * pvf(0.15 / 4, 7), "Q20 after 1 of 8");
step("x6q20", 1, 26459.71 * pvf(0.15 / 4, 6), "Q20 after 2 of 8");
step("x6q21", 0, 62412.60 * pvf(0.095, 3), "Q21 after 1 of 4");
step("x6q21", 1, 62412.60 * pvf(0.095, 2), "Q21 after 2 of 4");
step("x6q22", 0, 2082.46 * pvf(0.14 / 12, 5), "Q22 after 1 of 6");
step("x6q22", 1, 2082.46 * pvf(0.14 / 12, 4), "Q22 after 2 of 6");

/* Outstanding after k years: find the instalment, then roll the loan forward
   payment by payment — the amortisation table, not the factor it came from. */
function outstanding(pv, rate, per, years, after) {
    var i = rate / per, n = per * years;
    return rollAfter(pv, i, annPmt(pv, i, n), per * after);
}
chk("x6q23", outstanding(150000, 0.085, 12, 6, 3), "Q23 balance after 3 of 6 years");
chk("x6q24", outstanding(300000, 0.094, 12, 7, 5), "Q24 balance after 5 of 7 years");
chk("x6q25", outstanding(1500000, 0.115, 12, 20, 10), "Q25 balance after 10 of 20 years");
chk("x6q26", outstanding(2000000, 0.105, 12, 20, 15), "Q26 balance after 15 of 20 years");
chk("x6q27", outstanding(1200000, 0.105, 4, 10, 8), "Q27 balance after 8 of 10 years");

function afterChange(pv, rate, newRate, per, years, after) {
    var i = rate / per, n = per * years, paid = per * after;
    var owed = rollAfter(pv, i, annPmt(pv, i, n), paid);
    return annPmt(owed, newRate / per, n - paid);
}
chk("x6q28", afterChange(500000, 0.115, 0.110, 12, 5, 2), "Q28 new instalment");
chk("x6q29", afterChange(250000, 0.090, 0.105, 12, 6, 4), "Q29 new instalment");
chk("x6q30", afterChange(1200000, 0.120, 0.090, 12, 10, 6), "Q30 new instalment");
chk("x6q31", afterChange(1600000, 0.120, 0.080, 12, 20, 5), "Q31 new instalment");

/* An annuity due, cross-checked as a payment today plus an ordinary annuity one
   period shorter — a different identity from dividing by (1 + i). */
function due(pv, rate, per, years) {
    var i = rate / per;
    return pv / (1 + pvf(i, per * years - 1));
}
chk("x6q32", due(1000000, 0.08, 12, 5), "Q32 paid at the start");
chk("x6q33", due(400000, 0.09, 12, 3), "Q33 paid at the start");
chk("x6q34", due(350000, 0.11, 12, 6), "Q34 paid at the start");
chk("x6q35", due(140000, 0.08, 12, 3), "Q35 paid at the start");

function financed(cost, deposit, rate, per, years) {
    return annPmt(cost - deposit, rate / per, per * years);
}
chk("x6q36", financed(400000, 50000, 0.10, 12, 5), "Q36 after a R50 000 deposit");
chk("x6q37", financed(250000, 25000, 0.08, 12, 4), "Q37 after a R25 000 deposit");
chk("x6q38", financed(1500000, 200000, 0.09, 12, 20), "Q38 after a R200 000 deposit");
chk("x6q39", financed(2000000, 250000, 0.105, 12, 20), "Q39 after a R250 000 deposit");

function balloonPmt(cost, balloon, rate, per, years) {
    var i = rate / per, n = per * years;
    return annPmt(cost - balloon * pow(1 + i, -n), i, n);
}
chk("x6q40", balloonPmt(400000, 50000, 0.08, 12, 5), "Q40 with a R50 000 balloon");
chk("x6q41", balloonPmt(350000, 25000, 0.08, 12, 5), "Q41 with a R25 000 balloon");
chk("x6q42", balloonPmt(600000, 200000, 0.13, 12, 5), "Q42 with a R200 000 balloon");
chk("x6q43", balloonPmt(1200000, 500000, 0.095, 12, 5), "Q43 with a R500 000 balloon");

/* The property that defines a balloon: roll the loan forward through every
   instalment and the balance left must BE the balloon. An instalment can agree
   with the factor it came from and still be wrong; this cannot pass unless the
   arrangement itself works. */
var balloons = [
    [400000, 50000, 0.08, 12, 5], [350000, 25000, 0.08, 12, 5],
    [600000, 200000, 0.13, 12, 5], [1200000, 500000, 0.095, 12, 5]
];
for (var b = 0; b < balloons.length; b++) {
    var bb = balloons[b], ii = bb[2] / bb[3], nn = bb[3] * bb[4];
    var left = rollAfter(bb[0], ii, balloonPmt(bb[0], bb[1], bb[2], bb[3], bb[4]), nn);
    if (Math.abs(left - bb[1]) > 0.02) {
        problems.push("balloon: R" + bb[0] + " leaves R" + Math.round(left * 100) / 100 +
                      " after the last instalment, but the balloon is R" + bb[1]);
    }
}

/* Same for a deposit: no balloon, so the loan must clear to zero. */
var deposits = [
    [400000, 50000, 0.10, 12, 5], [250000, 25000, 0.08, 12, 4],
    [1500000, 200000, 0.09, 12, 20], [2000000, 250000, 0.105, 12, 20]
];
for (var d = 0; d < deposits.length; d++) {
    var dd = deposits[d], di = dd[2] / dd[3], dn = dd[3] * dd[4];
    var end = rollAfter(dd[0] - dd[1], di, financed(dd[0], dd[1], dd[2], dd[3], dd[4]), dn);
    if (Math.abs(end) > 0.02) {
        problems.push("deposit: R" + (dd[0] - dd[1]) + " financed leaves R" +
                      Math.round(end * 100) / 100 + " after the last instalment, not zero");
    }
}

// ── compare ──────────────────────────────────────────────────────
var checked = 0;
for (var e = 0; e < expect.length; e++) {
    var ex = expect[e], target = Q[ex.id];
    if (!target) { problems.push("MISSING QUESTION " + ex.id); continue; }
    var stored, tol, where;
    if (ex.step === undefined) {
        stored = target.answer; tol = target.tol; where = ex.id;
    } else {
        if (!target.steps || !target.steps[ex.step]) {
            problems.push("MISSING STEP " + ex.id + "[" + ex.step + "]"); continue;
        }
        stored = target.steps[ex.step].answer;
        tol = target.steps[ex.step].tol;
        where = ex.id + " step " + (ex.step + 1);
    }
    checked++;
    var diff = Math.abs(stored - ex.val);
    if (diff > tol) {
        problems.push(where + " (" + ex.label + "): stored " + stored + ", computed " +
                      ex.val + ", diff " + diff + " > tol " + tol);
    }
}

/* Every question in both papers must be covered above. A paper question with no
   check is one nobody has verified. */
var total = 0, unchecked = [];
for (var kk in Q) {
    if (!Q.hasOwnProperty(kk)) continue;
    total++;
    var covered = false;
    for (var c = 0; c < expect.length; c++) if (expect[c].id === kk) covered = true;
    if (!covered) unchecked.push(kk);
}
if (unchecked.length) {
    problems.push(unchecked.length + " paper question(s) with no independent check: " +
                  unchecked.join(", "));
}

WScript.Echo("Paper questions in the exam bank: " + total);
WScript.Echo("Answers recomputed and compared:  " + checked);
WScript.Echo("");
if (!problems.length) {
    WScript.Echo("Both Milpark papers check out, structurally and numerically.");
} else {
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var x = 0; x < problems.length; x++) WScript.Echo("  - " + problems[x]);
}
WScript.Quit(problems.length);
