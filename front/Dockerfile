FROM node:20

WORKDIR /front

COPY . .

RUN apt-get update && apt-get install -y xsel

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "preview" ]