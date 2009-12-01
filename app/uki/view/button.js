include('base.js');
include('focusable.js');

(function() {

var Base = uki.view.Base,
    baseProto = Base.prototype,
self = uki.view.Button = uki.newClass(Base, uki.view.Focusable, new function() {
    var proto = this;
    
    proto.init = function() {
        baseProto.init.apply(this, arguments);
        this._selectable = false;
        this.defaultStyle = this.defaultCss + "overflow:visible;font-weight:bold;color:#333;font-size:12px;cursor:default;-moz-user-select:none;-webkit-user-select:none;text-align:center;"; //text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._label = uki.createElement('div', this.defaultStyle + 'width:100%;background:url(' + uki.theme.image('x').src + ');');
    }
    
    proto.selectable = function(state) {
        if (state !== undefined) {
            this._label.unselectable = state ? '' : 'on';
        }
        return baseProto.selectable.call(this, state);
    }
    
    uki.each(['normal', 'hover', 'down', 'focus'], function(i, name) {
        var property = name + '-background';
        proto[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || uki.theme.background('button-' + name);
        };
    });
    
    proto._domCreate = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultStyle);
        this._dom.appendChild(this._label);
        this._label.onselectstart = this._dom.onselectstart = uki.F;
        
        // load bgs
        this['hover-background']();
        this['down-background']();
        
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
            _this._over = true;
        });
        
        uki.dom.bind(this._dom, 'mouseout', function() {
            _this._backgroundByName('normal');
            _this._over = false;
        });
        this.selectable(this.selectable());
        this._initFocusable();
    }
    
    proto._focus = function() {
        this['focus-background']().attachTo(this);
    }
    
    proto._blur = function() {
        this['focus-background']().detach();
    }
    
    proto._backgroundByName = function(name) {
        var bg = this[name + '-background']();
        if (this._background == bg) return;
        if (this._background) this._background.detach();
        bg.attachTo(this);
        this._background = bg;
        this._backgroundName = name;
    }

    proto._domLayout = function() {
        baseProto._domLayout.apply(this, arguments);
        this._label.style.lineHeight = this._rect.height + 'px';
    }

    proto.typeName = function() {
        return 'uki.view.Button';
    }

    proto.text = function(text) {
        if (text === undefined) return this._label.innerHTML;
        this._label.innerHTML = text;
    }
});

})();