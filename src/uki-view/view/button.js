include('label.js');

uki.view.Button = uki.newClass(uki.view.Label, uki.view.Focusable, new function() {
    var proto = this,
        Base = uki.view.Label[PROTOTYPE];
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _inset: new Inset(0, 4),
            _backgroundPrefix: '',
            defaultCss: Base.defaultCss + "cursor:default;-moz-user-select:none;-webkit-user-select:none;text-shadow:0 1px 0px rgba(255,255,255,0.8);background:url(" + uki.theme.imageSrc('x') + ")" //text-shadow:0 1px 0px rgba(255,255,255,0.8)
        });
    };
    
    proto.typeName = function() {
        return 'uki.view.Button';
    };
    
    uki.addProps(proto, ['backgroundPrefix', 'icon']);
    
    uki.each(['normal', 'hover', 'down', 'focus'], function(i, name) {
        var property = name + '-background';
        proto[property] = function(bg) {
            if (bg) this['_' + property] = bg;
            return this['_' + property] = this['_' + property] || 
                uki.theme.background(this._backgroundPrefix + 'button-' + name, {height: this.rect().height, view: this});
        };
    });
    
    proto._createLabelClone = function(autosize) {
        var clone = Base._createLabelClone.call(this, autosize);
        clone.style.fontWeight = 'bold';
        return clone;
    };
    
    proto._layoutDom = function(rect) {
        Base._layoutDom.call(this, rect);
        if (this._firstLayout) {
            this['hover-background']();
            this['down-background']();

            this._backgroundByName('normal');
            this._initFocusable();
        }
    };
        
    proto._createDom = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultCss);
        this._label = uki.createElement('div', Base.defaultCss + 
            "font-size:12px;line-height:12px;white-space:nowrap;text-align:center;font-weight:bold;color:#333"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
        
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
        
        function isWithin (e, elem) {
            var parent = e.relatedTarget;
            while ( parent && parent != elem ) {
                try { parent = parent.parentNode } catch(e) { parent = null };
            }
            return parent === elem;
        }
        var supportMouseEnter = this._dom.attachEvent && !root.opera;
        
        this._mouseover = function(e) {
            if (!supportMouseEnter && isWithin(e, _this._dom) || _this._over) return;
            _this._backgroundByName((_this._down) ? 'down' : 'hover');
            _this._over = true;
        };
        
        this._mouseout = function(e) {
            if (!supportMouseEnter && isWithin(e, _this._dom) || !_this._over) return;
            _this._backgroundByName('normal');
            _this._over = false;
        };
        
        uki.dom.bind(document, 'mouseup', this._mouseup);
        uki.dom.bind(this._dom, 'mousedown', this._mousedown);
        uki.dom.bind(this._dom, supportMouseEnter ? 'mouseenter' : 'mouseover', this._mouseover);
        uki.dom.bind(this._dom, supportMouseEnter ? 'mouseleave' : 'mouseout', this._mouseout);
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
        return uki.view.Focusable._bindToDom.call(this, name) || uki.view.Label[PROTOTYPE]._bindToDom.call(this, name);
    };
});