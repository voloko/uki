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

asyncTest('event is wrapped', 12, function() {
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

       ok(!e.simulatePropagation);
       
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

module('event simulatePropagation');

asyncTest('exlict true', 2, function() {
    function listener(e) {
        equal(e.target, target());
        ok(e.preventDefault);
        evt.removeListener(document, 'click', listener);
        start();
    }
    evt.on(document, 'click', listener);
    evt.trigger(target(), evt.createEvent({ type: 'click', simulatePropagation: true }));
});

asyncTest('by default', 2, function() {
    function listener(e) {
        equal(e.target, target());
        ok(e.preventDefault);
        evt.removeListener(document, 'click', listener);
        start();
    }
    evt.on(document, 'click', listener);
    evt.trigger(target(), evt.createEvent({ type: 'click' }));
});

asyncTest('exlict false', 1, function() {
    function listener(e) {
        ok(false, 'got event on parent');
    }
    evt.on(document, 'click', listener);
    evt.trigger(target(), evt.createEvent({ type: 'click', simulatePropagation: false }));
    setTimeout(function() {
        evt.removeListener(document, 'click', listener);
        ok(1);
        start();
    }, 10);
});

asyncTest('preventDefaultHandler on simulated event', 1, function() {
    evt.on(target(), 'click', evt.preventDefaultHandler);
    evt.on(document, 'click', function(e) {
        ok(e.isDefaultPrevented());
        evt.removeListener(target(), 'click');
        evt.removeListener(document, 'click');
        start();
    });
    evt.trigger(target(), evt.createEvent({ type: 'click', simulatePropagation: true }));
});

asyncTest('stopPropagation on simulated event', 1, function() {
    evt.on(target(), 'click', function(e) {
        e.stopPropagation();
    });
    evt.on(document, 'click', function(e) {
        ok(false, 'propagated');
    });
    evt.trigger(target(), evt.createEvent({ type: 'click' }));
    
    setTimeout(function() {
        evt.removeListener(target(), 'click');
        evt.removeListener(document, 'click');
        ok(1);
        start();
    }, 10);
    
});
