# Usa uma imagem base leve do Node para o desenvolvimento
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do frontend
# OBS: O docker-compose mapeia o volume, mas esta é a base da imagem
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
