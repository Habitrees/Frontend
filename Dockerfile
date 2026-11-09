
# ==========================================
# Stage 1: Build React Application
# ==========================================

FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install exact dependencies
RUN npm ci

# Copy project source
COPY . .

# Public API configuration (baked into Vite build)
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build production files
RUN npm run build


# ==========================================
# Stage 2: Run Frontend
# ==========================================

FROM nginx:alpine AS runtime

# Copy Nginx configuration
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Copy production build from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Container listens on port 80
EXPOSE 80

# Docker Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]