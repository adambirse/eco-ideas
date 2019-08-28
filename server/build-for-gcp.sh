#!/usr/bin/env bash

cd $(dirname "$0")
docker build -t server .
docker tag server gcr.io/eco-ideas/server
gcloud docker -- push gcr.io/eco-ideas/server