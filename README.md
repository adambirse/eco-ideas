
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

#### Teardown environment

Do this to save money!

`terraform destroy`

### Kubernetes

- `gcloud container clusters get-credentials ecoideas --zone europe-west2 --project eco-ideas`
- `kubectl config current-context`
- `kubectl apply -f kubernetes/server-service.yml `
- Add private sql ip address to server deployment
- `kubectl apply -f kubernetes/server-deployment.yml`
- `watch kubectl get svc` to get ip server ip address, add to client-deployment
- `kubectl apply -f kubernetes/client-service.yml`
- `kubectl apply -f kubernetes/client-deployment.yml`
- `watch kubectl get svc` to get ip client ip address
- http://CLIENT-IP:3000



