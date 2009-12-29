
// Yandex include() emulation
var f = require('file');
var INCLUDE_DIR = f.resolve(f.join(TestRunner.getRunnerFolder(), '..', 'src'));

function export_all (mod) {
    for (var i in mod) {
        if (!mod.hasOwnProperty(i)) continue;
        global[i] = mod[i];
    }
}

global.include = function(path) {
    var prev_dir = INCLUDE_DIR;
    INCLUDE_DIR = f.resolve(f.join(INCLUDE_DIR, f.dirname(path)));
    export_all(require(f.join(INCLUDE_DIR, f.basename(path))));
    specialInclude(path);
    INCLUDE_DIR = prev_dir;
};

function specialInclude (path) {
    if (path.match(/geometry\.js/)) {
        global.Rect = uki.geometry.Rect;
        global.Size = uki.geometry.Size;
        global.Point = uki.geometry.Point;
        global.Inset = uki.geometry.Inset;
    }
}


require('./lib/dom.js');
require('./lib/const.js');
require('browser');
global.serviceTimeouts = require('browser/timeout').serviceTimeouts;
// export_all(require(f.join(TestRunner.getRunnerFolder(), '../app/jquery.js')));


// Helper API
global.read_fixture_file = function(path) {
    return f.open(f.join(TestRunner.getRunnerFolder(), 'fixtures', path)).read();
};
