FROM node:20-alpine

WORKDIR /

COPY . .

RUN yarn install

EXPOSE 5000

CMD ["yarn", "start"]