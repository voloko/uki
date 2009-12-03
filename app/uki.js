var uki = function(val, context) {
    if (typeof val == 'string') return uki.find(val, context);
    if (val.length === undefined) val = [val];
    if (val.length > 0 && uki.isFunction(val[0].typeName)) return new uki.Collection(val);
    return uki.build(val);
};
uki.F = function() { return false; };
uki.version = '0.0.1';
