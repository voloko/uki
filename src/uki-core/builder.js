var utils = require('./utils'),
    uki   = require('./uki'),
    Collection = require('./collection').Collection;

/**
 * Creates uki view tree from JSON-like markup
 *
 * @function
 *
 * @param {object} ml JSON-like markup
 * @returns {uki.view.Collection} collection of created elements
 */
uki.build = exports.build = function(ml) {
    return new Collection( createMulti( (ml.length === undefined) ? [ml] : ml ) );
};

uki.viewNamespaces = exports.viewNamespaces = [global];

function createMulti (ml) {
    return utils.map(ml, function(mlRow) { return createSingle(mlRow); });
}

function createSingle (mlRow) {
    if (mlRow.typeName) {
        return mlRow;
    }

    var c = mlRow.view || mlRow.type,
        initArgs = mlRow.init || {},
        result;
    if (utils.isFunction(c)) {
        result = new c(initArgs);
    } else if (typeof c === 'string') {
        for (var i=0, ns = exports.viewNamespaces, length = ns.length; i < length; i++) {
            var obj = utils.path2obj(c, ns[i]);
            if (obj) {
                result = new obj(initArgs);
                break;
            }
        };
        if (!obj) throw "uki.Builder: Can't find view with type '" + c + "'";
    } else {
        result = c;
    }

    copyAttrs(result, mlRow);
    return result;
}

function copyAttrs(comp, mlRow) {
    utils.forEach(mlRow, function(value, name) {
        if (name == 'view' || name == 'type' || name == 'init') return;
        utils.prop(comp, name, value);
    });
    return comp;
}
