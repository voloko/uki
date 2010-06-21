include('uki.js');

/**
 * Executes callback at or after the end of processing.
 * Example: execute flow layout after all child views were added.
 * Runs either at the end of event handling or after a timeout.
 * Each callback (by huid) is executed once
 * @function
 * @param {function()} callback
 */
uki.after = (function() {
    var after = function(callback) {
        callback.huid = callback.huid || uki.guid++;
        if (after._bound[callback.huid]) return;
        after._bound[callback.huid] = true;
        after._queue.push(callback);
        if (!after._running) after._startTimer();
    };
    
    after._bound = {};
    after._running = false;
    after._timer = 0;
    after._queue = [];
    
    after.start = function() {
        after._clearTimer();
        after._running++;
    };
    
    after.stop = function() {
        if (--after._running) return;
        after._runCallbacks();
    };
    
    
    
    after._runCallbacks = function() {
        after._clearTimer();
        var queue = after._queue;
        after._queue = [];
        after._bound = {};
        for (var i=0; i < queue.length; i++) queue[i]();
    };
    
    after._startTimer = function() {
        if (after._timer) return;
        after._timer = setTimeout(after._runCallbacks, 1);
    };
    
    after._clearTimer = function() {
        if (!after._timer) return;
        clearTimeout(after._timer);
        after._timer = 0;
    };
    
    return after;
})();
