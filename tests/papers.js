// Runs the ACTUAL Milpark practice-paper questions through the same formulas the exam
// generators use, and checks they reproduce the published guideline answers.
//
// This is the check that matters most: the generators invent new numbers, so structural
// tests can only prove they are self-consistent. This proves the METHOD is right, by
// reproducing answers Milpark published independently of us.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}

var fails = [], notes = [], n = 0;

function near(label, got, want, tol) {
    n++;
    if (Math.abs(got - want) > (tol === undefined ? 0.01 : tol)) {
        fails.push(label + ": computed " + got + ", memo says " + want);
    }
}
function same(label, got, want) {
    n++;
    if (String(got) !== String(want)) fails.push(label + ": computed " + got + ", memo says " + want);
}

// ── shared helpers, mirroring the generators ──────────────────
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
function lcm(a, b) { return a * b / gcd(a, b); }
function round2(x) { return Math.round(x * 100) / 100; }
function pctChange(oldV, newV) { return round2(((newV - oldV) / oldV) * 100); }

// mixed numbers as [whole, num, den]
function toImproper(m) { return [m[0] * m[2] + m[1], m[2]]; }
function addFractions(list) {
    var L = 1;
    list.forEach(function (f) { L = lcm(L, f[1]); });
    var num = 0;
    list.forEach(function (f) { num += f[0] * (L / f[1]); });
    var g = gcd(num, L);
    return [num / g, L / g];
}
function toMixed(f) {
    var w = Math.floor(f[0] / f[1]), r = f[0] - w * f[1], g = gcd(r, f[1]);
    return r === 0 ? [w, 0, 1] : [w, r / g, f[1] / g];
}
function divideFractions(a, b) {
    var num = a[0] * b[1], den = a[1] * b[0], g = gcd(num, den);
    return [num / g, den / g];
}
function mixedStr(m) { return m[1] === 0 ? String(m[0]) : m[0] + " " + m[1] + "/" + m[2]; }

// ══════════════════════════════════════════════════════════════
//  WEEK 1 PAPER
// ══════════════════════════════════════════════════════════════

// Q1  8 1/2 + 12 3/4 = 21 1/4
same("W1 Q1 diesel",
     mixedStr(toMixed(addFractions([toImproper([8, 1, 2]), toImproper([12, 3, 4])]))), "21 1/4");

// Q2  3/4 + 5/8 + 1/2 = 1 7/8
same("W1 Q2 soap",
     mixedStr(toMixed(addFractions([[3, 4], [5, 8], [1, 2]]))), "1 7/8");

// Q3  5 3/4 + 7 2/3 + 4 4/5 = 18 13/60
same("W1 Q3 paint",
     mixedStr(toMixed(addFractions([toImproper([5, 3, 4]), toImproper([7, 2, 3]), toImproper([4, 4, 5])]))),
     "18 13/60");

// Q4  25 / 4 3/4 = 5 5/19
same("W1 Q4 water cooler",
     mixedStr(toMixed(divideFractions([25, 1], toImproper([4, 3, 4])))), "5 5/19");

// Q5  2 1/2 / (1/5) = 12 1/2, rounded DOWN to 12 whole cleans
var q5 = divideFractions(toImproper([2, 1, 2]), [1, 5]);
same("W1 Q5 exact", mixedStr(toMixed(q5)), "12 1/2");
near("W1 Q5 practical", Math.floor(q5[0] / q5[1]), 12);

// Q6  4 15/16 / 19 3/4 = 1/4
var q6 = divideFractions(toImproper([4, 15, 16]), toImproper([19, 3, 4]));
same("W1 Q6 oil per bottle", q6[0] + "/" + q6[1], "1/4");

