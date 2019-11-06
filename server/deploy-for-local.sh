#!/usr/bin/env bash


cd $(dirname "$0")
# merge env files
cat env/.env_docker .env > personal.env
docker stop server && docker rm server
docker run --name server --network=eco --env-file=personal.env -d server