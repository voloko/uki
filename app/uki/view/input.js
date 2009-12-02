include('base.js');
include('focusable.js');

(function() {

var Base = uki.view.Base.prototype,
    emptyInputHeight;
    
function getEmptyInputHeight (argument) {
    if (!emptyInputHeight) {
        var probe = uki.createElement('input', Base.defaultCss + "border:none;padding:0;overflow:hidden;font-size:11px;left:-999em;top:0");
        document.body.appendChild(probe);
        emptyInputHeight = probe.offsetHeight;
        document.body.removeChild(probe);
    }
    return emptyInputHeight;
}
    
uki.view.Input = uki.newClass(uki.view.Base, uki.view.Focusable, {
    init: function() {
        this._input = uki.createElement('input', Base.defaultCss + "margin:0;border:none;outline:none;padding:0;overflow:hidden;font-size:11px;left:2px;top:0;z-index:100;background: url(" + uki.theme.image('x').src + ")");
        Base.init.apply(this, arguments);
    },
    
    typeName: function() {
        return 'uki.component.Input';
    },
    
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text;overflow:visible;');
        this._dom.appendChild(this._input);
        
        uki.theme.background('input').attachTo(this);
        this._initFocusable(this._input);
    },

    _domLayout: function() {
        Base._domLayout.apply(this, arguments);
        uki.dom.layout(this._input.style, {
            width: this._rect.width - 4
        });
        var o = (this._rect.height - getEmptyInputHeight()) / 2;
        this._input.style.margin =  Math.floor(o) + 'px 0 ' + Math.ceil(o) + 'px 0';
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
    },

    placeholder: function(text) {
        if (text === undefined) return this._input.getAttribute('placeholder');
        this._input.setAttribute('placeholder', text);
    }
});
    
})();