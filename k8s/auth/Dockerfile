FROM node:12-alpine

WORKDIR /srv

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY . .

ENTRYPOINT [ "node", "bin/www" ]