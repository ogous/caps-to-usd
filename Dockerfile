FROM node:18-alpine AS builder
ENV NODE_ENV build
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run build

FROM node:18-alpine AS starter
ENV NODE_ENV production
ENV PORT ${PORT}
ENV REDIS_HOST ${REDIS_HOST}
ENV REDIS_PORT ${REDIS_PORT}
ENV REDIS_PASSWORD ${REDIS_PASSWORD}
WORKDIR /usr/src/app
RUN apk add shadow
RUN groupmod -g 500 node && usermod -u 500 node
COPY --from=builder --chown=node:node /usr/src/app/build /usr/src/app
COPY --chown=node:node package.json /usr/src/app
RUN npm install --omit=dev --ignore-scripts
USER node
EXPOSE ${PORT}
ENTRYPOINT [ "npm", "run", "start" ]
