# Use an official Node.js runtime as the base image
FROM node:16.16.0

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./ tsconfig.json ./ yarn.lock /
COPY src ./src

# Install any required dependencies (if you have any)
RUN yarn

# Expose the port on which your Express server is listening
# Change 3000 to the port number your server is configured to listen on
EXPOSE 3001

# Define the command to run your Express server
CMD npm start
