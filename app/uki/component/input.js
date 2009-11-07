include('base.js');

(function() {

var base = uki.component.Base.prototype,
    self = uki.component.Input = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, base, {
   _domCreate: function() {
       this._dom = this._dom = document.createElement('input');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = base.defaultCss + "-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box";
       this._domResize(this._rect);
   } 
});
    
})();