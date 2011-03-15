## Event

Handle native and surrogate DOM events.

### evt.EventMethods

Mixin added to all events.

### evt.EventMethods.targetView()

Returns the view, closest to event `target`. Same as native `event.target` but
instead of a DOM node will return an instance of a view. May be optionally overridden by
setting `_targetView` property. May return `null` if no view is found.

### evt.EventMethods.simulatePropagation = true

[Experimental]. Propagate surrogate events through DOM by default. Set to false to disable
this.

    evt.createEvent({ type: 'selection', simulatePropagation: false });

### evt.EventMethods.preventDefault()

Cross-browser preventDefault. Works on surrogate events as well.

### evt.EventMethods.stopPropagation()

Cross-browser stopPropagation. Works on surrogate events as well.

### evt.EventMethods.isDefaultPrevented()

Works cross-browser and on surrogate events.

### evt.EventMethods.isPropagationStopped()

Works cross-browser and on surrogate events.

### evt.createEvent(baseEvent, [options])

Creates an out of `baseEvent` description. Extends the result with
`options` if provided.

    evt.createEvent({ type: 'click' });

Returns an object with an API of `evt.EventMethods`. `baseEvent` will be
accessible through `e.baseEvent`.

### evt.wrapDomEvent(baseEvent)

Wraps a DOM event so it supports the `evt.EventMethods` API. It's reasonably safe
to write to wrapped event properties:

    e = evt.wrapDomEvent(e)
    e.type = 'draggesture';

Original event is accessible through `e.baseEvent`.
Used to create special events, like `mouseenter` or `draggesturestart`.

### evt.special = {}

An object holding handlers for special event types. See implementation of `mouseenter`,
`mouseleave` to understand how it works.

### evt.trigger(element, e)

Triggers a DOM/surrogate event on `element`. `e` should conform to the `evt.EventMethods`
API and contain the `type` property, at minimum:

    evt.trigger(domNode, evt.createEvent({ type: 'click' }))


### evt.addListener(element, types, listener)
### evt.on(element, types, listener)

Adds event `listener` for `types` to `element`. `types` can be a space-separated string:

    evt.on(domNode, 'blur mouseup', function() {});

### evt.removeListener(element, [types], [listener])

Removes event `listener` for `types` from `element`. `types` can be a space-separated string.
If `listener` is not provided, will remove all `listeners` for given types. If `types` is
not provided, will remove all events from `element`. Useful in destruct.

    // remove all click handler for blur and mouseup
    evt.removeListener(domNode, 'blur mouseup', function() {});
    // remove all click handlers
    evt.removeListener(domNode, 'click');
    // remove all handlers
    evt.removeListener(domNode);

### evt.preventDefaultHandler

Helper function to prevent event's default action.

    evt.on(dom, 'dragstart', evt.preventDefaultHandler);
