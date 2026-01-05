FROM node:20-alpine as build
WORKDIR /app

# 1. Install pnpm
RUN npm install -g pnpm

# 2. Copy ONLY dependency files first
COPY ./edu_client/package.json ./edu_client/pnpm-lock.yaml* ./

# 3. Install dependencies (this layer is cached unless package.json changes)
RUN pnpm install

# 4. Copy the rest of the application
COPY ./edu_client .

# Use 'pnpm dev' for development, or 'pnpm build' for production
CMD ["pnpm", "run", "dev"]