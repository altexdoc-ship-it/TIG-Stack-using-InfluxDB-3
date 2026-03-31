# Use the official Node.js 20 slim image as a base
FROM node:20-slim

# Install system dependencies for ODBC and driver installation
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    wget \
    alien \
    && rm -rf /var/lib/apt/lists/*

# Download and install the IBM i Access ODBC driver for Linux
# This allows Node.js to talk to your IBM i 7.5
RUN wget https://public.dhe.ibm.com/software/ibmi/products/access/linux/v1r1m0/i686/ibm-i-access-1.1.0.2-1.0.i686.rpm \
    && alien -i ibm-i-access-1.1.0.2-1.0.i686.rpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port for the JSON API
EXPOSE 3005

# Start the application
CMD ["node", "index.js"]