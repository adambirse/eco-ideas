#!/usr/bin/env bash

#TODO deploy database
cd $(dirname "$0")
docker stop server && docker rm server
docker run --name server -e DATABASE_HOST=mysql -p 5000:5000 --link mysql -d server