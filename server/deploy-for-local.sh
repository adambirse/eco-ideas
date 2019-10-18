#!/usr/bin/env bash


cd $(dirname "$0")
# merge env files
cat env/.env_docker .env > personal.env
docker stop server && docker rm server
docker run --name server --env-file=personal.env -p 5000:5000 --link mysql -d server