
## Eco Ideas - Server

### Deploying

#### Local

Start docker mysql database (first time):

`docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eco -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3310:3306 -d mysql:5.7`
`docker run --name mysql --network=eco -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eco -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3310:3306 -d mysql:5.7`
Start docker mysql database (subsequent times):

`docker start mysql`

Mail server:

Eco-ideas uses send grid https://app.sendgrid.com/ for emails.

In order to use this functionality you will need to: 

- create an account with them and an api key.
- add them to your .env file.  Example [here](./server/env/.env_example)
  

Start node server:

`npm run start`

#### Local Docker

- `./build-for-local.sh`
- `./deploy-for-local.sh`

#### build for GCP 

- `./build-for-gcp.sh`
- `./deploy-for-gcp.sh`

### API 

http://localhost:5000/api/ideas -> find all data (called by client app.)



