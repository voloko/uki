module('event');

function target() {
    return document.getElementById('target');
}

function finishIn(timeout) {
    setTimeout(function() {
        ok(1);
        start();
    }, timeout);
}

test('add specific event', 1, function() {
   evt.on(target(), 'click', function() {
       ok(1);
       evt.removeListener(target(), 'click');
   });
   QUnit.triggerEvent(target(), 'click');
});

test('add specific events', 1, function() {
   evt.on(target(), 'click mouseup', function() {
       ok(1);
       evt.removeListener(target(), 'click mouseup');
   });
   QUnit.triggerEvent(target(), 'mouseup');
});


asyncTest('remove specific event', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    evt.on(target(), 'click', listener);
    evt.removeListener(target(), 'click', listener);
    QUnit.triggerEvent(target(), 'click');
    finishIn(10);
});

asyncTest('remove specific events', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    evt.on(target(), 'click mouseup', listener);
    evt.removeListener(target(), 'click mouseup', listener);
    QUnit.triggerEvent(target(), 'click');
    QUnit.triggerEvent(target(), 'mouseup');
    finishIn(10);
});

asyncTest('remove all events by type', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    evt.on(target(), 'click mouseup', listener);
    evt.removeListener(target(), 'click mouseup');
    QUnit.triggerEvent(target(), 'click');
    QUnit.triggerEvent(target(), 'mouseup');
    finishIn(10);
});

asyncTest('remove all events', 1, function() {
    var listener = function() {
        ok(false, 'called removed event');
    };
    evt.on(target(), 'click mouseup', listener);
    evt.removeListener(target());
    QUnit.triggerEvent(target(), 'click');
    QUnit.triggerEvent(target(), 'mouseup');
    finishIn(10);
});

module('event properties');

asyncTest('this is target', 2, function() {
   evt.on(target(), 'click', function(e) {
       equal(this, target());
       equal(e.target, target());
       evt.removeListener(target(), 'click');
       start();
   });
   QUnit.triggerEvent(target(), 'click');
});

asyncTest('event is wrapped', 11, function() {
   evt.on(target(), 'click', function(e) {
       equal(e.type, 'click');
       e.type = 'dummy';
       equal(e.type, 'dummy');
       ok(e.baseEvent);
       ok(e.preventDefault);
       ok(e.stopPropagation);
       ok(e.isDefaultPrevented);
       ok(e.isPropagationStopped);
       
       ok(!e.isDefaultPrevented());
       ok(!e.isPropagationStopped());
       
       e.preventDefault();
       e.stopPropagation();
       
       ok(e.isDefaultPrevented());
       ok(e.isPropagationStopped());
       evt.removeListener(target(), 'click');
       start();
   });
   QUnit.triggerEvent(target(), 'click');
});

asyncTest('trigger', 1, function() {
    evt.on(target(), 'click', function(e) {
        ok(e.preventDefault);
        evt.removeListener(target(), 'click');
        start();
    });
    evt.trigger(target(), evt.createEvent({ type: 'click' }));
});

asyncTest('simulateBubbles', 2, function() {
    function listener(e) {
        equal(e.target, target());
        ok(e.preventDefault);
        evt.removeListener(document, 'click', listener);
        start();
    }
    evt.on(document, 'click', listener);
    evt.trigger(target(), evt.createEvent({ type: 'click' }, { simulateBubbles: true }));
});
