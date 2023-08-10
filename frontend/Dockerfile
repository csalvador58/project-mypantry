FROM node:18.17-alpine

COPY . /app/frontend

WORKDIR /app/frontend

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]


