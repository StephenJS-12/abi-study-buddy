@echo off
REM Run this once on a new laptop. It puts an "Abi's Study Buddy" icon on the
REM desktop that opens the site. Nothing is installed and nothing is changed
REM anywhere else - it only creates the one shortcut.

setlocal
set "TARGET=%~dp0Open Abi's Study Buddy.bat"
set "LINK=%USERPROFILE%\Desktop\Abi's Study Buddy.lnk"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$s = (New-Object -ComObject WScript.Shell).CreateShortcut($env:LINK);" ^
  "$s.TargetPath = $env:TARGET;" ^
  "$s.WorkingDirectory = Split-Path $env:TARGET;" ^
  "$s.Description = 'Abi''s Study Buddy - MABU01-5 revision';" ^
  "$s.WindowStyle = 7;" ^
  "$s.Save()"

if exist "%LINK%" (
  echo.
  echo   Done - look on the desktop for "Abi's Study Buddy".
) else (
  echo.
  echo   That did not work. You can still open the site with
  echo   "Open Abi's Study Buddy.bat" in this folder.
)
echo.
pause
