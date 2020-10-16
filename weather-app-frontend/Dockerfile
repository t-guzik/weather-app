ARG NODE_TAG="12.18.3-alpine"

FROM node:${NODE_TAG} as yarnBuild
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn run build

FROM node:${NODE_TAG} as api
WORKDIR /usr/src/app
ENV NODE_ENV="production"
USER node:node
COPY --chown=node:node --from=yarnBuild /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node ecosystem.config.js /usr/src/app/ecosystem.config.js

ENTRYPOINT ["./node_modules/.bin/pm2-runtime"]
CMD ["ecosystem.config.js"]
