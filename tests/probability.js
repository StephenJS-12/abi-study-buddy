// Independently verifies every probability the new question generators state.
//
// Nothing here reuses the generators' arithmetic. A deck of 52 cards is built
// card by card, dice outcomes are listed face by face, and two-card draws are
// enumerated as every ordered pair that could actually come out. The generated
// answer then has to agree with the count. If a formula in generators.js is
// wrong, this disagrees with it rather than repeating it.

if (!Array.prototype.forEach) { Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); }; }
if (!Array.prototype.map) { Array.prototype.map = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn.call(t, this[i], i, this)); return o; }; }
if (!Array.prototype.filter) { Array.prototype.filter = function (fn, t) { var o = []; for (var i = 0; i < this.length; i++) if (fn.call(t, this[i], i, this)) o.push(this[i]); return o; }; }
if (!Array.prototype.indexOf) { Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; }; }
if (!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); }; }

var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
var JS = REPO + "\\public\\js\\";

function read(p) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(p); var s = st.ReadText(); st.Close(); return s;
}

var Rand, GEN;
eval(read(JS + "rng.js"));
eval(read(JS + "generators.js"));

var problems = [], checks = 0;

function strip(s) { return String(s == null ? "" : s).replace(/<[^>]*>/g, ""); }

// -- a real deck, built one card at a time -------------------------------
var DECK = [];
(function buildDeck() {
    var suits = [
        { name: "hearts", red: true }, { name: "diamonds", red: true },
        { name: "clubs", red: false }, { name: "spades", red: false }
    ];
    var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    for (var s = 0; s < suits.length; s++) {
        for (var r = 0; r < ranks.length; r++) {
            DECK.push({ suit: suits[s].name, red: suits[s].red, rank: ranks[r] });
        }
    }
})();

if (DECK.length !== 52) problems.push("deck built with " + DECK.length + " cards, not 52");

function isFace(c) { return c.rank === "J" || c.rank === "Q" || c.rank === "K"; }
function isTenUp(c) { return c.rank === "10" || isFace(c) || c.rank === "A"; }

// Each phrase the generators can print, paired with what it means on a real card.
var CRIT = [
    { text: "a heart", fn: function (c) { return c.suit === "hearts"; } },
    { text: "a spade", fn: function (c) { return c.suit === "spades"; } },
    { text: "a diamond", fn: function (c) { return c.suit === "diamonds"; } },
    { text: "a red card", fn: function (c) { return c.red; } },
    { text: "a black card", fn: function (c) { return !c.red; } },
    { text: "a face card (jack, queen or king)", fn: isFace },
    { text: "a black face card", fn: function (c) { return !c.red && isFace(c); } },
    { text: "an ace", fn: function (c) { return c.rank === "A"; } },
    { text: "a king", fn: function (c) { return c.rank === "K"; } },
    { text: "a queen", fn: function (c) { return c.rank === "Q"; } },
    { text: "a ten or higher (10, J, Q, K, A)", fn: isTenUp },
    { text: "both are kings", fn: function (c) { return c.rank === "K"; } },
    { text: "both are hearts", fn: function (c) { return c.suit === "hearts"; } },
    { text: "both are aces", fn: function (c) { return c.rank === "A"; } },
    { text: "both are red", fn: function (c) { return c.red; } },
    { text: "both are black", fn: function (c) { return !c.red; } },
    { text: "both are face cards (jack, queen or king)", fn: isFace },
    { text: "both are tens or higher (10, J, Q, K, A)", fn: isTenUp }
];

function critFor(text) {
    for (var i = 0; i < CRIT.length; i++) if (CRIT[i].text === text) return CRIT[i].fn;
    return null;
}

function countDeck(fn) {
    var n = 0;
    for (var i = 0; i < DECK.length; i++) if (fn(DECK[i])) n++;
    return n;
}

// Sanity: the phrases must mean what the module says they mean.
(function deckSelfCheck() {
    var want = [
        ["a heart", 13], ["a red card", 26], ["a face card (jack, queen or king)", 12],
        ["an ace", 4], ["a black face card", 6], ["a ten or higher (10, J, Q, K, A)", 20]
    ];
    for (var i = 0; i < want.length; i++) {
        var got = countDeck(critFor(want[i][0]));
        if (got !== want[i][1]) {
            problems.push("DECK WRONG: '" + want[i][0] + "' counts " + got + ", expected " + want[i][1]);
        }
    }
})();

// The value of whichever option is marked correct.
function statedAnswer(q) {
    if (q.type === "mcq") return Rand.value(q.options[q.answer]);
    return q.answer;
}

function near(a, b) { return Math.abs(a - b) <= Math.max(Math.abs(a), Math.abs(b), 1e-9) * 1e-9; }

