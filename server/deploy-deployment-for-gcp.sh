#!/usr/bin/env bash

cd $(dirname "$0")
kubectl apply -f ../kubernetes/server-deployment.yml