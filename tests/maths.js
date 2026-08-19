var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Independent recomputation of every numeric answer in the question bank.
var fso = new ActiveXObject("Scripting.FileSystemObject");
var base = REPO + "\\public\\js\\data\\";
var window = {};
var files = ["week1.js", "week2.js", "week3.js", "week4.js", "week5.js", "week6.js"];
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

// ------ Week 5 ------------------------------------------------------------------------------------------------------------------------------------------------------------
// Present value, rate changes partway through a term, and amounts moving in or
// out mid-term. Everything here is built from grow() rather than from the
// figures printed in the notes, so a wrong number in week5.js cannot agree with
// itself. Where the source notes quote a rounded intermediate, the stored tol in
// the question is what absorbs it — not a fudge here.

// One Rand grown for `years` at a nominal rate compounded `per` times a year.
function grow(rate, per, years) { return Math.pow(1 + rate / per, per * years); }
function pvOf(fv, rate, per, years) { return fv / grow(rate, per, years); }

// Lesson 1 - finding the present value
chk("w5p3", pvOf(33581, 0.10, 4, 5), "PV of R33 581, 10% quarterly, 5yr");
chk("w5p4", pvOf(8080, 0.15, 12, 0.5), "PV of R8 080, 15% monthly, 6 months");
chk("w5p5", pvOf(62954, 0.08, 1, 12), "PV of R62 954, 8% yearly, 12yr");
step("w5p6", 0, 6, "bi-monthly is 6 periods a year");
step("w5p6", 1, 0.085 / 6, "8.5% per annum as a bi-monthly rate");
step("w5p6", 2, grow(0.085, 6, 4), "(1 + 0.0141667)^24");
step("w5p6", 3, pvOf(500000, 0.085, 6, 4), "PV of R500 000, 8.5% bi-monthly, 4yr");
chk("w5c2", pvOf(1000000, 0.11, 12, 5), "PV of R1m, 11% monthly, 5yr");

// Lesson 2 - the rate changes partway through
chk("w5rf1", 15000 * grow(0.08, 2, 2), "R15 000 at 8% half-yearly for 2yr");
chk("w5rf2", 15000 * grow(0.08, 2, 2) * grow(0.10, 2, 3), "then 10% half-yearly for 3yr");
chk("w5rf4", 200000 * grow(0.12, 1, 8) * grow(0.10, 2, 12), "R200 000, 12% then 10%, 20yr");
chk("w5rf5", 10000 * grow(0.15, 1, 3) * grow(0.10, 2, 3), "R10 000, 15% then 10%, 6yr");
chk("w5rf6", 22000 * grow(0.11, 12, 5) * grow(0.12, 4, 7), "R22 000, 11% then 12%, 12yr");
step("w5rf7", 0, 6, "n for the first year, bi-monthly");
step("w5rf7", 1, 1000 * grow(0.075, 6, 1), "R1 000 at 7.5% bi-monthly for 1yr");
step("w5rf7", 2, 18, "n for the remaining 3 years");
step("w5rf7", 3, 1000 * grow(0.075, 6, 1) * grow(0.085, 6, 3), "then 8.5% for 3yr");

chk("w5rp1", 1000000 / (grow(0.11, 12, 2) * grow(0.10, 12, 3)), "PV of R1m, 11% then 10%");
chk("w5rp3", 100000 / (grow(0.12, 1, 3) * grow(0.14, 2, 7)), "PV of R100 000, 12% then 14%");
chk("w5rp4", 55000 / (grow(0.13, 1, 2) * grow(0.12, 2, 4)), "PV of R55 000, 13% then 12%");
chk("w5rp5", 23000 / (grow(0.11, 2, 3) * grow(0.12, 4, 2)), "PV of R23 000, 11% then 12%");
chk("w5rp6", 500000 / (grow(0.075, 6, 1) * grow(0.085, 6, 3)), "PV of R500 000, 7.5% then 8.5%");

