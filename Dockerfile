
FROM node:lts-stretch-slim AS ts-sample-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run clean
RUN npm run build
# Our Second stage, that creates an image for production
FROM node:lts-stretch-slim AS ts-sample-prod
WORKDIR /app
COPY --from=ts-sample-builder ./app/dist ./dist
COPY package* ./
RUN npm install --production
CMD npm run start-prod
EXPOSE 3001
##Our first stage, that is the Builder 235MB
#FROM  node:12.18.4-buster AS build
#COPY . .
#RUN npm install
#RUN npm run build
#RUN npm prune --production
### Our Second stage, that creates an image for production
#FROM node:12.18.4-alpine
##WORKDIR /app
#COPY --from=build ./dist ./dist
#COPY --from=build package.json package.json
#COPY --from=build ./node_modules ./node_modules
#CMD npm run start-prod
#EXPOSE 3001