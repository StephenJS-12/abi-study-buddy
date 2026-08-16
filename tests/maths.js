var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Independent recomputation of every numeric answer in the question bank.
var fso = new ActiveXObject("Scripting.FileSystemObject");
var base = REPO + "\\public\\js\\data\\";
var window = {};
var files = ["week1.js", "week2.js", "week3.js", "week4.js"];
for (var i = 0; i < files.length; i++) {
    var fh = fso.OpenTextFile(base + files[i], 1);
    var src = fh.AtEndOfStream ? "" : fh.ReadAll();
    fh.Close();
    (new Function("window", src))(window);
}

var Q = {}, weeks = window.WEEK_DATA;
for (var w = 0; w < weeks.length; w++) {
    var tps = weeks[w].topics || [];
    for (var t = 0; t < tps.length; t++)
        for (var k = 0; k < tps[t].questions.length; k++)
            Q[tps[t].questions[k].id] = tps[t].questions[k];
}

// ------ generic implementations ---------------------------------------------------------------------------------------------------------
function sortNum(a) { var b = a.slice(); b.sort(function (x, y) { return x - y; }); return b; }
function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
function mean(a) { return sum(a) / a.length; }
function posValue(s, pos) {
    if (pos === Math.floor(pos)) return s[pos - 1];
    var lo = Math.floor(pos);
    return (s[lo - 1] + s[lo]) / 2;
}
function median(a) { var s = sortNum(a); return posValue(s, (s.length + 1) / 2); }
function q1(a) { var s = sortNum(a); return posValue(s, 0.25 * (s.length + 1)); }
function q3(a) { var s = sortNum(a); return posValue(s, 0.75 * (s.length + 1)); }
function iqr(a) { return q3(a) - q1(a); }
function range(a) { var s = sortNum(a); return s[s.length - 1] - s[0]; }
function percentile(a, p) {
    var s = sortNum(a), pos = (p / 100) * (s.length + 1);
    if (pos === Math.floor(pos)) return s[pos - 1];
    var lo = Math.floor(pos), frac = pos - lo;
    return s[lo - 1] + frac * (s[lo] - s[lo - 1]);
}
function variance(a) {
    var m = mean(a), acc = 0;
    for (var i = 0; i < a.length; i++) acc += (a[i] - m) * (a[i] - m);
    return acc / (a.length - 1);
}
function sd(a) { return Math.sqrt(variance(a)); }
function groupedMean(mids, freqs) {
    var num = 0;
    for (var i = 0; i < mids.length; i++) num += mids[i] * freqs[i];
    return num / sum(freqs);
}
function groupedMode(L, f1, f0, f2, h) { return L + ((f1 - f0) / (2 * f1 - f0 - f2)) * h; }
function ev(vals, probs) { var e = 0; for (var i = 0; i < vals.length; i++) e += vals[i] * probs[i]; return e; }
function pctChange(o, n) { return ((n - o) / o) * 100; }
function simpleFV(pv, i, n) { return pv * (1 + n * i); }
function compoundFV(pv, i, n) { return pv * Math.pow(1 + i, n); }

var expect = [];
function chk(id, v, l) { expect.push({ id: id, val: v, label: l }); }
function step(id, ix, v, l) { expect.push({ id: id, step: ix, val: v, label: l }); }

// ------ Week 2 ------------------------------------------------------------------------------------------------------------------------------------------------------------
chk("w2c1", (23 / 28) * 100, "23/28 as %");
chk("w2c3", (9 / 16) * 100, "9/16 as %");
chk("w2c5", (3 / 8) * 100, "3/8 as %");
chk("w2r1", (45 / 60) * 100, "R45 of R60");
chk("w2r2", 0.15 * 2400, "15% of R2400");
step("w2r3", 2, 96000 / 0.06, "base from R96000 at 6%");
chk("w2r5", 7200 / 0.12, "sales from R7200 at 12%");
chk("w2ch1", pctChange(12, 15), "12 -> 15 units");
chk("w2ch2", pctChange(5, 12), "5 -> 12 units");
step("w2ch3", 0, 1200 * 13500 - 1200 * 9360, "year 1 gross profit");
step("w2ch3", 1, 1350 * 14220 - 1350 * 9000, "year 2 gross profit");
step("w2ch3", 2, pctChange(1200 * 13500 - 1200 * 9360, 1350 * 14220 - 1350 * 9000), "GP % change");
chk("w2ch5", pctChange(45000, 41400), "R45000 -> R41400");
chk("w2o1", (27 / 180) * 100, "27 of 180 m2");
chk("w2o2", 0.15 * 14400, "15% of R14400");
step("w2o3", 0, (54 / 180) * 100, "54 of 180 m2");
step("w2o3", 1, (54 / 180) * 18000, "storeroom allocation");
chk("w2o5", (63 / 180) * 4200, "security allocation");
chk("w2d1", 24 * (1 - 0.15), "R24 less 15%");
chk("w2d2", 3000 * 20.40, "3000 x R20.40");
chk("w2d3", 24 * (1 - 0.25), "R24 less 25%");
step("w2d4", 1, 0.05 * 61200, "cash discount amount");
step("w2d4", 2, 61200 - 0.05 * 61200, "amount paid");
chk("w2m1", 80 - 64, "gross profit");
chk("w2m2", (16 / 64) * 100, "margin on cost");
chk("w2m3", (16 / 80) * 100, "margin on selling");
step("w2m5", 0, 0.30 * 120, "required gross profit");
step("w2m5", 1, 120 + 0.30 * 120, "selling price");

