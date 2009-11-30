include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Panel = uki.newClass(Base, {
    
    init: function() {
        Base.init.apply(this, arguments);
        this._selectable = false;
        this.anchors('top left right');
        this.autosize('width');
    },
    
    _domCreate: function() {
        this._dom = uki.createElement('div', this.defaultCss);
        uki.defaultTheme.backgrounds.panel().attachTo(this);
        this.selectable(this.selectable());
    },
    
    typeName: function() {
        return 'uki.view.Panel';
    }
});

})();