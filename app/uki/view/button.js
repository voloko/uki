include('base.js');

(function() {

var Base = uki.view.Base,
    baseProto = Base.prototype,
self = uki.view.Button = uki.newClass(Base, {
    
    init: function() {
        baseProto.init.apply(this, arguments);
        this._selectable = false;
        this.defaultStyle = this.defaultCss + "font-weight:bold;color:#333;font-size:12px;cursor:default;-moz-user-select:none;-webkit-user-select:none;text-align:center;"; //text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._label = uki.createElement('div', this.defaultStyle + 'width:100%;background:url(' + uki.theme.image('x').src + ');');
    },
    
    selectable: function(state) {
        if (arguments.length) {
            this._label.unselectable = state ? '' : 'on';
        }
        return baseProto.selectable.apply(this, arguments);
    },
    
    normalBg: function(bg) {
        if (bg) this._normalBg = bg;
        return this._normalBg = this._normalBg || uki.theme.background('button-normal');
    },
    
    hoverBg: function(bg) {
        if (bg) this._hoverBg = bg;
        return this._hoverBg = this._hoverBg || uki.theme.background('button-hover');
    },
    
    downBg: function(bg) {
        if (bg) this._downBg = bg;
        return this._downBg = this._downBg || uki.theme.background('button-down');
    },
    
    _domCreate: function() {
        // dom
        this._dom = uki.createElement('div', this.defaultStyle);
        this._dom.appendChild(this._label);
        this._label.onselectstart = this._dom.onselectstart = uki.F;
        
        this._backgroundByName('normal');
        
        // events
        this._down = false;
        
        var _this = this;
        uki.dom.bind(document, 'mouseup', function() {
            _this._backgroundByName('normal');
            _this._down = false;
        });
        
        uki.dom.bind(this._dom, 'mousedown', function() {
            _this._backgroundByName('down');
            _this._down = true;
        });
        
        uki.dom.bind(this._dom, 'mouseover', function(e) {
            _this._backgroundByName((_this._down) ? 'down' : 'hover');
        });
        
        uki.dom.bind(this._dom, 'mouseout', function() {
            _this._backgroundByName('normal');
        });
        this.selectable(this.selectable());
    },
    
    _backgroundByName: function(name) {
        var bg = this[name + 'Bg']();
        if (this._background == bg) return;
        if (this._background) this._background.detach();
        bg.attachTo(this);
        this._background = bg;
    },

    _domLayout: function() {
        baseProto._domLayout.apply(this, arguments);
        this._label.style.lineHeight = this._rect.height + 'px';
    },

    typeName: function() {
        return 'uki.view.Button';
    },

    text: function() {
        if (arguments.length == 0) return this._label.innerHTML;
        this._label.innerHTML = arguments[0];
    }
});

})();