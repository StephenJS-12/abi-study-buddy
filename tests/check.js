// Compile-only syntax check using the Windows JScript engine.
var fso = new ActiveXObject("Scripting.FileSystemObject");
var args = WScript.Arguments;
var bad = 0;

for (var i = 0; i < args.length; i++) {
    var path = args(i);
    var f, src;
    try {
        f = fso.OpenTextFile(path, 1);
        src = f.AtEndOfStream ? "" : f.ReadAll();
        f.Close();
    } catch (e) {
        WScript.Echo("READ FAIL  " + path + "  :: " + e.message);
        bad++;
        continue;
    }
    try {
        new Function(src);          // compiles, does not run
        WScript.Echo("ok         " + path);
    } catch (e) {
        WScript.Echo("SYNTAX ERR " + path + "  :: " + e.message);
        bad++;
    }
}
WScript.Echo("");
WScript.Echo(bad === 0 ? "All files parsed cleanly." : (bad + " file(s) failed."));
WScript.Quit(bad);
