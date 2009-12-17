include('label.js');

(function() {

var baseProto = uki.view.Label.prototype,
self = uki.view.Button = uki.newClass(uki.view.Label, uki.view.Focusable, new function() {
    var proto = this;
    
    proto.init = function() {
        baseProto.init.call(this);
        this._inset = new Inset(0, 4);
        this._backgroundPrefix = '';
        this.defaultStyle = this.defaultCss + "overflow:visible;font-weight:bold;color:#333;font-size:12px;cursor:default;-moz-user-select:none;-webkit-user-select:none;text-align:center;"; // background: url(" + uki.theme.image('x').src + ")"; //text-shadow:0 1px 0px rgba(255,255,255,0.8);
    };
    
    proto.typeName = function() {
        return 'uki.view.Button';
    };
    
    uki.newProperties(proto, ['backgroundPrefix']);
    
    uki.each(['normal', 'hover', 'down', 'focus'], function(i, name) {
        var property = name + '-background';
        proto[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || uki.theme.background(this._backgroundPrefix + 'button-' + name);
        };
    });
    
    proto._createDom = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultStyle);
        this._dom.appendChild(this._label);
        
        // load bgs
        this['hover-background']();
        this['down-background']();
        
        this._backgroundByName('normal');
        
        // events
        this._down = false;
        
        var _this = this;
        
        this._mouseup = function(e) {
            _this._backgroundByName('normal');
            _this._down = false;
        };
        
        this._mousedown = function(e) {
            _this._backgroundByName('down');
            _this._down = true;
        };
        
        this._mouseover = function(e) {
            _this._backgroundByName((_this._down) ? 'down' : 'hover');
            _this._over = true;
        };
        
        this._mouseout = function(e) {
            _this._backgroundByName('normal');
            _this._over = false;
        };
        
        uki.dom.bind(document, 'mouseup', this._mouseup);
        uki.dom.bind(this._dom, 'mousedown', this._mousedown);
        uki.dom.bind(this._dom, this._dom.attachEvent ? 'mouseenter' : 'mouseover', this._mouseover);
        uki.dom.bind(this._dom, this._dom.attachEvent ? 'mouseleave' : 'mouseout', this._mouseout);
        
        this.selectable(this.selectable());
        this.className(this.className());
        this._initFocusable();
    };
    
    proto._focus = function() {
        this['focus-background']().attachTo(this);
        if (this._firstFocus) {
            var _this = this;
            uki.dom.bind(this._focusableInput, 'keydown', function(e) {
                if ((e.which == 32 || e.which == 13) && !_this._down) _this._mousedown();
            });
            uki.dom.bind(this._focusableInput, 'keyup', function(e) {
                if ((e.which == 32 || e.which == 13) && _this._down) {
                    _this._mouseup();
                    _this.trigger('click', {domEvent: e, source: _this});
                }
                if (e.which == 27 && _this._down) {
                    _this._mouseup();
                }
            });
        }
    };
    
    proto._blur = function() {
       this['focus-background']().detach();
    };
    
    proto._backgroundByName = function(name) {
        var bg = this[name + '-background']();
        if (this._background == bg) return;
        if (this._background) this._background.detach();
        bg.attachTo(this);
        this._background = bg;
        this._backgroundName = name;
    };

    proto._bindToDom = function(name) {
        return uki.view.Focusable._bindToDom.call(this, name) || uki.view.Label.prototype._bindToDom.call(this, name);
    };
});

})();