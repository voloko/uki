## Dom

This module provides minimal set of dom helper function.

### dom.createElement(tagName, [options], [children])

Creates a dom element with given `tagName`. If options are specified
will copy those to created element. If `children` are given all the
children will be appended to the element:

    var div = dom.createElement('div', {
        style: 'width: 100%; color: red',
        html: 'hello world',
        className: 'my-class'
    });

    var parent = dom.createElement(div, {
        className: 'parent'
    }, [div]);

### dom.removeElement(element)

Removes element from it's `parentNode`

### dom.createStylesheet(code)

Dynamically creates a stylesheet:

    dom.createStylesheet('.my-class { color: red }\n.my-other-class { color: blue }');

### dom.computedStyle(element)

Cross browser access to computedStyle of an `element`.

### dom.fromHTML(html)

Creates an element from provided html:

    div = dom.fromHTML('<div class="my-class">Hello <strong>world!</strong></div>');

### dom.clientRect(element, [ignoreScroll])

Returns `element` clientRect adjusted to window scroll. If `ignoreScroll` is set to `true`
will not adjust to scroll.

### dom.hasClass(element, className)

Checks if the `element` has `className`.

    dom.hasClass(div, 'my-class');

### dom.addClass(element, classNames)

Ads one or several (space separated) `classNames` to the `element`. Will do nothing
with classNames that are already added.

    div.className = 'my-class class1'
    dom.addClass(div, 'my-class my-other-class');
    // => 'my-class class1 my-other-class'

### dom.removeClass(element, classNames)

Removes one or several (space separated) `classNames` from the `element`.

    div.className = 'my-class class1 my-other-class'
    dom.removeClass(div, 'my-class my-other-class');
    // => 'class1'

### dom.toggleClass(element, className, [condition])

Toggles a give `className` on an `element`.

### dom.escapeHTML(html)