// ------ Week 3 ------------------------------------------------------------------------------------------------------------------------------------------------------------
chk("w3mn1", mean([14, 9, 12, 15, 11, 13]), "mean of hires");
chk("w3mn3", groupedMean([105, 115, 125, 135], [3, 7, 6, 4]), "grouped mean output");
var rev = [8400, 9150, 7900, 8650, 9300, 8200];
step("w3mn4", 0, sum(rev), "sum of revenue");
step("w3mn4", 2, mean(rev), "mean revenue");
chk("w3md1", median([22, 31, 35, 47, 58]), "median odd set");
chk("w3md2", median([12, 7, 9, 15, 10, 8]), "median even set");
step("w3md3", 2, median([4, 11, 6, 3, 9, 7, 5, 8]), "median of 8 values");
chk("w3mo3", groupedMode(1300, 14, 6, 9, 100), "grouped mode takings");
chk("w3mo4", groupedMode(30, 18, 5, 11, 10), "grouped mode classes");
chk("w3sp1", range([5, 2, 16, 9, 13, 7, 10]), "range");
var booking = [2, 3, 4, 3, 3, 4, 3, 2, 7, 9, 11, 1];
step("w3sp2", 1, q1(booking), "Q1 booking times");
step("w3sp2", 2, q3(booking), "Q3 booking times");
step("w3sp2", 3, iqr(booking), "IQR booking times");
chk("w3sp3", iqr([14, 9, 21, 12, 17, 11]), "IQR small set");
chk("w3sp5", iqr([3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 22, 25, 30]), "IQR service jobs");
chk("w3pc1", percentile([5, 9, 14, 18, 22, 27], 40), "40th percentile");
chk("w3pc3", percentile([4, 8, 11, 15, 19, 23, 28], 30), "30th percentile");
chk("w3pc5", percentile([12, 15, 18, 21, 24, 27, 30, 33, 36], 60), "60th percentile");
step("w3sd1", 0, mean([3, 6, 8, 11]), "mean 3,6,8,11");
step("w3sd1", 2, variance([3, 6, 8, 11]), "variance 3,6,8,11");
step("w3sd1", 3, sd([3, 6, 8, 11]), "sd 3,6,8,11");
chk("w3sd2", sd([2, 4, 4, 6, 9]), "sd 2,4,4,6,9");
chk("w3sd5", sd([10, 12, 14, 16, 18]), "sd 10..18");
chk("w3pb4", 1 - 0.35, "complement of 0.35");
chk("w3mu3", 0.69 * 0.51, "both alive");
var dur = [1, 2, 3, 4, 5], pr = [0.10, 0.25, 0.40, 0.20, 0.05];
step("w3ev1", 0, ev(dur, pr), "expected duration");
step("w3ev1", 1, ev(dur, pr) * 150, "expected revenue");
step("w3ev1", 2, ev(dur, pr) * 150 * 80, "expected daily revenue");
chk("w3ev2", ev([100, 200, 300], [0.2, 0.5, 0.3]), "EV payoffs");
chk("w3ev4", ev([80000, -20000], [0.35, 0.65]), "EV campaign");

// ------ Week 4 ------------------------------------------------------------------------------------------------------------------------------------------------------------
chk("w4t4", 271250 - 250000, "interest amount");
chk("w4s1", simpleFV(8000, 0.09, 6), "simple FV R8000");
chk("w4s2", 6 * (8000 * 0.09), "simple interest R8000");
chk("w4s3", simpleFV(12000, 0.075, 4), "simple FV R12000");
step("w4s4", 0, 450000 * 0.065, "annual simple interest");
step("w4s4", 1, 5 * 450000 * 0.065, "5yr simple interest");
step("w4s4", 2, simpleFV(450000, 0.065, 5), "simple FV R450000");
chk("w4c1", compoundFV(15000, 0.08, 6), "compound FV R15000");
chk("w4c2", compoundFV(15000, 0.08, 6) - 15000, "compound interest R15000");
chk("w4c3", compoundFV(1000000, 0.095, 3), "compound FV R1m 9.5%");
step("w4c4", 1, Math.pow(1.06, 4), "(1.06)^4");
step("w4c4", 2, compoundFV(50000, 0.06, 4), "compound FV R50000");
step("w4c4", 3, compoundFV(50000, 0.06, 4) - 50000, "interest R50000");
chk("w4f1", 9 / 4, "effective quarterly rate");
chk("w4f2", 6 / 12, "effective monthly rate");
chk("w4f3", compoundFV(30000, 0.12 / 4, 16), "quarterly FV R30000");
step("w4f4", 0, 8 / 2, "effective half-yearly rate");
step("w4f4", 2, compoundFV(20000, 0.04, 6), "half-yearly FV R20000");

