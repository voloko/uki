include('uki.js');
/** @namespace */
uki.view = {
    declare: function(/*name, baseClasses, implementation*/) {
        var args  = uki.toArray(arguments),
            name  = args.shift(),
            klass = uki.newClass.apply(uki, args),
            parts = name.split('.'),
            obj   = root,
            i, part;
        
        klass.prototype.typeName = function() { return name; };
        for ( i=0; i < parts.length - 1; i++ ) {
            part = parts[i];
            if (!obj[part]) obj[part] = {};
            obj = obj[part];
        };
        obj[parts[parts.length - 1]] = klass;
    }
};