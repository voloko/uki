include('base.js');

(function() {

var Base = uki.component.Base.prototype,
self = uki.component.Checkbox = uki.newClass(Base, {
    
    init: function() {
        this._checked = false;
        Base.init.apply(this, arguments);
    },
    
    knownEvents: function() {
        return Base.knownEvents.apply(this, []).concat(['change']);
    },
    
    _afterInit: function() {
        var _this = this;
        uki.dom.bind(this._box, 'click', function() {
            _this.checked(!_this._checked)
            _this.trigger('change', {checked: _this._checked, source: _this});
        });
        uki.dom.bind(this._box, 'mouseover', function() {
            _this._box.style.backgroundPosition = '0 ' + (_this._checked ? '-54px' : '-36px');
        });
        uki.dom.bind(this._box, 'mouseout', function() {
            _this.checked(_this._checked);
        });
    },
    
    checked: function() {
        if (arguments.length == 0) return this._checked;
        this._checked = !!arguments[0];
        this._box.style.backgroundPosition = '0 ' + (this._checked ? '0' : '-18px');
    },

    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss);
        this._box = uki.createElement('div', Base.defaultCss + 'left:50%;top:50%;margin-left:-9px;margin-top:-9px;width:18px;height:18px;background:url(' + uki.defaultTheme.imagePath + 'checkbox/checkbox.png' + ') 0 -18px no-repeat;');
        this._dom.appendChild(this._box);
    },
    
    typeName: function() {
        return 'uki.component.Checkbox';
    }
});

})();