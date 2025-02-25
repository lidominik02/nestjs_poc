FROM node:22-alpine AS base

FROM base AS builder
RUN apk update
WORKDIR /app
RUN npm install -g turbo@^2
COPY . .
RUN npx turbo prune web --docker

FROM base AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN npm install
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=web

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js