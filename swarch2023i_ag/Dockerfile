FROM node:carbon-slim

# Create app directory
WORKDIR /auth_ag

# Install app dependencies
COPY package.json /auth_ag/
RUN npm install

# Bundle app source
COPY . /auth_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
