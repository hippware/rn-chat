FROM node:8.9.4-alpine

COPY . /wocky-client

RUN \
    npm -g install npm@5.8.0 yarn@1.7.0 && \
    cd wocky-client && \
    yarn

WORKDIR /wocky-client

CMD ["/usr/local/bin/yarn", "test"]
