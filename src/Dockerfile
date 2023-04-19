FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 3000
ENV DB_USER admin
ENV DB_PASSWORD admin
ENV DB_HOST 172.18.0.3
ENV DB_NAME mydb
ENV DB_PORT 5432

EXPOSE 3000

CMD ["npm","start"]
