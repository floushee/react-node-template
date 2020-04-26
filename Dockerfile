FROM node:13-alpine

EXPOSE 5000

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm i

COPY server.js /app/

COPY frontend/package.json /app/frontend/
COPY frontend/package-lock.json /app/frontend/

RUN cd frontend && npm i

COPY frontend/src /app/frontend/src
COPY frontend/public /app/frontend/public

RUN cd frontend && npm run build

CMD ["node", "server.js"]
