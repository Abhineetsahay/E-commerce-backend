FROM node:latest

COPY  . /home/app/

WORKDIR /home/app/

RUN npm install 

EXPOSE 5000

CMD [ "node", "index" ]