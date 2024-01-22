## Stage 1
#FROM node:latest as node
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build
#
## Stage 2
#FROM nginx:alpine
#COPY --from=node /app/dist/frontend /usr/share/nginx/html

# Stage 1
# Używanie obrazu node specyficznego dla architektury ARM
FROM --platform=linux/arm64/v8 node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2
# Używanie obrazu nginx specyficznego dla architektury ARM
FROM --platform=linux/arm64/v8 nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
