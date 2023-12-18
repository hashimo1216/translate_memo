FROM golang:1.21.4-alpine3.18

WORKDIR /api

COPY . .

RUN apk update && apk add git

RUN go build -o translate-memo-api

RUN chmod +x translate-memo-api

EXPOSE 8080

CMD ["./translate-memo-api"]


