'use strict';
const BASE_COUNT = 10000;
const UNIT_NAME = ['', '万', '亿'];

var countFormat = count => {
    count = parseInt(count)
    if(count === NaN) {
        count = 0;
    }
    var viewCount = count;
    var unitIndex = 0;
    while(viewCount > 1 && viewCount < BASE_COUNT) {
        viewCount = count / BASE_COUNT;
        count = viewCount;
        unitIndex += 1;
    }
    return `${viewCount}${UNIT_NAME[unitIndex]}`;
};

console.log(countFormat(1000000));
// export {countFormat};
