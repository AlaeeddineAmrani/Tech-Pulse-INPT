# Étape 1 : Compilation du bundle Vite
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --include=optional --no-audit --no-fund \
    && npm install --no-save --package-lock=false @rolldown/binding-linux-x64-gnu@1.0.3

COPY . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Étape 2 : Serveur web léger Nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]