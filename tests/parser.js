var REPO = (function () { var f = new ActiveXObject("Scripting.FileSystemObject"); return f.GetParentFolderName(f.GetParentFolderName(WScript.ScriptFullName)); })();
// Extracts the REAL parseNum/closeEnough source out of quiz.js and tests it,
// so we are testing shipped code rather than a copy.
// JScript is ES3: polyfill the ES5 bits browsers already have.
if (!String.prototype.trim) {
    String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""); };
}

// Must read as UTF-8: quiz.js contains a U+2212 minus in the normalisation regex,
// and FileSystemObject would mangle it to mojibake.
function readUtf8(path) {
    var st = new ActiveXObject("ADODB.Stream");
    st.Type = 2; st.Charset = "utf-8"; st.Open();
    st.LoadFromFile(path);
    var s = st.ReadText();
    st.Close();
    return s;
}
var src = readUtf8(REPO + "\\public\\js\\quiz.js");

var start = src.indexOf("function parseNum");
var end = src.indexOf("function esc");
if (start < 0 || end < 0 || end <= start) { WScript.Echo("Could not locate functions"); WScript.Quit(1); }
var slice = src.substring(start, end);

var mk = new Function(slice + "\n return { parseNum: parseNum, closeEnough: closeEnough };");
var api = mk();
var parseNum = api.parseNum, closeEnough = api.closeEnough;

var fails = [], testCount = 0;
function eq(input, expected, note) {
    testCount++;
    var got = parseNum(input);
    var ok = (isNaN(expected) && isNaN(got)) || (Math.abs(got - expected) < 1e-9);
    if (!ok) fails.push("parseNum(" + JSONish(input) + ") = " + got + ", expected " + expected + (note ? "  [" + note + "]" : ""));
}
function JSONish(v) { return '"' + String(v) + '"'; }

// plain numbers
eq("150", 150);
eq("12.33", 12.33);
eq("-8", -8);
eq("0.4167", 0.4167);
eq("  42  ", 42, "surrounding spaces");

// currency and percent decoration the student might type
eq("R150", 150, "leading R");
eq("r150", 150, "lowercase r");
eq("80%", 80, "trailing percent");
eq("R1 700 000", 1700000, "SA thousands spaces");
eq("R47 500", 47500);
eq("1 312 932.38", 1312932.38);

// separators
eq("1,234.56", 1234.56, "US grouping + decimal point");
eq("47,500", 47500, "comma thousands group");
eq("12,33", 12.33, "SA comma decimal");
eq("0,75", 0.75, "SA comma decimal small");
eq("2,85", 2.85);
eq("1,700,000", 1700000, "multiple comma groups");

// typographic minus, which the generated solutions display.
// Built from escapes so this test file's own encoding cannot distort it.
var MINUS = String.fromCharCode(0x2212), ENDASH = String.fromCharCode(0x2013);
eq(MINUS + "20", -20, "unicode minus U+2212");
eq(MINUS + "R3 060", -3060, "unicode minus with currency and spacing");
eq(ENDASH + "45.5", -45.5, "en dash");

eq("-20", -20, "ascii minus still fine");

// rubbish should be rejected
eq("", NaN, "empty");
eq("   ", NaN, "whitespace only");
eq("abc", NaN, "letters");
eq("R", NaN, "bare currency symbol");

// tolerance behaviour
function tol(given, target, t, expected, note) {
    testCount++;
    var got = closeEnough(given, target, t);
    if (got !== expected) fails.push("closeEnough(" + given + "," + target + "," + t + ") = " + got + ", expected " + expected + (note ? "  [" + note + "]" : ""));
}
tol(12.33, 12.33, 0.02, true);
tol(12.34, 12.33, 0.02, true, "within tolerance");
tol(12.3, 12.33, 0.02, false, "outside tolerance");
tol(80.95, 80.95, 0.02, true);
tol(NaN, 50, 0.01, false, "NaN never passes");
tol(-8, -8, 0.05, true, "negative answers");
tol(1312932.38, 1312932.38, 1, true, "large rand values");
tol(163.86, 163.861644, 0.05, true, "rounded compound interest accepted");
tol(2.16, 2.1602468, 0.02, true, "rounded standard deviation accepted");
tol(0.4167, 0.41666667, 0.0005, true, "4dp monthly rate accepted");
tol(0.42, 0.41666667, 0.0005, false, "over-rounded monthly rate rejected");

WScript.Echo("parseNum / closeEnough tests run: " + testCount);
WScript.Echo("");
if (!fails.length) {
    WScript.Echo("All answer-parsing tests passed.");
} else {
    WScript.Echo(fails.length + " FAILURE(S):");
    for (var i = 0; i < fails.length; i++) WScript.Echo("  - " + fails[i]);
}
WScript.Quit(fails.length);
