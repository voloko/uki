// QUnit
global.QUnit = require('qunit').QUnit;
var f = require('file'),
    p = require('printf'),
    lastMessage = '',
    totalComplete = 0,
    totalFailed = 0;

function bind_qunit () {
    var count = 0;
    QUnit.done = function(failures, total) {
        lastMessage = ("  " + p.sprintf("%8d", total) + " expectations complete with " + failures + " failures");
    };

    QUnit.testDone = function(name, failures, total) {
        if (failures > 0) {
            print("failed test: " + name);
            totalFailed++
        }
        totalComplete++;
    };

    QUnit.log = function(result, message) {
        if (!result) print("failed assertion: " + message);
    };
}

function run_test (filename) {
    bind_qunit();
    print("Running tests in " + filename.replace(getRunnerFolder(), ''));
    try {
        if (!f.isAbsolute(filename)) {
            filename = f.join(f.cwd(), filename);
        }
        require(filename);
        require('browser/timeout').serviceTimeouts();
        print(lastMessage + "\n")
    } catch( e ) {
        print("failed with");
        print(e);
    }
}

function getRunnerFolder () {
    return f.dirname(f.absolute(system.args[0]));
}

function printTotal () {
    print("failed " + totalFailed + " out of " + totalComplete);
}

global.TestRunner = {
    getRunnerFolder: getRunnerFolder
};

var i = 0;
if (system.args.length > 1) {
    for (i=1; i < system.args.length; i++) {
        run_test(system.args[i]);
    };
    printTotal();
} else {
    var files = f.glob(getRunnerFolder() + '/**/*_test.js');
    for (i=0; i < files.length; i++) {
        run_test(files[i]);
    };
    printTotal();
}




