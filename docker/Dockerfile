FROM node:12.19.0-alpine3.11


# Set working directory
WORKDIR /usr/src/app


# Copy files
COPY src ./src
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .


# Install dependencies
RUN npm install --only=prod


# Start backend
CMD [ "npm", "start" ]