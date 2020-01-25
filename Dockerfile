FROM node:12-alpine

WORKDIR /srv

COPY . .

RUN npm ci --production

ENV PORT 8080
ENV REDIS_PORT 6379
ENV REDIS_HOST 127.0.0.1
ENV NODE_ENV production
ENV MONGODB_URI mongodb://localhost:27017/authDb

EXPOSE $PORT

ENTRYPOINT [ "node", "src/app.js" ]