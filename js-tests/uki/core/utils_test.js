require('../../test_helper.js');
include('uki/core/utils.js');

var utils = uki.core.utils;

QUnit.test("should test is function", function() {
    var f1 = function() {};
    function f2 () {};
    QUnit.ok(utils.isFunction(function() {}), 'anonimous function');
    QUnit.ok(utils.isFunction(f1), 'var f = function');
    QUnit.ok(utils.isFunction(f2), 'function f');
    QUnit.ok(!utils.isFunction({}), 'object');
});


QUnit.test("should test for is array", function() {
    var x = [1, 2];
    QUnit.ok(utils.isArray([]), 'anonimous array');
    QUnit.ok(utils.isArray(x), 'x = []');
    QUnit.ok(!utils.isArray({}), 'object');
});


QUnit.test("should iterate over array with each", function() {
    QUnit.expect(3);
    utils.each([1, 1, 1], function() {
        QUnit.ok(this == 1);
    });
});

QUnit.test("should iterate over array with each in context", function() {
    QUnit.expect(3);
    var context = {};
    utils.each([1, 1, 1], function() {
        QUnit.equals(this, context);
    }, context);
});

QUnit.test("should iterate over hash with each", function() {
    QUnit.expect(3);
    utils.each({a: 1, b: 1, c: 1}, function() {
        QUnit.ok(this == 1);
    });
});

QUnit.test("should iterate over hash with each in context", function() {
    QUnit.expect(3);
    var context = {};
    utils.each({a: 1, b: 1, c: 1}, function() {
        QUnit.equals(this, context);
    }, context);
});


QUnit.test("should trim text", function() {
    QUnit.equals(utils.trim('  TEST TEST '), 'TEST TEST');
});


QUnit.test("should escape html", function() {
    QUnit.equals(utils.escapeHTML('<span class="a">1</span>'), '&lt;span class=&quot;a&quot;&gt;1&lt;/span&gt;');
});

QUnit.test("should test if is in array", function() {
    QUnit.equals(utils.inArray(1, [0, 1, 2]), 1);
    QUnit.equals(utils.inArray(3, [0, 1, 2]), -1);
});

QUnit.test("should make uniq array", function() {
    QUnit.same(utils.unique([1, 1, 2, 3]), [1, 2, 3]);
});

QUnit.test("should grep array for items", function() {
    var result = utils.grep([1, 2, 3, 4], function(v) {
        return v > 2;
    });
    QUnit.same(result, [3, 4]);
});

QUnit.test("should map collection", function() {
    var result = utils.map([1, 2, 3, 4], function(v) {
        return -v;
    });
    QUnit.same(result, [-1, -2, -3, -4]);
});

QUnit.test("should map collection", function() {
    QUnit.expect(4);
    var context = {};
    var result = utils.map([1, 2, 3, 4], function(v) {
        QUnit.equals(this, context);
    }, context);
});

QUnit.test("should extend objects", function() {
    var e = utils.extend({a: 1}, {b: 2}, {c: 3, d: undefined});
    QUnit.same(e, {a: 1, b: 2, c: 3});
});

QUnit.test("should extend uki with utils", function() {
    var functions = ['isFunction', 'isArray', 'trim', 'escapeHTML', 'each', 'inArray', 'unique', 'grep', 'map', 'extend'];
    utils.each(functions, function() {
        QUnit.ok(uki[this], this);
    });
});



