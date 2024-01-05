#!/bin/sh

while ! nc -z db 3306; do
  echo "Waiting for database to be ready..."
  sleep 1
done

exec "$@"