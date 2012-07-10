var express = require('express'),
    sr      = require('./static_require'),
    app     = express.createServer();

exports.init = function(here) {
    app.get('/*.js', sr.getHandler({
        searchPaths: [here]
    }));

    app.get('/*', function(req, res) {
        res.sendfile(req.param(0))
    });
};

exports.app = app;