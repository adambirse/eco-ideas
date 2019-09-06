FROM node:12 as base

FROM base as builder
WORKDIR /builder
COPY package.json /builder
RUN npm install
COPY . /builder
RUN npm test
RUN npm run build-prod
RUN npm prune --production

FROM builder as release
WORKDIR /app
COPY --from=builder /builder/build/ /app/build
COPY --from=builder /builder/node_modules /app/node_modules
COPY --from=builder builder/package.json /app

ENV NODE_ENV production

USER node
CMD npm run start-prod
EXPOSE 5000
