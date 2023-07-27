FROM node:18.16.1

WORKDIR /app

# make sure to run bufore building:
# npm ci
# npm run build -w client -w backend

COPY client/dist client/dist
COPY backend/dist backend/dist

WORKDIR /backend
ENTRYPOINT [ "node", "dist/server.js" ]