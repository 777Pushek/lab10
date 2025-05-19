FROM node:23-alpine AS builder

LABEL org.opencontainers.image.authors="Mikołaj Kosmala"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:23-alpine AS final

LABEL org.opencontainers.image.authors="Mikołaj Kosmala"

RUN apk add --update --no-cache curl && \
    rm -rf /etc/apk/cache

WORKDIR /app

COPY --from=builder /app /app

ENV PORT=3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "index.js"]
