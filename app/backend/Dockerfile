FROM node:20-alpine3.20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npx tsc

FROM node:20-alpine3.20 AS application
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

FROM alpine:3.20 AS runner
WORKDIR /app
COPY --from=application /app ./
RUN apk add --no-cache nodejs npm
ENV NODE_ENV=production
CMD ["sh", "-c", "npx prisma generate && npm start"]