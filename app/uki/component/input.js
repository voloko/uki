include('base.js');

(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
   _domCreate: function() {
       this._dom = document.createElement('input');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = Base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
   } 
});
    
})();