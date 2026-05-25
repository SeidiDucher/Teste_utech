
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --optional

EXPOSE 3333

CMD ["npm", "run", "dev"]