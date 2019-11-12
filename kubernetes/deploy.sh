#!/usr/bin/env bash

cd $(dirname "$0")
kubectl apply -f server-email-config.yml
kubectl apply -f client-service.yml
kubectl apply -f server-service.yml
kubectl apply -f ingress.yml
kubectl apply -f server-deployment.yml
kubectl apply -f client-deployment.yml
