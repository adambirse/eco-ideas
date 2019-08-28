#!/usr/bin/env bash

# remove any left over .env file and use defaults
rm $(dirname "$0")/.env

cd $(dirname "$0")
docker stop client && docker rm client
docker run --name client -p 3000:80 -d client