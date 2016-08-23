#!/usr/bin/env bash

echo 'start building......'

TEST_ENV=$1
if [ ! -n "$TEST_ENV" ] || [ ! "$TEST_ENV" = true ] && [ ! "$TEST_ENV" = false ];
    then TEST_ENV=false
fi
echo TEST_ENV = $TEST_ENV

version=`cat ./src/data/config.json | grep version`
version=${version##*: }
version=${version%%\"}
version=${version:1}
echo current version: $version

TEST_ENV=$TEST_ENV webpack

if [ "$TEST_ENV" != true ]; then
    echo 'copy data.json'
    ./node_modules/json-minify/index.js ./src/data/data.json > ./www/data/data.json

    echo 'copy config.json'
    ./node_modules/json-minify/index.js ./src/data/config.json > ./www/data/config.json
else
    echo 'copy data.json & config.json'
    cp ./src/data/* ./www/data
fi

echo 'copy partials'
cp -r ./src/partials ./www

node ./build/append_version.js

if [ "$TEST_ENV" != true ]; then
    echo 'packaging......'
    target_file="./dist/micro_school_demo_v${version}.tar.gz"
    if [ -f "$target_file" ];
        then rm $target_file
    fi

    tar -czvf $target_file ./www/index.html ./www/css ./www/data ./www/icon ./www/js ./www/partials
    echo '----------------------------'
    echo '=>' $target_file
fi
echo 'Done'