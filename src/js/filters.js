'use strict';
const BASE_COUNT = 10000;
const UNIT_NAME = ['', '万', '亿'];

var parseToInt = chr => {
    chr = parseInt(chr);
    if(chr === NaN) {
        chr = 0;
    }
    return chr;
};

var formatDuration = () => {
    return duration => {
        duration = parseToInt(duration);
        return `${Math.floor(duration/60)}"${duration%60}'`
    };
};

var formatCount = () => {
    return count => {
        count = parseToInt(count);
        if(count === 0) {
            return `${count}${UNIT_NAME[0]}`;
        }
        var unitIndex = parseInt(Math.floor(Math.log(count) / Math.log(BASE_COUNT)));
        count = count / Math.pow(BASE_COUNT, unitIndex);
        if(count >= BASE_COUNT) {
            count = count / BASE_COUNT;
            unitIndex++
        }
        count = Math.round(count);
        return `${count}${UNIT_NAME[unitIndex]}`;
    };
};

export {formatCount, formatDuration};
