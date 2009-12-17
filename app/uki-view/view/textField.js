(function() {

var Base = uki.view.Base.prototype,
    emptyInputHeight;
    
function getEmptyInputHeight () {
    if (!emptyInputHeight) {
        uki.dom.probe(
            uki.createElement('input', Base.defaultCss + "border:none;padding:0;overflow:hidden;font-size:11px;left:-999em;top:0"),
            function(probe) {
                emptyInputHeight = probe.offsetHeight;
            }
        );
    }
    return emptyInputHeight;
}
    
uki.view.TextField = uki.newClass(uki.view.Base, uki.view.Focusable, {
    init: function() {
        this._input = uki.createElement('input', Base.defaultCss + "margin:0;border:none;outline:none;padding:0;overflow:hidden;font-size:11px;left:2px;top:0;z-index:100;background: url(" + uki.theme.image('x').src + ")");
        Base.init.apply(this, arguments);
    },
    
    typeName: function() {
        return 'uki.component.TextField';
    },
    
    _createDom: function() {
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible;');
        this._dom.appendChild(this._input);
        
        uki.theme.background('input').attachTo(this);
        
        this.className(this.className());
        
        this._initFocusable(this._input);
    },

    _layoutDom: function() {
        Base._layoutDom.apply(this, arguments);
        uki.dom.layout(this._input.style, {
            width: this._rect.width - 4
        });
        var o = (this._rect.height - getEmptyInputHeight()) / 2;
        this._input.style.padding =  Math.floor(o) + 'px 0 ' + Math.ceil(o) + 'px 0';
    },

    _focus: function() {
        this._focusBackground = this._focusBackground || uki.theme.background('input-focus');
        this._focusBackground.attachTo(this);
    },
    
    _blur: function() {
        this._focusBackground.detach();
    },

    value: function(text) {
        if (text === undefined) return this._input.value;
        this._input.value = text;
        return this;
    },

    placeholder: function(text) {
        if (text === undefined) return this._input.getAttribute('placeholder');
        this._input.setAttribute('placeholder', text);
        return this;
    },
    
    _bindToDom: function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || Base._bindToDom.call(this, name);
    }
    
});
    
})();