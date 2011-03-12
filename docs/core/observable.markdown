## Observable

Mixin to make an object observable. So you can `addListener` and `trigger` on this object.

### Observable.addListener(types, listener)
### Observable.on(types, listener)

Ads event `listener` for `types`. `types` can be a space separated string:

    obj.on('selection blur', function() {});

### Observable.removeListner(types, listener)

Removes event `listener` for `types`. `types` can be a space separated string.
If `listener` if not provided will remove all `listeners` for given types. If `types` is
not provided will remove all events from `element`. Useful in destruct.

    // remove all listener
    obj.removeListener();

### Observable.trigger(e)

Triggers a surrogate event on this. `e` at least have `type`. It will not bubble and cannot be
prevent.

    obj.trigger({ type: 'change' });

### Observable.destruct

Removes all listeners from this.

### Observable.triggerChanges(name, source)

Generates `change` and `change.name` events. Used in bindings to observe data.
See also `Observable.newProp`.

### Observable.muteEvents(state)

Experimental. Mutes all events on a given object.

    obj.muteEvents(true)
    // will not work
    obj.trigger({ type: 'change' });
    obj.muteEvents(false);

### Observable.newProp(name, [setter])

Conforms to `fun.newProp` API. When property is changed `change` events will be triggered.

    var Klass = fun.newClass(Observable, {
        name: Observable.newProp(name)
    });

    var obj = new Klass();
    obj.on('change.name', function() {
        alert('name changed');
    });
    // will trigger handler
    obj.name('Bob');
