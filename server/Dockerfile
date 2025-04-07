FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y docker.io

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn prisma generate
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start" ]