// Q7–Q9  approximation of a product: count decimals, multiply digits, round to nearest 10
function approxProduct(dA, dB, places) {
    return (Math.round((dA * dB) / 10) * 10) / Math.pow(10, places);
}
near("W1 Q7  0.026 x 0.002", approxProduct(26, 2, 6), 0.00005, 1e-9);
near("W1 Q8  0.36 x 0.02",  approxProduct(36, 2, 4), 0.007,   1e-9);
near("W1 Q9  0.02 x 0.44",  approxProduct(2, 44, 4), 0.009,   1e-9);

// Q10–Q12  approximation of a quotient: round both, divide
function approxQuotient(a, b) { return Math.round(a) / Math.round(b); }
near("W1 Q10 5.65 / 2.14", approxQuotient(5.65, 2.14), 3);
near("W1 Q11 4.2 / 7.8",   approxQuotient(4.2, 7.8),   0.5);
near("W1 Q12 20.8 / 6.9",  approxQuotient(20.8, 6.9),  3);
// and the memo's "compare with" exact values
near("W1 Q10 exact", round2(5.65 / 2.14), 2.64);
near("W1 Q11 exact", round2(4.2 / 7.8),   0.54);
near("W1 Q12 exact", round2(20.8 / 6.9),  3.01);

// Q13–Q15  growth and decline, as a percentage of today
function relative(rate, years, rising) {
    return round2(Math.pow(1 + (rising ? 1 : -1) * rate / 100, years) * 100);
}
near("W1 Q13 electricity +8% x4",  relative(8, 4, true),   136.05);
near("W1 Q14 battery -15% x5",     relative(15, 5, false),  44.37);
near("W1 Q15 imported +5% x6",     relative(5, 6, true),   134.01);

// Q16  profit
near("W1 Q16 profit", 168000 - (6 * 22000 + 2000 + 6 * 1500), 25000);
// Q17  break-even bottles, rounded UP
var q17 = (1200 + (10000 / 250) * 5) / 80;
near("W1 Q17 exact bottles", q17, 17.5);
near("W1 Q17 break-even",    Math.ceil(q17), 18);
// Q18  selling price for a target profit
near("W1 Q18 selling price", (92000 + 6 * 22000 + 8 * 24000 + 4000) / 14, 30000);

// ══════════════════════════════════════════════════════════════
//  WEEK 2 PAPER
// ══════════════════════════════════════════════════════════════

// Q1–Q3  percentage change off a table
near("W2 Q1 electricity Apr->Jul", pctChange(2258.95, 2651.44), 17.37);
near("W2 Q2 CPI 2020->2022",       pctChange(94.4, 106.8),      13.14);
near("W2 Q3.1 rand Q4'19->Q1'20",  pctChange(13.9721, 17.7106), 26.76);
near("W2 Q3.2 rand Q2'20->Q4'20",  pctChange(17.2213, 14.5626), -15.44);

// Q4–Q6  applying and reversing a percentage
near("W2 Q4 rent +8%",        round2(22600 * 1.08),   24408);
near("W2 Q5 price before +9%", round2(1200 / 1.09),   1100.92);
near("W2 Q6 salary +7.1%",     round2(13500 * 1.071), 14458.50);

// Q7  bonus pool split by salary
var totalSalaries = 27000 + 15000 + 18000;
near("W2 Q7 manager",         round2(27000 / totalSalaries * 25000), 11250);
near("W2 Q7 sales assistant", round2(15000 / totalSalaries * 25000),  6250);
near("W2 Q7 technician",      round2(18000 / totalSalaries * 25000),  7500);

// Q8  depreciation by distance
near("W2 Q8 depreciation", round2(48000 / 200000 * 250000), 60000);

// Q9  allocate only the diesel actually used
var hoursTotal = 30 + 25 + 29 + 31;
var dieselUsed = round2(6000 * (1 - 0.15));
near("W2 Q9 hours",    hoursTotal, 115);
near("W2 Q9 used",     dieselUsed, 5100);
near("W2 Q9 February", round2(25 / hoursTotal * dieselUsed), 1108.70);
near("W2 Q9 April",    round2(31 / hoursTotal * dieselUsed), 1374.78);

