#!/usr/bin/env bash

cd $(dirname "$0")
docker stop nginx && docker rm nginx
docker run --name nginx --network=eco -p 80:80 -d nginx