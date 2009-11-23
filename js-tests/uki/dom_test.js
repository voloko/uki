require('../test_helper.js');
include('uki/dom.js');
include('uki/dom/observable.js');

var dom = uki.dom;

var Observable = function(dom) { this._dom = dom };
    
Observable.prototype = uki.extend({}, uki.dom.Observable, {
    dom: function() { return this._dom }
});

QUnit.test("should create dom elements", function() {
    var e = dom.createElement('input');
    QUnit.equals(e.tagName, 'INPUT');
});

QUnit.test("should bind events through document", function() {
    var e = dom.createElement('div'),
        called = false;
    dom.bind(e, 'click', function() {
        called = true;
    });
    e._fireEvent('click');
    QUnit.ok(called);
});

QUnit.test("should not call native event handling for observable", function() {
    var e = dom.createElement('input'),
        called = [],
        o = new Observable(e);
    e.addEventListener = function(ev) { called.push(type) };
    o.bind('artificial', function() {});
    o.trigger('artificial');
    
    QUnit.equals(called.length, 0);
});

QUnit.test("should copy commmon functions to uki", function() {
    QUnit.ok(uki.createElement);
    QUnit.ok(uki.bind);
    QUnit.ok(uki.unbind);
});
