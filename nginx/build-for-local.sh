#!/usr/bin/env bash

docker rmi nginx

cd $(dirname "$0")
docker build -t nginx .
