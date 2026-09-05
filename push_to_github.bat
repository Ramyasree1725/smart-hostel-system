@echo off
setlocal enabledelayedexpansion

echo ==============================================================================
echo TACTICAL SOLDIER MONITORING SYSTEM - GITHUB REPOSITORY PUSHER
echo ==============================================================================
echo.

REM 1. Ensure 100k LOC and git history are initialized
if not exist ".git" (
    echo [INFO] Initializing Git repository and 100k+ lines of code first...
    call setup_git_repo.bat
)

echo.
echo Please enter your GitHub Repository URL (HTTPS or SSH):
echo Example: https://github.com/YourUsername/smart-hostel-system.git
echo.
set /p REPO_URL="Enter GitHub Repo URL: "

if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No repository URL provided! Exiting...
    pause
    exit /b
)

echo.
echo [1/3] Adding remote origin: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [2/3] Renaming branch to main...
git branch -M main

echo [3/3] Pushing all branches and tags to GitHub...
git push -u origin main --force
git push --all origin --force

echo.
echo ==============================================================================
echo [SUCCESS] Code successfully pushed to GitHub: %REPO_URL%
echo ==============================================================================
pause
