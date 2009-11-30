include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Checkbox = uki.newClass(Base, {
    
    _bindToDom: function(name) {
        if (' change'.indexOf(name) > -1) return;
        Base._bindToDom.apply(this, arguments);
    },
    
    init: function() {
        this._checked = false;
        this._image = uki.defaultTheme.images.checkbox();
        Base.init.apply(this, arguments);
    },
    
    checked: function() {
        if (arguments.length == 0) return this._checked;
        this._checked = !!arguments[0];
        this._image.style.top = this._checked ? '0' : '-18px';
    },

    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss);
        this._box = uki.createElement('div', Base.defaultCss + 'overflow:hidden;left:50%;top:50%;margin-left:-9px;margin-top:-9px;width:18px;height:18px;');
        this._image.style.position = 'absolute';
        this._image.style.top = this._checked ? '0' : '-18px';
        this._dom.appendChild(this._box);
        this._box.appendChild(this._image);

        var _this = this;
        uki.dom.bind(this._box, 'click', function() {
            _this.checked(!_this._checked)
            _this.trigger('change', {checked: _this._checked, source: _this});
        });
        uki.dom.bind(this._box, 'mouseover', function() {
            _this._image.style.top = _this._checked ? '-54px' : '-36px';
        });
        uki.dom.bind(this._box, 'mouseout', function() {
            _this.checked(_this._checked);
        });
    },
    
    typeName: function() {
        return 'uki.view.Checkbox';
    }
});

})();