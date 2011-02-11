require.paths.unshift(__dirname);

var server = require('server'),
    sr     = require('static_require'),
    url    = require('url');
    
server.get(/\.js$/, function(req, res) {
    var filename = url.parse(req.url).pathname.substr(1);
    var code = sr.gen_code(filename, { beautify: true });
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

