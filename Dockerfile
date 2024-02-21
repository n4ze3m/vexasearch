ARG NODE_VERSION=18.17.1
FROM node:18.17.1-slim as base

WORKDIR /app

ENV NODE_ENV="production"

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

COPY --link . .

RUN npm run build

RUN npm prune --omit=dev

FROM base

COPY --from=build /app /app
EXPOSE 3000
CMD [ "npm", "run", "start" ]