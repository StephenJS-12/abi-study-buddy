@echo off
REM Abi's Study Buddy - runs every verification pass over the question bank.
REM Double-click this file. No Node, npm or Python needed: it uses the JScript
REM engine built into Windows.
REM
REM Every check goes through run.js, which turns a crash into a failure. Left to
REM itself cscript exits 0 when a script dies part-way, so a broken check used to
REM be indistinguishable from a passing one.

setlocal
cd /d "%~dp0"
set FAIL=0

echo ==========================================================
echo   ABI'S STUDY BUDDY - VERIFICATION
echo ==========================================================
echo.

echo [1/18] JavaScript syntax
for /r "..\public\js" %%F in (*.js) do call :collect "%%F"
cscript //Nologo //E:JScript run.js check.js %FILES%
if errorlevel 1 set FAIL=1
echo.

echo [2/18] Question structure
call :check validate.js

echo [3/18] Hand-written answers, recomputed independently
call :check maths.js

echo [4/18] Questions must not reuse their own notes values
call :check overlap.js

echo [5/18] Generators and answer parsing
call :check gens.js
call :check parser.js

echo [6/18] Celebrations fire
call :check motion.js

echo [7/18] Reward ladder and points
call :check rewards.js

echo [8/18] Exam methods vs the published Milpark answers
call :check papers.js

echo [9/18] Points scoring and the header bar
call :check points.js

echo [10/18] Moving progress to another computer
call :check transfer.js

echo [11/18] A browser that will not save is detected
call :check storage.js

echo [12/18] Which copy of her progress wins when devices disagree
call :check sync.js

echo [13/18] The answer never reaches the study helper
call :check tutor.js

echo [14/18] Modules do not tread on each other
call :check modules.js

echo [15/18] Greetings are usable and never repeat
call :check copy.js

echo [16/18] Probability answers, against an enumerated deck
call :check probability.js

echo [17/18] No round asks the same question twice
call :check variety.js

echo [18/18] Every question type survives a shuffle
call :check questiontypes.js

echo ==========================================================
if "%FAIL%"=="0" (
  echo   ALL CHECKS PASSED
) else (
  echo   SOMETHING FAILED - see the output above
)
echo ==========================================================
echo.
pause
exit /b %FAIL%

:check
cscript //Nologo //E:JScript run.js %1
if errorlevel 1 set FAIL=1
echo.
goto :eof

:collect
set FILES=%FILES% "%~1"
goto :eof
