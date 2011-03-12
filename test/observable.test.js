module('Observable');

var OTest = observable.fun.newClass(observable.Observable, {});

test('add specific event', 1, function() {
    var o = new OTest();
    o.on('dummy', function() {
        ok(1);
    });
    o.trigger({ type: 'dummy' });
});

test('add specific events', 2, function() {
    var o = new OTest();
    o.on('foo bar', function() {
        ok(1);
    });
    o.trigger({ type: 'foo' });
    o.trigger({ type: 'bar' });
});

test('remove specific event', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    var o = new OTest();
    o.on('foo', listener);
    o.removeListener('foo', listener);
    o.trigger({ type: 'foo' });
    ok(true, 'passed');
});

test('remove specific event', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    var o = new OTest();
    o.on('foo bar', listener);
    o.removeListener('foo bar', listener);
    o.trigger({ type: 'foo' });
    o.trigger({ type: 'bar' });
    ok(true, 'passed');
});

test('remove all events by type', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    var o = new OTest();
    o.on('foo bar', listener);
    o.removeListener('foo bar');
    o.trigger({ type: 'foo' });
    o.trigger({ type: 'bar' });
    ok(true, 'passed');
});

test('remove all events', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    var o = new OTest();
    o.on('foo bar', listener);
    o.removeListener();
    o.trigger({ type: 'foo' });
    o.trigger({ type: 'bar' });
    ok(true, 'passed');
});

test('mute all events', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    var o = new OTest();
    o.on('foo bar', listener);
    o.muteEvents(true);
    o.trigger({ type: 'foo' });
    o.trigger({ type: 'bar' });
    ok(true, 'passed');
});

module('observable changes');

test('trigger 2 events', 2, function() {
    var o = new OTest();
    o.on('change', function(e) {
        equal(e.type, 'change');
    });
    o.on('change.foo', function(e) {
        equal(e.type, 'change.foo');
    });
    o.triggerChanges('foo', null);
});

test('observable prop', 2, function() {
    var o = new OTest();
    o.foo = observable.Observable.newProp('foo');
    
    o.on('change', function(e) {
        equal(e.type, 'change');
    });
    o.on('change.foo', function(e) {
        equal(e.type, 'change.foo');
    });
    o.foo('bar');
});