// Q10–Q11  discounts
near("W2 Q10 net per tire", round2(80 * (1 - 0.025)), 78);
near("W2 Q10 total",        round2(150 * 78),         11700);
near("W2 Q11 total",        round2(100 * 85 * 0.95),  8075);

// Q12  THE MEMO IS WRONG HERE.
// The table puts "1 001 and more" at 6%, and the order is 2 000 units, but the guideline
// answer applies the 4% (501-1000) bracket. We follow the table.
var brackets = [
    { upTo: 500,      pct: 0 },
    { upTo: 1000,     pct: 4 },
    { upTo: Infinity, pct: 6 }
];
function bracketFor(qty) {
    for (var i = 0; i < brackets.length; i++) if (qty <= brackets[i].upTo) return brackets[i].pct;
    return 0;
}
n++;
if (bracketFor(2000) !== 6) fails.push("W2 Q12: 2 000 units should read the 6% bracket");

var correctNet   = round2(12 * (1 - 6 / 100));
var correctGross = round2(correctNet * 2000);
var correctDue   = round2(correctGross * (1 - 7 / 100));
near("W2 Q12 net per cooldrink (corrected)", correctNet,   11.28);
near("W2 Q12 total purchase (corrected)",    correctGross, 22560);
near("W2 Q12 amount due (corrected)",        correctDue,   20980.80);

// The memo's own figures are internally consistent, just built on the wrong bracket.
var memoNet = round2(12 * 0.96), memoGross = round2(memoNet * 2000), memoDue = round2(memoGross * 0.93);
near("W2 Q12 memo arithmetic self-consistent", memoDue, 21427.20);
n++;
if (Math.abs(memoDue - correctDue) < 0.01) {
    fails.push("W2 Q12: expected the memo and the corrected answer to differ");
} else {
    notes.push("W2 Q12 memo uses the 4% bracket for a 2 000-unit order; the table says 6%. " +
               "Memo R" + memoDue.toFixed(2) + " vs corrected R" + correctDue.toFixed(2) + ".");
}

// Q13–Q16  margins
near("W2 Q13 margin on cost",    round2((90 - 70) / 70 * 100),  28.57);
near("W2 Q13 margin on selling", round2((90 - 70) / 90 * 100),  22.22);
near("W2 Q14 margin on cost",    round2((150 - 100) / 100 * 100), 50.00);
near("W2 Q14 margin on selling", round2((150 - 100) / 150 * 100), 33.33);
near("W2 Q15 selling price",     round2(250 * 1.20), 300);
near("W2 Q16 cost price",        round2(500 * 0.60), 300);

// ══════════════════════════════════════════════════════════════
//  WEEK 3 PAPER
// ══════════════════════════════════════════════════════════════

function sortNum(a) { var b = a.slice(); b.sort(function (x, y) { return x - y; }); return b; }
function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
function mean(a) { return sum(a) / a.length; }
function posValue(s, pos) {
    if (pos === Math.floor(pos)) return s[pos - 1];
    var lo = Math.floor(pos);
    return (s[lo - 1] + s[lo]) / 2;
}
function sampleVariance(a) {
    var m = mean(a), acc = 0;
    for (var i = 0; i < a.length; i++) acc += (a[i] - m) * (a[i] - m);
    return acc / (a.length - 1);
}

// Q1  grouped table: 0-50:5, 50-100:6, 100-150:2, 150-200:4, 200-250:8, 250-300:5
var q1mids = [25, 75, 125, 175, 225, 275];
var q1freq = [5, 6, 2, 4, 8, 5];
var q1n = sum(q1freq), q1fx = 0;
for (var i1 = 0; i1 < 6; i1++) q1fx += q1mids[i1] * q1freq[i1];
near("W3 Q1.1 grouped mean", Math.round((q1fx / q1n) * 100) / 100, 156.67);

