include('../core.js');
include('../core/utils.js');
include('attr.js');

(function() {
var root = this,
    attr = uki.core.attr;

uki.core.builder = new function() {

    uki.build = this.build = function(ml, parent) {
        if (uki.isArray(ml)) return createMulti(ml, parent);
        return createSingle(ml, parent);
    };
    
    function createMulti (ml, parent) {
        return uki.map(ml, function(mlRow) { return createSingle(mlRow, parent) });
    }

    function createSingle (mlRow, parent) {
        if (uki.isFunction(mlRow.typeName)) return mlRow;
        
        var c = mlRow.view || mlRow.type,
            result;
        mlRow.type = mlRow.view = undefined;
        if (uki.isFunction(c)) {
            result = c();
        } else if (typeof c === 'string') {
            var parts = c.split('.'),
                obj   = root;
            if (parts.length == 1 && !root[parts[0]]) {
                parts = ['uki', 'component', parts[0]]; // try with default prefix
            }
            for (var i=0; i < parts.length; i++) {
                obj = obj[parts[i]];
            };
            result = new obj();
        } else {
            result = c;
        }
        
        return copyAttrs(result, mlRow, parent);
    }
    
    function copyAttrs(comp, mlRow, parent) {
        var orderedAttrs = uki.isFunction(comp.builderAttrs) ? comp.builderAttrs() : [];
        if (parent) parent.addChild(comp);
        uki.each(orderedAttrs, function(i, name) {
            if (mlRow[name]) attr(comp, name, mlRow[name]);
            mlRow[name] = undefined;
        });
        uki.each(mlRow, function(name, value) {
            attr(comp, name, value);
        });
        return comp;
    }
};

    
})();
