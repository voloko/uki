include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Panel = uki.newClass(uki.view.Base, {
    
    init: function() {
        Base.init.apply(this, arguments);
        this._selectable = false;
        this.anchors('top left right');
        this.autosize('width');
    },
    
    _domCreate: function() {
        this._dom = uki.createElement('div', this.defaultCss);
        this.selectable(this.selectable());
        uki.theme.background('panel').attachTo(this);
    },
    
    typeName: function() {
        return 'uki.view.Panel';
    }
});

})();