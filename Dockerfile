# Vocele marketing site — static Astro build served by nginx.
# Matches the monorepo's web-app deploy shape (see apps/1ak-storefront/Dockerfile):
# multi-stage node build -> nginx runtime serving /dist. The only difference is the
# build tool (Astro instead of Vite) because this is a static-rendered SEO site, not
# a client-rendered SPA — see README.md for the rationale.

FROM node:20-alpine AS build

WORKDIR /app

# Build-time site origin (used for canonical URLs, sitemap, OG tags).
ARG PUBLIC_SITE_URL=https://vocele.app
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Lightweight liveness: nginx serving the homepage.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
