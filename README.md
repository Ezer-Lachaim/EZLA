# EZLA Project

This project was created by Redis, and is managed on a voluntary basis.

If you would like to contribute, please send an email to <a href="mailto:guy.korland@redis.com">guy.korland@redis.com</a>.

Tasks are managed in this project: https://github.com/orgs/Ezer-Lachaim/projects/1, and discussions are done on the Google Spaces group.

## Contributing

In order to contribute, please fork this repository, and create a pull request.

If you are unsure how to do this, please follow this guide: https://docs.github.com/en/get-started/quickstart/contributing-to-projects

To get an overview of the system and setting up development you can watch https://youtube.com/playlist?list=PLU1beXqUCOTbyVJecmcfb1OJ3keJYzvrg&si=fvVNoURtIlvR4NKg

## Development

This is a monorepo using npm workspaces

### Git Branches
Currently, we have 2 main branches:
- `master` - The system is available only for the sick
- `feat/open-to-all` - The system is available for everyone because of the current situation

When pushing your changes, please make sure to push to the correct branch.
If it is a bugfix, or a feature that is relevant to both situations, please open the PR to `master` branch.
On the other hand, if it is a feature that is relevant only for the current situation, please open the PR to `feat/open-to-all` branch.

If you are unsure, please ask in the Google Spaces chatroom.

### Install dependencies
```
npm install
```

### Create local .env file with the following props
The file should be placed in /backend folder
```
GOOGLE_CLOUD_PROJECT=ezla-pickup
FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
```
For allowing guest ride mode (war mode) add the following env variable to your local .env file
```
ALLOW_GUEST_RIDE_MODE=true
```
For turning sending SMS messages on add the following env variables to your local .env file
```
SMS_IS_ON=true
AWS_SMS_ACCESS_KEY_ID={access_key_id}
AWS_SMS_SECRET_ACCESS_KEY={secret_access_key}
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

Run redis-stack-server docker container locally:
```
docker run -p 6379:6379 redis/redis-stack-server:latest
```

### Generating open api typescript client
```
npm run generate:api:client -w client
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
Call GET request to http://localhost:3000/dev/init (via Postman or CURL) which will create 3 users:
```
admin@test.com, Admin*1
driver@test.com, Driver*1
requester@test.com, Requester*1
```
