# -------- STAGE 1: Build the Next.js app --------
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js app (output goes to `.next`)
RUN npm run build

# -------- STAGE 2: Run the app in a clean environment --------
FROM node:20

# Set the working directory in the final container
WORKDIR /app

# Copy the entire built app from the builder stage
COPY --from=builder /app ./

# Install only production dependencies to reduce size
RUN npm install --omit=dev

# Expose port 3000 for the Next.js server
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
