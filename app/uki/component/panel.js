include('base.js');

(function() {

var Base = uki.component.Base.prototype,
self = uki.component.Panel = uki.newClass(Base, {

    _afterInit: function() {
        uki.defaultTheme.backgrounds.panel().attachTo(this);
    },
    
    typeName: function() {
        return 'uki.component.Panel';
    }
});

})();