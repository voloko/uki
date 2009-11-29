include('base.js');

(function() {

var Base = uki.view.Base.prototype,
self = uki.view.Panel = uki.newClass(Base, {

    _domCreate: function() {
        Base._domCreate.apply(this, arguments);
        uki.defaultTheme.backgrounds.panel().attachTo(this);
    },
    
    typeName: function() {
        return 'uki.view.Panel';
    }
});

})();