## collection.Collection([views])

Objects returned from `builder.build` and `selector.find` calls. An
Array-like object containing all views. Provides a number of useful
operation on top of all views.

### collection.Collection.filter(filter, [context])

Will call `filter` on all collection elements and return resulting
`Collection`.

### collection.Collection.prop(prop, [value])

Get `prop` value of the first element in collection. Or set
`prop` to `value` for all elements in collection.

### collection.Collection.find(selector)

Run `selector.find` within itself.

### collection.Collection.prototype.appendTo(target)

Append all collection elements to `target`.

### collection.Collection.prototype.attach(dom)

Attach all elements in collection to a given `dom` node using
`Attaching`.

### collection.Collection.prototype.parent()

Returns a collection of all parents (if any)

### collection.Collection.prototype.next()

Returns a collection of all immediate siblings of the elements
in collection.

### collection.Collection.prototype.prev()

Returns a collection of all immediate previous siblings of the elements
in collection.

### collection.Collection.addMethods(methods)

Add methods to collection prototype. When you call a method on a collection
all the containing views will have the method with the same name and params
being called. By default, this methods are delegated:
`addListener`, `removeListener`, `trigger`, `on`,
`addClass`, `removeClass`, `toggleClass`,
`destruct`, `resized`, `scroll`, `clear`

### collection.Collection.addProps(props)

Add property accessors to collection prototype. Instead of calling `c.prop(name)`
you can now just use `c.name()`. By default, this properties are added:
`id`, `dom`, `text`, `html`, `pos`, `visible`, `style`


