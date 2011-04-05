## Writing a view

Uki creates ui from views. You can use predefined views and/or create new ones.
To crate a view use `view.newClass` (`uki.view.newClass`):

    var view = require('ukijs/src/uki-core/view'),
        Base = require('ukijs/src/uki-core/view/base.js').Base;


    var Img = view.newClass('Image', Base, {
        // functions here
    });


    exports.Img = Img;


`view.newClass` works the same way as `fun.newClass` with extra `typeName`
argument. `newClass` accepts `typeName` as a first argument. `typeName` is
used by `Selector`:

    find('Container > Image').on('click', ...);

The second argument is a base class. It should be either `uki.view.Base` or
it's subclass. After that you can optionally pass mixins like `Focusable`.
The last argument is the class definition or constructor. See `fun.newClass`
for more info.

### _createDom(initArgs)

The most common function a view should redefine is `_crateDom`. This function
is called during view construction and should create `this._dom` object:

    var Img = view.newClass('Image', Base, {
        _createDom: function(initArgs) {
            this._dom = dom.createElement('img');
        }
    });

`this._dom` should be created before the view can be used. Many functions like
`addClass` or `pos` use `this._dom`.

### Properties

Properties are the way to interact with your view. Think setAttribute on a dom
node. You can create properties manually or use one of the generator functions:

    var Img = view.newClass('Image', Base, {
        _createDom: function(initArgs) {
            this._dom = dom.createElement('img');
        },

        // manually set/get alt
        src: function(value) {
            if (value === undefined) return this._dom.src;
            this._dom.src = value;
            return this;
        },

        // delegate alt property to this._dom
        alt: fun.newDelegateProp('_dom', 'alt'),

        // simple accessor, will store value in _lowResSrc
        lowResSrc: fun.newProp('lowResSrc'),

        // simple accessor, will store value in _highResSrc
        highResSrc: fun.newProp('highResSrc')
    });

### _layout

Once the view is added to the document it will start receiving `_layout` calls.
`_layout` is called every time parent view resizes. You can also call `layout`
manually. Note that layout is expected to be called only when the view is in
document and visible, so you can for example measure `_this.node` using
`offsetWidth`. We can use `_layout` to programmatically respond to resize.

    var Img = view.newClass('Image', Base, {

        ...

        _layout: function() {
            var src;

            if (this._dom.offsetWidth > 500 && this.highResSrc()) {
                src = this.highResSrc();
            } else if (this.lowResSrc()) {
                src = this.lowResSrc();
            } else {
                src = this.src();
            }

            if (this.src() != src) {
                this.src(src);
            }
        }
    });

### builder

To use the view with builder you can add it to builder's namespace:

    builder.namespaces.unshift({ Image: Img });
    builder.build({ view: 'Image',
        lowResSrc: 'low.gif', highResSrc: 'high.png'
    }).attach();
