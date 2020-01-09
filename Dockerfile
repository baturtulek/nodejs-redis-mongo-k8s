FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN apk add --no-cache make gcc g++ python && \
  npm ci && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

ENV MONGODB_URI mongodb+srv://batur:3ozTXbbFIyVHRisd@cluster0-qdad1.mongodb.net/test?retryWrites=true&w=majority
ENV PORT 2000
ENV REDIS_PORT 6379
ENV REDIS_HOST 'redis'

EXPOSE $PORT

ENTRYPOINT [ "node", "src/app.js" ]