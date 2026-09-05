@echo off
title Smart Soldier Monitoring - One-Click Launcher
echo ==============================================================================
echo     🛡 STARTING SMART SOLDIER MONITORING AND SAFETY SYSTEM (A to Z)
echo ==============================================================================
echo.
echo 1. Launching Backend (Node.js + Socket.IO + REST API)...
start "Soldier-Backend" cmd /c "call run_backend.bat"

echo 2. Launching Frontend (React + Vite + Leaflet HUD)...
start "Soldier-Frontend" cmd /c "call run_frontend.bat"

echo.
echo Both servers are starting up!
echo - Backend will be live at: http://localhost:5000
echo - Web Dashboard will open at: http://localhost:5173
echo.
echo Press any key to exit this launcher window.
pause
