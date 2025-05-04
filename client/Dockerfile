# -------- STAGE 1: Build the Next.js app --------
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app/versusai-client

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files into the container
COPY . ./

# Build the Next.js app
RUN npm run build

# -------- STAGE 2: Run the app in a clean environment --------
FROM node:20

# Set the working directory in the final container
WORKDIR /app/versusai-client

# Copy build output and necessary files from builder
COPY --from=builder /app/versusai-client/.next .next
COPY --from=builder /app/versusai-client/public ./public
COPY --from=builder /app/versusai-client/package*.json ./
COPY --from=builder /app/versusai-client/node_modules ./node_modules
COPY --from=builder /app/versusai-client/next.config.js ./


# Install only production dependencies to reduce size
RUN npm install --omit=dev --ignore-scripts

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
