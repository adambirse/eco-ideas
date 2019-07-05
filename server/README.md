
## Eco Ideas - Server

### Deploying

#### Local

Start docker mysql database:

`docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=eco -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3310:3306 -d mysql:5.7`

Start node server:

`npm run start`


### API 

http://localhost:5000/api/ideas/test-data -> for creating of hard coded test data.  Temporary endpoint.

http://localhost:5000/api/ideas -> find all data (called by client app.)


