FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies and rebuild native modules
RUN npm install --production && \
    npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]