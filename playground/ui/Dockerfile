FROM node:10.19.0 as node-efficientnet-client
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN  npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node-efficientnet-client /app/dist/playground /usr/share/nginx/html
EXPOSE 80
