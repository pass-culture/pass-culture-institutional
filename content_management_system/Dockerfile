# Builder
FROM node:18.18-alpine3.18 AS builder

RUN mkdir /build
WORKDIR /build

COPY package.json yarn.lock /build/
RUN apk add git && yarn install --frozen-lockfile

COPY src/plugins/sitemap-pass /build/src/plugins/sitemap-pass
WORKDIR /build/src/plugins/sitemap-pass
RUN yarn install --frozen-lockfile && yarn build

WORKDIR /build
COPY tsconfig.json /build/
COPY public /build/public
COPY config /build/config
COPY database /build/database
COPY types /build/types
COPY src /build/src

RUN yarn build

# Runner
FROM node:18.18-alpine3.18 AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY package.json /app/
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/dist /app
COPY public /app/public
COPY config /app/config
COPY database /app/database

COPY --from=builder /build/src/plugins/sitemap-pass/dist /app/src/plugins/sitemap-pass/
COPY --from=builder /build/src/plugins/sitemap-pass/package.json /app/src/plugins/sitemap-pass/package.json

RUN chown -R node:node /app/public

USER node
CMD ["yarn", "start"]