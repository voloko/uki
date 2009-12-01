include('../view.js');
include('focusable.js');

include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Slider = uki.newClass(uki.view.Base, uki.view.Focusable, {
    
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss + 'height:18px;-moz-user-select:none;-webkit-user-select:none;overflow:visible;');
        this._handle = uki.createElement('div', Base.defaultCss + 'cursor:default;background:url(' + uki.theme.image('x').src + ')');
        this._bg = uki.theme.image('slider-handle');
        this._focusBg = uki.theme.image('slider-focus');
        this._focusBg.style.cssText = this._bg.style.cssText = Base.defaultCss + 'top:0;left:0;z-index:-1;'; 
        this._handle.appendChild(this._bg);
        
        var _this = this;
        uki.image.load([this._bg, this._focusBg], function() { _this._afterHandleLoad(); });
        
        uki.theme.background('slider-bar').attachTo(this);
    },
    
    _afterHandleLoad: function() {
        this._focusBg.style.cssText += ';z-index:10;margin-left:-' + (this._focusBg.width) / 2 + 'px;margin-top:-' + (this._focusBg.height-(this._bg.height/2)+1)/2 + 'px;';
        this._handle.style.cssText += ';margin-left:-' + (this._bg.width / 2) + 'px;width:' +this._bg.width + 'px;height:' + (this._bg.height / 2) + 'px;'
        this._dom.appendChild(this._handle);
        var _this = this;
        uki.dom.bind(this._handle, 'dragstart', function(e) { e.returnValue = false });
        
        uki.dom.bind(this._handle, 'mousedown', function(e) {
            _this._dragging = true;
            _this._initialPosition = new uki.geometry.Point(parseInt(_this._handle.style.left, 10), parseInt(_this._handle.style.top, 10));
            uki.dom.drag.start(_this, e);
        });
        
        uki.dom.bind(this._handle, 'mouseover', function() {
            _this._over = true;
            _this._bg.style.top = - _this._bg.height / 2 + 'px';
        });
        
        uki.dom.bind(this._handle, 'mouseout', function() {
            _this._over = false;
            _this._bg.style.top = _this._dragging ? (- _this._bg.height / 2 + 'px') : 0;
        });
        
        this._initFocusable();
    },
    
    _drag: function(e, offset) {
        this._handle.style.left = Math.max(0, Math.min(this._rect.width, this._initialPosition.x - offset.x)) + 'px';
        if (this.hasFocus()) this._focusBg.style.left = this._handle.style.left;
    },
    
    _drop: function(e, offset) {
        this._dragging = false;
        this._initialPosition = null;
        if (!this._over) this._bg.style.top = 0;
    },
    
    _focus: function() {
        this._dom.appendChild(this._focusBg);
        this._focusBg.style.left = this._handle.style.left;
    },
    
    _blur: function() {
        this._dom.removeChild(this._focusBg);
    },
    
    _domLayout: function() {
        uki.dom.layout(this._dom.style, {
            left: this._rect.x, 
            top: (this._rect.height - 18 / 2) + this._rect.y, 
            width: this._rect.width
        });
    },

    typeName: function() {
        return 'uki.view.Slider';
    }
});

})();