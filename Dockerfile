FROM node:18.16.1

WORKDIR /app

# make sure to run bufore building docker image:
# npm ci
# npm run build -w client -w backend

COPY client/dist client/dist
COPY backend/dist backend/dist
COPY backend/package.json backend/package.json
WORKDIR /app/backend
RUN npm i --omit=dev
ENTRYPOINT [ "node", "dist/server.js" ]