.PHONY: all install build test start dev clean docker-build docker-up docker-down

all: install build test

install:
	npm install
	cd backend && npm install
	cd frontend && npm install

build:
	cd frontend && npm run build

test:
	node tests/runner.js

test-coverage:
	node tests/runner.js --coverage

start:
	node backend/server.js

dev:
	npm run dev

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

clean:
	rm -rf node_modules backend/node_modules frontend/node_modules frontend/dist coverage
