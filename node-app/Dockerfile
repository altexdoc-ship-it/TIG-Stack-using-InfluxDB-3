# Use the official Node.js 24 slim image as the base
FROM node:24-slim

# Install system dependencies, unixODBC, and alien utility for RPM conversion
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    alien \
    libxml2 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# COPY the IBM i Access RPM driver from your local folder to the container
COPY ibm-iaccess-1.1.0.29-1.0.x86_64.rpm .

# Convert RPM to DEB and install the driver automatically
RUN alien -i ibm-iaccess-1.1.0.29-1.0.x86_64.rpm && \
    rm ibm-iaccess-1.1.0.29-1.0.x86_64.rpm

# Copy package configuration and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code (index.js, etc.)
COPY . .

# Expose the API port
EXPOSE 3005

# Command to start the application
CMD ["node", "index.js"]