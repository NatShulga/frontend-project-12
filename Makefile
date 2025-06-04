install:
	npm ci && make -C frontend install

build: 
	make install && npm run build

start:
	npm run start

build-frontend-and-start:
	npm ci && npm run build && make start

lint:
	make -C frontend lint
