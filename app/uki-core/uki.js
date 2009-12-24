root.uki = function(val, context) {
    if (typeof val == 'string') {
        var m = val.match(/^#((?:[\w\u00c0-\uFFFF_-]|\\.)+)$/),
            e = m && uki._ids[m[1]];
        if (m && !context) {
            return new uki.Collection( e ? [e] : [] );
        }
        return uki.find(val, context);
    }
    if (val.length === undefined) val = [val];
    if (val.length > 0 && uki.isFunction(val[0].typeName)) return new uki.Collection(val);
    return uki.build(val);
};
uki.version = '0.0.1';

uki.F = function() { return false; };
uki._ids = {};

uki.registerId = function(comp) {
    uki._ids[uki.attr(comp, 'id')] = comp;
}; 
uki.unregisterId = function(comp) {
    uki._ids[uki.attr(comp, 'id')] = undefined;
};

