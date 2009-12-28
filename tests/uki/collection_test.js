require('../test_helper.js');
include('uki/builder.js');
include('uki/view/base.js');
include('uki/selector.js');
include('uki/collection.js');

var Base = uki.view.Base;

function getTree (n) {
    var r = [];
    for (var i=0; i < n; i++) {
        r[i] = new Base();
        r[i].knownEvents = function() { return ['artificial'] };
        r[i].rect('0 0 1000 1000');
        r[i].name = 'base_' + i;
    };
    return r;
}

QUnit.test("should populate this with array values", function() {
    var c = new uki.Collection(getTree(10));
    QUnit.equals(c.length, 10);
    QUnit.ok(c[5].name == 'base_5');
});


QUnit.test("should call bind on every item", function() {
    var c = new uki.Collection(getTree(10)),
        called = [];
    c.bind('artificial', function() {
        called.push(this.name);
    });
    
    c[5].trigger('artificial', {});
    
    QUnit.same(called, ['base_5']);
});


QUnit.test("should call bind and trigger on every item", function() {
    var c = new uki.Collection(getTree(5)),
        called = [];
    c.bind('artificial', function() {
        called.push(this.name);
    }).trigger('artificial');
    
    QUnit.same(called.join(','), 'base_0,base_1,base_2,base_3,base_4');
});

QUnit.test("should call bind/unbind and trigger on every item", function() {
    var c = new uki.Collection(getTree(5)),
        called = [],
        h = function() {
            called.push(this.name);
        };
    c.bind('artificial', h).unbind('artificial', h).trigger('artificial');
    
    QUnit.same(called.join(','), '');
});


QUnit.test("should call native event handlers", function() {
    var c = new uki.Collection(getTree(10)),
        called = [];
    c.bind('click', function() {
        called.push(this.name);
    });
    
    c[5].dom()._fireEvent('click', {});
    
    QUnit.same(called.join(','), 'base_5');
});

QUnit.test("should change attr", function() {
    var c = new uki.Collection(getTree(10));
    c.attr('anchors', 'top right');
    
    QUnit.equals(c[2].anchors(), 'top right');
});

QUnit.test("should read attr", function() {
    var c = new uki.Collection(getTree(1));
    
    QUnit.equals(c.attr('rect'), '0 0 1000 1000');
});

QUnit.test("find should return a collection", function() {
    var p = new Base();
    p.rect('100 100 1000 1000');
    p.childViews(getTree(10))
    var c = uki.find('*', p);
    QUnit.ok(c.attr);
    QUnit.equals(c.length, 10);
});

QUnit.test("build should return a collection", function() {
    var c = uki.build({
        view: new Base(),
        rect: '0 0 1000 1000'
    });
    QUnit.equals(c.length, 1);
    QUnit.ok(c.attr);
});

