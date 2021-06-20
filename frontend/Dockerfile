FROM node:16-alpine3.11

# Working directory be app
WORKDIR /app

COPY package*.json ./
###  Installing dependencies
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
# copy local files to app folder
COPY . .

CMD ["npm","start"]