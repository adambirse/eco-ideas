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


FROM nginx:1.17.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
