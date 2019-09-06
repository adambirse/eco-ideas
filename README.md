
## Eco Ideas

- A little node / react project for displaying ideas on how to be more eco friendly.
- Technology demonstrator / getting started for CI / CD


[Server](./server/README.md)

[Client](./client/README.md)

[Acceptance tests](./acceptance_tests/README.md)

Webpack, Babel on both projects.

### Terraform 

#### Initialisation 
- Install Gcloud and Terraform
- Create your project on Gcloud (TODO automate)
- Download service account credentials and save as per service account variable in `terraform.tfvars`

#### Create Environment

- `terraform init`
- `terraform plan`
- `tetrraform apply`
- `gcloud container clusters get-credentials ecoideas --zone europe-west2 --project eco-ideas` (WORKAROUND TO GET SECRETS INJECTED - FIX PROPERLY)
- `kubectl config current-context`
- `tetrraform apply`


#### Teardown environment

Do this to save money!

`terraform destroy`

### Kubernetes

- `gcloud container clusters get-credentials ecoideas --zone europe-west2 --project eco-ideas`
- `./server/build-for-gcp.sh`
- `./server/deploy-service-for-gcp.sh`
- `./client/deploy-service-for-gcp.sh`
`
- `watch kubectl get svc` to get ip server and client ip address, 
- `./client/build-for-gcp.sh <SERVER_IP_ADDRESS>`
- `./client/deploy-deployment-for-gcp.sh`
- update config with client ip --TODO automate http://34.89.80.93:80
- `./server/deploy-config-for-gcp.sh`
- `./server/deploy-deployment-for-gcp.sh`
- http://CLIENT-IP




