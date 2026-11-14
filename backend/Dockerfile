FROM node:20-alpine

WORKDIR /app

# Installation stricte des dépendances de production via le lockfile
COPY package*.json ./
RUN npm ci --omit=dev

# Copie du code source avec les permissions de l'utilisateur non-root
COPY --chown=node:node . .

USER node

EXPOSE 5000
CMD ["node", "server.js"]