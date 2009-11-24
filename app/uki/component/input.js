include('base.js');

(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
   _domCreate: function() {
       this._dom = document.createElement('input');
       this._dom.style = this._dom.style;
       this._dom.style.cssText = Base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
   },
   
   value: function(text) {
       if (arguments.length == 0) return this._dom.value;
       this._dom.value = text;
   },
   
   placeholder: function(text) {
       if (arguments.length == 0) return this._dom.getAttribute('placeholder');
       this._dom.setAttribute('placeholder', text);
   }
});
    
})();