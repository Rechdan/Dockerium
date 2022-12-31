# BUILD stage

FROM node:18.12.0-alpine3.16 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY next-env.d.ts next.config.js tsconfig.json ./
COPY src ./src

RUN yarn build

# PROD stage

FROM node:18.12.0-alpine3.16 AS prod

WORKDIR /app

COPY next-env.d.ts next.config.js package.json yarn.lock ./

RUN yarn --production

# DEPLOY stage

FROM node:18.12.0-alpine3.16

WORKDIR /app

COPY next-env.d.ts next.config.js package.json yarn.lock ./
COPY --from=prod /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD [ "yarn", "start" ]
