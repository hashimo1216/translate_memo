FROM golang:1.21.4-alpine3.18

WORKDIR /api

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN apk update && apk add git

RUN chmod +x ./entrypoint.sh

EXPOSE 8080

CMD [ "./translate_memo" ]
