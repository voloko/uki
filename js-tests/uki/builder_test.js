require('../test_helper.js');
include('uki/builder.js');
include('uki/view/base.js');

var builder = uki;

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


QUnit.test("should layout with pixel values view", function() {
    var c = uki.build([{
        view: new uki.view.Base(),
        rect: '10px 11 500 501px'
    }])[0];
    
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '11px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '501px');
});


QUnit.test("should layout with pixel values view", function() {
    var c = builder.build([{
        view: new uki.view.Base(),
        coords: '10px 11 510 512px'
    }])[0];
    
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '11px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '501px');
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

QUnit.test("should call setters in specified order", function() {
    var order = [];
    var mock = function() { this.init.apply(this, arguments) };
    mock.prototype = uki.extend({}, uki.view.Base.prototype, {
        builderAttrs: function() { return ['rect', 'something', 'text', 'children']},
        rect: function() { order.push('rect') },
        text: function() { order.push('text') },
        children: function() { order.push('children') }
    });
    
    builder.build({
        view: new mock(),
        text: 'test',
        children: [],
        rect: '12'
    });
    
    QUnit.same(order, ['rect', 'text', 'children']);
});
