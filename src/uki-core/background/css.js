include('../background.js');
include('../image.js');

/**
 * Writes css properties to targets dom()
 *
 * @class
 */
uki.background.Css = uki.newClass(new function() {
    
    /**#@+ @memberOf uki.background.Css.prototype */
    this.init = function(options) {
        this._options = typeof options == 'string' ? {background: options} : options;
        this._options = uki.browser.css(this._options);
    };
    
    this.attachTo = function(comp) {
        this._comp = comp;
        this._originalValues = {};
        
        uki.each(this._options, function(name, value) {
            // this._originalValues[name] = dom.style[name];
            // dom.style[name] = value;
            this._originalValues[name] = comp.style(name);
            comp.style(name, value);
        }, this);
    };
    
    this.detach = function() {
        if (this._comp) {
            uki.each(this._options, function(name, value) {
                this._comp.style(name, this._originalValues[name]);
            }, this);
        }
        
    };
    /**#@-*/
});