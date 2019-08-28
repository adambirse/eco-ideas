FROM node:12-alpine AS builder
ENV CI=true
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
COPY . .
RUN npm test
ENV REACT_APP_ENV=production
RUN npm run build


FROM node:12-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]