include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Button = uki.newClass(Base, {
    
    init: function() {
        Base.init.apply(this, arguments);
        this._selectable = false;
        this.defaultStyle = Base.defaultCss + "font-weight:bold;color:#333;font-size:12px;cursor:default;-moz-user-select:none;-webkit-user-select:none;text-align:center;"; //text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._label = uki.createElement('div', this.defaultStyle + 'width:100%;background:url(' + uki.defaultTheme.imagePath + 'x.gif' + ');');
    },
    
    selectable: function(state) {
        if (arguments.length) {
            this._label.unselectable = state ? '' : 'on';
        }
        return Base.selectable.apply(this, arguments);
    },
    
    _domCreate: function() {
        // dom
        this._dom = uki.createElement('div', this.defaultStyle);
        this._dom.appendChild(this._label);
        this._label.onselectstart = this._dom.onselectstart = uki.F;
        
        var backgrounds = uki.defaultTheme.backgrounds,
            _this = this;
        this._backgrounds = {
            normal: backgrounds['button-normal'](),
            hover: backgrounds['button-hover'](),
            down: backgrounds['button-down']()
        };
        
        this._backgroundByName('normal');
        
        // events
        this._down = false;
        
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
        if (this._background == this._backgrounds[name]) return;
        if (this._background) this._background.detach();
        this._backgrounds[name].attachTo(this);
        this._background = this._backgrounds[name];
    },

    _domLayout: function() {
        Base._domLayout.apply(this, arguments);
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