function check(label, q, truth) {
    checks++;
    var got = statedAnswer(q);
    if (got === null) { problems.push(label + ": could not read the stated answer"); return; }
    if (!near(got, truth)) {
        problems.push(label + ": states " + got + ", enumeration gives " + truth +
                      "  ::  " + strip(q.prompt).substring(0, 90));
    }
}

// -- one card from the deck ----------------------------------------------
var fns = GEN.registered()["w3-prob"];
for (var run = 0; run < 600; run++) {
    var q = fns[2]();                       // the deck generator
    if (!q) continue;
    var m = /that it is (<b>not<\/b> )?(.+)\?$/.exec(q.prompt);
    if (!m) { problems.push("w3-prob deck: prompt not recognised -> " + strip(q.prompt)); break; }
    var fn = critFor(m[2]);
    if (!fn) { problems.push("w3-prob deck: unknown criterion '" + m[2] + "'"); break; }
    var hits = countDeck(fn);
    if (m[1]) hits = 52 - hits;
    check("w3-prob deck", q, hits / 52);
}

// -- a bag of counters ---------------------------------------------------
fns = GEN.registered()["w3-prob"];
for (run = 0; run < 600; run++) {
    q = fns[3]();
    if (!q) continue;
    var sc = /(\d+) red counters, (\d+) blue counters and (\d+) green counters/.exec(strip(q.scenario));
    var wantCol = /probability that it is (\w+)\?/.exec(strip(q.prompt));
    if (!sc || !wantCol) { problems.push("w3-prob bag: could not read the scenario"); break; }
    var counts = { red: +sc[1], blue: +sc[2], green: +sc[3] };
    var totalBag = counts.red + counts.blue + counts.green;
    check("w3-prob bag", q, counts[wantCol[1]] / totalBag);
}

// -- either/or on one card, counted over the whole deck -------------------
fns = GEN.registered()["w3-add"];
for (run = 0; run < 600; run++) {
    q = fns[0]();
    if (!q) continue;
    var bits = /that it is <b>(.+) or (.+)<\/b>\?$/.exec(q.prompt);
    if (!bits) { problems.push("w3-add cards: prompt not recognised -> " + strip(q.prompt)); break; }
    // "a face card (jack, queen or king)" contains " or ", so try both splits.
    var A = critFor(bits[1]), B = critFor(bits[2]);
    if (!A || !B) {
        var whole = /that it is <b>(.+)<\/b>\?$/.exec(q.prompt)[1];
        var found = null;
        for (var ci = 0; ci < CRIT.length && !found; ci++) {
            var head = CRIT[ci].text;
            if (whole.substring(0, head.length + 4) === head + " or ") {
                var tail = whole.substring(head.length + 4);
                if (critFor(tail)) found = [CRIT[ci].fn, critFor(tail)];
            }
        }
        if (!found) { problems.push("w3-add cards: unknown criteria in '" + whole + "'"); break; }
        A = found[0]; B = found[1];
    }
    var either = 0;
    for (var d = 0; d < DECK.length; d++) if (A(DECK[d]) || B(DECK[d])) either++;
    check("w3-add cards", q, either / 52);
}

// -- either/or on one die ------------------------------------------------
var DIE_SETS = {
    "even": [2, 4, 6], "odd": [1, 3, 5], "greater than 3": [4, 5, 6],
    "less than 3": [1, 2], "a multiple of 3": [3, 6], "at least 5": [5, 6],
    "a prime number": [2, 3, 5]
};
for (run = 0; run < 600; run++) {
    q = fns[1]();
    if (!q) continue;
    var dm = /the result is <b>(.+) or (.+)<\/b>\?$/.exec(q.prompt);
    if (!dm || !DIE_SETS[dm[1]] || !DIE_SETS[dm[2]]) {
        problems.push("w3-add die: prompt not recognised -> " + strip(q.prompt)); break;
    }
    var union = 0;
    for (var face = 1; face <= 6; face++) {
        if (DIE_SETS[dm[1]].indexOf(face) !== -1 || DIE_SETS[dm[2]].indexOf(face) !== -1) union++;
    }
    check("w3-add die", q, union / 6);
}

// -- two cards, every ordered pair actually enumerated --------------------
fns = GEN.registered()["w3-mult"];

function pairProbability(fn, replaced) {
    var good = 0, total = 0;
    for (var i = 0; i < 52; i++) {
        for (var j = 0; j < 52; j++) {
            if (!replaced && i === j) continue;      // the first card is gone
            total++;
            if (fn(DECK[i]) && fn(DECK[j])) good++;
        }
    }
    return { p: good / total, total: total };
}

