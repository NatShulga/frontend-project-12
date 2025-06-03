lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	npm start-server -s ./frontend/dist

start-backend:
	npm start-server

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	cd frontend && npm run build
