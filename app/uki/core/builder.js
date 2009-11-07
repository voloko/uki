include('../core.js');
include('../core/utils.js');
include('attr.js');

(function() {
var root = this,
    attr = uki.core.attr;

uki.core.builder = new function() {

    this.build = function(ml) {
        var result = [];
        for (var i=0; i < ml.length; i++) {
            result[i] = createComponent(ml[i]);
            uki.each(ml[i], function(name, value) {
                attr(result[i], name, value);
            })
        };
        return result;
    };

    function createComponent (mlRow) {
        var c = mlRow.view || mlRow.type;
        mlRow.type = mlRow.view = undefined;
        if (uki.isFunction(c)) {
            return c();
        } else if (typeof c === 'string') {
            var parts = c.split('.'),
                obj   = root;
            if (parts.length == 1 && !root[parts[0]]) {
                parts = ['uki', 'component', parts[0]]; // try with default prefix
            }
            for (var i=0; i < parts.length; i++) {
                obj = obj[parts[i]];
            };
            return new obj();
        } else {
            return c;
        }
    }
};
    
})();
