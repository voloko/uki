require.paths.unshift(__dirname);

var server = require('server'),
    sr     = require('static_require'),
    url    = require('url'),
    pro    = require('./lib/process');
    
server.get(/\.js$/, function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var filename = parsedUrl.pathname.substr(1);
    var ast = sr.parse(filename);
    if (parsedUrl.query.squeeze) {
        ast = pro.ast_mangle(ast);
        ast = pro.ast_squeeze(ast);
        ast = pro.ast_squeeze_more(ast);
    }
    
    var code = pro.gen_code(ast, !parsedUrl.query.squeeze);
    res.writeHead(200, { 
        "Content-Type": 'application/javascript',
        "Content-Length": code.length
    });
    res.end(req.method === "HEAD" ? "" : code);
});

server.get(/.*/, function(req, res) {
    server.handleStatic(req, res);
});

var pair = process.argv[2],
    host = '127.0.0.1',
    port = 21119,
    matches;
if (pair) {
    if (pair.match(/^\d+$/)) {
        port = pair;
    } else if (matches = pair.match(/^(.*):(\d+)$/)) {
        host = matches[1];
        port = matches[2];
    } else {
        host = pair;
    }
}
server.listen(port, host);