(function pairSelfCheck() {
    var noRepl = pairProbability(function (c) { return c.rank === "K"; }, false);
    if (noRepl.total !== 2652) problems.push("PAIR WRONG: " + noRepl.total + " ordered pairs without replacement, expected 2652");
    var repl = pairProbability(function (c) { return c.rank === "K"; }, true);
    if (repl.total !== 2704) problems.push("PAIR WRONG: " + repl.total + " ordered pairs with replacement, expected 2704");
})();

for (run = 0; run < 600; run++) {
    q = fns[1]();                            // without replacement
    if (!q) continue;
    var cm = /probability that (both .+)\?$/.exec(q.prompt);
    var cf = cm && critFor(cm[1]);
    if (!cf) { problems.push("w3-mult no-replacement: unknown criterion -> " + strip(q.prompt)); break; }
    check("w3-mult without replacement", q, pairProbability(cf, false).p);
}

for (run = 0; run < 600; run++) {
    q = fns[2]();                            // with replacement
    if (!q) continue;
    cm = /probability that (both .+)\?$/.exec(q.prompt);
    cf = cm && critFor(cm[1]);
    if (!cf) { problems.push("w3-mult with replacement: unknown criterion -> " + strip(q.prompt)); break; }
    check("w3-mult with replacement", q, pairProbability(cf, true).p);
}

// -- two pens from a box, enumerated the same way -------------------------
for (run = 0; run < 600; run++) {
    q = fns[3]();
    if (!q) continue;
    var pm = /(\d+) red pens and (\d+) blue pens/.exec(strip(q.scenario));
    if (!pm) { problems.push("w3-mult pens: could not read the box"); break; }
    var redN = +pm[1], blueN = +pm[2], tot = redN + blueN;
    var goodPairs = 0, allPairs = 0;
    for (var a = 0; a < tot; a++) {
        for (var b = 0; b < tot; b++) {
            if (a === b) continue;
            allPairs++;
            if (a < redN && b < redN) goodPairs++;    // first `redN` pens are the red ones
        }
    }
    check("w3-mult pens", q, goodPairs / allPairs);
}

// -- the calculator's future value ---------------------------------------
// Checked by multiplying the balance forward one period at a time, which is
// what compounding actually is, rather than by reusing Math.pow.
var PER_YEAR = { "annually": 1, "half-yearly": 2, "quarterly": 4, "monthly": 12 };
fns = GEN.registered()["w4-calc"];
for (run = 0; run < 400; run++) {
    q = fns[5]();
    if (!q) continue;
    var fm = /R([\d\s]+) is invested for (\d+) years at ([\d.]+)% per annum compounded ([a-z-]+)\./.exec(strip(q.scenario));
    if (!fm) { problems.push("w4-calc FV: could not read the scenario -> " + strip(q.scenario)); break; }
    var pv = parseFloat(fm[1].replace(/\s/g, "")), yrs = +fm[2], rate = parseFloat(fm[3]);
    var m = PER_YEAR[fm[4]];
    if (!m) { problems.push("w4-calc FV: unknown frequency " + fm[4]); break; }
    var bal = pv, periodRate = rate / 100 / m;
    for (var p = 0; p < yrs * m; p++) bal = bal * (1 + periodRate);
    checks++;
    if (Math.abs(bal - q.answer) > 1) {
        problems.push("w4-calc FV: states " + q.answer + ", compounding period by period gives " +
                      Math.round(bal * 100) / 100);
    }
}

// The worked example the module's own notes give: R100 at 10% p.a. compounded
// quarterly for 5 years comes to 163.86. If this disagrees, the model is wrong.
(function notesExample() {
    checks++;
    var bal = 100;
    for (var p = 0; p < 20; p++) bal = bal * (1 + 0.10 / 4);
    if (Math.abs(bal - 163.86) > 0.01) {
        problems.push("MODEL WRONG: the notes' own example gives " + (Math.round(bal * 100) / 100) + ", not 163.86");
    }
})();

// -- the periodic rate ----------------------------------------------------
for (run = 0; run < 400; run++) {
    q = fns[7]();
    if (!q) continue;
    var rm = /at <b>([\d.]+)% per annum compounded ([a-z-]+)<\/b>/.exec(q.prompt);
    if (!rm) { problems.push("w4-calc rate: prompt not recognised"); break; }
    checks++;
    var truth = parseFloat(rm[1]) / PER_YEAR[rm[2]];
    if (Math.abs(truth - q.answer) > 0.0005) {
        problems.push("w4-calc rate: states " + q.answer + ", expected " + truth);
    }
}

WScript.Echo("");
WScript.Echo("Probability and interest answers verified: " + checks);
if (problems.length) {
    WScript.Echo("");
    WScript.Echo(problems.length + " PROBLEM(S):");
    for (var i = 0; i < problems.length && i < 25; i++) WScript.Echo("  - " + problems[i]);
    WScript.Quit(1);
}
WScript.Echo("");
WScript.Echo("Every stated answer matches an independent count.");
WScript.Quit(0);
