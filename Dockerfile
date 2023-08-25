# FROM node:lts-alpine as build

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm install

# ENV REACT_APP_BASE_URL=34.241.183.143:8080

# COPY . .

# ENTRYPOINT ["npm", "run", "dev"]

# Stage 1: Build the React app
FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the proxy and the React app
FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/build /app/build
COPY proxy-server.js /app/proxy-server.js

# Expose port for the proxy
EXPOSE 3002

# Start the proxy server and the React app
CMD ["sh", "-c", "node proxy-server.js & npm start"]
