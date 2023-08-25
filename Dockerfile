# FROM node:lts-alpine as build

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# ENV REACT_APP_BASE_URL=34.241.183.143:8080

# COPY . .

# ENTRYPOINT ["npm", "run", "dev"]

# Stage 1: Set up the proxy server
FROM node:lts-alpine as proxy

WORKDIR /app

COPY proxy-server.js /app/proxy-server.js

# Expose port for the proxy
EXPOSE 3002

# Start the proxy server
CMD ["node", "proxy-server.js"]

# Stage 2: Run the React app
FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ENV REACT_APP_BASE_URL=34.241.183.143:8080

COPY . .

# Start the React app
ENTRYPOINT ["npm", "run", "dev"]
