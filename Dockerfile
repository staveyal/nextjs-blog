FROM node:alpine
WORKDIR /usr/src/app

# Install packages
COPY package*.json ./
RUN npm install

# Disable NextJS telemetry
RUN npx next telemetry disable

COPY ./ ./
RUN npm run build
RUN npm prune --production

EXPOSE 3000
CMD [ "npm", "start" ]
