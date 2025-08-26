FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built files
COPY dist/ ./dist/
COPY smithery.json ./

# Set environment variables
ENV NODE_ENV=production

# Start the MCP server
CMD ["npm", "run", "smithery:start"]
