FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run builder

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80