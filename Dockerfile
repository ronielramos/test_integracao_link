FROM node:12.14.0

RUN yarn global add pm2

WORKDIR /usr/src/app

COPY package.json ./ 
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn tsc

EXPOSE 8080

CMD [ "pm2-runtime", "./dist/app.js" ]