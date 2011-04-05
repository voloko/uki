module('dataList Selection');

test('indexes', 1, function() {
    var sel = new selection.Selection([1, 2, 3]);
    deepEqual(sel.indexes(), [1, 2, 3]);
});

test('clear', 1, function() {
    var sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.clear().indexes(), []);
});

test('index', 3, function() {
    var sel = new selection.Selection([2, 5, 7]);
    equal(sel.index(), 2);
    
    sel = new selection.Selection([]);
    equal(sel.index(), -1);
    
    sel = new selection.Selection([1, 2, 3]);
    equal(sel.index(7).index(), 7);
});

test('addRange', 9, function() {
    var sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(6, 8).indexes(), [2, 5, 6, 7, 8]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(-1, 1).indexes(), [-1, 0, 1, 2, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(-1, 0).indexes(), [-1, 0, 2, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(2, 5).indexes(), [2, 3, 4, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(8, 10).indexes(), [2, 5, 7, 8, 9, 10]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(9, 10).indexes(), [2, 5, 7, 9, 10]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(1, 10).indexes(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(1, 1).indexes(), [1, 2, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.addRange(5, 5).indexes(), [2, 5, 7]);
});

test('removeRange', 3, function() {
    var sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.removeRange(6, 8).indexes(), [2, 5]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.removeRange(3, 4).indexes(), [2, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.removeRange(-100, 100).indexes(), []);
});

test('isSelected', 3, function() {
    var sel = new selection.Selection([2, 5, 7]);
    equal(sel.isSelected(2), true);
    equal(sel.isSelected(6), false);
    
    sel = new selection.Selection();
    equal(sel.isSelected(2), false);
});

test('selectedInRange', 3, function() {
    var sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.selectedInRange(-100, 100), [2, 5, 7]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.selectedInRange(1, 3), [2]);
    
    sel = new selection.Selection([2, 5, 7]);
    deepEqual(sel.selectedInRange(10, 12), []);
});