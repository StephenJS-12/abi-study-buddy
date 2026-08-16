var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Moving progress between computers: the code must carry every saved field across
// exactly, and must refuse anything that arrived damaged rather than restoring a
// half-copied paste over the top of real progress.

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, t) { for (var i = 0; i < this.length; i++) fn.call(t, this[i], i, this); };
}
if (!Object.keys) {
    Object.keys = function (o) { var a = []; for (var k in o) if (o.hasOwnProperty(k)) a.push(k); return a; };
}
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () { return "2026-08-16T09:30:00.000Z"; };
}
var JSON = {
    stringify: function (v) {
        if (v === null) return "null";
        var t = typeof v;
        if (t === "number" || t === "boolean") return String(v);
        if (t === "string") return '"' + v.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
        if (v instanceof Array) {
            var a = []; for (var i = 0; i < v.length; i++) a.push(JSON.stringify(v[i]));
            return "[" + a.join(",") + "]";
        }
        var parts = [];
        for (var k in v) {
            if (!v.hasOwnProperty(k)) continue;
            if (typeof v[k] === "undefined" || typeof v[k] === "function") continue;
            parts.push(JSON.stringify(String(k)) + ":" + JSON.stringify(v[k]));
        }
        return "{" + parts.join(",") + "}";
    },
    parse: function (s) { return eval("(" + s + ")"); }
};

