include('const.js');
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

/**
 * @type string
 * @field
 */
uki.version = '0.2.3';
uki.guid = 1;

/**
 * Empty function
 * @type function():boolean
 */
uki.F = function() { return false; };
uki._ids = {};

uki.registerId = function(comp) {
    uki._ids[ uki.attr(comp, 'id') ] = comp;
}; 
uki.unregisterId = function(comp) {
    uki._ids[ uki.attr(comp, 'id') ] = undefined;
};

