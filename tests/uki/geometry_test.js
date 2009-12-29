require('../test_helper.js');
include('uki-core/geometry.js');

var Rect = uki.geometry.Rect;
var Size = uki.geometry.Size;
var Point = uki.geometry.Point;
var Inset = uki.geometry.Inset;


QUnit.module('Point');

QUnit.test("should serialize Point to string", function() {
    var s = new Point(-1, 12);
    QUnit.equals(s + '', '-1 12');
});

QUnit.test("should unserialize Point", function() {
    QUnit.same(Point.fromString('10 -11'), new Point(10, -11));
});

QUnit.test("should unserialize Point with px units", function() {
    QUnit.same(Point.fromString('10px -11px'), new Point(10, -11));
});

QUnit.test("should unserialize Point with negative values units", function() {
    QUnit.same(Point.fromString('20% -20%', new Size(1000, 1000)), new Point(200, 800));
});


QUnit.module('Size');

QUnit.test("should serialize Size to string", function() {
    var s = new Size(10, 20);
    QUnit.equals(s + '', '10 20');
});

QUnit.test("should unserialize Size", function() {
    QUnit.same(Size.fromString('20 21'), new Size(20, 21));
});

QUnit.test("should unserialize Size with px units", function() {
    QUnit.same(Size.fromString('20px 21px'), new Size(20, 21));
});

QUnit.test("should unserialize Size with % units", function() {
    QUnit.same(Size.fromString('10% 20%', new Size(1000, 1000)), new Size(100, 200));
});


QUnit.module('Rect');

QUnit.test("should serialize Rect", function() {
    var r = new Rect(10, 11, 21, 22);
    QUnit.equals(r + '', '10 11 21 22');
});

QUnit.test("should unserialize Rect", function() {
    QUnit.same(Rect.fromString('10 11 21 22'), new Rect(10, 11, 21, 22));
});

QUnit.test("should unserialize Rect with px values", function() {
    QUnit.same(Rect.fromString('20px 21px 31px 32px'), new Rect(20, 21, 31, 32));
});

QUnit.test("should unserialize Rect with % values", function() {
    QUnit.same(Rect.fromString('10% 20% 11px 21%', new Size(1000, 1000)), new Rect(100, 200, 11, 210));
});

QUnit.test("should unserialize Rect with negative values", function() {
    QUnit.same(Rect.fromString('-30% -20% 11px 12px', new Size(1000, 1000)), new Rect(700, 800, 11, 12));
});

QUnit.test("should create Rect from Point and Size and from parts", function() {
    QUnit.same(new Rect(new Point(10, 11), new Size(12, 13)), new Rect(10, 11, 12, 13));
});

QUnit.test("should create Rect from coords", function() {
    QUnit.same(Rect.fromCoords(10, 20, 100, 200), new Rect(10, 20, 90, 180));
});

QUnit.test("should create Rect from 2 points", function() {
    QUnit.same(Rect.fromCoords(new Point(10, 20), new Point(100, 200)), new Rect(10, 20, 90, 180));
});

QUnit.test("should unserialize from coordsString", function() {
    QUnit.same(Rect.fromCoordsString('-30% -20% -10px -10%', new Size(1000, 1000)), new Rect(700, 800, 290, 100));
});

QUnit.test("should serialize to coords string", function() {
    var r = new Rect(10, 11, 21, 22);
    QUnit.equals(r.toCoordsString(), '10 11 31 33');
});

QUnit.test("should create inset", function() {
    var i = new Inset(0, 1, 2, 3);
    QUnit.equals(i + '', '0 1 2 3');
});

QUnit.test("should create inset from 2 vars", function() {
    var i = new Inset(0, 1);
    QUnit.equals(i + '', '0 1 0 1');
});

QUnit.test("should create inset from zerro vars", function() {
    var i = new Inset(1, 1, 0, 0);
    QUnit.equals(i + '', '1 1 0 0');
});

QUnit.test("should create inset from string", function() {
    var i = Inset.fromString('1 2 3 4');
    QUnit.equals(i.top, 1);
    QUnit.equals(i + '', '1 2 3 4');
});


