var express = require('express');
var DEFAULT_PORT = 3600;


(function () {
    var app = express();

    app.use('/', express.static('./www'));

    // app.get('/', function (req, res) {
    //     res.sendFile('index.html', {root: __dirname + '/www'});
    // });

    app.listen(DEFAULT_PORT, function () {
        console.log('server start at http://0.0.0.0:' + DEFAULT_PORT)
    });
})();
