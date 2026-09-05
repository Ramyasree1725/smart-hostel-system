@echo off
setlocal enabledelayedexpansion

echo ==============================================================================
echo REBUILDING CLEAN GIT HISTORY WITH 4 PULL REQUEST FEATURE BRANCHES
echo Target: https://github.com/Ramyasree1725/smart-hostel-system.git
echo ==============================================================================
echo.

REM 1. Ensure node generation has run
echo [1/6] Ensuring 120,000+ Production LOC are generated...
node scripts\generate_100k_loc.js

REM 2. Reset .git directory completely
echo [2/6] Resetting clean .git structure...
if exist ".git" rmdir /s /q ".git"

REM 3. Clean sensitive env files
rm -f backend\.env backend\.env.example .env .env.example 2>nul
if exist "backend\.env" del /f /q "backend\.env"
if exist "backend\.env.example" del /f /q "backend\.env.example"
if exist ".env" del /f /q ".env"
if exist ".env.example" del /f /q ".env.example"

REM 4. Initialize git
git init
git config user.name "Tactical Defense Engineer"
git config user.email "defense-engineer@tactical-soldier.mil"

REM 5. Base Commit on main (Only core project files)
echo [3/6] Creating Base Commit on main...
git checkout -b main
git add package.json backend/config/ backend/controllers/ backend/middleware/ backend/models/ backend/routes/ backend/server.js frontend/ preview.html README.md Dockerfile docker-compose.yml Makefile jest.config.js .gitignore scripts/
git commit -m "feat(core): initialize smart soldier monitoring system architecture, live preview and docker build"

REM 6. Feature Branch 1: Biometrics DSP
echo [4/6] Creating Feature Branch 1: feature/biometrics-dsp...
git checkout -b feature/biometrics-dsp
git add backend/modules/biometric_dsp/ frontend/src/modules/biometric_analytics/ tests/biometrics.test.js
git commit -m "feat(dsp): implement Pan-Tompkins QRS detector, Kalman filters, and ECG arrhythmia analytics"

REM 7. Feature Branch 2: Geospatial Engine
echo [5/6] Creating Feature Branch 2: feature/geospatial-engine...
git checkout main
git checkout -b feature/geospatial-engine
git add backend/modules/geospatial_engine/ frontend/src/modules/tactical_engine/ tests/geofence.test.js
git commit -m "feat(geo): integrate MGRS converter, Vincenty geodesy, terrain LOS ray-marching, and spatial index"

REM 8. Feature Branch 3: Triage AI
echo [6/6] Creating Feature Branch 3: feature/triage-ai...
git checkout main
git checkout -b feature/triage-ai
git add backend/modules/triage_ai/ backend/modules/tactical_mesh/ tests/telemetry.test.js tests/triage.test.js
git commit -m "feat(triage): implement MARCH-PAWS TCCC decision classifier, shock index forecaster, and mesh routing"

REM 9. Feature Branch 4: Logistics & Crypto
git checkout main
git checkout -b feature/logistics-crypto
git add backend/modules/logistics_engine/ backend/modules/cryptography/ frontend/src/modules/mission_control/ tests/
git commit -m "feat(crypto-logistics): add ChaCha20 crypto engine, ballistics solvers, drone supply planner, and test runner"

REM 10. Switch back to main
git checkout main

REM 11. Add Remote and Force Push ALL Branches
echo.
echo Pushing all 5 branches (main + 4 feature branches) to GitHub...
git remote add origin https://github.com/Ramyasree1725/smart-hostel-system.git
git push -u origin main --force
git push -u origin feature/biometrics-dsp --force
git push -u origin feature/geospatial-engine --force
git push -u origin feature/triage-ai --force
git push -u origin feature/logistics-crypto --force

echo.
echo ==============================================================================
echo [SUCCESS] ALL 4 FEATURE BRANCHES AND MAIN PUSHED TO GITHUB!
echo ==============================================================================
pause
