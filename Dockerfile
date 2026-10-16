# Build stage: compile the Vite SPA. VITE_* values are baked in at build time.
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=/api/
ARG VITE_APP_URL=/
ARG VITE_BASE_PATH=/
ENV VITE_API_URL=$VITE_API_URL \
    VITE_APP_URL=$VITE_APP_URL \
    VITE_BASE_PATH=$VITE_BASE_PATH
RUN npm run build

# Runtime stage: static files plus reverse proxy to the API.
FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/proxy_params_notes /etc/nginx/proxy_params_notes
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
