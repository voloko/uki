var target = document.getElementById('target');

module('simple find');

var TestBase = selector.view.newClass('test.View', selector.namespaces[0].Base, {}),
    TestContainer = selector.view.newClass('test.Container', selector.namespaces[0].Container, {});

test('by typeName', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 }
    ]});
    
    var found = selector.find('Base', tree);
    equal(found.length, 2);
    deepEqual(selector.utils.pluck(found, 'testid'), [1, 2]);
});

test('by typePart', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: TestBase, testid: 1 },
        { view: TestBase, testid: 2 }
    ]});
    
    var found = selector.find('View', tree);
    equal(found.length, 2);
    deepEqual(selector.utils.pluck(found, 'testid'), [1, 2]);
});

test('by attribute', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 }
    ]});
    
    var found = selector.find('[testid=1]', tree);
    equal(found.length, 1);
    deepEqual(selector.utils.pluck(found, 'testid'), [1]);
});

test('do not include context in select', 1, function() {
    var tree = selector.build({ view: 'Container' });
    
    var found = selector.find('Container', tree);
    equal(found.length, 0);
});

test('by " "', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: TestContainer, childViews: [
            { view: 'Base', testid: 2 },
            { view: TestContainer, childViews: [
                { view: 'Base', testid: 3 }
            ]}
        ]}
    ]});
    
    var found = selector.find('Container Base', tree);
    equal(found.length, 2);
    deepEqual(selector.utils.pluck(found, 'testid'), [2,3]);
});

test('by >', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: TestContainer, childViews: [
            { view: 'Base', testid: 2 },
            { view: 'Container', childViews: [
                { view: 'Base', testid: 3 }
            ]}
        ]}
    ]});
    
    var found = selector.find('test.Container > Base', tree);
    equal(found.length, 1);
    deepEqual(selector.utils.pluck(found, 'testid'), [2]);
});

test('by +', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: TestContainer, childViews: [
            { view: 'Base', testid: 2 },
            { view: TestBase, testid: 3 },
            { view: 'Container', childViews: [
                { view: 'Base', testid: 4 },
                { view: TestBase, testid: 5 }
            ]}
        ]}
    ]});
    
    var found = selector.find('Base + View', tree);
    equal(found.length, 2);
    deepEqual(selector.utils.pluck(found, 'testid'), [3,5]);
});

test('by ~', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: TestContainer, childViews: [
            { view: 'Base', testid: 2 },
            { view: TestBase, testid: 3 },
            { view: 'Container', childViews: [
                { view: 'Base', testid: 4 },
                { view: TestBase, testid: 5 },
                { view: TestBase, testid: 6 }
            ]}
        ]}
    ]});
    
    var found = selector.find('Base ~ View', tree);
    equal(found.length, 3);
    deepEqual(selector.utils.pluck(found, 'testid'), [3,5,6]);
});

test('by #', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: TestContainer, childViews: [
            { view: 'Base', testid: 2 },
            { view: TestBase, testid: 3 },
            { view: 'Container', childViews: [
                { view: 'Base', testid: 4, id: 'test' },
                { view: TestBase, testid: 5 }
            ]}
        ]}
    ]});
    
    var found = selector.find('#test', tree);
    equal(found.length, 1);
    deepEqual(selector.utils.pluck(found, 'testid'), [4]);
});

test('by typeName in global', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 }
    ]});
    tree.attach();
    
    var found = selector.find('Base');
    equal(found.length, 2);
    deepEqual(selector.utils.pluck(found, 'testid'), [1, 2]);
    
    tree.parent()[0].removeChild(tree[0]);
});

test('by # in global', 2, function() {
    var tree = selector.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2, id: 'test' }
    ]});
    tree.attach();
    
    var found = selector.find('#test');
    equal(found.length, 1);
    deepEqual(selector.utils.pluck(found, 'testid'), [2]);
    
    tree.parent()[0].removeChild(tree[0]);
});

