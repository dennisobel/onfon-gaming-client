FROM node:lts-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ENV REACT_APP_BASE_URL=34.241.183.143:8080

COPY . .

RUN npm run dev

# FROM nginx:alpine

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

