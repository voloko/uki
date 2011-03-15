## ukijs

Ukijs is a small (core is under 10KB) library that lets you build complex
interfaces in a meaningful way. It comes with a collection
of views like SplitPane or DataList. It also plays nicely with client-side
libraries (jQuery, Prototype) and with Node.js on the server.

### Compatibility
IE7+, FF3+, Safari/Chrome latest-1, Opera 10+. Yes, no IE6 any more.
Prototype-neutral. Will not modify any native objects.

### Build interfaces

Ukijs provides a simple syntax to build interfaces from view components
using JSON markup. Build a button view and attach it to `document.body`:

    uki({ view: 'Button', label: 'Hello World' }).attach(document.body);

This can be extended to build more complex interfaces like a mail app layout:

    uki(
      // vertically splitted 2-pane resizable container
      { view: 'SplitPane', init: { vertical: true },
        leftChildViews: [
          // data list on the left filling all the available space
          { view: 'ScrollableDataList', pos: 'top:0 left:0 right:0 bottom:0',
            data: folders }
        ],
        rightChildViews: [
          // horizontally splitted 2-pane resizable container with a large handle
          { view: 'SplitPane', init: { vertical: false, handleWidth: 5 },
            handlePosition: 300,
            topChildViews: [
              // messages arranged as a table on the right
              { view: 'DataTable', pos: 'top:0 left:0 right:0 bottom:0',
                data: messages,
                columns: [
                  { label: 'From', key: 'fromName', width: 200, minWidth: 100 },
                  { label: 'Subject', key: 'title', width: 200, minWidth: 100 },
                  { label: 'Received', key: 'dateReceived',
                    width: 100, minWidth: 80, formatter: function(d) {
                      return d.toDateString();
                    } }
                ]
              }
            ],
            bottomChildViews: [
              // title
              { view: 'Text', pos: 'top:0 left:0 right:0 height:30px',
                text: 'message label' },
              // content
              { view: 'Text', pos: 'top:30px left:0 right:0 bottom:0',
                id: 'content' }
            ]
          }
        ]
    }).attach(); // attaches to document body by default

### Traversing

Once the interface is built, uki will let you traverse it using CSS-like
selectors. For the previous example you can use:

    uki('SplitPane[vertical]') // a vertical split pane
    uki('Text:eq(1)')          // second text
    uki('#content')            // text by id
    uki('[text~=message]')     // anything where text contains a word `message`

Note that `uki()` function returns a Collection of views. Elements within
the collection can be accessed using `[]`:

    var splitPanes = uki('SplitPane');     // find all split panes

    alert(splitPanes[0].handlePosition()); // get the handle position of the
                                           // first split pane

### Manipulation

All the properties of a view are modifiable. To modify a property, pass a
value into the property function:

    uki('SplitPane')[1].handlePosition(200); // move handle to 200px
    uki('DataTable')[0].data(newMessages);   // replace the messages in
                                             // the table

Properties are chainable. Change the label to make the button large:

    uki('Button').label('New label').large(true);

Views also support a DOM-like API: `appendChild`, `insertBefore`, `removeChild`,
`childViews`, `parentView`, `firstChild`, `lastChild`, `nextView`, `prevView`.

    uki({ view: 'Flow', horizontal: false, childViews: [
      { view: 'Button', label: 'Button 1' },
      { view: 'Button', label: 'Button 2' }
    ]}).attach();

    // change seconds button label
    uki('Flow')[0].childViews()[1].label('New label');

    // append extra button to the flow
    uki('Flow')[0].appendChild(
      uki({ view: 'Button', label: 'Button 3' })[0]
    );

### Events

You can add event listeners to views. The API is similar to DOM nodes:
`addListener` or `on` and `removeListener`:

    uki('Button')[0].on('click', function() {
      alert(this.label());
    });

Listeners can also be provided inline during create:

    uki({ view: 'Button', label: 'Hello', on: {
      click: function() {
        alert(this.label());
      }
    }});

Views may provide specific events. Example:

    uki('DataList')[0].on('selection', function() {
      console.log(this.selectedIndexes());
    });

### Data bindings

You can create observable data models and then bind them to views. So
when the view changes the data gets updated and vice versa.

First you need a data model:

    var Person = uki.newClass(uki.Observable, {
        name: uki.Observable.newProp('name'),
        age:  uki.Observable.newProp('age')
    });

    var bob = new Person();
    bob.name('Bob').age(27);

Then you can bind it to a view:

    uki([
      { view: 'nativeControl.Text',
        binding: { model: bob, modelProp: 'name' } },
      { view: 'nativeControl.Select', options: uki.range(10, 99),
        binding: { model: bob, modelProp: 'age' } }
    ]).attach();

Then whenever you change the data the view will get updated:

    bob.name('Bobby'); // change the text field value to 'Bobby'
    bob.age(38);       // change the selected item in select to 38

Several views can be bound to the same model. Bind age to a text field:

    uki({ view: 'nativeControl.Text',
      binding: { model: bob, modelProp: 'age' } }
    ).attach();

### Node.js require

Uki core is a collection of modules each of which can be used separately. Uki
uses the Common.JS Modules specification to build modules together.

To use modules separately you need the uki tools server/builder. Once installed you
can use `require` in your client-side code. For example, instead of requiring
the full core, you can require only the utility functions:

    var utils = require('ukijs/src/uki-core/utils');
    var keys = utils.keys({ foo: 1, bar: 2});

    var fun = require('ukijs/src/uki-core/function'),
        Observable = require('uki-core/observable').Observable;

    var Person = fun.newClass(Observable, {
        name: Observable.newProp('name'),
        age:  Observable.newProp('age')
    });

    var build = require('ukijs/src/uki-core/builder').build;

    var button = build({ view: 'Button', label: 'x' });

When in library mode (`require('uki-core)` or just load uki-core.js) all the
module function are added to the uki namespace.
