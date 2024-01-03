FROM node:20

WORKDIR /front

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview"]