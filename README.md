# EZLA Project
This project was created by Redis and is managed voluntarily.
This web application is used to manage volunteer-based ride and transport requests for "Ezer la-haim" Foundation. It is developed utilizing node.js framework in typescript, utilizing Redis for database service, and deployed using Firebase and Google container registry.

To get an overview of the system and setting up development you can watch https://youtube.com/playlist?list=PLU1beXqUCOTbyVJecmcfb1OJ3keJYzvrg&si=fvVNoURtIlvR4NKg

## Contributing
Tasks are managed in [EZLA GitHub project](https://github.com/orgs/Ezer-Lachaim/projects/1), and discussions are done on the Google Spaces group.

To contribute, please fork this repository, and create a pull request. If you are unsure how to do this, please follow  [https://docs.github.com/en/get-started/quickstart/contributing-to-project](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)

To coordinate, and get more details please send an email to <a href="mailto:yitshak.yarom@ezla.org.il">yitshak.yarom@ezla.org.il</a>.



## Development
This is a mono repo using npm workspaces

### Initial setup of the development environment


- *Install Java* - Java version 17 or later is required
- *Install node and npm* - Node.js version 20.11.1 is required. It is recommended to use NVM for installing the proper node version
- *Install dependencies* - dependencies are managed by npm. Run `npm install` to install all package dependencies
- *Create local .env file* - in `backend` folder, create ".env" file with the following props
  ```
  GOOGLE_CLOUD_PROJECT=ezla-pickup
  FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
  ALLOW_GUEST_RIDE_MODE=true
  ```
- *Install Firebase tools*
  ```
  curl -sL firebase.tools | bash
  ```
- *Install Docker*
  ```
  sudo apt install docker.io
  ```
  After the installation, follow the instructions [here](https://docs.docker.com/engine/install/linux-postinstall/), so that you can run docker without 'sudo' command
  
### Possible feature enabled through .env
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
### Running application locally for development
Run Firebase auth emulator:
```
firebase emulators:start --only auth
```

Run redis-stack-server docker container locally:
```
docker run -p 6379:6379 redis/redis-stack-server:latest
```
Start backend
```
npm run dev:backend
```

Start client
```
npm run dev:client
```
Create users for local dev
Call GET request to http://localhost:3000/dev/init (`curl  http://localhost:3000/dev/init`) which will create 3 users:
- admin@test.com, Admin*1
- driver@test.com, Driver*1
- requester@test.com, Requester*1


### Git flow
TBA


