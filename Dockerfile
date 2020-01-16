FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN apk add --no-cache make gcc g++ python && \
  npm ci && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

ENV MONGODB_URI mongodb://localhost:27017/authDb
ENV PORT 2000
ENV REDIS_PORT 6379
ENV REDIS_HOST 127.0.0.1

EXPOSE $PORT

ENTRYPOINT [ "node", "src/app.js" ]