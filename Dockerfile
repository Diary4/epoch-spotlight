# Production image for Epoch Spotlight (static Vite build + nginx).
# Build once, run the same container on any machine with Docker.

# ── Build ────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Large photo sets need headroom during Vite's asset pipeline.
ENV NODE_OPTIONS=--max-old-space-size=8192

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Serve ────────────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
