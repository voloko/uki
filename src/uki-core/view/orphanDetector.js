var view  = require('../view'),
    utils = require('../utils'),

    Attachment = require('../attachment').Attachment;


var RUN_TIMEOUT = 5000;

/**
 * Debug only
 */
exports.OrphanDetector = {
    run: function() {
        var orphans = [];
        utils.forEach(view._registry, function(view) {
            if (!view.parent() && !view instanceof Attachment) {
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
