ARG network_mode=default

# Builder base
FROM node:18.18-alpine3.18 AS base
COPY package.json yarn.lock tsconfig.json /app/
COPY *.js /app
WORKDIR  /app

# Builder simple 
FROM base AS builder-default 
RUN yarn install --frozen-lockfile

# Builder proxy
FROM base AS builder-proxy
COPY cacert.pem /cacert.pem
ENV NODE_EXTRA_CA_CERTS='/cacert.pem'
RUN yarn config set cafile '/cacert.pem' && \
    yarn install --frozen-lockfile

# Runner
FROM builder-${network_mode} AS runner
COPY .firebaserc firebase.json /app
COPY public /app/public
COPY src /app/src

RUN chown -R node:node /app/

USER node

CMD [ "yarn", "dev" ]
