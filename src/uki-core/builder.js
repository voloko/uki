include('uki.js');
include('utils.js');
include('collection.js');


(function() {
    
    /**
     * Creates uki view tree from JSON-like markup
     *
     * @example
     * uki.build( {view: 'Button', rect: '100 100 100 24', text: 'Hello world' } )
     * // Creates uki.view.Button with '100 100 100 24' passed to constructor, 
     * // and calls text('Hello world') on it
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
        return uki.map(ml, function(mlRow) { return createSingle(mlRow); });
    }

    function createSingle (mlRow) {
        if (uki.isFunction(mlRow.typeName)) {
            return mlRow;
        }

        var c = mlRow.view || mlRow.type,
            result;
        if (uki.isFunction(c)) {
            result = new c(mlRow.rect);
        } else if (typeof c === 'string') {
            for (var i=0, ns = uki.viewNamespaces, ns$length = ns.length; i < ns$length; i++) {
                var parts = (ns[i] + c).split('.'),
                    obj = root;
                
                for (var j=0, parts$length = parts.length; obj && j < parts$length; j++) {
                    obj = obj[parts[j]];
                };
                if (obj) {
                    result = new obj(mlRow.rect);
                    break;
                }
            };
            if (!obj) throw 'No view of type ' + c + ' found';
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
