FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx tsc

CMD npx prisma migrate deploy && node dist/app.js