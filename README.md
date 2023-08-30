## Development

This is a monorepo using npm workspaces

### Create local .env file with the following props
```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
GOOGLE_CLOUD_PROJECT='ezla-pickup'
JWT_SECRET=DEV_SECRET
FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"
```

### Run Firebase emulator and Redis locally
Install Firebase tools:
```
curl -sL firebase.tools | bash
```
Run Firebase auth emulator:
```
firebase emulators:start --only auth
```

Run redis-stack docker container locally:
```
docker run -p 6379:6379 redis/redis-stack:latest
```

### Start client
```
npm run dev:client
```

### Start backend
```
npm run dev:backend
```

### Create users for local dev
RUN GET /dev/init to the local backend api which will create 3 users:
admin@ezla.com, Admin*1
driver@ezla.com, Driver*1
requester@ezla.com, Requester*1
### Generating open api typescript client
```
npm run generate:api:client -w client
```
