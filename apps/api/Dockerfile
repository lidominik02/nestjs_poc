FROM node:22-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo@^2
COPY . .
RUN npx turbo prune api --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm ci

COPY --from=builder /app/out/full/ .

RUN cd ./apps/api && npx prisma generate
RUN npx turbo run build --filter=api

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/prisma ./prisma

CMD ["node", "./dist/src/main.js"]