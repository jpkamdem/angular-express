FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl
RUN npm install pm2 -g
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/process.yaml ./

RUN npm ci --omit=dev && \
    npm uninstall @types/cookie-parser && \
    npm uninstall @types/cors && \
    npm uninstall @types/express && \
    npm uninstall @types/jsonwebtoken && \
    npm uninstall @types/node && \
    npm uninstall typescript && \
    npm uninstall tsx

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD [ "pm2-runtime", "process.yaml" ]