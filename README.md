
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
- `gcloud container clusters get-credentials ecoideas --zone europe-west2-a --project eco-ideas` (WORKAROUND TO GET SECRETS INJECTED - FIX PROPERLY)
- `kubectl config current-context`
- `tetrraform apply`


#### Teardown environment

Do this to save money!

`terraform destroy`

### Kubernetes

- `gcloud container clusters get-credentials ecoideas --zone europe-west2 --project eco-ideas`
- create `server-email-config.yml` based on `server-email-config.yml.EXAMPLE` containing your send grid configuration

- `./deploy.sh`

