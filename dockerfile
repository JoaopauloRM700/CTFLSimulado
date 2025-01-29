# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./
RUN npm install

# Copia todo o código do projeto
COPY . .

# Builda o projeto para produção
RUN npm run build

# Expõe a porta 4173 (Vite Preview)
EXPOSE 4173

# Comando para rodar o servidor
CMD ["npm", "run", "preview"]
