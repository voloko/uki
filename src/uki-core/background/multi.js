include('../background.js');

/**
 * @class
 */
uki.background.Multi = uki.newClass({
    init: function() {
        this._bgs = Array.prototype.slice.call(arguments, 0);
    },
    attachTo: function(comp) {
        for (var i=0; i < this._bgs.length; i++) {
            this._bgs[i].attachTo(comp);
        };
    },
    detach: function() {
        for (var i=0; i < this._bgs.length; i++) {
            this._bgs[i].detach();
        };
    }
});