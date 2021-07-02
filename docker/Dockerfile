FROM node:14.17-alpine3.13

# Set working directory
WORKDIR /usr/src/app

# Copy meta files files
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

# Install dependencies
RUN npm install --prod

# Copy source files
COPY src ./src

# Start node
CMD [ "npm", "start" ]