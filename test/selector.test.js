var target = document.getElementById('target');

module('simple find');

test('by typeName', 2, function() {
    var tree = mod.build({ view: 'Container', childViews: [
        { view: 'Base', testid: 1 },
        { view: 'Base', testid: 2 }
    ]});
    
    var found = mod.find('Base', tree);
    equal(found.length, 2);
    deepEqual(mod.utils.pluck(found, 'testid'), [1, 2]);
});
