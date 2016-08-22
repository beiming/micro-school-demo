#!/usr/bin/env bash

echo 'start building......'

TEST_ENV=false webpack

echo 'copy data.json'
./node_modules/json-minify/index.js ./src/data/data.json > ./www/data/data.json

echo 'copy config.json'
./node_modules/json-minify/index.js ./src/data/config.json > ./www/data/config.json

echo 'copy partials'
cp -r ./src/partials ./www

node ./build/append_version.js

echo 'Done'