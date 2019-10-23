#!/usr/bin/env bash

cd $(dirname "$0")
kubectl apply -f ../kubernetes/server-config.yml
kubectl apply -f ../kubernetes/server-email-config.yml