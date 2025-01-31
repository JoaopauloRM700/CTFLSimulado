# Usa a imagem oficial do Node.js
FROM node:18-alpine 

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json antes de copiar o restante do código
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Compila o projeto para produção
RUN npm run build


# Comando para rodar o servidor Vite na build final
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]
