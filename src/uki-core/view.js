include('uki.js');
/** @namespace */
uki.view = {
    declare: function(/*name, baseClasses, implementation*/) {
        var args  = uki.toArray(arguments),
            name  = args.shift(),
            klass = uki.newClass.apply(uki, args),
            parts = name.split('.'),
            obj   = root,
            i, part, $partslen = parts.length;
        
        klass.prototype.typeName = function() { return name; };
        for ( i= $partslen - 2; i >= 0; i-- ) {
            part = parts[i];
            if (!obj[part]) obj[part] = {};
            obj = obj[part];
        };
		
        obj[ parts[$partslen - 1] ] = klass;
        return klass;
    }
};