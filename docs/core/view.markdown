## View

Provides view utility functions

### view.newClass(typeName, [baseClass], [mixin], definition)

Works exactly as `fun.newClass` but also adds typeName property to the
prototype. typeName is used by selector.

### view.byId(id)

Searches for created view by id. One hash lookup.

### view.closest(element)

Finds the view enclosing the `element`.

    parent.on('click', function(e) {
        var button = view.closest(e.target);
        
        // you can use e.targetView() instead of
        // calling view.closest manually
    });
    
### view.contains(parent, child)

Checks if `parent` contains `child`

### view.newToggleClassProp(className)

Creates a property that toggles a class:

    var X = view.newClass('X', Base, {
        large: view.newToggleClassProp('large-class')
    });
    
    var x = new X();
    x.large(true); // className == 'large-class'
    x.large(false); // className == ''
    x.large() === false

### view.newClassMapProp(classMap)

Creates a property that toggles one of the given classes:

    var X = view.newClass('X', Base, {
        border: view.newClassMapProp({
            wide: 'my-border-wide',
            none: 'my-border-none',
            thin: 'my-border-thin'
        })
    });

    var x = new X()
    x.border('wide') // className = 'my-border-wide'
    x.border() // => wide
    x.border('none') // className = 'my-border-none'
    x.border() // => none

