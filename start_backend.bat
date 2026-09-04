@echo off
title Smart Hostel - Backend Server
cd /d "%~dp0backend"
echo Starting Backend Server on http://localhost:5000...
if not exist node_modules (
    call npm install
)
npm start
pause
