## Function

This module provides utilities to manipulate functions and create classes

### fun.build(fn, context, [arg, ...])

Returns a function that will call `fn` in a given `context` with a given `arg`.

Example:

    function modifyProp(prop, value) {
        this[prop] = value;
    }
    var obj = {};

    // bind modifyFoo to obj (this == obj)
    // with first argument (prop) equals to 'foo'
    var modifyFoo = fun.bind(modifyFoo, obj, 'foo');

    // obj['foo'] = 'bar'
    modifyFoo('bar');
    obj.bar === 'bar';


### fun.bindOnce(fn, context)

Special version of `fun.bind`. Guaranteed to provide the same result for the
same fn and context pair provided. Cannot bind arguments. If `fn` is
already bound will just return `fn`.

Useful for event handlers:

    x.on('click', fun.bindOnce(handler, this));
    // will unbind the bound function here
    x.removeListener('click', fun.bindOnce(handler, this));

Note that `fun.bindOnce` will add `__bind_NNN` properties to the `context`.

### fun.newClass([baseClass], [mixin, ...], fn)

Bare metal class and inheritance implementation. Creates a new class with
`fn` as a constructor:

    var Animal = fun.newClass(function() {
        this.name = 'Rex';
    });

It can accept base class as the first parameter. It's not obligatory to use `fun.newClass`
to create the base class. Anything, including simple `function` will work:

    var Dog = fun.newClass(Animal, function() {
        // call the base class
        Animal.apply(this, arguments);
        this.sound = 'bou wou';
    });

`fun.newClass` accepts mixins between the base class and the constructor
function. Mixin is just an object containing methods:

    var Speakable = {
        makeSound: function() {
            alert(this.sound)
        }
    };

Instead of the constructor function a description may be provided. In this
case `init` property will be used as a constructor function:

    var Cat = fun.newClass(Animal, Speakable, {
        init: function() {
            Animal.apply(this, arguments);
            this.sound = 'meow';
        },

        makeAngry: function() {
            this.sound = 'rrrrr';
        }
    });

    var cat = new Cat();
    cat.makeSound(); // meow
    cat.makeAngry();
    cat.makeSound(); // rrrrr

### fun.newProp(name, [setter])

Creates a new property accessor function. To get the property value, call the accessor
function without arguments. To set the value, call it with value as the
first argument. Properties are chainable:

    var Person = fun.newClass({
        name: fun.newProp('name'),
        age:  fun.newProp('age')
    });

    var bob = new Person();
    bob.name('Bob').age(27);
    bob.name(); // Bob

Property value will be stored with the `_name` key. To override the default
setter pass a function as a second parameter:

    MyView.prototype.width = fun.newProp('width', function(value) {
        this._width = value;
        this.updatePosition();
    });

### fun.addProp(source, name, [setter])

Adds the property created using `fun.newProp` to the given `source`:

    var Person = fun.newClass({
        age: fun.newProp('age')
    });

    fun.addProp(Person.prorotype, 'name');

Accepts an array of property names:

    fun.addProp(Person.prorotype, ['firstName', 'lastName']);

### fun.newDelegateProp(target, targetName)

Creates a function that delegates the property accessor to the `target`.
If target has an accessor function for `targetName`, this function will
be called. Otherwise delegate function will just write, read the hash key.

    var Wrapper = fun.newClass({
        init: function(node) {
            this.node = node;
        },

        id: fun.newDelegateProp('node', 'id')
    });

    var w = new Wrapper(document.createElement('div'));
    x.id('myid'); // set node.id = 'myid'
    x.id();       // read node.id

Note that delegated properties are chainable.

### fun.delegateProp(source, name, target, [targetName])

Adds a delegate function to the given `source`. By default, `targetName` is equal to `name`.

    fun.delegateProp(Wrapper.prorotype, 'id', 'node');

`fun.delegateProp` can accept an array of properties:

    fun.delegateProp(Wrapper.prorotype, ['id', 'name', 'type'], 'node');

### fun.newDelegateCall(target, targetName)

Creates a function that will call `targetName` on `target`:

    var Wrapper = fun.newClass({
        init: function(node) {
            this.node = node;
        },

        setAttribute: fun.newDelegateCall('setAttribute', 'id')
    });

    var w = new Wrapper(document.createElement('div'));
    x.setAttribute('id', 'myid');

### fun.delegateCall(source, name, target, targetName)

Adds a delegate call function to the given `source`. By default, `targetName` is equal to `name`.

    fun.delegateProp(Wrapper.prorotype, 'setAttribute', 'node');

`fun.delegateCall` can accept an array of function names:

    fun.delegateCall(Wrapper.prorotype, ['getAttribute', 'setAttribute'],
    'node');

### fun.defer(callback)

Executes `callback` after current execution is finished. Uses `fun.defer`.
Will use `postMessage` if available. Fallbacks to `setTimeout` if not.

### fun.deferOnce(callback, [context])

Same as `defer`. If called several times with the same `callback`, will 
execute it only once.

Redraw only once regardless of the number of children added:

    X.prototype.appendChild = function(view) {
        Base.prototype.appendChild.call(this, view);
        fun.deferOnce(this.redraw, redraw);
    }

### fun.throttle(fn, timeout)

Returns a function that calls `fn` no more than once every `timeout` ms.

Do not redraw more often then every 42ms:

    var throttledRedraw = fun.throttle(redraw, 42);
    x.on('scroll', throttledRedraw);

### fun.debounce(fn, timeout)

Returns a function that calls `fn` after `timeout` ms since the last call.

Redraw after scrolling is finished and 42ms passed:

    var debouncedRedraw = fun.debounce(redraw, 42);
    x.on('scroll', debouncedRedraw);


### fun.FF

Function that returns `false`.

### fun.FT

Function that returns `true`.

### fun.FS

Function that returns `this`.
