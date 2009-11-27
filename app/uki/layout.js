include('../uki.js');

uki.layout = new function() {
    
    this.queue = [];
    
    this.schedule = function(style, properties) {
        this.queue[this.queue.length] = [style, properties];
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
        var queue = this.queue,
            style, properties;
        for (var i=0; i < queue.length; i++) {
            style = queue[i][0];
            properties = queue[i][1];
            if (properties.left != undefined) style.left = properties.left + 'px';
            if (properties.top != undefined) style.top = properties.top + 'px';
            // if (properties.right != undefined) style.right = properties.right + 'px';
            // if (properties.bottom != undefined) style.bottom = properties.bottom + 'px';
            if (properties.width != undefined) style.width = properties.width + 'px';
            if (properties.height != undefined) style.height = properties.height + 'px';
        };
        this.queue = [];
    }
};