// Lesson 3 - money moves in or out partway through
chk("w5af1", 15000 * grow(0.10, 2, 2), "R15 000 at 10% half-yearly for 2yr");
chk("w5af2", (15000 * grow(0.10, 2, 2) + 20000) * grow(0.10, 2, 3), "plus R20 000, then 3yr more");
chk("w5af4", (200000 * grow(0.12, 1, 2) - 100000) * grow(0.12, 1, 6), "R200 000 less R100 000 at yr 2");
chk("w5af5", (80000 * grow(0.15, 4, 3.5) - 80000) * grow(0.15, 4, 6.5), "R80 000 less R80 000 at yr 3.5");
chk("w5af6", (120000 * grow(0.13, 2, 1) - 75000) * grow(0.13, 2, 3), "R120 000 less R75 000 at yr 1");
step("w5af7", 0, 700 * grow(0.085, 6, 1), "R700 at 8.5% bi-monthly for 1yr");
step("w5af7", 1, 700 * grow(0.085, 6, 1) + 300, "plus the R300 deposit");
step("w5af7", 2, 18, "n for the remaining 3 years");
step("w5af7", 3, (700 * grow(0.085, 6, 1) + 300) * grow(0.085, 6, 3), "grown for 3yr more");

chk("w5ap1", pvOf(600000, 0.11, 12, 3), "PV of R600 000, 11% monthly, 3yr");
chk("w5ap2", (pvOf(600000, 0.11, 12, 3) + 400000) / grow(0.11, 12, 2), "loan with R400 000 at yr 2");
chk("w5ap3", (pvOf(500000, 0.085, 6, 3) - 200000) / grow(0.085, 6, 1), "R500 000 with R200 000 at yr 1");
// The cash-price questions are checked by discounting each payment separately,
// which is a different route from the two-step method the solutions show.
chk("w5ap5", 50000 + pvOf(100000, 0.14, 1, 3) + pvOf(150000, 0.14, 1, 6), "cash price, 14% yearly");
chk("w5ap6", 80000 + pvOf(100000, 0.12, 4, 2) + pvOf(150000, 0.12, 4, 8), "cash price, 12% quarterly");
chk("w5ap7", 10000 + pvOf(120000, 0.13, 2, 1) + pvOf(250000, 0.13, 2, 3), "cash price, 13% half-yearly");

// ------ Week 6 ------------------------------------------------------------------------------------------------------------------------------------------------------------
// Annuities. Everything here is built from the two bracket factors rather than
// from any figure printed in the notes or worked out by hand elsewhere, so a
// wrong number in week6.js cannot agree with itself.
//
// The rate questions have no closed form. They are bisected here — a different
// method from the financial calculator the notes use, which is the point: two
// routes to the same number.

// What n payments of R1 are worth at the END of the term, and at the start.
function fvFactor(i, n) { return (Math.pow(1 + i, n) - 1) / i; }
function pvFactor(i, n) { return (1 - Math.pow(1 + i, -n)) / i; }
function annFv(pmt, i, n) { return pmt * fvFactor(i, n); }
function annPmtFromFv(fv, i, n) { return fv / fvFactor(i, n); }
function annPmtFromPv(pv, i, n) { return pv / pvFactor(i, n); }

