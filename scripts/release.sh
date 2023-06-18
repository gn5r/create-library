#!/usr/bin/env bash

npm config set //npm.pkg.github.com/:_authToken ${NODE_AUTH_TOKEN:?}
npm publish --tag "$(node ./scripts/parse-dist-tag.cjs)"
