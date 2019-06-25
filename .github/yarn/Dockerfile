FROM node:10-alpine

LABEL "com.github.actions.name"="Yarn with Install"
LABEL "com.github.actions.description"="yarn install then yarn"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

ENV YARN_VERSION 1.15.2

RUN apk add --update git curl \
    && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
