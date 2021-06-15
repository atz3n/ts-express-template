FROM node:14.17-alpine3.13

# Set working directory
WORKDIR /usr/src/app

# Copy meta files files
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

# Install dependencies
RUN yarn install --prod

# Copy source files
COPY src ./src

# Start backend
CMD [ "yarn", "start" ]