FROM node:14-alpine

RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash
RUN npm install node-rdkafka

WORKDIR /app

ADD package*.json .
RUN npm install
COPY . .
ENTRYPOINT [ "npm" ]
CMD ["start"]