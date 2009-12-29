require('../test_helper.js');
include('uki-core/utils.js');
include('uki-core/view/base.js');
include('uki-core/geometry.js');


var attr = uki.attr,
    Base = uki.view.Base,
    Rect = uki.geometry.Rect;
    
uki.supportNativeLayout = true;
    
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


