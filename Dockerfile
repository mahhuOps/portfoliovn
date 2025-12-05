# ========================
# Stage 1: Build
# ========================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project
COPY . .

# Build the Next.js project
RUN npm run build

# ========================
# Stage 2: Production Image
# ========================
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json & production node_modules from builder
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