/* Both factors rise strictly with the rate, so bisection is safe. */
function bisect(f, target) {
    var lo = 1e-9, hi = 1, mid, k;
    for (k = 0; k < 200; k++) { mid = (lo + hi) / 2; if (f(mid) < target) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
}
function rateForFv(pmt, n, fv) { return bisect(function (x) { return annFv(pmt, x, n); }, fv); }
function rateForPmt(pv, n, pmt) { return bisect(function (x) { return annPmtFromPv(pv, x, n); }, pmt); }
function termFor(pv, pmt, i) { return -Math.log(1 - pv * i / pmt) / Math.log(1 + i); }

// Lesson 1 - the pay-point tablet, and the annuity formula
chk("w6a4", 1000 * Math.pow(1.10, 4) - 1000, "interest on the first of five R1 000 deposits");
chk("w6a5", annFv(1000, 0.10, 5), "R1 000 a year, 10%, 5 years");
chk("w6f2", annFv(1000, 0.10, 5), "the same by the annuity formula");
chk("w6f3", annFv(500, 0.08 / 12, 12), "R500 a month, i(12) = 8%, 12 months");
chk("w6f4", annFv(2500, 0.0725 / 12, 60), "R2 500 monthly, 7.25%, 5 years");
chk("w6f5", annFv(1800, 0.0725 / 2, 8), "R1 800 half-yearly, 7.25%, 4 years");
chk("w6f6", annFv(3500, 0.085 / 4, 32), "R3 500 quarterly, 8.5%, 8 years");
step("w6f7", 0, 0.048 / 12, "4.8% as a monthly rate");
step("w6f7", 1, 36, "payments in 3 years, monthly");
step("w6f7", 2, fvFactor(0.048 / 12, 36), "the FV bracket");
step("w6f7", 3, annFv(1500, 0.048 / 12, 36), "R1 500 monthly, 4.8%, 3 years");

chk("w6c5", annFv(1000, 0.10, 5), "the calculator's answer for the tablet");

// Lesson 1 - solving for the payment
chk("w6p1", annPmtFromFv(10000, 0.10, 5), "PMT for R10 000 in 5 years at 10%");
chk("w6p2", annPmtFromFv(10000, 0.08 / 12, 12), "PMT for R10 000 in 12 months at i(12) = 8%");
chk("w6p4", annPmtFromPv(35000, 0.15 / 12, 8), "instalment on R35 000, 15%, 8 months");
chk("w6p5", annPmtFromPv(52500, 0.09 / 12, 12), "instalment on R52 500, 9%, 12 months");
chk("w6p6", annPmtFromPv(60000, 0.085 / 4, 9), "instalment on R60 000, 8.5%, 9 quarters");
chk("w6p7", annPmtFromPv(72000, 0.132 / 4, 14), "instalment on R72 000, 13.2%, 14 quarters");

// Lesson 1 - solving for the rate and the term. Stored as percentages a year,
// so the periodic rate is scaled back up by the number of periods.
chk("w6r2", rateForFv(750, 12, 9500) * 12 * 100, "rate for R750 a month reaching R9 500");
chk("w6r3", rateForFv(1500, 36, 62403.85) * 12 * 100, "rate for R1 500 a month reaching R62 403.85");
chk("w6r4", rateForFv(6500, 28, 236540.30) * 4 * 100, "rate for R6 500 a quarter reaching R236 540.30");
chk("w6r5", rateForFv(11500, 11, 203804.35) * 1 * 100, "rate for R11 500 a year reaching R203 804.35");
chk("w6r6", termFor(250000, 7685.03, 0.067 / 12), "payments to clear R250 000 at 6.7%");
chk("w6r7", termFor(2400000, 23961.12, 0.105 / 12), "payments to clear R2 400 000 at 10.5%");
chk("w6r8", termFor(230000, 37848.58, 0.131 / 2), "payments to clear R230 000 at 13.1%");

// Lesson 2 - what the truck costs
chk("w6l1", 9262 * 72, "total paid on the pickup truck");
chk("w6l2", 9262 * 72 - 499950, "interest on the pickup truck");
chk("w6l3", rateForPmt(499950, 72, 9262) * 12 * 100, "the rate behind the truck finance");
step("w6l6", 0, 9262 * 72, "total paid");
step("w6l6", 1, 9262 * 72 - 499950, "interest");
step("w6l6", 2, 0, "FV of a fully amortised loan");
step("w6l6", 3, rateForPmt(499950, 72, 9262) * 12 * 100, "the rate");

// Lesson 2 - the repayment schedule. The single-repayment loan is rolled
// forward year by year rather than powered up in one go, which is the schedule
// the notes build and a genuinely different route to R8 052.55.
var roll = 5000, yr;
for (yr = 1; yr <= 5; yr++) roll = roll * 1.10;
chk("w6s1", roll, "R5 000 at 10% for 5 years, rolled forward a year at a time");
var roll3 = 5000;
for (yr = 1; yr <= 3; yr++) roll3 = roll3 * 1.10;
chk("w6s2", roll3, "settling that loan at the end of year 3");
chk("w6s5", 26459.71 * pvFactor(0.15 / 4, 7), "outstanding after 1 of 8 quarterly payments");
chk("w6s6", 26459.71 * pvFactor(0.15 / 4, 6), "outstanding after 2 of 8 quarterly payments");
chk("w6s7", 62412.60 * pvFactor(0.095, 2), "outstanding after 2 of 4 yearly payments");

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