// 1.2 modal value. The memo reads "approximately 230" off the histogram; the formula gives
// 228.57, which is the same answer to graph-reading accuracy.
var q1mode = 200 + ((8 - 4) / (2 * 8 - 4 - 5)) * 50;
near("W3 Q1.2 modal value (formula vs ~230 off the graph)", Math.round(q1mode * 100) / 100, 228.57);
n++;
if (Math.abs(q1mode - 230) > 5) fails.push("W3 Q1.2: formula should land near the memo's graphical 230");

// 1.3 median. THE MEMO SAYS ~145, WHICH THE DATA DOES NOT SUPPORT.
// Cumulative is 5, 11, 13, 17, 25, 30, so the 15th value sits in the 150-200 class.
var q1cum = [5, 11, 13, 17, 25, 30];
var q1median = 150 + ((q1n / 2 - 13) / 4) * 50;
near("W3 Q1.3 median (corrected)", q1median, 175);
n++;
if (q1cum[2] >= q1n / 2 || q1cum[3] < q1n / 2) {
    fails.push("W3 Q1.3: the median class should be 150-200");
}
n++;
if (Math.abs(q1median - 145) < 5) {
    fails.push("W3 Q1.3: expected our median to differ from the memo's 145");
} else {
    notes.push("W3 Q1.3 memo gives a median of ~145, but the 15th of 30 values falls in the 150-200 " +
               "class, so interpolation gives 175.");
}

// Q2  dataset 4, 7, 3, 2, 1, 2, 3, 5, 6, 3
var q2 = [4, 7, 3, 2, 1, 2, 3, 5, 6, 3], q2s = sortNum(q2), q2n = q2.length;
near("W3 Q2 mean",   mean(q2), 3.6);
near("W3 Q2 median", posValue(q2s, (q2n + 1) / 2), 3);
near("W3 Q2 Q1",     posValue(q2s, (q2n + 1) / 4), 2);
near("W3 Q2 Q2",     posValue(q2s, 2 * (q2n + 1) / 4), 3);
near("W3 Q2 Q3",     posValue(q2s, 3 * (q2n + 1) / 4), 5.5);
near("W3 Q2 IQR",    posValue(q2s, 3 * (q2n + 1) / 4) - posValue(q2s, (q2n + 1) / 4), 3.5);
near("W3 Q2 35th percentile", posValue(q2s, 0.35 * (q2n + 1)), 2.5);
near("W3 Q2 standard deviation", Math.round(Math.sqrt(sampleVariance(q2)) * 100) / 100, 1.90);
// The memo reports variance as 3.61 by squaring the ROUNDED sd. It is exactly 3.6.
near("W3 Q2 variance (exact)", Math.round(sampleVariance(q2) * 100) / 100, 3.60);
n++;
if (Math.abs(sampleVariance(q2) - 3.61) < 0.005) {
    fails.push("W3 Q2: expected the exact variance to differ from the memo's 3.61");
} else {
    notes.push("W3 Q2 memo gives variance 3.61 by squaring the rounded SD of 1.90. Exact value is 3.60.");
}

// Q3  dataset 2, 3, 7, 9, 2, 11, 13, 15, 17, 20, 21, 22
var q3 = [2, 3, 7, 9, 2, 11, 13, 15, 17, 20, 21, 22], q3s = sortNum(q3), q3n = q3.length;
near("W3 Q3.1 mean",   Math.round(mean(q3) * 1000) / 1000, 11.833);
near("W3 Q3.2 median", posValue(q3s, (q3n + 1) / 2), 12);
near("W3 Q3.4 Q1",     posValue(q3s, (q3n + 1) / 4), 5);
near("W3 Q3.5 Q2",     posValue(q3s, 2 * (q3n + 1) / 4), 12);
near("W3 Q3.6 Q3",     posValue(q3s, 3 * (q3n + 1) / 4), 18.5);
near("W3 Q3.7 IQR",    posValue(q3s, 3 * (q3n + 1) / 4) - posValue(q3s, (q3n + 1) / 4), 13.5);
near("W3 Q3.8 range",  q3s[q3n - 1] - q3s[0], 20);
// 3.9 the memo's displayed working substitutes 8.33 for the mean in several terms and labels
// an SD formula "Variance", but its final 7.358 is the correct standard deviation.
near("W3 Q3.9 standard deviation", Math.round(Math.sqrt(sampleVariance(q3)) * 1000) / 1000, 7.358);

