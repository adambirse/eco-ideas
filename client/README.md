
## Eco Ideas - Client


### Deploying

#### Local

`npm run start`

#### Local docker 

`docker build -t client .`

`docker run --name client -p 3000:3000 -d client`

#### build for GCP 

- `docker build -t client .`
- `gcloud container clusters get-credentials ecoideas --zone europe-west2 --project eco-ideas`
- `docker tag client  gcr.io/eco-ideas/client`
- `gcloud docker -- push gcr.io/eco-ideas/client`







