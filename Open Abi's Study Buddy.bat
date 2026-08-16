@echo off
REM Abi's Study Buddy - opens the site in its own clean window.
REM
REM Two things this does on purpose:
REM
REM 1. It finds the browser itself rather than just opening index.html, because on
REM    some machines the .html file association has been taken over by a helper that
REM    swallows the click and nothing happens.
REM
REM 2. It gives the site its OWN browser profile, kept in AppData. The site saves
REM    points into browser storage, and a normal profile can be set to block that or
REM    to wipe it every time the browser closes - which looks exactly like the site
REM    forgetting everything overnight. A profile of its own cannot be affected by
REM    those settings. Deleting that folder would delete her points, nothing else.

setlocal
title Abi's Study Buddy

REM Build a file:// URL from this script's own folder, so the whole thing can be
REM copied anywhere - another drive, another laptop - and still work.
set "PAGE=file:///%~dp0public\index.html"
set "PAGE=%PAGE:\=/%"

set "PROFILE=%LOCALAPPDATA%\AbiStudyBuddy\browser"

REM The parentheses inside %ProgramFiles(x86)% would close the FOR block early,
REM so it is copied into a plain name first.
set "PF86=%ProgramFiles(x86)%"

set "BROWSER="
for %%B in (
  "%ProgramFiles%\BraveSoftware\Brave-Browser\Application\brave.exe"
  "%PF86%\BraveSoftware\Brave-Browser\Application\brave.exe"
  "%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe"
  "%ProgramFiles%\Google\Chrome\Application\chrome.exe"
  "%PF86%\Google\Chrome\Application\chrome.exe"
  "%LocalAppData%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
  "%PF86%\Microsoft\Edge\Application\msedge.exe"
) do if not defined BROWSER if exist %%B set "BROWSER=%%~B"

if defined BROWSER (
  start "" "%BROWSER%" --app="%PAGE%" --user-data-dir="%PROFILE%" --no-first-run --no-default-browser-check
  exit /b 0
)

REM No Chromium browser at all. Firefox does not reliably keep saved data for pages
REM opened out of a folder, so say so rather than failing quietly hours later.
echo.
echo   Brave, Chrome and Edge were not found on this computer.
echo.
echo   The site will open in the default browser, but if that is Firefox
echo   your points will NOT be remembered after closing it.
echo.
echo   Installing Brave or Chrome fixes that - then run this file again.
echo.
start "" "%~dp0public\index.html"
pause
exit /b 0