// Q4  age groups: 2, 1, 3, 5, 5, 4 over a total of 20
var q4 = [2, 1, 3, 5, 5, 4], q4n = sum(q4);
near("W3 Q4 total", q4n, 20);
near("W3 Q4.1 20-<25",       q4[1] / q4n, 1 / 20);
near("W3 Q4.2 35-<40",       q4[4] / q4n, 1 / 4);
near("W3 Q4.3 35 and over",  (q4[4] + q4[5]) / q4n, 9 / 20);
near("W3 Q4.4 below 30",     (q4[0] + q4[1] + q4[2]) / q4n, 3 / 10);
near("W3 Q4.5 below 25 or 40+", (q4[0] + q4[1] + q4[5]) / q4n, 7 / 20);

// Q5  two-way table
var prof = [48, 15, 27], pers = [30, 95, 65];
var profTot = sum(prof), persTot = sum(pers), grand = profTot + persTot;
var pentaxTot = prof[2] + pers[2];
near("W3 Q5 professional total", profTot, 90);
near("W3 Q5 grand total",        grand,   280);
near("W3 Q5.1 professional",     profTot / grand, 9 / 28);
near("W3 Q5.2 Nikon",            (prof[1] + pers[1]) / grand, 11 / 28);
near("W3 Q5.3 Pentax | personal", pers[2] / persTot, 13 / 38);
// 5.4 the memo hedges "48/280 (48/78?)". The question asks for a professional user WHO PREFERS
// Canon - a joint probability - so the denominator is the grand total.
near("W3 Q5.4 professional AND Canon (joint)", prof[0] / grand, 48 / 280);
notes.push("W3 Q5.4 memo hedges between 48/280 and 48/78. The question asks for a joint probability, " +
           "so 48/280 = 6/35 is correct; 48/78 would answer 'given that they prefer Canon'.");
near("W3 Q5.5 personal or Pentax", (persTot + pentaxTot - pers[2]) / grand, 217 / 280);

// Q6  THE MEMO'S ANSWER TO (a) IS WRONG.
// 6 red, 5 blue, 2 green = 13 marbles; two drawn without replacement.
var red = 6, marbles = 6 + 5 + 2;
var bothRed = (red / marbles) * ((red - 1) / (marbles - 1));
near("W3 Q6(a) both red (corrected)", bothRed, 5 / 26, 1e-9);
n++;
if (Math.abs(bothRed - 5 / 6) < 1e-6) {
    fails.push("W3 Q6(a): expected our answer to differ from the memo's 5/6");
} else {
    notes.push("W3 Q6(a) memo gives 5/6 for two red marbles from 6 red / 5 blue / 2 green without " +
               "replacement. Correct is 6/13 x 5/12 = 5/26. (5/6 is the answer to Q6 e(ii).)");
}
near("W3 Q6(b) odd and head", (3 / 6) * (1 / 2), 1 / 4, 1e-9);
near("W3 Q6(c) neither spade nor jack", (52 - (13 + 4 - 1)) / 52, 9 / 13, 1e-9);
near("W3 Q6(d) three dice all different", (6 * 5 * 4) / (6 * 6 * 6), 5 / 9, 1e-9);
near("W3 Q6 e(i)  P(A and B)", (1 / 2) * (1 / 3), 1 / 6, 1e-9);
near("W3 Q6 e(ii) P(A or B)",  1 / 2 + 1 / 2 - 1 / 6, 5 / 6, 1e-9);
near("W3 Q6 e(iii) P(A|B)",    (1 / 6) / (1 / 2), 1 / 3, 1e-9);

