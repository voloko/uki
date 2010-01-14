include('label.js');

uki.view.Button = uki.newClass(uki.view.Label, uki.view.Focusable, new function() {
    var proto = this,
        Base = uki.view.Label[PROTOTYPE];
    
    proto._setup = function() {
        Base._setup.call(this);
        uki.extend(this, {
            _inset: new Inset(0, 4),
            _backgroundPrefix: '',
            defaultCss: Base.defaultCss + "cursor:default;-moz-user-select:none;-webkit-user-select:none;" //text-shadow:0 1px 0px rgba(255,255,255,0.8)
        });
    };
    
    proto.typeName = function() {
        return 'uki.view.Button';
    };
    
    uki.addProps(proto, ['backgroundPrefix']);
    
    uki.each(['normal', 'hover', 'down', 'focus', 'disabled'], function(i, name) {
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
        }
    };
    
    proto._updateBg = function() {
        var name = this._disabled ? 'disabled' : this._down ? 'down' : this._over ? 'hover' : 'normal';
        this.color(this._disabled ? '#999' : '#333');
        this._backgroundByName(name);
    };
        
    var supportMouseEnter = root.attachEvent && !root.opera;
    
    proto._createDom = function() {
        // dom
        this._dom = uki.createElement('div', this.defaultCss);
        this._label = uki.createElement('div', Base.defaultCss + 
            "font-size:12px;line-height:12px;white-space:nowrap;text-align:center;font-weight:bold;color:#333;"); // text-shadow:0 1px 0px rgba(255,255,255,0.8);
        this._dom.appendChild(this._label);
        if (this._dom.attachEvent) {
            // click handler for ie
            this._dom.appendChild(uki.createElement('div', 'width:100%;height:100%;position:absolute;background:url(' + uki.theme.imageSrc('x') + ');'));
        }
        
        uki.dom.bind(document, 'mouseup', uki.proxy(this._mouseup, this));
        uki.dom.bind(this._dom, 'mousedown', uki.proxy(this._mousedown, this));
        uki.dom.bind(this._dom, supportMouseEnter ? 'mouseenter' : 'mouseover', uki.proxy(this._mouseover, this));
        uki.dom.bind(this._dom, supportMouseEnter ? 'mouseleave' : 'mouseout', uki.proxy(this._mouseout, this));
        this.textSelectable(this.textSelectable());
        this._initFocusable();
    };
    
    proto._mouseup = function(e) {
        this._down = false;
        this._updateBg();
    };
    
    proto._mousedown = function(e) {
        this._down = true;
        this._updateBg();
    };
    
    proto._mouseover = function(e) {
        if (!supportMouseEnter && uki.dom.contains(this._dom, e.relatedTarget) || this._over) return;
        this._over = true;
        this._updateBg();
    };
    
    proto._mouseout = function(e) {
        if (!supportMouseEnter && uki.dom.contains(this._dom, e.relatedTarget) || !this._over) return;
        this._over = false;
        this._updateBg();
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