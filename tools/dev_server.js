var express = require('express'),
    sr      = require('static_require'),
    url     = require('url'),
    pro     = require('uglify-js').uglify,
    app     = express.createServer();
    
exports.init = function() {
    // app.get('/*.js', sr.getHandler({
    //     searchPaths: []
    // }));

    app.get('/*', function(req, res) {
        res.sendfile(req.param(0))
    });
};

exports.app = app;