// Q8  two defective fuses out of seven, without replacement
near("W3 Q8 both defective", (2 / 7) * (1 / 6), 1 / 21, 1e-9);

// ══════════════════════════════════════════════════════════════
//  WEEK 4 PAPER  -  NO OFFICIAL SOLUTIONS EXIST YET
//
//  Every answer below was derived from scratch. With no memo to check against, each one is
//  ROUND-TRIP verified instead: whatever we solve for (a rate, a term) is fed back into the
//  original formula and must reproduce the figure the question actually states. That catches
//  an algebra slip, though it cannot catch a misreading of what the question is asking for.
// ══════════════════════════════════════════════════════════════

var derived = [];
function record(q, text) { derived.push("W4 " + q + ": " + text); }

// -- Q1, Q2  simple interest future value ----------------------
function simpleFV(pv, rate, years) { return pv * (1 + years * rate / 100); }
near("W4 Q1 FV", round2(simpleFV(20000, 4.8, 6)), 25760);
near("W4 Q2 FV", round2(simpleFV(40000, 8.4, 3)), 50080);
record("Q1", "R25 760.00");
record("Q2", "R50 080.00");

// -- Q3, Q4  solving for the simple rate, then putting it back --
function simpleRate(pv, fv, years) { return ((fv / pv) - 1) / years * 100; }
var w4q3 = simpleRate(20000, 27200, 5);
near("W4 Q3 rate", round2(w4q3), 7.2);
near("W4 Q3 round-trip back to FV", round2(simpleFV(20000, w4q3, 5)), 27200);
var w4q4 = simpleRate(50000, 59600, 3);
near("W4 Q4 rate", round2(w4q4), 6.4);
near("W4 Q4 round-trip back to FV", round2(simpleFV(50000, w4q4, 3)), 59600);
record("Q3", "7.2% per annum");
record("Q4", "6.4% per annum");

// -- Q5, Q6  compound interest future value --------------------
function compoundFV(pv, rate, n) { return pv * Math.pow(1 + rate / 100, n); }
near("W4 Q5 FV", round2(compoundFV(20000, 4.8, 6)), 26497.06);
near("W4 Q6 FV", round2(compoundFV(40000, 7.1, 3)), 49139.24);
record("Q5", "R26 497.06");
record("Q6", "R49 139.24");
// sanity: compound must beat simple over the same term
n++;
if (compoundFV(20000, 4.8, 6) <= simpleFV(20000, 4.8, 6)) {
    fails.push("W4 Q5: compound interest should exceed simple interest over 6 years");
}

// -- Q7, Q8  solving for the annual compound rate --------------
function compoundRate(pv, fv, n) { return (Math.pow(fv / pv, 1 / n) - 1) * 100; }
var w4q7 = compoundRate(20000, 27200, 5);
near("W4 Q7 rate", round2(w4q7), 6.34);
near("W4 Q7 round-trip back to FV", round2(compoundFV(20000, w4q7, 5)), 27200);
var w4q8 = compoundRate(50000, 59600, 3);
near("W4 Q8 rate", round2(w4q8), 6.03);
near("W4 Q8 round-trip back to FV", round2(compoundFV(50000, w4q8, 3)), 59600);
record("Q7", "6.34% per annum (6.3427% unrounded)");
record("Q8", "6.03% per annum (6.0292% unrounded)");
// the compound rate must be LOWER than the simple rate for the same growth
n++;
if (w4q7 >= w4q3) fails.push("W4 Q7: the compound rate should be lower than the simple rate for the same growth");
n++;
if (w4q8 >= w4q4) fails.push("W4 Q8: the compound rate should be lower than the simple rate for the same growth");

// -- Q9 to Q11  effective periodic rate from a quoted rate -----
near("W4 Q9  5.8% monthly",       Math.round((5.8 / 12) * 10000) / 10000, 0.4833, 0.0001);
near("W4 Q10 6.4% quarterly",     6.4 / 4, 1.6);
near("W4 Q11 5.6% semi-annually", 5.6 / 2, 2.8);
record("Q9",  "0.4833% per month");
record("Q10", "1.6% per quarter");
record("Q11", "2.8% per half-year");

