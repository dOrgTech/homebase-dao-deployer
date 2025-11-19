# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./ tsconfig.json ./ yarn.lock /
COPY src ./src

# Install dependencies and build TypeScript -> dist/
RUN yarn && yarn build

# Expose the port on which your Express server is listening
# Change 3000 to the port number your server is configured to listen on
EXPOSE 3001

# Define the command to run your Express server
CMD npm start
