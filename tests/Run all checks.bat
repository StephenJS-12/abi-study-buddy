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

echo [1/11] JavaScript syntax
for /r "..\public\js" %%F in (*.js) do call :collect "%%F"
cscript //Nologo //E:JScript run.js check.js %FILES%
if errorlevel 1 set FAIL=1
echo.

echo [2/11] Question structure
call :check validate.js

echo [3/11] Hand-written answers, recomputed independently
call :check maths.js

echo [4/11] Questions must not reuse their own notes values
call :check overlap.js

echo [5/11] Generators and answer parsing
call :check gens.js
call :check parser.js

echo [6/11] Celebrations fire
call :check motion.js

echo [7/11] Reward ladder and points
call :check rewards.js

echo [8/11] Exam methods vs the published Milpark answers
call :check papers.js

echo [9/11] Points scoring and the header bar
call :check points.js

echo [10/11] Moving progress to another computer
call :check transfer.js

echo [11/11] A browser that will not save is detected
call :check storage.js

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
