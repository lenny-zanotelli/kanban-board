# Dockerfile
FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app
COPY package.json package.json
RUN npm install

COPY assets assets
COPY config config
COPY tsconfig.json tsconfig.json
COPY src src
COPY server.ts server.ts

CMD [ "npm", "start" ]