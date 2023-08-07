FROM node:18.16.1 AS java

# some node-package need java during the install.
# don't ask my why node-js package need java.
RUN apt-get -y update
RUN apt install python3-launchpadlib -y
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:openjdk-r/ppa
RUN apt-add-repository "deb http://deb.debian.org/debian/ sid main"
RUN apt-get -y update
RUN apt-get install openjdk-8-jdk -y
RUN update-alternatives --config java
RUN update-alternatives --config javac

FROM java as builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build -w client -w backend

FROM node:18.16.1-alpine3.18

WORKDIR /app

COPY . .
COPY --from=builder /app/client/dist /app/client/dist
COPY --from=builder /app/client/node_modules /app/client/node_modules
COPY --from=builder /app/client/openapitools.json /app/client/openapitools.json
COPY --from=builder /app/client/src/api-client /app/client/src/api-client

COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/backend/node_modules /app/backend/node_modules

COPY --from=builder /app/node_modules /app/node_modules


ENTRYPOINT [ "npm", "run", "start" ]
