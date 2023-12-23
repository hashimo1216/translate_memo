FROM golang:1.21.4-alpine3.18

WORKDIR /api

COPY . .

RUN apk update && apk add git

EXPOSE 8080