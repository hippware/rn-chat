FROM node:8-alpine

COPY . /wocky-client

RUN \
    cd wocky-client && \
    yarn

WORKDIR /wocky-client

CMD ["/usr/local/bin/yarn", "test"]
