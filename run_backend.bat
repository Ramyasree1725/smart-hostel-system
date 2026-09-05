@echo off
title Smart Soldier Monitoring - Backend Server
echo ========================================================
echo   Starting Smart Soldier Monitoring Backend Server...
echo ========================================================
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
echo Starting Backend on http://localhost:5000 ...
call npm start
pause
