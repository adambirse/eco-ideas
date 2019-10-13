#!/usr/bin/env bash

#TODO deploy database
cd $(dirname "$0")
docker stop server && docker rm server
docker run --name server --env-file=env/.env_docker -p 5000:5000 --link mysql --link mail-sink -d server