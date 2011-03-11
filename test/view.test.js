module('view');

test('newClass', 2, function() {
    var MyView = view.newClass('MyView', view.Base, {}),
        m = new MyView();
    
    equal(m.typeName, 'MyView');
    ok(m instanceof view.Base);
});

test('newToggleClassProp', 5, function() {
    var X = view.newClass('X', view.Base, {
        large: view.newToggleClassProp('large-class')
    });
    
    var x = new X();
    equal(x.large(), false);
    x.large(true); 
    equal(x.large(), true);
    equal(x.className(), 'large-class');
    x.large(false);
    equal(x.className(), '');
    equal(x.large(), false);
});

test('newClassMapProp', 5, function() {
    var X = view.newClass('X', view.Base, {
        border: view.newClassMapProp({
            wide: 'my-border-wide',
            none: 'my-border-none',
            thin: 'my-border-thin'
        })
    });

    var x = new X();
    equal(x.border(), '');
    x.border('wide');
    equal(x.className(), 'my-border-wide');
    equal(x.border(), 'wide');
    x.border('none');
    equal(x.className(), 'my-border-none');
    equal(x.border(), 'none');
});

test('closest', 1, function() {
    var b = new view.Base();
    b.html('<div>1</div>');
    
    equal(view.closest(b.dom().firstChild), b);
});

test('byId', 1, function() {
    var b = new view.Base();
    b.id('test-id');
    
    equal(view.byId('test-id'), b);
});