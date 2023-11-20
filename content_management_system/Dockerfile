# Builder
FROM node:18.18-alpine3.18 as builder

RUN mkdir /build
WORKDIR /build
COPY package.json yarn.lock /build/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Runner
FROM node:18.18-alpine3.18 as runner
ENV NODE_ENV=production
COPY server.js package.json /app/
COPY --from=builder /build/node_modules /app/node_modules
COPY --from=builder /build/dist /app
COPY public /app/public
COPY config /app/config

WORKDIR  /app
CMD [ "yarn", "start" ]
