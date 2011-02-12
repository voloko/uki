require.paths.unshift(__dirname);

var cli = require('cli'),
    options = cli.parse(null, ['run', 'build']),
    util = require('util');
    
if (cli.command == 'run') {
    
    var pair = cli.args[0],
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
    
    var dev_server = require('dev_server');
    var fs = require('fs'),
        path = require('path');
        
    try {
        require(path.join(process.cwd(), 'express.js')).init(dev_server.app);
        util.puts("Loaded express.js");
    } catch(e) {}
    
    dev_server.init();
    dev_server.app.listen(port, host);
    util.puts("Server at http://" + (host || "127.0.0.1") + ":" + port.toString() + "/");
} else if (cli.command == 'build') {
    
}
    