// WSH has no btoa/atob, so the browser's pair is reproduced here. If these were
// wrong the round-trip test below would fail, which is the point of testing it.
var B64SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function btoa(s) {
    var out = "", i = 0;
    while (i < s.length) {
        var c1 = s.charCodeAt(i++), c2 = s.charCodeAt(i++), c3 = s.charCodeAt(i++);
        if (c1 > 255) throw new Error("btoa: character out of byte range");
        var e1 = c1 >> 2;
        var e2 = ((c1 & 3) << 4) | (isNaN(c2) ? 0 : (c2 >> 4));
        var e3 = isNaN(c2) ? 64 : (((c2 & 15) << 2) | (isNaN(c3) ? 0 : (c3 >> 6)));
        var e4 = isNaN(c3) ? 64 : (c3 & 63);
        out += B64SET.charAt(e1) + B64SET.charAt(e2) +
               (e3 === 64 ? "=" : B64SET.charAt(e3)) +
               (e4 === 64 ? "=" : B64SET.charAt(e4));
    }
    return out;
}
function atob(s) {
    s = String(s).replace(/=+$/, "");
    var out = "", bits = 0, acc = 0;
    for (var i = 0; i < s.length; i++) {
        var v = B64SET.indexOf(s.charAt(i));
        if (v < 0) throw new Error("atob: bad character");
        acc = (acc << 6) | v;
        bits += 6;
        if (bits >= 8) { bits -= 8; out += String.fromCharCode((acc >> bits) & 255); }
    }
    return out;
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var JS = REPO + "\\public\\js\\";
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

var store = {};
var localStorage = {
    getItem: function (k) { return store.hasOwnProperty(k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; }
};

var Store, Transfer;
eval(read(JS + "storage.js"));
eval(read(JS + "transfer.js"));

var fails = [], n = 0;
function check(cond, msg) { n++; if (!cond) fails.push(msg); }

// ── build a machine that has been used for a while ─────────────
Store.addPoints("test");                      // 1
for (var i = 0; i < 20; i++) Store.addPoints("exam");   // +40 = 41
Store.recordAnswer("w1-bodmas", true);
Store.recordAnswer("w1-bodmas", true);
Store.recordAnswer("w1-bodmas", false);
Store.recordAnswer("w3-mean", true);
Store.noteStreak(9);
Store.claim(10);
Store.claim(25);
Store.setMotion(false);
Store.rememberSetup("week2", { topics: ["w2-markup"], mode: "test", count: 20 });

var before = Store.snapshot();
check(before.points === 41, "set-up sanity: expected 41 points, got " + before.points);
check(before.totalAnswered === 4, "set-up sanity: expected 4 answered, got " + before.totalAnswered);

// ── the code itself ────────────────────────────────────────────
var code = Transfer.makeCode();
check(typeof code === "string" && code.length > 40, "a code should be produced");
check(code.indexOf(Transfer.TAG) === 0, "a code should start with the " + Transfer.TAG + " tag");
check(!/\s/.test(code), "a code must be one unbroken line, so a paste cannot lose part of it");

// ── reading it back tells the truth before anything is replaced ─
var reading = Transfer.inspect(code);
check(reading.ok, "a freshly made code should read cleanly");
check(reading.points === 41, "the reading should report 41 points, reported " + reading.points);
check(reading.badges === 0, "no badge is earned at 2 correct in a topic, reported " + reading.badges);
check(reading.correct === 3, "the reading should report 3 correct answers, reported " + reading.correct);

// whitespace from a paste that wrapped across lines must not matter
var wrapped = code.substring(0, 30) + "\r\n  " + code.substring(30, 60) + "\n" + code.substring(60);
check(Transfer.inspect(wrapped).ok, "a code that wrapped onto several lines should still read");
check(Transfer.inspect("  " + code + "  \n").ok, "leading and trailing whitespace should be tolerated");

// ── damaged codes must be refused, not half-applied ────────────
check(!Transfer.inspect("").ok, "an empty box should be refused");
check(!Transfer.inspect("hello").ok, "random text should be refused");
check(!Transfer.inspect(code.substring(0, code.length - 12)).ok,
      "a code copied short must be refused (this is the likeliest paste mistake)");
check(!Transfer.inspect(code.substring(10)).ok, "a code missing its start must be refused");

// one character altered in the middle of the payload
var mid = Math.floor(code.length / 2);
var swapped = code.charAt(mid) === "A" ? "B" : "A";
var tampered = code.substring(0, mid) + swapped + code.substring(mid + 1);
check(tampered !== code, "tamper set-up should actually change a character");
check(!Transfer.inspect(tampered).ok, "a code with a character altered must be refused");

// every truncation must be refused, not just the one tried above
var truncFails = 0, truncTried = 0;
for (var cut = 1; cut < code.length; cut += 7) {
    truncTried++;
    if (Transfer.inspect(code.substring(0, cut)).ok) truncFails++;
}
n++;
if (truncFails > 0) {
    fails.push(truncFails + " of " + truncTried + " truncated codes were wrongly accepted");
}

// ── the other laptop ───────────────────────────────────────────
Store.wipe();
check(Store.points() === 0, "the receiving machine should start empty");

check(Transfer.apply(Transfer.inspect(code)), "applying a good code should succeed");

var after = Store.snapshot();
check(after.points === before.points, "points should carry across: " + before.points + " -> " + after.points);
check(after.bestStreak === before.bestStreak, "best streak should carry across");
check(after.totalCorrect === before.totalCorrect, "correct count should carry across");
check(after.totalAnswered === before.totalAnswered, "answered count should carry across");
check(after.topicCorrect["w1-bodmas"] === 2, "per-topic counts should carry across");
check(after.topicCorrect["w3-mean"] === 1, "every topic should carry across, not just the first");
check(Store.hasClaimed(10) && Store.hasClaimed(25), "claimed rewards should stay claimed");
check(!Store.hasClaimed(45), "an unclaimed reward must not arrive claimed");
check(Store.motionOn() === false, "the celebrations setting should carry across");
check(Store.recallSetup("week2") && Store.recallSetup("week2").count === 20,
      "the remembered quiz set-up should carry across");

// a badge earned before the move must arrive already earned
Store.wipe();
for (var b = 0; b < Store.BADGE_AT; b++) Store.recordAnswer("w4-fv", true);
check(Store.hasBadge("w4-fv"), "set-up sanity: the badge should be earned before moving");
var badgeCode = Transfer.makeCode();
check(Transfer.inspect(badgeCode).badges === 1, "the reading should count the earned badge");
Store.wipe();
Transfer.apply(Transfer.inspect(badgeCode));
check(Store.hasBadge("w4-fv"), "an earned badge must arrive earned, not have to be re-earned");

// ── a nonsense payload must not be able to break the app ───────
Store.wipe();
Store.restore({ points: -50, totalCorrect: 9, totalAnswered: 2, bestStreak: "oops",
                topicCorrect: { good: 3, bad: "x", worse: -1 }, badges: null, claimed: 7 });
check(Store.points() === 0, "negative points must floor at 0, got " + Store.points());
check(Store.get().bestStreak === 0, "a non-numeric streak must fall back to 0");
check(Store.get().topicCorrect.good === 3, "a sane topic count must survive sanitising");
check(!("bad" in Store.get().topicCorrect) && !("worse" in Store.get().topicCorrect),
      "junk topic counts must be dropped");
check(Store.accuracy() <= 100, "accuracy must never exceed 100%, got " + Store.accuracy() + "%");
check(Store.badgeCount() === 0, "a null badge map must become an empty one");

Store.restore({ points: 99999 });
check(Store.points() === Store.POINT_CAP,
      "points above the cap must clamp to " + Store.POINT_CAP + ", got " + Store.points());

check(Store.restore(null) === false, "restoring nothing should report failure");
check(Store.restore("nope") === false, "restoring a string should report failure");

// ── characters beyond plain ASCII ──────────────────────────────
// Nothing saved today needs this, but a future topic title with an accent or an
// emoji would break a naive base64 round-trip, and silently.
var awkward = "Rands R1 234,56 \u2014 caf\u00E9 \u00F7 \u00D7 \u2212 \uD83D\uDC96 100%";
check(Transfer.fromBase64(Transfer.toBase64(awkward)) === awkward,
      "accents, maths signs, percent signs and emoji must survive the round trip");
check(Transfer.fromBase64(Transfer.toBase64("")) === "", "an empty string must round trip");

// the checksum must actually distinguish things
check(Transfer.checksum("abc") !== Transfer.checksum("abd"), "the checksum must differ for different text");
check(Transfer.checksum("abc") === Transfer.checksum("abc"), "the checksum must be stable");

WScript.Echo("Transfer checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("Progress moves across intact, and damaged codes are refused.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
