#!/usr/bin/env bash


docker rmi client gcr.io/eco-ideas/client

cd $(dirname "$0")
docker build -t client .
docker tag client gcr.io/eco-ideas/client
gcloud docker -- push gcr.io/eco-ideas/client
