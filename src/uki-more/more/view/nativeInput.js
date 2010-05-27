include('nativeControl.js');

uki.view.declare('uki.more.view.NativeInput', uki.view.Base, uki.view.Focusable, function(Base,Focusable) {
    this._createDom = function() {
        Base._createDom.call(this);
        this._dom.innerHTML = '<input type="text" style="position:absolute;z-index:100;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;width:100%;height:100%;" />'
        this._input = this._dom.firstChild;
        this._initFocusable(this._input);
    };
    
    uki.delegateProp(this, 'name', '_input');
    uki.delegateProp(this, 'disabled', '_input');
    uki.delegateProp(this, 'value', '_input');
    
    this._layoutDom = function(rect) {
        Base._layoutDom.apply(this, arguments);
        this._lastInputLayout = uki.dom.layout(this._input.style, {width: rect.width}, this._lastInputLayout);
        if (this._placeholderDom) {
            this._placeholderDom.style.lineHeight = this._rect.height + 'px';
        }
    };
    
    function getInputOffset (input) {
        var clone1 = input.cloneNode(input),
            clone2 = input.cloneNode(input);
        clone1.style.cssText += ';padding:0;border:0;overflow:hidden;width:auto;-moz-box-sizing:auto;-webkit-box-sizing:auto;box-sizing:auto;';
        clone2.style.cssText += ';width:auto;-moz-box-sizing:auto;-webkit-box-sizing:auto;box-sizing:auto;'
        return (uki.dom.probe(clone2, function(clone) { return clone.offsetWidth; }) - 
            uki.dom.probe(clone1, function(clone) { return clone.offsetWidth; }))/2;
    }
    
    function nativePlaceholder (node) {
        return typeof node.placeholder == 'string';
    }
    
    this.placeholder = uki.newProp('_placeholder', function(v) {
        this._placeholder = v;
        if (nativePlaceholder(this._dom)) {
            this._dom.placeholder = v;
        } else {
            if (!this._placeholderDom) {
                this._placeholderDom = uki.createElement('div', this.defaultCss + 'z-index:103;color:#999;cursor:text', v);
                this._dom.appendChild(this._placeholderDom);
                this._updatePlaceholderVis();
                uki.each(['fontSize', 'fontFamily', 'fontWeight'], function(i, name) {
                    this._placeholderDom.style[name] = this.style(name);
                }, this);
                this._placeholderDom.style.left = getInputOffset(this._input) + 'px';
                
                uki.dom.bind(this._placeholderDom, 'mousedown', uki.proxy(function(e) { 
                    // e.preventDefault(); 
                    setTimeout(uki.proxy(this.focus, this), 1);
                }, this));
            } else {
                this._placeholderDom.innerHTML = v;
            }
        }
    });    
    
    this._updatePlaceholderVis = function() {
        if (this._placeholderDom) this._placeholderDom.style.display = this.value() ? 'none' : 'block';
    };
    
    this._bindToDom = function(name) {
        return Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    };
    
    this._focus = function(e) {
        if (this._placeholderDom) this._placeholderDom.style.display = 'none';
        Focusable._focus.call(this, e);
    };
    
    this._blur = function(e) {
        this._updatePlaceholderVis();
        Focusable._blur.call(this, e);
    };
    
});