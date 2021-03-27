FROM node:15-buster

WORKDIR /app
ADD package*.json .
RUN npm install
COPY . .
ENTRYPOINT [ "npm" ]
CMD ["start"]