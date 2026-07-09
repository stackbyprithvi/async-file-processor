FROM node:22-alpine

RUN apk add --no-cache ffmpeg

RUN corepack enable && corepack prepare pnpm@10 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
CMD ["pnpm","dev"]

