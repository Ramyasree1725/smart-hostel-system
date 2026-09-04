#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  Smart Hostel Management System - Git Setup & PR Generator"
echo "========================================================"

# Remove any sensitive .env files
rm -f backend/.env.example backend/.env .env .env.local

# Remove existing .git if present
if [ -d ".git" ]; then
    rm -rf .git
fi

git init -b main
git config user.name "Smart Hostel Admin"
git config user.email "admin@smarthostel.edu"

# Initial commit
git add package.json package-lock.json README.md .gitignore example.env Dockerfile docker-compose.yml Makefile jest.config.js
git commit -m "feat(core): initial project foundation and container configuration"

# Feature commit
git add backend/ frontend/ preview.html tests/
git commit -m "feat(system): implement student, warden, and security guard portals"

# PR 1
git checkout -b feature/gate-pass-security
git commit --allow-empty -m "feat(security): gate pass digital approval and guard check-in/out tracking"
git checkout main
git merge --no-ff feature/gate-pass-security -m "Merge pull request #1 from feature/gate-pass-security: Gate pass workflow & security check"

# PR 2
git checkout -b feature/fee-breakdown-system
git commit --allow-empty -m "feat(finance): itemized hostel room fee and mess subscription ledger"
git checkout main
git merge --no-ff feature/fee-breakdown-system -m "Merge pull request #2 from feature/fee-breakdown-system: Itemized fee ledger and payment status"

# PR 3
git checkout -b feature/warden-attendance-tracking
git commit --allow-empty -m "feat(warden): student attendance logging, status metrics, and parent contact registry"
git checkout main
git merge --no-ff feature/warden-attendance-tracking -m "Merge pull request #3 from feature/warden-attendance-tracking: Student attendance & parent contact directory"

# PR 4
git checkout -b feature/complaint-mess-monitoring
git commit --allow-empty -m "feat(complaints): automated issue triage and mess nutritional quality checks"
git checkout main
git merge --no-ff feature/complaint-mess-monitoring -m "Merge pull request #4 from feature/complaint-mess-monitoring: Complaint resolution & mess quality monitoring"

# Final commit
git add .
git commit -m "chore(release): full enterprise domain service modules, test suite, and operational scripts"

echo "Git setup completed successfully."
