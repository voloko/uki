include('uki.js');
include('utils.js');
include('collection.js');


(function() {
    uki.build = function(ml) {
        if (!uki.isArray(ml)) ml = [ml];
        return new uki.Collection(createMulti(ml));
    };

    function createMulti (ml) {
        return uki.map(ml, function(mlRow) { return createSingle(mlRow); });
    }

    function createSingle (mlRow) {
        if (uki.isFunction(mlRow.typeName)) {
            if (parent) parent.appendChild(mlRow);
            return mlRow;
        }

        var c = mlRow.view || mlRow.type,
            result;
        if (uki.isFunction(c)) {
            result = c();
        } else if (typeof c === 'string') {
            var parts = c.split('.'),
                obj   = root;
            if (!root[parts[0]] || parts[0] == 'Image') {
                parts = ['uki', 'view'].concat(parts); // try with default prefix
            }
            for (var i=0; i < parts.length; i++) {
                obj = obj[parts[i]];
            };
            result = new obj(mlRow.rect);
        } else {
            result = c;
        }

        copyAttrs(result, mlRow);
        return result;
    }

    function copyAttrs(comp, mlRow) {
        uki.each(mlRow, function(name, value) {
            if (name == 'view' || name == 'type' || name == 'rect') return;
            uki.attr(comp, name, value);
        });
        return comp;
    }

    uki.build.copyAttrs = copyAttrs;    
})();
