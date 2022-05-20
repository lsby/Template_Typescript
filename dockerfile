FROM node:16

USER root

ADD . /opt/code
WORKDIR /opt/code

ENV APP_PORT=${APP_PORT} \
    DB_HOST=${DB_HOST} \
    DB_PORT=${DB_PORT} \
    DB_USER=${DB_USER} \
    DB_PWD=${DB_PWD} \
    DB_NAME=${DB_NAME} \
    NODE_ENV=${NODE_ENV}

RUN npm config set registry https://registry.npm.taobao.org && npm i
RUN npm run build

CMD npm run start
