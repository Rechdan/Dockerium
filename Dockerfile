# BUILD stage

FROM node:18.12.0-alpine3.16 AS build

WORKDIR /app

ENV DATABASE_URL=file:/app/prisma/dockerium.db

COPY package.json yarn.lock ./

RUN yarn

COPY next-env.d.ts next.config.js tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN yarn prisma migrate deploy && yarn prisma generate

RUN yarn build

# PROD stage

FROM node:18.12.0-alpine3.16 AS prod

WORKDIR /app

COPY next-env.d.ts next.config.js package.json yarn.lock ./
COPY --from=build /app/prisma ./prisma

RUN yarn --production
RUN npx prisma generate

# DEPLOY stage

FROM node:18.12.0-alpine3.16

WORKDIR /app

ENV DATABASE_URL=file:/app/prisma/dockerium.db

COPY next-env.d.ts next.config.js package.json yarn.lock ./
COPY --from=prod /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD [ "yarn", "start" ]
