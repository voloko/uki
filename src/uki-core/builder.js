importScripts('uki.js');
importScripts('utils.js');
importScripts('collection.js');


(function() {

    /**
     * Creates uki view tree from JSON-like markup
     *
     * @function
     * @name uki.build
     *
     * @param {object} ml JSON-like markup
     * @returns {uki.view.Collection} collection of created elements
     */
    uki.build = function(ml) {
        return new uki.Collection( createMulti( (ml.length === undefined) ? [ml] : ml ) );
    };

    uki.viewNamespaces = ['uki.view.', ''];

    function createMulti (ml) {
        return ml.map(function(mlRow) { return createSingle(mlRow); });
    }

    function createSingle (mlRow) {
        if (uki.isFunction(mlRow.typeName)) {
            return mlRow;
        }

        var c = mlRow.view || mlRow.type,
            initArgs = mlRow.init || {},
            result;
        if (uki.isFunction(c)) {
            result = new c(initArgs);
        } else if (typeof c === 'string') {
            for (var i=0, ns = uki.viewNamespaces, ns$length = ns.length; i < ns$length; i++) {
                var obj = uki.path2obj(ns[i] + c);
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
        uki.forEach(mlRow, function(value, name) {
            if (name == 'view' || name == 'type' || name == 'init') return;
            uki.prop(comp, name, value);
        });
        return comp;
    }

    uki.build.copyAttrs = copyAttrs;
})();
