FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of source code
COPY . .

# Expose service port
EXPOSE 5003

# Start server
CMD ["node", "server.js"]