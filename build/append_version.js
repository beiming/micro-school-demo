"use strict";

var path = require('path');
var fs = require('fs');
var version = 0;


function getFilePath(filePath) {
    return path.resolve(__dirname, filePath);
}

function getVersion() {
    let sourcePath = getFilePath('../src/data/config.json');
    var config = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    version = config.version;
}

function processIndex() {
    console.log('add version for index')
    let sourcePath = getFilePath('../src/index.html');
    let targetPath = getFilePath('../www/index.html');
    let fileContent = fs.readFileSync(sourcePath, 'utf8');

    let versionReg = /{{version}}/g;
    fileContent = fileContent.replace(versionReg, version);
    fs.writeFileSync(targetPath, fileContent, 'utf8');
}

function processCss() {
    console.log('add version for css font')
    let eotReg = /url\("\/icon\/icons\.eot\?#iefix"\)/;
    let woffReg = /url\("\/icon\/icons\.woff"\)/;
    let ttfReg = /url\("\/icon\/icons\.ttf"\)/;
    let svgReg = /url\("\/icon\/icons\.svg#icons"\)/;

    let sourcePath = getFilePath('../www/css/main.css');
    let fileContent = fs.readFileSync(sourcePath, 'utf8');

    fileContent = fileContent.replace(eotReg, 'url("../icon/icons.eot?#iefix&v=' + version + '")');
    fileContent = fileContent.replace(woffReg, 'url("../icon/icons.woff?v=' + version + '")');
    fileContent = fileContent.replace(ttfReg, 'url("../icon/icons.ttf?v=' + version + '")');
    fileContent = fileContent.replace(svgReg, 'url("../icon/icons.svg#icons' + version + '")');

    fs.writeFileSync(sourcePath, fileContent, 'utf8');

}

getVersion();
processIndex();
processCss();
