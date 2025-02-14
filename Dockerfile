# example


FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Build Next.js app
RUN npm run build

# Start the Next.js application
CMD ["npm", "run", "start"]
