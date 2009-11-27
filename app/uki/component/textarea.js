include('base.js');
include('input.js');

(function() {

var Base = uki.component.Input.prototype,
    self = uki.component.Textarea = function() {
        this.init.apply(this, arguments);
    };
    
self.prototype = uki.extend({}, Base, {
    _domCreate: function() {
        this._dom = uki.createElement('div', Base.defaultCss);
        this._input = uki.createElement('textarea', Base.defaultCss + "-moz-box-sizing:border-box;border:none;outline:none;background:white;padding:0;overflow:hidden;font-size:11px;left:2px;top:0;z-index:10;");
        this._dom.appendChild(this._input);
    }
});
    
})();