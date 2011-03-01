## Utils

This module provides core array, object, and string utilities.

### utils.prop(obj, prop, [value], [extra])

Sets or retrieves property `prop` of `obj`.
If target has function named `prop` it will be called `obj[prop](value)`
or `return obj[prop]()`.
If there's no function property will be set/get directly:
`obj[prop] = value` or `return obj[prop]`.

    utils.prop(view, 'name', 'funny') // sets name to funny on view
    utils.prop(view, 'id')            // gets id property of view


### utils.isFunction(obj)

Checks if if `obj` if a function.

### utils.isArray(obj)

Checks if if `obj` if a native array.

### utils.toArray(array)

Converts array-like object to array:

    var args = utils.toArray(arguments);

### utils.pluck(array, prop)

Extracts property `prop` from all array items. Will use `utils.prop` to
read properties so both function and simple properties are supported:

    var id = utils.pluck(views, 'id');
    var names = utils.pluck([{name: 'Ben'}, {name: 'Bob'}], 'name');

Will try to use `array.forEach` if available. If not will fallback to
`utils.forEach`.

### utils.without(array, value)

Returns `array` without `value`. Will filter array using `!==` operation.

    listeners = utils.without(listeners, listenerToRemove);

Will try to use `array.filter` if available. If not will fallback to
`utils.filter`.

### utils.forEach(object, callback, [context])

Iterate over all items of an `object`.

If `object` is array-like (with `length`) `utils.forEach` will try 
to use `Array.prototype.forEach` or if it's not supported compat 
implementation using `for(var i = 0; i < length; i++)`.

If `object` is an actual object `utils.forEach` will iterate over all 
it's keys. Please note that keys will be checked with `hasOwnProperty`.

Callback will get `value` as a first parameter and `key` or `index` as second.
It will be executed in `context` if provided.

    utils.forEach(['a', 'b', 'c'], function(letter, index) {
        console.log(index, letter);
    });

    utils.forEach({ foo: '1', bar: '2' }, function(number, key) {
        console.log(key, number);
    });


### utils.unique(array)

Returns an Array containing only unique values from `array`. Supports
both Object and scalar arrays.

    utils.unique([1, 2, 2, 5, 3, 2, 5]); // 1, 2, 5, 3

### utils.extend(target, extension, [extension, ...])

Copies all properties from `extension` to target and returns the result.

    utils.extend(X.prototype, Mixin1, Mixin2);
    options = utils.extend({}, options, defaultOptions);

### utils.binarySearch(value, array)

Searches for `value` in a sorted `array`. If value is in `array` returns
it's position. Otherwise returns the position where this value should be
added.

### utils.camalize(string)

Converts `string_with_underscores` to `stringWithUnderscores`. Also converts
`string-with-dashes` into `stringWithDashes`. Useful to convert css property
names.

### utils.dasherize(string)

Converts `camelCaseString` to `camel-case-string`.

### utils.path2obj(path, [context])

Uses a string `path` to find an object within `context`:

    utils.path2obj('foo.bar', { foo: { bar: 'a' } }) // 'a'

### utils.range(from, to)

Returns an Array filled with values `from` to `to`.

    utils.range(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

### utils.trim(string)

Removes trailing and leading white spaces from `string`. Will use
String.prototype.trim when available.

### utils.indexOf(array, find, [i])

Find `find` in `array`. Will use native `Array.prototype.indexOf` when
available.

### utils.lastIndexOf(array, find, [i])

Find `find` in `array` starting from the end. Will use native
`Array.prototype.lastIndexOf` when available.

### utils.map(array, action, [context])

Will pass each `array` value to `action` function and return an Array of
results. Will use native `Array.prototype.map` when available.

### utils.filter(array, filter, [context])

Will pass each `array` value to `filter` and return an `Array` of items
for which `filter` returned true.  Will use native `Array.prototype.filter`
when available.

### utils.reduce(array, fun, [accumulator])

Will use native `Array.prototype.reduce` when available.

### utils.keys(object)

Will use native `Object.keys` when available.

### utils.applyCompat

Extends Array prototype with ECMAScript function if they are not provided
by the browser. Be very cautions. This can not be reverted. And this can
break (though quite unprobable) other's people code. Functions are
`indexOf`, `lastIndexOf`, `forEach`, `map`, `filter`, `reduce`.

