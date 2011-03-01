## Builder

Provides a method to convert json markup into actual views.

### builder.build(markup)

Converts `markup` into views and returns `Collection` containing those views.

    build({ view: 'Button', label: 'Hello World' });

`build` is extremely simple and strait-forward: it will create a view object
based on `view` property and copy remaining properties using the `utils.prop`
function.

_Build steps_

First it will resolve the actual view class using the `view` property. If
`view` is a class object it will be used without transformation.
If `view` is a `String` build will try to find object with the given
path in `builder.viewNamespaces`.

After the `view` is resolved it will be instantiated with the optional
`init` parameter. `{ vertical: true }` will be passed to `new SplitPane`.

    build({ view: 'SplitPane', init: { vertical: true })

Once the view object is ready `build` will simply copy all the remaining
properties to the build object using `utils.prop`.

    build({ view: 'SplitPane', init: { vertical: true }, handlePosition: 100)

... equals to:

    var s = new SplitPane({ vertical: true });
    s.handlePosition(300);
    
There's no additional magic here. For example `childViews` will be just passed
as a json array to the view. And view will build those `childViews` itself.

### builder.viewNamespaces

Array containing all namespaces to search when resolving view class.

