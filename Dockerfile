
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
