var utils = require('./utils'),

    Collection = require('./collection').Collection;


var viewNamespaces = [global];
/**
 * Creates view tree from JSON-like markup
 *
 * @function
 *
 * @param {object} ml JSON-like markup
 * @returns {view.Collection} collection of created elements
 */
function build(ml) {
    return new Collection(createMulti((ml.length === undefined) ? [ml] : ml));
};

function createMulti(ml) {
    return utils.map(ml, function(mlRow) { return createSingle(mlRow); });
}

function createSingle(mlRow) {
    if (mlRow.typeName) {
        return mlRow;
    }

    var C = mlRow.view || mlRow.type,
        initArgs = mlRow.init || {},
        result, Obj;
    if (utils.isFunction(C)) {
        result = new C(initArgs);
    } else if (typeof C === 'string') {
        for (var i = 0, ns = exports.viewNamespaces, length = ns.length;
            i < length; i++) {

            Obj = utils.path2obj(C, ns[i]);
            if (Obj) {
                result = new Obj(initArgs);
                break;
            }
        }
        if (!Obj) {
            throw "build: Can't find view with type '" + C + "'";
        }
    } else {
        result = C;
    }

    copyAttrs(result, mlRow);
    return result;
}

function copyAttrs(view, mlRow) {
    utils.forEach(mlRow, function(value, name) {
        if (name == 'view' || name == 'type' || name == 'init') { return; }
        utils.prop(view, name, value);
    });
    return view;
}


exports.build = build;
exports.viewNamespaces = viewNamespaces;

