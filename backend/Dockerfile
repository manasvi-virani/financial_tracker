FROM node:24-alpine

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD [ "node", "index.js" ]