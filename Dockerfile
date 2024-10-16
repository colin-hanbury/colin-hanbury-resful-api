FROM node:22.3.0
WORKDIR /app
COPY package.json .
RUN npm i --production
COPY . .
EXPOSE 8080
CMD npm run start