#!/usr/bin/env bash

echo 'start building......'

TEST_ENV=false webpack


./node_modules/json-minify/index.js ./src/data/data.json > ./www/data/data.json
./node_modules/json-minify/index.js ./src/data/config.json > ./www/data/config.json

echo 'Done'