include('base.js');

(function() {

var Base = uki.component.Base.prototype,
    self = uki.component.Button = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
   _domCreate: function() {
       this._dom = document.createElement('button');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = Base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
   },
   
   typeName: function() {
       return 'uki.component.Button';
   },
   
   text: function() {
       if (arguments.length == 0) return this._dom.innerHTML;
       this._dom.innerHTML = arguments[0];
   }
});
    
})();