## Base view

Default API for all views.

Uki views do not have states. After creation a view is fully functional.
You can change properties on it, append it to other views, bind events.
The same way as DOM nodes behave.

`view.Base` is a normal class (not abstract). You can create instances
of `view.Base`.

### new view.Base([initArgs])

Create new view object with optional `initArgs`. `initArgs` param is not
used by `Base` itself. However some of the descendants like `SplitPane`
does.

### view.Base.prototype._createDom(initArgs)

Extended in subclasses. Should create `this._dom`. `this._dom` it the root
DOM node of the view.

This is the only method you need to extend to create a subclass.
Everything else is optional.

    // create an image view
    var Img = view.newClass('Img', Base, {

        _createDom: function() {
            this._dom = dom.createElement('img')
        },

        src: fun.newDelegateProp('dom', src)

    });

### view.Base.prototype._setup(initArgs)

Extended in subclasses. Called right before _createDom on construction.
Mostly a convenience method to initialize non DOM properties.

    view.newClass('Container', Base, {
        ...
        _setup: function() {
            this._childViews = [];
            Base.prototype._setup.call(this, initArgs);
        }
        ...
    });

### view.Base.prototype.dom()

Returns root DOM node of the view. By default returns `this._dom` property.

### view.Base.prototype.resized()

Extended in subclasses. Being called after parent view resized. This usualy
happens when `window` is being resized. However parent views may trigger this
event manually, ex: `SplitPane` resizing its children.

If a view needs some specific actions on resize they should be done here.

## Default accessors

`view.Base` provides a number of convenience methods to modify view properties.
All of them target the DOM root node by default. However they can be redefined in
subclasses.

### view.Base.prototype.html([value])

Accessor for `innerHTML` of the view (by default root DOM node).

### view.Base.prototype.text([value])

Same as `html` though will escape `value` on set.

### view.Base.prototype.id([value])

Accessor for `id` of the view. Registers the view for fast
search using `#id` selector. By default sets `id` attribute on root DOM node.

### view.Base.prototype.className([value])

Accessor for `className` of the view (by default root DOM node).

### view.Base.prototype.addClass(names)

Ads a class or space separated classes to the view. Chainable.
Can be used in builder:

    build({ view: 'Button', addClass: 'my-button white' });

### view.Base.prototype.hasClass(name)

Removes a class from the view

### view.Base.prototype.removeClass(names)

Remove a class or space separated classes from view. Chainable.

    button.removeClass('white').id('test');

### view.Base.prototype.toggleClass(names)

Toggles a class on the view.

### view.Base.prototype.visible([state])

Hides/shows a view. Hidden views will not get `resized` event. `resized` will
be called when view becomes `visible` again.

### view.Base.prototype.scrollLeft([value])

Accessor for DOM `scrollLeft`

### view.Base.prototype.scrollTop([value])

Accessor for DOM `scrollTop`

### view.Base.prototype.scroll(dx, dy)

Scrolls the view by `dx` an `dy` px.

### view.Base.prototype.title([value])

Accessor for DOM `title`

### view.Base.prototype.style([value])

Experimental. Accessor for DOM `style`. Returns style object. Accepts
both strings and objects. Suggested for debug or prototyping use only.

    view.style('position: absolute; left: 100px');
    view.style().left; // read left

### view.Base.prototype.addStyle(style)

Experimental. Adds style to view. Accepts both strings and hashes:

    view.addStyle({ width: '100px' });
    view.addStyle('height: 300px');
    build({ view: 'Button', addStyle: 'padding-rigth: 20px' });

## Events

You can add event listeners directly to views. The same way you do it
with the DOM nodes. All views support native DOM events, some add their
own. By default events will be bound to root DOM nodes, however views
may redefine this behavior in a meaningful way. Ex: input can add 'keyup'
event to the <input type="text"> node and not to wrapper.

### view.Base.prototype.domForEvent(type)

Returns a DOM node to which to event should be added. By default returns `this.dom()`.

### view.Base.prototype.addListener(types, listener)
### view.Base.prototype.on(types, listener)

Ads event `listener` for `types`. `types` can be a space separated string:

    view.on('selection blur', function() {});

Can accept an object as as the only parameter.

    view.on({
        click: function() { ... },
        keyup: function() { ... }
    });

This can be used to set events on construction:

    build({ view: 'Button',
      on: { click: function() { ... } } });

### view.Base.prototype.removeListner(types, listener)

Removes event `listener` for `types`. `types` can be a space separated string.
If `listener` if not provided will remove all `listeners` for given types. If `types` is
not provided will remove all events from `element`. Useful in destruct.

    // remove all listener
    view.removeListener();

### view.Base.prototype.trigger(e)

Triggers a surrogate event on this. `e` at least have `type`. View will wrap it into
`EventMethods` automatically. By default will propagate event. To prevent this set
`simulatePropagation` to `false`.

    obj.trigger({ type: 'change' });

### view.Base.prototype.controller([object])

Experimental. Sets and retrieves a controller object for the view. Controller is
used as a default target for view events. If `controller` is not set will try to
use `parent` view's `controller`. When `controller` is set you can use strings
instead of function in `addListener`, `removeListener` calls:

    var controller = {
        handleButtonClick: function() { ... },
        handleMouseMove: function() { ... }
    };

    build({ view: 'Container', controller: controller,

      // use own controller to handle clicks
      on: { mousemove: 'handleMouseMove' },
      childEvents: [

        // use parent's controller to handle clicks
        { view: 'Button', on: { click: 'handleButtonClick' } }
      ] });

## Container API

Views can be contained only in other views. All views support being contained.

### view.Base.prototype.parent([parent])

Accessor for the parent view. Similar to `parentNode` on DOM nodes.

### view.Base.prototype.prevView()

Get previous view. Similar to `previousSibling` on DOM nodes.

### view.Base.prototype.nextView()

Get next view. Similar to `nextSibling` on DOM nodes.

### view.Base.prototype.childViews()

Get array of childViews. Similar to `childNodes` on DOM nodes but returns a normal
array.

## Positioning

Uki often uses absolute position to layout views. There's a shourcut method to
specific positioning on views:

### view.Base.prototype.pos([pos])

Sets position of a view from object or string. Supports `left`, `top`, `right`,
`bottom`, `margin-left`, `margin-top`, `margin-right`, `margin-bottom`, `width`,
`height` properties. Will set position to `absolute`. Can also expand strings:

    build({ view: 'Button', pos: { top: '100px', left: '10px', width: '200px' }});

    // same as above
    build({ view: 'Button', pos: 'top:100px left:10px width:200px' });

    // same as above
    build({ view: 'Button', pos: 't:100px l:10px w:200px' });

You can also read position. It will return an object.

    view.pos().left

### clientRect([ignoreScroll])

Return clientRect of the given view. See `dom.clientRect` for more info.

## Binding

All uki views support data bindings. Binding connects observable data object
(see `Observable`) and view. When data changes this change is reflected in
the view and vice versa.

### view.Base.prototype.bindings(bindings)

Add bindings to a view:

    var Person = uki.newClass(uki.Observable, {
        name: uki.Observable.newProp('name')
    });

    var bob = new Person();
    bob.name('Bob');

    uki({ view: 'nativeControl.Text', addClass: 'input',
      bindings: [{ model: bob, modelProp: 'name' }]
    });

    bob.name('Bobby'); // will change both view and model

To clear bindings pass an empty array:

    button.bindings([]);

### view.Base.prototype.binding(binding)

Since one binding per view is a common case there's a shortcut method
to access it. `binding` is an accessor for first binding on the view.
