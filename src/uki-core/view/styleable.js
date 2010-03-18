include('../view.js');

/**
 * @class
 */
uki.view.Styleable = new function() {
    /** @scope uki.view.Styleable.prototype */
    
    /**
     * @name style
     * @memberOf uki.view.Styleable#
     * @function
     */
    this.style = function(name, value) {
        if (typeof name == 'string') return this._style(name, value);
        
        uki.each(name, function(name, value) {
            this._style(name, value);
        }, this);
        return this;
    };
    
    this._style = function(name, value) {
        if (value === undefined) return this._dom.style[name];
        this._dom.style[name] = value;
        return this;
    };
    
    // TODO: is this really needed?
    // uki.each('fontSize,textAlign,color,fontFamily,fontWeight,lineHeight,zIndex'.split(','), function(i, name) {
    //     proto[name] = function(value) {
    //         return this._style(name, value);
    //     };
    // });
    
    var probe = uki.createElement('div').style,
        proto = this;
    uki.each(['userSelect', 'MozUserSelect', 'WebkitUserSelect'], function() {
        if (typeof probe[this] == 'string') proto._textSelectProp = this;
    });
    
    /**
     * Sets whether text of the view can be selected.
     *
     * @memberOf uki.view.Styleable#
     * @name textSelectable
     * @function
     * @param {boolean=} state 
     * @returns {boolean|uki.view.Base} current textSelectable state of self
     */
    this.textSelectable = function(state) {
        if (state === undefined) return this._textSelectable;
        this._textSelectable = state;
        if (this._textSelectProp) {
            this._dom.style[this._textSelectProp] = state ? '' : this._textSelectProp == 'MozUserSelect' ? '-moz-none' : 'none';
        } else {
            // uki.dom[state ? 'unbind' : 'bind'](this.dom(), 'selectstart mousedown', uki.dom.preventDefaultHandler);
        }
        this._dom.style.cursor = state ? 'text' : 'default';
        return this;
    };
    
    this.draggable = function(state) {
        if (state === undefined) return this._dom.getAttribute('draggable');
        this._dom.setAttribute('draggable', true);
        this._dom.style.WebkitUserDrag = 'element';
    };
    
    /**#@-*/ 
};