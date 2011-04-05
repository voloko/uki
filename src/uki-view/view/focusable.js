var env = require('../../uki-core/env'),
    dom = require('../../uki-core/dom'),
    fun = require('../../uki-core/function');

var Focusable = {};

Focusable.focusableDom = function() {
    return this.dom();
};

Focusable._domForEvent = function(type) {
    if (type == 'focus' || type == 'blur') {
        return this.focusableDom();
    }
    return false;
};

fun.delegateProp(Focusable, 'tabIndex', 'focusableDom');


Focusable.focus = function() {
    this.focusableDom().focus();
    return this;
};

Focusable.blur = function() {
    this.focusableDom().blur();
    return this;
};

Focusable.hasFocus = function() {
    return this.focusableDom() == env.doc.activeElement;
};


exports.Focusable = Focusable;
