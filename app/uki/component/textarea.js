include('base.js');

(function() {

var base = uki.component.Base.prototype,
    self = uki.component.Textarea = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, base, {
   _domCreate: function() {
       this._dom = this._dom = document.createElement('textarea');
       this._domStyle = this._dom.style;
       this._domStyle.cssText = base.defaultCss;
   } 
});
    
})();