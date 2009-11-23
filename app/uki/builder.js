include('../uki.js');
include('utils.js');
include('attr.js');
include('collection.js');

(function() {
var root = this,
    attr = uki.attr;

uki.build = function(ml, parent) {
    if (!uki.isArray(ml)) ml = [ml];
    return new uki.Collection(createMulti(ml, parent));
};

function createMulti (ml, parent) {
    return uki.map(ml, function(mlRow) { return createSingle(mlRow, parent) });
}

function createSingle (mlRow, parent) {
    if (uki.isFunction(mlRow.typeName)) {
        if (parent) parent.addChild(mlRow);
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

    
})();
