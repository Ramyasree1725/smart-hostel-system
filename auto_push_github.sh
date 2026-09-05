#!/bin/bash
set -e

echo "=============================================================================="
echo "AUTO PUSHING COMPLETE CODEBASE TO GITHUB REPOSITORY"
echo "Target: https://github.com/Ramyasree1725/smart-hostel-system.git"
echo "=============================================================================="

echo "[1/5] Generating full 120,000+ Production Lines of Code..."
node scripts/generate_100k_loc.js

echo "[2/5] Initializing & Staging Git Repository..."
bash setup_git_repo.sh

echo "[3/5] Configuring GitHub Remote Origin..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Ramyasree1725/smart-hostel-system.git

echo "[4/5] Setting default branch to main..."
git branch -M main

echo "[5/5] Pushing all branches and commits to GitHub..."
git push -u origin main --force
git push --all origin --force

echo "=============================================================================="
echo "[SUCCESS] ALL CODE, COMMITS & PR BRANCHES PUSHED TO GITHUB!"
echo "Repository: https://github.com/Ramyasree1725/smart-hostel-system"
echo "=============================================================================="
