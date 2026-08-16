var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Which copy of her progress wins when the laptop and the server disagree.
//
// Everything else in the sync layer is I/O and can be watched; this decision
// cannot. Getting it backwards would quietly replace an evening's work with an
// older copy and look exactly like nothing had happened.

var fso = new ActiveXObject("Scripting.FileSystemObject");
function read(p) { var f = fso.OpenTextFile(p, 1); var s = f.AtEndOfStream ? "" : f.ReadAll(); f.Close(); return s; }

// cloud.js reaches for browser globals as it loads. Only `decide` is under
// test, and it touches none of them, so bare stubs are enough.
var location = { protocol: "https:", pathname: "/", replace: function () {} };
var window = { addEventListener: function () {} };
var document = { addEventListener: function () {} };
function setTimeout() {}
function clearTimeout() {}
function fetch() {}
function encodeURIComponent(s) { return s; }

var Cloud;
eval(read(REPO + "\\public\\js\\cloud.js"));

var fails = [], n = 0;
function check(got, want, msg) {
    n++;
    if (got !== want) fails.push(msg + " (expected " + want + ", got " + got + ")");
}

var EARLY = "2026-08-16T09:00:00.000Z";
var LATE  = "2026-08-16T21:30:00.000Z";

// ── a brand new device ─────────────────────────────────────────
check(Cloud.decide("", LATE, true, false), "take-remote",
      "a device with nothing saved must take the server's copy");
check(Cloud.decide("", null, false, false), "nothing",
      "nothing anywhere means there is nothing to do");

// ── the ordinary cases ─────────────────────────────────────────
check(Cloud.decide(EARLY, LATE, true, true), "take-remote",
      "a newer server copy wins");
check(Cloud.decide(LATE, EARLY, true, true), "send-local",
      "a newer local copy wins");
check(Cloud.decide(LATE, LATE, true, true), "in-sync",
      "identical timestamps need no transfer");

// ── the case that would lose her work ──────────────────────────
// She studies on the laptop offline, then opens her phone, which last synced
// this morning. The phone must NOT push its stale copy over the newer one.
check(Cloud.decide(EARLY, LATE, true, true), "take-remote",
      "a stale device must never overwrite a newer server copy");

// And the reverse: the laptop that did the work must win over the server.
check(Cloud.decide(LATE, EARLY, true, true), "send-local",
      "the device that did the work must win over an older server copy");

// ── first ever upload ──────────────────────────────────────────
check(Cloud.decide(LATE, null, false, true), "send-local",
      "progress on the device and none on the server must be uploaded");
check(Cloud.decide(LATE, undefined, true, true), "send-local",
      "a server record with no timestamp must not beat real local progress");

// ── ordering must be chronological, not alphabetical-by-accident ──
// ISO-8601 UTC sorts correctly as text; this pins that assumption down so a
// future change to the timestamp format cannot break it unnoticed.
var pairs = [
    ["2026-08-16T09:00:00.000Z", "2026-08-16T10:00:00.000Z"],  // hour
    ["2026-08-16T23:59:59.000Z", "2026-08-17T00:00:00.000Z"],  // day boundary
    ["2026-08-31T23:00:00.000Z", "2026-09-01T01:00:00.000Z"],  // month boundary
    ["2026-12-31T23:00:00.000Z", "2027-01-01T01:00:00.000Z"],  // year boundary
    ["2026-08-16T09:00:00.000Z", "2026-08-16T09:00:00.500Z"]   // sub-second
];
for (var i = 0; i < pairs.length; i++) {
    var older = pairs[i][0], newer = pairs[i][1];
    check(Cloud.decide(older, newer, true, true), "take-remote",
          "newer server time " + newer + " should beat " + older);
    check(Cloud.decide(newer, older, true, true), "send-local",
          "newer local time " + newer + " should beat " + older);
}

WScript.Echo("Sync reconciliation checks run: " + n);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("The newer copy always wins, and a stale device never overwrites a fresh one.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var f = 0; f < fails.length; f++) WScript.Echo("  - " + fails[f]);
}
WScript.Quit(fails.length);
