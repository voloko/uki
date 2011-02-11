/**
 * Shortcut access to uki.build, uki.Selector.find and uki.Collection constructor
 * uki('#id') is also a shortcut for search by id
 *
 * @param {String|uki.view.Base|Object|Array.<uki.view.Base>} val
 * @param {Array.<uki.view.Base>=} optional context for selector
 * @class
 * @namespace
 * @name uki
 * @return {uki.Collection}
 */
root.uki = root.uki || function(val, context) {
    if (typeof val === "string") {

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

uki.version = '0.4.0-css';
uki.guid = 1;

/**
 * Empty function
 * @type function():boolean
 */
uki.FF = function() { return false; };
uki.FT = function() { return true; };
uki.FS = function() { return this; };
uki._ids = {};

uki.registerId = function(comp) {
    uki._ids[ uki.prop(comp, 'id') ] = comp;
};
uki.unregisterId = function(comp) {
    uki._ids[ uki.prop(comp, 'id') ] = undefined;
};

uki.top = function() {
    var atts = [];
    uki.forEach(Attachement._instances || {}, function(a) {
        atts.push(a);
    });
    return atts;
};
