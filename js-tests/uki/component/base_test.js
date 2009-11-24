require('../../test_helper.js');
include('uki/component/base.js');
include('uki/geometry.js');
include('uki/layout.js');

var Base = uki.component.Base,
    Rect = uki.geometry.Rect;

QUnit.test("should create dom node on init with frame size", function() {
    var c = new Base(new Rect(10, 20, 100, 101));
    QUnit.ok(c.dom());
    uki.layout.perform();
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top,  '20px');
    QUnit.equals(c.dom().style.width, '100px');
    QUnit.equals(c.dom().style.height, '101px');
});


QUnit.test("should add dom to parents dom", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    parent.addChild(child);
    QUnit.ok(child.parent() == parent);
    QUnit.ok(child.dom().parentNode == parent.dom());
});


QUnit.test("should call children's resizeWithOldSize", function() {
    QUnit.expect(1);
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    parent.addChild(child);
    child.resizeWithOldSize = function(oldSize) {
        QUnit.same(oldSize, new uki.geometry.Size(1000, 1000));
    };
    parent.rect(new Rect(0, 0, 500, 500));
});

QUnit.test("should not move anchored top left component", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('left top');
    child.autosize('');
    parent.addChild(child);
    parent.rect(new Rect(0, 0, 500, 500));
    QUnit.equals(child.rect().origin.x, 100, 'x');
    QUnit.equals(child.rect().origin.y, 100, 'y');
    QUnit.equals(child.rect().size.width,  100, 'w');
    QUnit.equals(child.rect().size.height, 100, 'h');
});

QUnit.test("should move anchored top right component", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('top right');
    child.autosize('');
    parent.addChild(child);
    parent.rect(new Rect(0, 0, 900, 900));
    QUnit.equals(child.rect().origin.x, 0);
    QUnit.equals(child.rect().origin.y, 100);
    QUnit.equals(child.rect().size.width,  100);
    QUnit.equals(child.rect().size.height, 100);
});

QUnit.test("should resize autowidth components", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('left top right bottom');
    child.autosize('width height');
    parent.addChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().origin.x, 100);
    QUnit.equals(child.rect().origin.y, 100);
    QUnit.equals(child.rect().size.width,  50);
    QUnit.equals(child.rect().size.height, 50);
});

QUnit.test("should resize autowidth 1 anchor components", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('top right bottom');
    child.autosize('width height');
    parent.addChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().origin.x, 75);
    QUnit.equals(child.rect().origin.y, 100);
    QUnit.equals(child.rect().size.width,  75);
    QUnit.equals(child.rect().size.height, 50);
});

QUnit.test("should resize autoheight 1 anchor components", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child  = new Base(new Rect(100, 100, 100, 100));
    child.anchors('right bottom');
    child.autosize('width height');
    parent.addChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().origin.x, 75);
    QUnit.equals(child.rect().origin.y, 75);
    QUnit.equals(child.rect().size.width,  75);
    QUnit.equals(child.rect().size.height, 75);
});

QUnit.module('parent');

QUnit.test("should calculate rect with %", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.addChild(c);
    c.rect('10% 11% 50% 51%');
    uki.layout.perform();
    QUnit.equals(c.dom().style.left, '100px');
    QUnit.equals(c.dom().style.top, '110px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '510px');
});

QUnit.test("should calculate negative values", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.addChild(c);
    c.rect('-700 -50% 50% 20%');
    
    uki.layout.perform();
    QUnit.equals(c.dom().style.left, '300px');
    QUnit.equals(c.dom().style.top, '500px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '200px');
});


QUnit.test("should set rect from coords", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.addChild(c);
    c.coords('10px -20% -20% -10%');
    
    uki.layout.perform();
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '800px');
    QUnit.equals(c.dom().style.width, '790px'); // 1000 -20% -10 = 790
    QUnit.equals(c.dom().style.height, '100px');
});


QUnit.test("should create children from ukiml", function() {
    var c = new Base();
    c.rect('0 0 1000px 1000px');
    c.children([
        {
            view: new Base(),
            rect: '10% 11% 12% 13%', autosize: 'height'
        },
        {
            view: new Base(),
            rect: '20% 10% 10% 10%', autosize: 'width height'
        }
    ]);
    uki.layout.perform();
    QUnit.equals(c.children().length, 2);
    QUnit.equals(c.children()[0].dom().style.left, '100px');
    QUnit.equals(c.children()[0].dom().style.top, '110px');
    QUnit.equals(c.children()[0].dom().style.width, '120px');
    QUnit.equals(c.children()[0].dom().style.height, '130px');
});
