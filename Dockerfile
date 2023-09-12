# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies

RUN npm add vuetify@^3.3.15
# RUN npm install vue-router@4
# RUN npm install pinia
# RUN npm install axios
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the Vue application
CMD ["npm", "run", "dev"]