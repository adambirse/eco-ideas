#!/usr/bin/env bash

# remove any left over .env file and use defaults

docker rmi client gcr.io/eco-ideas/client
rm $(dirname "$0")/.env

cd $(dirname "$0")
docker build -t client .
