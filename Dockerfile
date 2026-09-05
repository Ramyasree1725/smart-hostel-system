# Multi-stage Dockerfile for Smart Soldier Monitoring System
FROM node:20-alpine AS base
WORKDIR /app

# Copy root and backend configs
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install backend dependencies
RUN npm install --prefix backend

# Install frontend dependencies and build
RUN npm install --prefix frontend
COPY frontend/ ./frontend/
RUN npm run build --prefix frontend

# Copy backend source
COPY backend/ ./backend/
COPY tests/ ./tests/

EXPOSE 5000 3000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "backend/server.js"]
