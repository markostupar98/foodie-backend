# FROM node:16

# WORKDIR /src

# COPY package.json .

# RUN npm install -g nodemon && npm install

# COPY . .

# EXPOSE 3000

# CMD ["nodemon", "./server.js"]

FROM node:16

WORKDIR /src/app

COPY package*.json ./

RUN npm install && npm install nodemon -g

RUN npm install prisma --save-dev

COPY prisma ./prisma/

RUN npx prisma generate

COPY src/ .

EXPOSE 3000

CMD ["nodemon", "./server.js"]