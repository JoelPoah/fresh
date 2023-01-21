# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json /app

# Copy dist folder to the container
COPY dist /app/dist

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . /app

# Expose the port on which the server will run
EXPOSE 3001
# Start the server
CMD ["npm", "start"]
