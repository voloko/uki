include('base.js');

(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss + ';cursor:text');
        this._input = uki.createElement('input', Base.defaultCss + "-moz-box-sizing:border-box;border:none;outline:none;background:transparent;padding:0;height:15px;padding-top:3px;line-height:11px;overflow:hidden;font-size:11px;left:2px;top:0;z-index:10;background: url(" + uki.defaultTheme.images.x().src + ")");
        if (window.opera) this._input.style.height = '13px';
        this._dom.appendChild(this._input);
    },

    _afterInit: function() {
        uki.defaultTheme.backgrounds.input().attachTo(this);
    },
    
    layout: function() {
        Base.layout.apply(this, arguments);
        uki.dom.layout(this._input.style,{
            width: this._rect.size.width - 4,
            top: (this._rect.size.height - 20) / 2
        });
    },

    value: function(text) {
        if (arguments.length == 0) return this._input.value;
        this._input.value = text;
    },

    placeholder: function(text) {
        if (arguments.length == 0) return this._input.getAttribute('placeholder');
        this._input.setAttribute('placeholder', text);
    }
});
    
})();