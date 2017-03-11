deploy: pull clean run

db:
	docker run -d \
		-v `pwd`/data:/data \
		--name bpwjs-db \
		--net codezen_nginx \
		rethinkdb

pull:
	docker pull yamalight/bpwjs-server:latest
	docker pull yamalight/bpwjs-client:latest

clean:
	docker stop bpwjs-server
	docker stop bpwjs-client
	docker rm bpwjs-server
	docker rm bpwjs-client

run:
	docker run -d \
		--name bpwjs-server \
		--net codezen_nginx \
		--link bpwjs-db:db \
		-e VIRTUAL_HOST=bpwjsapi.codezen.net \
		-e LETSENCRYPT_HOST=bpwjsapi.codezen.net \
		-e LETSENCRYPT_EMAIL=ermilov@codezen.ru \
		-e EXPERTS_DB_URL=db \
		yamalight/bpwjs-server
	docker run -d \
		--name bpwjs-client \
		--net codezen_nginx \
		-e VIRTUAL_HOST=bpwjs.codezen.net \
		-e LETSENCRYPT_HOST=bpwjs.codezen.net \
		-e LETSENCRYPT_EMAIL=ermilov@codezen.ru \
		-e API_HOST=https://bpwjsapi.codezen.net \
		yamalight/bpwjs-client
