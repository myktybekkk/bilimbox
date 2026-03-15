FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run db:push && npm run db:seed
EXPOSE 3000
CMD ["npm","run","dev"]
