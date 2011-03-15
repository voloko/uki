module('bind');

test("without args", 2, function() {
    var obj = { foo: 'bar' };
    function t() { return this.foo; }
    var bound1 = fun.bind(t, obj),
        bound2 = fun.bind(t, obj);
    equal(bound1(), 'bar');
    equal(bound2(), 'bar');
});

test("twice", 1, function() {
    var obj = { foo: 'bar' };
    function t() { return this.foo; };
    
    var bound = fun.bind(t, obj);
    bound = fun.bind(bound, {});
    equal(bound(), 'bar');
});

test("with args", 2, function() {
    var obj = { n: 1 };
    function t(a, b) { return this.n + a + b; }
    var bound6 = fun.bind(t, obj, 2, 3),
        bound7 = fun.bind(t, obj, 2, 4);
    equal(bound6(), 6);
    equal(bound7(), 7);
});


module('bindOnce');

test('result is constant', 2, function() {
    var obj = { foo: 'bar' };
    function t() { return this.foo; };
    var bound1 = fun.bindOnce(t, obj),
        bound2 = fun.bindOnce(t, obj);
        
    strictEqual(bound1, bound2);
    equal(bound2(), 'bar');
});

test('[perf] does not rebind', 1, function() {
    var obj = { foo: 'bar' };
    function t() { return this.foo; };
    var origBound = fun.bind(t, obj);
    var bound = fun.bindOnce(origBound, {});
    
    strictEqual(origBound, bound);
});


module('newClass');

test('from constructor', 1, function() {
    var klass = fun.newClass(function() {
        this.foo = 'bar';
    });
    
    var obj = new klass();
    equal(obj.foo, 'bar');
});

test('from description', 1, function() {
    var klass = fun.newClass({ foo: 'bar' });
    
    var obj = new klass();
    equal(obj.foo, 'bar');
    
});

test('from constructor and a base class', 1, function() {
    var base = fun.newClass({ 
        getFoo: function() {
            return this.foo;
        } 
    });
    var klass = fun.newClass(base, function() {
        this.foo = 'bar';
    });
    
    var obj = new klass();
    equal(obj.getFoo(), 'bar');
});

test('from description and a base class', 1, function() {
    var base = fun.newClass(function() {
        this.foo = 'bar';
    });
    var klass = fun.newClass(base, {
        getFoo: function() {
            return this.foo;
        }
    });
    
    var obj = new klass();
    equal(obj.getFoo(), 'bar');
});

test('with a mixin', 1, function() {
    var mixin = {
        getFoo: function() {
            return this.foo;
        }
    };
    var base = fun.newClass(function() {
        this.foo = 'bar';
    });
    var klass = fun.newClass(base, mixin, function() {
        base.call(this);
        this.foo += ' bar';
    });
    
    var obj = new klass();
    equal(obj.getFoo(), 'bar bar');
});

test('with a function as a constructor', 1, function() {
    function base() {
        this.foo = 'bar';
    }
    var klass = fun.newClass(base, {
        getFoo: function() {
            return this.foo;
        }
    });
    
    var obj = new klass();
    equal(obj.getFoo(), 'bar');
});

test('with magic init function', 1, function() {
    var klass = fun.newClass({
        init: function() {
            this.foo = 'bar';
        }
    });
    
    var obj = new klass();
    equal(obj.foo, 'bar');
});

test('without anything', 1, function() {
    var klass = fun.newClass();
    klass.prototype.foo = 'bar';
    
    var obj = new klass();
    equal(obj.foo, 'bar');
});


module('property generators');

test('newProp basic', 2, function() {
    var klass = fun.newClass({
        foo: fun.newProp('foo')
    });
    
    var obj = new klass();
    strictEqual(obj.foo('bar'), obj);
    equal(obj.foo(), 'bar');
});

test('newProp with setter', 2, function() {
    var klass = fun.newClass({
        foo: fun.newProp('foo', function(value) {
            this._foo = value + ' bar';
        })
    });
    
    var obj = new klass();
    strictEqual(obj.foo('bar'), obj);
    equal(obj.foo(), 'bar bar');
});

