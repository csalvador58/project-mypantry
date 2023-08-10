FROM node:18.17-alpine

COPY . /app/backend

WORKDIR /app/backend

RUN npm install
RUN npm run build

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start"]

