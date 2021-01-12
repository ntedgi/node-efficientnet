FROM node:10.19.0
EXPOSE 3000
WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm install

COPY ./ ./

CMD ["npm","start"]
