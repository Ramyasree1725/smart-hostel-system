@echo off
title Smart Soldier Monitoring - Frontend Dashboard
echo ========================================================
echo   Starting Smart Soldier Monitoring React HUD...
echo ========================================================
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
echo Starting Vite Dev Server on http://localhost:5173 ...
call npm run dev
pause
