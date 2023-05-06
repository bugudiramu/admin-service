FROM node:slim
ENV NODE_ENV=development
WORKDIR /src
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
COPY . /src
RUN npm install
EXPOSE 5001
# RUN chown -R node /src
# USER node
CMD node ./build/
