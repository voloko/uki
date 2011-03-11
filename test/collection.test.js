module('collection');

test('prop accessor', 2, function() {
    var c = collection.builder.build([
        { view: 'Base', foo: 'bar' },
        { view: 'Base' },
        { view: 'Base' }
    ]);
    
    equal(c.prop('foo'), 'bar');
    
    c.prop('x', 'y');
    
    equal(c[1].x, 'y');
});

test('create from array', 2, function() {
    var c = new collection.Collection([
        new collection.builder.namespaces[0].Base(),
        new collection.builder.namespaces[0].Base()
    ]);
    
    equal(c.length, 2);
    equal(c[1].typeName, 'Base');
});

test('find withing collection', 2, function() {
    var c = collection.builder.build([
        { view: 'Container', childViews: [
            { view: 'Base' },
            { view: 'Base', foo: 'bar' }
        ] }
    ]);
    
    var found = c.find('[foo=bar]');
    equal(found.length, 1);
    ok(found instanceof collection.Collection);
});

test('append to a node', 2, function() {
    var c = collection.builder.build([
        { view: 'Base' },
        { view: 'Base', foo: 'bar' }
    ]);
    var parent = collection.builder.build({ view: 'Container' })[0];
    c.appendTo(parent);
    
    equal(parent.childViews().length, 2);
    ok(parent.firstChild() === c[0]);
});

test('attach', 2, function() {
    var c = collection.builder.build([
        { view: 'Base' },
        { view: 'Base', foo: 'bar' }
    ]).attach(document.getElementById('target'));
    
    ok(c[0].parent());
    ok(c[1].parent());
});

test('remove', 2, function() {
    var c = collection.builder.build([
        { view: 'Base' },
        { view: 'Base', foo: 'bar' }
    ]).attach(document.getElementById('target'));
    
    c.remove();
    
    ok(!c[0].parent());
    ok(!c[1].parent());
});

test('empty collection of parents', 1, function() {
    var c = collection.builder.build([
        { view: 'Base' },
        { view: 'Base', foo: 'bar' }
    ]);
    
    equal(c.parent().length, 0);
});

test('collection of parents', 2, function() {
    var c = collection.builder.build([
        { view: 'Container', childViews: [
            { view: 'Base' }
        ] },
        { view: 'Container', childViews: [
            { view: 'Base' }
        ] }
    ]).find('Base');
    
    equal(c.parent().length, 2);
    ok(c.parent()[0] !== c.parent()[1]);
});

test('collection of next views', 2, function() {
    var c = collection.builder.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 },
        { view: 'Base', testid: 3 }
    ]}).find('> Base:eq(0)');
    
    equal(c.next().length, 1);
    equal(c.next()[0].testid, 2);
});

test('collection of prev views', 2, function() {
    var c = collection.builder.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 },
        { view: 'Base', testid: 3 }
    ]}).find('> Base:eq(2)');
    
    equal(c.prev().length, 1);
    equal(c.prev()[0].testid, 2);
});

test('shortcuts', 2, function() {
    var c = collection.builder.build([
        { view: 'Base', text: 'bar' },
        { view: 'Base' },
        { view: 'Base' }
    ]);
    
    equal(c.text(), 'bar');
    
    c.text('y');
    
    equal(c[1].text(), 'y');
});

