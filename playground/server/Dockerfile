FROM node:14.16.1-buster
EXPOSE 3000
WORKDIR /home/app

COPY package.json /home/app/
RUN npm install
RUN npm update

COPY ./ ./

CMD ["npm","start"]
