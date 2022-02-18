FROM node:14.17.4-buster-slim

WORKDIR /nodejs/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm i bcrypt --unsafe-perm=true --allow-root --save

CMD ["node", "dist/main"]
