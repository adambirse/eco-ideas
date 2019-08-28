#!/usr/bin/env bash

cd $(dirname "$0")
docker stop client && docker rm client
docker run --name client -p 3000:80 -d client