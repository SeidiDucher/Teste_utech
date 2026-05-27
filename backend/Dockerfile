FROM node:20-alpine

# Dependências nativas necessárias para compilar o sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

