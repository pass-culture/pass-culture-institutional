# Builder
FROM node:20.9-alpine3.18 AS builder

RUN mkdir /build
WORKDIR /build

COPY package.json yarn.lock /build/
RUN apk add git && yarn install --frozen-lockfile

COPY src/plugins/sitemap /build/src/plugins/sitemap
WORKDIR /build/src/plugins/sitemap
RUN yarn install --frozen-lockfile && yarn build

COPY src/plugins/update-static-content /build/src/plugins/update-static-content
WORKDIR /build/src/plugins/update-static-content
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
FROM node:20.9-alpine3.18 AS runner
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/dist /app
COPY --from=builder /build/package.json /app/
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/public /app/public
COPY --from=builder /build/database /app/database

COPY --from=builder /build/src/plugins/sitemap/dist /app/src/plugins/sitemap/
COPY --from=builder /build/src/plugins/sitemap/package.json /app/src/plugins/sitemap/package.json

COPY --from=builder /build/src/plugins/update-static-content/dist /app/src/plugins/update-static-content/
COPY --from=builder /build/src/plugins/update-static-content/package.json /app/src/plugins/update-static-content/package.json

RUN mkdir -p /.tmp && chown -R node:node /app /.tmp

USER node
CMD ["yarn", "start"]