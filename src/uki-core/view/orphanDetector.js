var view  = require('../view'),
    utils = require('../utils'),

    Attaching = require('../attaching').Attaching;


var RUN_TIMEOUT = 5000;

/**
 * Debug only
 */
exports.OrphanDetector = {
    run: function() {
        var orphans = [];
        utils.forEach(view._registry, function(view) {
            if (!view.parent() && !view instanceof Attaching) {
                orphans.push(view);
            }
        });
        if(orphans.length) {
            console.log(orphans.length + ' orphan view(s) found'); // used
            console.log(orphans); // used
        }
    },

    _running: false,

    start: function() {
        if (this._running) return;
        this._running = setInterval(this.run, RUN_TIMEOUT);
    }
};
