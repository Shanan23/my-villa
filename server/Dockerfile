FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Copy seeding script and startup script
COPY seed-docker.js ./
COPY start.sh ./

# Make startup script executable
RUN chmod +x start.sh

# Start the application
CMD ["./start.sh"] 