// ------ compare ---------------------------------------------------------------------------------------------------------------------------------------------------------
// -- Week 1 (fractions) ---------------------------------------
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
function lcm(a, b) { return a * b / gcd(a, b); }

step("w1b3", 0, 2 * 5, "2 wholes as fifths");
step("w1b3", 1, 2 * 5 + 3, "improper numerator");
chk("w1b4", (9 / 12) * 24, "9/12 of 24 leave days");
chk("w1s3", gcd(24, 36), "gcd of 24 and 36");
step("w1s4", 0, gcd(18, 24), "gcd of 18 and 24");
step("w1s4", 1, 18 / gcd(18, 24), "simplified numerator");
step("w1s4", 2, 24 / gcd(18, 24), "simplified denominator");
step("w1m3", 0, 3 * 8, "numerator product");
step("w1m3", 1, 4 * 9, "denominator product");
step("w1m3", 2, (3 * 8) / gcd(3 * 8, 4 * 9), "simplified numerator");
chk("w1m4", (3 / 8) * 4800, "3/8 of R4800");
step("w1d3", 0, 5 * 3, "numerator after flip");
step("w1d3", 1, 6 * 2, "denominator after flip");
step("w1d3", 2, (5 * 3) / gcd(5 * 3, 6 * 2), "simplified numerator");
chk("w1d4", (3 / 2) / (1 / 4), "bookings in 1.5 hours");
chk("w1a2", lcm(6, 4), "smallest common denominator 6 and 4");
step("w1a3", 0, lcm(5, 4), "common denominator 5 and 4");
step("w1a3", 1, 2 * (lcm(5, 4) / 5) + 1 * (lcm(5, 4) / 4), "sum numerator over 20");
chk("w1a5", 5 * (18 / 6), "rescale 5/6 to eighteenths");

// -- Week 1 lessons 2 and 3 (decimals, rounding, exponents) ----
function roundTo(x, places) { var f = Math.pow(10, places); return Math.round(x * f) / f; }

chk("w1dc3", 406 + 5 / 100, "four hundred and six point zero five");
chk("w1dc5", 5 / 8, "5/8 as a decimal");
chk("w1r1", roundTo(84.6472, 2), "84.6472 to nearest hundredth");
chk("w1r2", roundTo(84.6472, 1), "84.6472 to nearest tenth");
chk("w1r4", Math.round(249.7) * 8, "rounded weight x R8");
chk("w1p2", Math.pow(2, 6), "2^6");
chk("w1p3", Math.sqrt(81), "square root of 81");
chk("w1p4", Math.pow(27, 1 / 3), "cube root of 27");
chk("w1e2", Math.pow(3, 2) * Math.pow(3, 4), "3^2 x 3^4");
chk("w1e4", Math.pow(5, 7) / Math.pow(5, 4), "5^7 / 5^4");
chk("w1x2", 1 - 0.04, "monthly decay multiplier");
step("w1x3", 0, 1 - 0.08, "8 percent decay multiplier");
step("w1x3", 1, 3, "number of periods");
step("w1x3", 2, 100 * Math.pow(1 - 0.08, 3), "percent remaining");
chk("w1x4", 500000 * Math.pow(1.06, 4), "sales after 4 years at 6 percent");

var fails = [], checked = 0;
for (var e = 0; e < expect.length; e++) {
    var it = expect[e], q = Q[it.id];
    if (!q) { fails.push("MISSING QUESTION " + it.id); continue; }
    var stored, tol, where;
    if (it.step === undefined) {
        stored = q.answer; tol = q.tol; where = it.id;
    } else {
        if (!q.steps || !q.steps[it.step]) { fails.push("MISSING STEP " + it.id + "[" + it.step + "]"); continue; }
        stored = q.steps[it.step].answer; tol = q.steps[it.step].tol; where = it.id + " step " + (it.step + 1);
    }
    checked++;
    var diff = Math.abs(stored - it.val);
    if (diff > tol) {
        fails.push(where + " (" + it.label + "): stored " + stored + ", computed " + it.val +
                   ", diff " + diff + " > tol " + tol);
    }
}

WScript.Echo("Independently recomputed and compared: " + checked + " answers");
WScript.Echo("");
if (!fails.length) WScript.Echo("Every recomputed answer matches the stored answer.");
else {
    WScript.Echo(fails.length + " MISMATCH(ES):");
    for (var x = 0; x < fails.length; x++) WScript.Echo("  - " + fails[x]);
}
WScript.Quit(fails.length);

