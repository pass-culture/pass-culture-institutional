ARG network_mode=default

# Builder base
FROM node:24-alpine AS base
RUN corepack enable
COPY package.json yarn.lock tsconfig.json .yarnrc.yml /app/
COPY .yarn/patches /app/.yarn/patches
COPY *.js /app
WORKDIR  /app

# Builder simple
FROM base AS builder-default
RUN yarn install --immutable

# Builder proxy
FROM base AS builder-proxy
COPY cacert.pem /cacert.pem
ENV NODE_EXTRA_CA_CERTS='/cacert.pem'
RUN yarn config set httpsCaFilePath '/cacert.pem' && \
    yarn install --immutable

# Runner
FROM builder-${network_mode} AS runner
COPY .firebaserc firebase.json /app
COPY public /app/public
COPY src /app/src

RUN chown -R node:node /app/

USER node

CMD [ "yarn", "dev" ]
