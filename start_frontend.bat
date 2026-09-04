@echo off
title Smart Hostel - Frontend Client
cd /d "%~dp0frontend"
echo Starting Frontend Client on http://localhost:3000...
if not exist node_modules (
    call npm install
)
npm run dev
pause
