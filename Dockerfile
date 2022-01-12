FROM node:17-alpine3.14 as base

RUN apk add bash

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN npm install

COPY . .

FROM base as production

RUN npm run build

USER node

