FROM node:18.16.1

WORKDIR /app

COPY backend/src backend/src
COPY backend/package-lock.json backend/package-lock.json
COPY backend/package.json backend/package.json
COPY backend/.eslintrc.json backend/.eslintrc.json
COPY backend/tsconfig.json backend/tsconfig.json
COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm ci
RUN npm run build -w client -w backend
COPY client/dist client/dist

ENTRYPOINT [ "npm", "run", "start" ]