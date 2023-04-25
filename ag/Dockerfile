FROM node:carbon-slim

# Create app directory
WORKDIR /ag

# Install app dependencies
COPY package.json /ag/
RUN npm install

# Bundle app source
COPY . /ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
