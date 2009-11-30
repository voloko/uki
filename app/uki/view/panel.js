include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Panel = uki.newClass(Base, {
    
    init: function() {
        Base.init.apply(this, arguments);
        this.anchors('top left right');
        this.autosize('width');
    },

    _domCreate: function() {
        Base._domCreate.apply(this, arguments);
        uki.defaultTheme.backgrounds.panel().attachTo(this);
    },
    
    typeName: function() {
        return 'uki.view.Panel';
    }
});

})();