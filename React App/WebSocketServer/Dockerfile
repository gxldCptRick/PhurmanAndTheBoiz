FROM node:latest

MAINTAINER PhurmanAndDaBoiz

COPY . /WebSocketServer
WORKDIR /WebSocketServer

run npm install

EXPOSE 5585

ENTRYPOINT ["npm", "start"]