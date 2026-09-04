.PHONY: all install build start test clean docker-build docker-up docker-down

all: install build test

install:
	npm install
	cd backend && npm install
	cd frontend && npm install

build:
	npm run build

start:
	npm start

test:
	npm test

clean:
	rm -rf node_modules backend/node_modules frontend/node_modules dist coverage

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down
