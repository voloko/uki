require('../../test_helper.js');
include('uki/view/base.js');
include('uki/geometry.js');

var Base = uki.view.Base,
    Rect = uki.geometry.Rect;

QUnit.test("should create dom node on init with frame size", function() {
    var c = new Base(new Rect(10, 20, 100, 101));
    QUnit.ok(c.dom());
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top,  '20px');
    QUnit.equals(c.dom().style.width, '100px');
    QUnit.equals(c.dom().style.height, '101px');
});


QUnit.test("should add dom to parents dom", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    parent.appendChild(child);
    QUnit.ok(child.parent() == parent);
    QUnit.ok(child.dom().parentNode == parent.dom());
});


QUnit.test("should call childViews's parentResized", function() {
    QUnit.expect(1);
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    parent.appendChild(child);
    child.parentResized = function(oldSize) {
        QUnit.same(oldSize, new uki.geometry.Size(1000, 1000));
    };
    parent.rect(new Rect(0, 0, 500, 500));
});

QUnit.test("should not move anchored top left view", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('left top');
    child.autosize('');
    parent.appendChild(child);
    parent.rect(new Rect(0, 0, 500, 500));
    QUnit.equals(child.rect().x, 100, 'x');
    QUnit.equals(child.rect().y, 100, 'y');
    QUnit.equals(child.rect().width,  100, 'w');
    QUnit.equals(child.rect().height, 100, 'h');
});

QUnit.test("should move anchored top right view", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('top right');
    child.autosize('');
    parent.appendChild(child);
    parent.rect(new Rect(0, 0, 900, 900));
    QUnit.equals(child.rect().x, 0);
    QUnit.equals(child.rect().y, 100);
    QUnit.equals(child.rect().width,  100);
    QUnit.equals(child.rect().height, 100);
});

QUnit.test("should resize autowidth views", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('left top right bottom');
    child.autosize('width height');
    parent.appendChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().x, 100);
    QUnit.equals(child.rect().y, 100);
    QUnit.equals(child.rect().width,  50);
    QUnit.equals(child.rect().height, 50);
});

QUnit.test("should resize autowidth 1 anchor views", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child = new Base(new Rect(100, 100, 100, 100));
    child.anchors('top right bottom');
    child.autosize('width height');
    parent.appendChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().x, 75);
    QUnit.equals(child.rect().y, 100);
    QUnit.equals(child.rect().width,  75);
    QUnit.equals(child.rect().height, 50);
});

QUnit.test("should resize autoheight 1 anchor views", function() {
    var parent = new Base(new Rect(0, 0, 1000, 1000));
    var child  = new Base(new Rect(100, 100, 100, 100));
    child.anchors('right bottom');
    child.autosize('width height');
    parent.appendChild(child);
    parent.rect(new Rect(0, 0, 950, 950));
    QUnit.equals(child.rect().x, 75);
    QUnit.equals(child.rect().y, 75);
    QUnit.equals(child.rect().width,  75);
    QUnit.equals(child.rect().height, 75);
});

QUnit.module('parent');

QUnit.test("should calculate rect with %", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.appendChild(c);
    c.rect('10% 11% 50% 51%');
    QUnit.equals(c.dom().style.left, '100px');
    QUnit.equals(c.dom().style.top, '110px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '510px');
});

QUnit.test("should calculate negative values", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.appendChild(c);
    c.rect('-700 -50% 50% 20%');
    
    QUnit.equals(c.dom().style.left, '300px');
    QUnit.equals(c.dom().style.top, '500px');
    QUnit.equals(c.dom().style.width, '500px');
    QUnit.equals(c.dom().style.height, '200px');
});


QUnit.test("should set rect from coords", function() {
    var c = new Base(),
        parent = new Base(new Rect(0, 0, 1000, 1000));
        
    parent.appendChild(c);
    c.coords('10px -20% -20% -10%');
    
    QUnit.equals(c.dom().style.left, '10px');
    QUnit.equals(c.dom().style.top, '800px');
    QUnit.equals(c.dom().style.width, '790px'); // 1000 -20% -10 = 790
    QUnit.equals(c.dom().style.height, '100px');
});


QUnit.test("should create childViews from ukiml", function() {
    var c = new Base();
    c.rect('0 0 1000px 1000px');
    c.childViews([
        {
            view: new Base(),
            rect: '10% 11% 12% 13%', autosize: 'height'
        },
        {
            view: new Base(),
            rect: '20% 10% 10% 10%', autosize: 'width height'
        }
    ]);
    QUnit.equals(c.childViews().length, 2);
    QUnit.equals(c.childViews()[0].dom().style.left, '100px');
    QUnit.equals(c.childViews()[0].dom().style.top, '110px');
    QUnit.equals(c.childViews()[0].dom().style.width, '120px');
    QUnit.equals(c.childViews()[0].dom().style.height, '130px');
});
