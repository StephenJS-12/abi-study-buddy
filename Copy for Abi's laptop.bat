@echo off
REM Builds the folder to carry over to Abi's laptop, on the desktop where it is easy
REM to drag onto a memory stick or into a cloud folder.
REM
REM Everything she needs goes across; the tests folder does not, because it is only
REM useful here and it hard-codes paths on this machine.
REM
REM Nothing is deleted at the destination. Run it again after any change to the site.

setlocal
REM Named for the trip, not for her desktop - it stops it colliding with the
REM "Abi's Study Buddy" shortcut already on this desktop. Rename it on her laptop
REM afterwards if you like; nothing depends on the folder name.
set "DEST=%USERPROFILE%\Desktop\Abi's Study Buddy (copy to her laptop)"

echo.
echo Copying to: %DEST%
echo.

robocopy "%~dp0." "%DEST%" /E /NFL /NDL /NJH /NJS /NP ^
  /XD "tests" ^
  /XF "Copy for Abi's laptop.bat"

if %ERRORLEVEL% GEQ 8 (
  echo.
  echo   Something went wrong - see the messages above.
  echo.
  pause
  exit /b 1
)

echo.
echo   Done.
echo.
echo   Copy that whole folder onto her laptop, then run
echo   "Put a shortcut on the desktop.bat" inside it once.
echo.
echo   Her points do NOT travel in the folder. On this laptop open Progress,
echo   choose "Get my code", and paste that code into Progress on hers.
echo.
pause
