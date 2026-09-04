FROM node:18-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

EXPOSE 5000 3000
CMD ["npm", "start"]
