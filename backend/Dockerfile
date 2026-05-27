FROM node:20-alpine

# Dependências nativas necessárias para compilar o sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript para a pasta dist/
RUN npm run build

# Expõe a porta onde a API vai rodar
EXPOSE 3333

# Comando para iniciar o servidor e manter o contêiner vivo
CMD ["node", "dist/server.js"]
