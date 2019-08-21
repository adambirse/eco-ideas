FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build-prod
CMD npm run start-prod
EXPOSE 5000