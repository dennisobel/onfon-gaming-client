FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ENV REACT_APP_BASE_URL=34.241.183.143:8080

COPY . .

ENTRYPOINT ["npm", "run", "dev"]