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

### collection.Collection.prototype.append(views)

Append all views to the first element in collection.

### collection.Collection.prototype.appendTo(target)

Append all collection elements to `target`.

### collection.Collection.prototype.attach(dom)

Attach all elements in collection to a given `dom` node using
`Attachement`.

### utility methods


