## Event

Handle native and surrogate dom events.

### evt.EventMethods

Mixin added to all the events.

### evt.EventMethods.targetView()

Returns the closest view to event `target`. Same as native `event.target` but
instead of a dom node will return an instance of view. May be optionally overridden by
setting `_targetView` property. May return null if no view is found.

### evt.EventMethods.simulatePropagation = true

[Experimental]. Propogate surrogate events through dom by default. Set to false to prevent
this.

    evt.createEvent({ type: 'selection', simulatePropagation: false });

### evt.EventMethods.preventDefault()

Cross browser preventDefault. Works on surrogate events also.

### evt.EventMethods.stopPropagation()

Cross browser stopPropagation. Works on surrogate events also.

### evt.EventMethods.isDefaultPrevented()

Works cross browser and on surrogate events.

### evt.EventMethods.isPropagationStopped()

Works cross browser and on surrogate events.

### evt.createEvent(baseEvent, [options])

Creates an out of `baseEvent` description. Extends the result with
`options` if provided.

    evt.createEvent({ type: 'click' });

Returns an object with API of `evt.EventMethods`. `baseEvent` will be
accessible through `e.baseEvent`.

### evt.wrapDomEvent(baseEvent)

Wraps a dom event so it supports `evt.EventMethods` api. It's reasonably safe
to write to wrapped event properties:

    e = evt.wrapDomEvent(e)
    e.type = 'draggesture';

Original event is accessible through `e.baseEvent`.
Used to create special events. Like `mousenter` or `draggesturestart`.

### evt.special = {}

An object holding handlers for special event types. See implementation of `mousenter`,
`mouseleave` to understand how it works.

### evt.trigger(element, e)

Triggers a dom/surrogate event on `element`. `e` should conform to `evt.EventMethods`
API and at least have `type`:

    evt.trigger(domNode, evt.createEvent({ type: 'click' }))


### evt.addListener(element, types, listener)
### evt.on(element, types, listener)

Ads event `listener` for `types` to `element`. `types` can be a space separated string:

    evt.on(domNode, 'blur mouseup', function() {});

### evt.removeListner(element, [types], [listener])

Removes event `listener` for `types` from `element`. `types` can be a space separated string.
If `listener` if not provided will remove all `listeners` for given types. If `types` is
not provided will remove all events from `element`. Useful in destruct.

    // remove all click handler for blur and mouseup
    evt.removeListener(domNode, 'blur mouseup', function() {});
    // remove all click handlers
    evt.removeListener(domNode, 'click');
    // remove all handlers
    evt.removeListener(domNode);

### evt.preventDefaultHandler

Helper function to prevent event default.

    evt.on(dom, 'dragstart', evt.preventDefaultHandler);
