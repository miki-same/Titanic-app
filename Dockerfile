FROM --platform=linux/x86_64 node:17.4
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
RUN yarn install

WORKDIR /app