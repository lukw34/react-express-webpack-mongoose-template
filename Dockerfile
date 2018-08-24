FROM node:8

WORKDIR /usr/src/app

COPY . .

RUN yarn
RUN yarn build


EXPOSE 8080
CMD ["yarn", "start:server"]
