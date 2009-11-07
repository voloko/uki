require('../../test_helper.js');
include('uki/core/builder.js');
include('uki/component/base.js');
include('uki/layout.js');

var builder = uki.core.builder;

QUnit.test("should create single component", function() {
    var c = builder.build([{
        view: new uki.component.Base()
    }])[0];

    QUnit.ok(c);
    QUnit.ok(typeof(c) == 'object');
});

QUnit.test("should create component from path", function() {
    var c = builder.build([{
        view: 'uki.component.Base'
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});

QUnit.test("shoudl create component from short path", function() {
    var c = builder.build([{
        view: 'Base'
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});

QUnit.test("should create component with lazy function call", function() {
    var c = builder.build([{
        view: function() { return new uki.component.Base(); }
    }])[0];

    QUnit.ok(c, 'exists');
    QUnit.ok(typeof(c) == 'object', 'valid type');
});


QUnit.test("should layout with pixel values component", function() {
    var c = builder.build([{
        view: new uki.component.Base(),
        rect: '10px 11 500 501px'
    }])[0];
    
    uki.layout.perform();
    QUnit.equals(c.domStyle().left, '10px');
    QUnit.equals(c.domStyle().top, '11px');
    QUnit.equals(c.domStyle().width, '500px');
    QUnit.equals(c.domStyle().height, '501px');
});


QUnit.test("should layout with pixel values component", function() {
    var c = builder.build([{
        view: new uki.component.Base(),
        coords: '10px 11 510 512px'
    }])[0];
    
    uki.layout.perform();
    QUnit.equals(c.domStyle().left, '10px');
    QUnit.equals(c.domStyle().top, '11px');
    QUnit.equals(c.domStyle().width, '500px');
    QUnit.equals(c.domStyle().height, '501px');
});
