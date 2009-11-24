include('base.js');

(function() {

var Base = uki.component.Base.prototype,
self = uki.component.Button = uki.newClass(Base, {

    _afterInit: function() {
        var backgrounds = uki.defaultTheme.backgrounds,
            _this = this;
        this._backgrounds = {
            normal: backgrounds['button-normal'](),
            hover: backgrounds['button-hover'](),
            down: backgrounds['button-down']()
        };
        
        this._backgroundByName('normal');
        
        this._down = false;
        
        uki.bind(document, 'mouseup', function() {
            _this._backgroundByName('normal');
            _this._down = false;
        });
        
        this.bind('mousedown', function() {
            _this._backgroundByName('down');
            _this._down = true;
        });
        
        this.bind('mouseover', function(e) {
            _this._backgroundByName((e.which == 1 && this._down) ? 'down' : 'hover');
        });
        
        this.bind('mouseout', function() {
            _this._backgroundByName('normal');
        });
        
    },
    
    _backgroundByName: function(name) {
        if (this._background == this._backgrounds[name]) return;
        if (this._background) this._background.detach();
        this._backgrounds[name].attachTo(this);
        this._background = this._backgrounds[name];
    },

    _domCreate: function() {
        var style = Base.defaultCss + "font-weight:bold;color:#333;text-shadow:0 1px 0px rgba(255,255,255,0.8);font-size:12px;cursor:default;-moz-user-select:none;-webkit-user-select:none;text-align:center;";
        this._dom = uki.createElement('div', style);
        this._label = uki.createElement('div',style + 'width:100%;background:url(' + uki.defaultTheme.imagePath + '/x.gif' + ');');
        this._dom.appendChild(this._label);
        this._label.onselectstart = this._dom.onselectstart = uki.F;
    },
    
    _domResize: function(rect) {
        Base._domResize.apply(this, arguments);
        uki.layout.schedule(this._label.style, {
            top: (rect.size.height - this._label.offsetHeight)/2
        });
    },

    typeName: function() {
        return 'uki.component.Button';
    },

    text: function() {
        if (arguments.length == 0) return this._label.innerHTML;
        this._label.innerHTML = arguments[0];
    }
});

})();