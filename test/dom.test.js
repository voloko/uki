module('dom');

test('create element no params', 1, function() {
    var div = dom.createElement('div');
    equal(div.tagName, 'DIV');
});

test('create element html', 1, function() {
    var div = dom.createElement('div', { html: 'foo' });
    equal(div.innerHTML, 'foo');
});

test('create element className', 1, function() {
    var div = dom.createElement('div', { className: 'foo' });
    equal(div.className, 'foo');
});

test('create element children', 1, function() {
    var div = dom.createElement('div', { className: 'foo' }, [
        dom.createElement('div'),
        dom.createElement('div')
    ]);
    equal(div.childNodes.length, 2);
});

test('removeElement', 1, function() {
    var child, div = dom.createElement('div', { className: 'foo' }, [
        child = dom.createElement('div')
    ]);
    dom.removeElement(child);
    equal(div.childNodes.length, 0);
});

test('createStylesheet', 1, function() {
    var div = dom.createElement('div', { className: 'test-dom-width' });
    dom.createStylesheet('.test-dom-width { width: 100px }');
    document.getElementById('target').appendChild(div);
    equal(div.offsetWidth, 100);
    dom.removeElement(div);
});

test('computedStyle', 1, function() {
    var div = dom.createElement('div', { className: 'test-dom-color' });
    dom.createStylesheet('.test-dom-color { color: #FF0000 }');
    document.getElementById('target').appendChild(div);
    var color = dom.computedStyle(div).color;
    color = color.toLowerCase();
    ok(color == '#ff0000' || color == 'rgb(255, 0, 0)');
    dom.removeElement(div);
});

test('fromHTML', 2, function() {
    var div = dom.fromHTML('<div><b>1</b><i>2</i></div>');
    
    equal(div.tagName, 'DIV');
    equal(div.childNodes.length, 2);
});

test('escape html', 2, function() {
    equal(dom.escapeHTML('<cript>'), '&lt;cript&gt;');
    equal(dom.escapeHTML('<a x="&11">'), '&lt;a x=&quot;&amp;11&quot;&gt;');
});

module('dom className');

test('hasClass', 2, function() {
    var div = dom.createElement('div', { className: 'class1 class2' });
    equal(dom.hasClass(div, 'class1'), true);
    equal(dom.hasClass(div, 'class3'), false);
});

test('addClass', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2' });
    dom.addClass(div, 'class3');
    equal(div.className, 'class1 class2 class3');
});

test('addClass 2 classes', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2' });
    dom.addClass(div, 'class3 class4');
    equal(div.className, 'class1 class2 class3 class4');
});

test('addClass existing', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2' });
    dom.addClass(div, 'class2');
    equal(div.className, 'class1 class2');
});

test('addClass 2 classes, 1 existing', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2' });
    dom.addClass(div, 'class2 class3');
    equal(div.className, 'class1 class2 class3');
});

test('removeClass', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2 class3' });
    dom.removeClass(div, 'class2');
    equal(div.className, 'class1 class3');
});

test('removeClass last', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2 class3' });
    dom.removeClass(div, 'class3');
    equal(div.className, 'class1 class2');
});

test('removeClass 2 classes', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2 class3' });
    dom.removeClass(div, 'class1 class3');
    equal(div.className, 'class2');
});

test('removeClass all classes', 1, function() {
    var div = dom.createElement('div', { className: 'class1 class2 class3' });
    dom.removeClass(div, 'class1 class3 class2');
    equal(div.className, '');
});

test('toggleClass', 2, function() {
    var div = dom.createElement('div', { className: 'class1 class2 class3' });
    dom.toggleClass(div, 'class2');
    equal(div.className, 'class1 class3');
    dom.toggleClass(div, 'class2');
    equal(div.className, 'class1 class3 class2');
});

