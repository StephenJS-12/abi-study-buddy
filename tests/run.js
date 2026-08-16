// Runs one check file and fails loudly if it dies part-way through.
//
// cscript exits with code 0 when a script stops on a runtime error, so a check that
// crashed half way looked identical to one that passed, and "Run all checks.bat"
// happily printed ALL CHECKS PASSED over the top of it. Every check goes through
// here so that cannot happen.
//
//   cscript //Nologo //E:JScript run.js maths.js

var fso = new ActiveXObject("Scripting.FileSystemObject");
var name = WScript.Arguments(0);

var src;
try {
    var f = fso.OpenTextFile(name, 1);
    src = f.AtEndOfStream ? "" : f.ReadAll();
    f.Close();
} catch (e) {
    WScript.Echo("COULD NOT READ " + name + " :: " + e.message);
    WScript.Quit(1);
}

try {
    // A check that finishes normally calls WScript.Quit itself and never returns here.
    eval(src);
} catch (err) {
    WScript.Echo("");
    WScript.Echo("CRASHED: " + name + " :: " + err.message);
    WScript.Quit(1);
}

// Reached only if the check forgot to report a result at all, which is also a failure.
WScript.Echo("");
WScript.Echo("NO RESULT: " + name + " ended without reporting anything.");
WScript.Quit(1);
