include('../view.js');

uki.view.declare('uki.more.view.NativeControl', uki.view.Base, uki.view.Focusable, function(Base, Focusable) {
    this._setup = function() {
        Base._setup.call(this);
        this._type = 'button';
    };
    
    uki.delegateProp(this, 'disabled', '_dom');
    uki.delegateProp(this, 'value', '_dom');
    
    this.domName = function(name) {
        if (name === undefined) return this._dom.name;
        this._dom.setAttribute('name', name);
        this._dom.name = name;
        this._initClassName();
        
        if (/MSIE 6/.test(navigator.userAgent)) {
            var clone = document.createElement('<input name="' + name + '" />');
            clone.type = this._type; // type is not copied
            clone.mergeAttributes(this._dom);
            if (this._dom.parentNode) {
                this._dom.parentNode.replaceChild(clone, this._dom);
            }
            this._dom = clone;
        }
        
        return this;
    };
    
    this._createDom = function() {
        this._dom = uki.createElement('input', 'position:absolute;z-index:100;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;');
        this._dom.type = this._type;
        this._initFocusable(this._dom);
    };
    
    this._bindToDom = function(name) {
        return Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
});