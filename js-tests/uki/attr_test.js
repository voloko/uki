require('../test_helper.js');
include('uki/attr.js');
include('uki/view/base.js');
include('uki/geometry.js');


var attr = uki.attr,
    Base = uki.view.Base,
    Rect = uki.geometry.Rect;
    
    
QUnit.module('Writing rect');

QUnit.test("should write rect attr with px string", function() {
    var c = new Base();
    attr(c, 'rect', '10px 11px 500px 501px');

    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '11px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '501px');
});

QUnit.test("should write rect attr with Rect instance", function() {
    var c = new Base();
    attr(c, 'rect', new uki.geometry.Rect(10, 11, 500, 501));
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '11px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '501px');
});

QUnit.module('Default writers');

QUnit.test("should set with default setter", function() {
    QUnit.expect(1);
    var c = new Base();
    var v = {x: 'something'};
    c.foo = function(val) {
        QUnit.same(val, v);
    };
    attr(c, 'foo', v);
});

QUnit.test("should write to property if no setter present", function() {
    var c = new Base();
    var v = {x: 'something'};
    attr(c, 'foo', v);
    QUnit.equals(c.foo, v);
});


QUnit.module("Coords accessors");

QUnit.test("should read width", function() {
    var c = new Base(new Rect(10, 11, 100, 101));
    QUnit.same(attr(c, 'width'), 100);
    QUnit.same(attr(c, 'height'), 101);
    QUnit.same(attr(c, 'left'), 10);
    QUnit.same(attr(c, 'top'), 11);
});


QUnit.test("should read width", function() {
    var c = new Base(new Rect(10, 11, 100, 101));
    attr(c, 'left', 12);
    attr(c, 'top', 13);
    attr(c, 'width', 102);
    attr(c, 'height', 103);
    QUnit.same(attr(c, 'width'), 102);
    QUnit.same(attr(c, 'height'), 103);
    QUnit.same(attr(c, 'left'), 12);
    QUnit.same(attr(c, 'top'), 13);
});



QUnit.module('Default readers');

QUnit.test("should read properties if getter is present", function() {
    var c = new Base();
    c.foo = function() { return {x: 'TEST'}; }; 
    QUnit.same(attr(c, 'foo'), {x: 'TEST'});
});

QUnit.test("should read simple properties without getters", function() {
    var c = new Base();
    c.foo = {x: 'TEST'};
    QUnit.same(attr(c, 'foo'), {x: 'TEST'});
});


