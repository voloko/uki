## Builder

Provides a method to convert JSON markup into actual views.

    builder.build({ view: Button, label: 'Hello World' });

Building is a simple process. Builder will create a view object from
the `view` property and copy all the other properties using `utils.prop`.
The previous example equals to:

    var tmp = new Button();
    tmp.label('Hello World');

Builder can also resolve view classes from strings. So the previous example
can be also written as:

    builder.build({ view: 'Button', label: 'Hello World' });

For this to work, builder uses `builder.namespaces` property. It contains
an array of objects tying strings to view constructors. To add a new namespace
just unshift `builder.namespaces`. By default, `namespaces` equals to `global`
(`window`).

    builder.namespaces.unshift({
        SuperView: views.SuperView,
        submodule: {
            SuperChild: views.SuperChild
        }
    });
    builder.build({ view: 'submodule.SuperChild' });
    builder.build({ view: 'SuperView' });

#### Passing arguments to view constructor

Some views can accept construction-time arguments. To pass them use the
"magic" `init` property:

    build({ view: 'SplitPane', init: { vertical: true }, handlePosition: 100);

... equals to:

    var s = new SplitPane({ vertical: true });
    s.handlePosition(300);

#### Complex cases

Note that there's no additional magic in builder. It simply copies properties to
a view without any modification. For example, `childViews` will be just passed
as a JSON array to the view. And view will build those `childViews` itself:

    builder.build({ view: 'Container', childViews: [
        { view: 'Button', label: 'Hello' }
    ]});

`Container` view will then call `builder.build` to continue building its children.

The same applies to event handlers.

    builder.build({ view: 'Button', label: 'Hello', on: { click: function() {
      alert(this.label());
    } } });

Will evaluate as:

    var tmp = new Button();
    tmp.label('Hello');
    tmp.on({ click: function() {
      alert(this.label());
    } });

### new builder.Builder([namespaces])

Creates a custom builder tied to `namespaces`.

### builder.Builder.prototype.build(markup)

Converts `markup` into views and returns `Collection` containing those views.

### builder.Builder.prototype.namespaces

`Array` containing all namespaces to search when resolving view class names.

### Default builder

You can access `build` and `namespaces` directly on the builder module (`uki`).
Both of them belong to the default application builder. You can
temporary override the default builder by calling `builder.withBuilder`.

Be cautious with the default builder. Changing its `namespaces` will
affect all code in the application. It is safer to create a custom builder
instance and pass it to your building code instead of changing default
builder `namespaces`.

### builder.build(markup)

Build method of the default builder. It's bound (using `fun.bind`) to
the default builder instances. So you can call `build` as a standalone
function:

    var build = builder.build;
    build(...);

### builder.namespaces

Namespaces of the default builder.

### builder.withBuilder(builder, callback, [context])

Makes `builder` a default application builder and calls `callback`. 
After the call restores default builder to its previous state. This method is
being called within `builder.build`. So all internal calls to `build` will go 
to the same builder.
