# Use the official Node.js 24 slim image as the base
FROM node:24-slim

# Install system utilities (Docker will try to pull these from cache or proxy)
# These are required to convert and install the IBM i driver
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    alien \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# COPY the RPM file you downloaded manually from your Windows folder to the container
# This bypasses the Port 443 firewall restriction
COPY ibm-iaccess-1.1.0.29-1.0.x86_64.rpm ./

# Install the driver from the local file and then delete the RPM to save space
RUN alien -i ibm-iaccess-1.1.0.29-1.0.x86_64.rpm && \
    rm ibm-iaccess-1.1.0.29-1.0.x86_64.rpm

# Copy package configuration and install Node.js libraries (express, odbc)
COPY package*.json ./
RUN npm install

# Copy the rest of your application code (index.js, etc.)
COPY . .

# Open port 3005 for the JSON API
EXPOSE 3005

# Command to start your Node.js adapter
CMD ["node", "index.js"]