var express = require('express');
var DEFAULT_PORT = 3600;


(function () {
    var app = express();

    app.use('/js', express.static('./www/js'));
    app.use('/css', express.static('./www/css'));
    app.use('/partials', express.static('./www/partials'));
    app.use('/icon', express.static('./www/icon'));
    app.use('/data', express.static('./www/data'));

    app.get('/', function (req, res) {
        res.sendFile('index.html', {root: __dirname + '/www'});
    });

    app.listen(DEFAULT_PORT, function () {
        console.log('server start at http://0.0.0.0:' + DEFAULT_PORT)
    });
})();
