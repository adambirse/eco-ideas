#!/usr/bin/env bash

cd $(dirname "$0")
docker rmi server gcr.io/eco-ideas/server
docker build -t server .
