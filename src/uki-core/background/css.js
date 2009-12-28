include('../background.js');
include('../image.js');

uki.background.Css = uki.newClass(new function() {
    
    this.init = function(options) {
        this._options = typeof options == 'string' ? {background: options} : options;
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        this._originalValues = {};
        var dom = comp.dom();
        
        uki.each(this._options, function(name, value) {
            this._originalValues[name] = dom.style[name];
            dom.style[name] = value;
        }, this);
    };
    
    this.detach = function() {
        if (this._comp) {
            var dom = this._comp.dom();
            uki.each(this._options, function(name, value) {
                dom[name] = this._originalValues[name];
            }, this);
        }
        
    };
});