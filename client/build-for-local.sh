#!/usr/bin/env bash

# remove any left over .env file and use defaults
rm $(dirname "$0")/.env

cd $(dirname "$0")
docker build -t client .
