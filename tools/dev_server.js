var express = require('express'),
    sr      = require('static_require'),
    url     = require('url'),
    pro     = require('uglify-js').uglify,
    app     = express.createServer();
    
exports.init = function() {
    app.get('/*.js', function(req, res) {
        var filename = req.param(0) + '.js';
        try {
            var ast = sr.parse(filename);
            if (req.param('squeeze')) {
                ast = pro.ast_mangle(ast);
                ast = pro.ast_squeeze(ast);
                ast = pro.ast_squeeze_more(ast);
            }

            var code = pro.gen_code(ast, !req.param('squeeze'));
        } catch (e) {
            require('util').error(e);
            console.log(e.stack);
            var code = 'alert(' + JSON.stringify(e.message + '. Current file ' + sr.state.currentPath) + ')';
        }
        res.writeHead(200, { 
            "Content-Type": 'application/javascript',
            "Content-Length": code.length
        });
        res.end(req.method === "HEAD" ? "" : code);
    });

    app.get('/*', function(req, res) {
        res.sendfile(req.param(0))
    });
};

exports.app = app;