#!/usr/bin/env bash

# create build specific .env
# TODO make parameter optional

rm $(dirname "$0")/.env
cat >> $(dirname "$0")/.env << EOL
REACT_APP_SERVER_HOST=$1
EOL


cd $(dirname "$0")
docker build -t client .
docker tag client gcr.io/eco-ideas/client
gcloud docker -- push gcr.io/eco-ideas/client
