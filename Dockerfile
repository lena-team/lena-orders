FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
