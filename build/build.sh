#!/usr/bin/env bash

echo 'start building......'

version=`cat ./src/data/config.json | grep version`
version=${version##*: }
version=${version%%\"}
version=${version:1}
echo current version: $version

TEST_ENV=false webpack

echo 'copy data.json'
./node_modules/json-minify/index.js ./src/data/data.json > ./www/data/data.json

echo 'copy config.json'
./node_modules/json-minify/index.js ./src/data/config.json > ./www/data/config.json

echo 'copy partials'
cp -r ./src/partials ./www

node ./build/append_version.js

echo 'packaging......'
tar -czvf ./dist/micro_school_demo_v${version}.tar.gz ./www/index.html ./www/css ./www/data ./www/icon ./www/js ./www/partials

echo 'Done'