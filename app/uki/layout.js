include('../uki.js');

uki.layout = new function() {
    var stepId = 1,
        layoutMarker = '__layout_step',
        queue = [];
        
    this.queue = queue;
    
    this.schedule = function( comp ) {
        queue[queue.length] = comp;
    };
    
    this.wait = function() {
        this._waiting = true;
    };
    
    this.stopWaiting = function() {
        this._waiting = false;
        this.perform();
    };
    
    this.perform = function() {
        if (this._waiting) return;
        
        for (var i=0, comp; i < queue.length; i++) {
            var comp = queue[i];
            if (comp[layoutMarker] != stepId) {
                comp[layoutMarker] = stepId;
                comp.layout();
            };
        };
        this.queue = queue = [];
        stepId++;
    }
};