FROM node:latest AS client
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install && npm start

FROM node:latest AS server
WORKDIR /root/
COPY --from=client /usr/src/app ./api
COPY ./package*.json ./api/
RUN cd api && npm install
COPY ./server.js ./api/

EXPOSE 3000
EXPOSE 8080

CMD ["node", "./api/server.js"]