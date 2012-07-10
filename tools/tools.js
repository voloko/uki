var cli     = require('cli'),
    fs      = require('fs'),
    options = cli.parse(
    {
        squeeze: ['s', 'Squeeze output']
    }, ['run', 'build']),
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
    
    var dev_server = require('./dev_server');
    var fs = require('fs'),
        path = require('path');
        
    try {
        require(path.join(process.cwd(), 'express.js')).init(dev_server.app);
        util.puts("Loaded express.js");
    } catch(e) {}
    
    var here = fs.realpathSync(process.cwd());
    dev_server.init(here);
    dev_server.app.listen(port, host);
    util.puts("Server at http://" + (host || "127.0.0.1") + ":" + port.toString() + "/");
    
} else if (cli.command == 'build') {
    
    var static_require = require('./static_require');
    var file = cli.args[0];
    var options = { filePath: cli.args[0], squeeze: cli.options.squeeze };
    var code = static_require.require(options);
    console.log(code);
}
    
