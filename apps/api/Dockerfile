FROM node:22-alpine AS base

FROM base AS builder
RUN apk update
WORKDIR /app
RUN npm install -g turbo@^2
COPY . .
RUN npx turbo prune api --docker

FROM base AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/turbo.json ./turbo.json
RUN npm install

COPY --from=builder /app/out/full/ .
RUN cd ./apps/api && npx prisma generate
RUN npx turbo run build --filter=api

FROM base AS runner
RUN apk update
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
WORKDIR /app
COPY --from=installer --chown=nestjs:nodejs /app/ .
CMD [ "node", "apps/api/dist/src/main.js" ]