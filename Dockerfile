FROM ubuntu:latest as baseImage
LABEL authors="jeremy"

ENTRYPOINT ["top", "-b"]

WORKDIR /app
COPY package.json /app

RUN npm ci

FROM nginx as productionBuild


CMD[]