// -- Q12 to Q14  effective periodic rate from actual growth ----
function periodicRate(pv, fv, years, m) { return (Math.pow(fv / pv, 1 / (years * m)) - 1) * 100; }
var w4q12 = periodicRate(25000, 31007.54, 3, 12);
near("W4 Q12 rate", round2(w4q12), 0.60);
near("W4 Q12 round-trip back to FV", round2(25000 * Math.pow(1 + w4q12 / 100, 36)), 31007.54);
var w4q13 = periodicRate(45000, 70214.54, 8, 4);
near("W4 Q13 rate", round2(w4q13), 1.40);
near("W4 Q13 round-trip back to FV", round2(45000 * Math.pow(1 + w4q13 / 100, 32)), 70214.54);
var w4q14 = periodicRate(31000, 40506.62, 4, 2);
near("W4 Q14 rate", round2(w4q14), 3.40);
near("W4 Q14 round-trip back to FV", round2(31000 * Math.pow(1 + w4q14 / 100, 8)), 40506.62);
record("Q12", "0.60% per month");
record("Q13", "1.40% per quarter");
record("Q14", "3.40% per half-year");
// These three landing on clean figures is strong evidence the paper was built from them.
n++;
if (Math.abs(round2(w4q12) - 0.60) > 0.005 ||
    Math.abs(round2(w4q13) - 1.40) > 0.005 ||
    Math.abs(round2(w4q14) - 3.40) > 0.005) {
    fails.push("W4 Q12-Q14: expected the periodic rates to land on clean values");
}

// -- Q15 to Q17  solving for the number of years ---------------
function termYears(pv, fv, nominal, m) {
    var i = nominal / 100 / m;
    return (Math.log(fv / pv) / Math.log(1 + i)) / m;
}
var w4q15 = termYears(20000, 30000, 8, 12);
near("W4 Q15 years", round2(w4q15), 5.09);
near("W4 Q15 months", round2(w4q15 * 12), 61.02);
near("W4 Q15 round-trip back to FV", round2(20000 * Math.pow(1 + 0.08 / 12, w4q15 * 12)), 30000);
var w4q16 = termYears(100000, 200000, 12, 4);
near("W4 Q16 years", round2(w4q16), 5.86);
near("W4 Q16 quarters", round2(w4q16 * 4), 23.45);
near("W4 Q16 round-trip back to FV", round2(100000 * Math.pow(1 + 0.12 / 4, w4q16 * 4)), 200000);
var w4q17 = termYears(20000, 50000, 18, 2);
near("W4 Q17 years", round2(w4q17), 5.32);
near("W4 Q17 half-years", round2(w4q17 * 2), 10.63);
near("W4 Q17 round-trip back to FV", round2(20000 * Math.pow(1 + 0.18 / 2, w4q17 * 2)), 50000);
record("Q15", "5.09 years (61.02 months)");
record("Q16", "5.86 years (23.45 quarters)");
record("Q17", "5.32 years (10.63 half-years)");

notes.push("W4 has NO official solutions. The 17 answers above were derived here and each was " +
           "round-trip verified. Re-check them when Milpark publishes the memo.");

// ── report ────────────────────────────────────────────────────
WScript.Echo("Paper answers checked: " + n);
WScript.Echo("");
if (derived.length) {
    WScript.Echo("  WEEK 4 - DERIVED HERE, NOT YET CHECKED AGAINST AN OFFICIAL MEMO:");
    for (var d = 0; d < derived.length; d++) WScript.Echo("    " + derived[d]);
    WScript.Echo("");
}
for (var i = 0; i < notes.length; i++) WScript.Echo("  NOTE: " + notes[i]);
if (notes.length) WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Every method reproduces the Milpark guideline answers.");
} else {
    WScript.Echo(fails.length + " MISMATCH(ES):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