test('addProp basic', 4, function() {
    var klass = fun.newClass();
    
    fun.addProp(klass.prototype, ['foo1', 'foo2']);
    var obj = new klass();
    strictEqual(obj.foo1('bar'), obj);
    equal(obj.foo1(), 'bar');
    strictEqual(obj.foo2('bar'), obj);
    equal(obj.foo2(), 'bar');
});

test('addProp with setter', 4, function() {
    var klass = fun.newClass();
    
    fun.addProp(klass.prototype, ['foo1', 'foo2'], [
        function(value) {
            this._foo1 = value + '1';
        },
        function(value) {
            this._foo2 = value + '2';
        }
    ]);
    var obj = new klass();
    strictEqual(obj.foo1('bar'), obj);
    equal(obj.foo1(), 'bar1');
    strictEqual(obj.foo2('bar'), obj);
    equal(obj.foo2(), 'bar2');
});

test('delegateProp to a dumb object', 4, function() {
    var klass = fun.newClass({
        init: function() {
            this.sub = { foo: 'bar' };
        },
        
        foo: fun.newDelegateProp('sub', 'foo')
    });
    
    var obj = new klass();
    equal(obj.foo(), 'bar');
    strictEqual(obj.foo('bar bar'), obj);
    equal(obj.foo(), 'bar bar');
    equal(obj.sub.foo, 'bar bar');
});

test('delegateProp to an object with prop', 3, function() {
    var sub = fun.newClass({
        foo: fun.newProp('foo')
    });
    
    var klass = fun.newClass({
        init: function() {
            this.sub = new sub();
        },
        
        foo: fun.newDelegateProp('sub', 'foo')
    });
    
    var obj = new klass();
    
    strictEqual(obj.foo('bar'), obj);
    equal(obj.foo(), 'bar');
    equal(obj.sub.foo(), 'bar');
});

test('delegateCall', 2, function() {
    var sub = fun.newClass({
        foo: function(extra) {
            return 'bar' + (extra || '');
        }
    });
    
    var klass = fun.newClass({
        init: function() {
            this.sub = new sub();
        },
        
        foo: fun.newDelegateCall('sub', 'foo')
    });
    
    var obj = new klass();
    equal(obj.foo(), 'bar');
    equal(obj.foo(' bar'), 'bar bar');
});


module('deferOnce');

asyncTest('is called', 2, function() {
    var count = 0;
    function counter() {
        count++;
    }
    fun.deferOnce(counter);
    equal(count, 0);
    setTimeout(function() {
        equal(count, 1);
        start();
    }, 10);
});

asyncTest('is de-duped', 2, function() {
    var count = 0;
    function counter() {
        count++;
    }
    for(var i = 0; i < 100; i++) {
        fun.deferOnce(counter);
    }
    equal(count, 0);
    setTimeout(function() {
        equal(count, 1);
        start();
    }, 10);
});


module('timers');

asyncTest('throttle', 4, function() {
    var count = 0;
    function counter() {
        count++;
    }
    var modified = fun.throttle(counter, 20);
    
    modified();
    equal(count, 0);
    setTimeout(function() {
        modified();
        equal(count, 0);
        
        setTimeout(function() {
            // enough wait for 1 call
            equal(count, 1);
            modified();
            setTimeout(function() {
                // second call worked
                equal(count, 2);
                start();
            }, 20);
        }, 20);
    }, 10);
});

asyncTest('debounce', 4, function() {
    var count = 0;
    function counter() {
        count++;
    }
    var modified = fun.debounce(counter, 20);
    
    modified();
    equal(count, 0);
    setTimeout(function() {
        modified();
        equal(count, 0);
        
        setTimeout(function() {
            // calls are too ofter
            equal(count, 0);
            // this will work
            modified();
            setTimeout(function() {
                equal(count, 1);
                start();
            }, 20);
        }, 11);
    }, 10);
});


module('utility function');

test('FT', 1, function() {
    strictEqual(fun.FT(), true);
});

test('FF', 1, function() {
    strictEqual(fun.FF(), false);
});

test('FS', 1, function() {
    var obj = {
        self: fun.FS
    };
    strictEqual(obj.self(), obj);
});
