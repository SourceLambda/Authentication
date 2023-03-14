FROM node:16-alpine

WORKDIR /code

COPY package.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
