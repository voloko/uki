require('../test_helper.js');
include('uki-core/builder.js');
include('uki-core/view/base.js');

var builder = uki;

uki.supportNativeLayout = true;

QUnit.test("should create single view", function() {
    var c = builder.build([{
        view: new uki.view.Base()
    }])[0];

    QUnit.ok(c);
    QUnit.ok(typeof(c) == 'object');
});

QUnit.test("should create view from path", function() {
    var c = builder.build([{
        view: 'uki.view.Base'
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});

QUnit.test("shoudl create view from short path", function() {
    var c = builder.build([{
        view: 'Base'
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});

QUnit.test("should create view with lazy function call", function() {
    var c = builder.build([{
        view: function() { return new uki.view.Base(); }
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});


QUnit.test("should create single view", function() {
    var c = builder.build({
        view: new uki.view.Base()
    })[0];
    
    QUnit.ok(c instanceof uki.view.Base, 'instance of');
});

QUnit.test("should not build readymade views", function() {
    var c = builder.build([new uki.view.Base()]);
    
    QUnit.ok(c[0] instanceof uki.view.Base, 'instance of');
});