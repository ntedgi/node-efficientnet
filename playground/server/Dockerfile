FROM node:14.16.1-buster
EXPOSE 3000
WORKDIR /home/app
COPY . .

RUN rm -rf node_modules \
    && npm ci --quiet --no-progress 

CMD ["npm","start"]
