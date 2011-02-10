importScripts('../view.js');


/**
 * Debug only
 */
uki.view.OrphanDetector = (function() {
    var RUN_TIMEOUT = 5000;

    this.run = function() {
        var orphans = [];
        uki.forEach(uki.view._registry, function(view) {
            if (!view.parent() && !view instanceof uki.Attachment) orphans.push(view);
        });
        if(orphans.length) {
            console.log(orphans.length + ' orphan view(s) found'); // used
            console.log(orphans); // used
        }
    };

    this._running = false;

    this.start = function() {
        if (this._running) return;
        this._running = setInterval(this.run, RUN_TIMEOUT);
    };

    return this;
}).call({});
