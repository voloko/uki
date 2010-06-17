include('uki.js');

uki.sync = new function() {
    this.bound = {};
    this.running = 0;
    this.timer = 0;
    this.queue = [];
    
    this.executeOnce = function(callback) {
        callback.huid = callback.huid || uki.guid++;
        if (this.bound[callback.huid]) return;
        this.bound[callback.huid] = true;
        this.queue.push(callback);
        if (!this.running) this.startTimer();
    };
    
    this.startTimer = function() {
        if (this.timer) return;
        this.timer = setTimeout(uki.proxy(this.runCallbacks),1);
    };
    
    this.clearTimer = function() {
        if (!this.timer) return;
        clearTimeout(this.timer);
        this.timer = 0;
    };
    
    this.run = function() {
        this.clearTimer();
        this.running++;
    };
    
    this.stop = function() {
        if (--this.running) return;
        this.runCallbacks();
    };
    
    this.runCallbacks = function() {
        this.clearTimer();
        var queue = this.queue;
        this.queue = [];
        this.bound = {};
        for (var i=0; i < queue.length; i++) queue[i]();
    };
    
};