FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm test

ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]