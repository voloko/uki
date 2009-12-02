include('../uki.js');
include('utils.js');
include('attr.js');
include('collection.js');

(function() {
var root = this,
    attr = uki.attr;

uki.build = function(ml) {
    if (!uki.isArray(ml)) ml = [ml];
    return new uki.Collection(createMulti(ml));
};

function createMulti (ml) {
    return uki.map(ml, function(mlRow) { return createSingle(mlRow) });
}

function createSingle (mlRow) {
    if (uki.isFunction(mlRow.typeName)) {
        if (parent) parent.appendChild(mlRow);
        return mlRow;
    }
    
    var c = mlRow.view || mlRow.type,
        result;
    mlRow.type = mlRow.view = undefined;
    if (uki.isFunction(c)) {
        result = c();
    } else if (typeof c === 'string') {
        var parts = c.split('.'),
            obj   = root;
        if (parts.length == 1 && !root[parts[0]]) {
            parts = ['uki', 'view', parts[0]]; // try with default prefix
        }
        for (var i=0; i < parts.length; i++) {
            obj = obj[parts[i]];
        };
        result = new obj();
    } else {
        result = c;
    }
    
    return copyAttrs(result, mlRow);
}

function copyAttrs(comp, mlRow) {
    uki.each(mlRow, function(name, value) {
        attr(comp, name, value);
    });
    return comp;
}

    
})();
